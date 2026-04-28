const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: process.env.PORT || 8080 });
const rooms = new Map();

function genCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let c = '';
  for (let i = 0; i < 6; i++) c += chars[Math.floor(Math.random() * chars.length)];
  return c;
}

wss.on('connection', ws => {
  ws.roomCode = null;
  ws.role = null;

  ws.on('message', raw => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }

    if (msg.t === 'create') {
      let code, tries = 0;
      do { code = genCode(); } while (rooms.has(code) && ++tries < 50);
      rooms.set(code, { host: ws, guest: null, ts: Date.now() });
      ws.roomCode = code; ws.role = 'host';
      ws.send(JSON.stringify({ t: 'created', code }));

    } else if (msg.t === 'join') {
      const code = (msg.code || '').toUpperCase().trim();
      const room = rooms.get(code);
      if (!room) { ws.send(JSON.stringify({ t: 'err', msg: 'Room not found' })); return; }
      if (room.guest) { ws.send(JSON.stringify({ t: 'err', msg: 'Room is full' })); return; }
      room.guest = ws; ws.roomCode = code; ws.role = 'guest';
      ws.send(JSON.stringify({ t: 'joined', code }));
      room.host.send(JSON.stringify({ t: 'peer_joined' }));

    } else if (ws.roomCode) {
      const room = rooms.get(ws.roomCode);
      if (!room) return;
      const peer = ws.role === 'host' ? room.guest : room.host;
      if (peer && peer.readyState === WebSocket.OPEN) peer.send(raw.toString());
    }
  });

  ws.on('close', () => {
    if (!ws.roomCode) return;
    const room = rooms.get(ws.roomCode);
    if (!room) return;
    const peer = ws.role === 'host' ? room.guest : room.host;
    if (peer && peer.readyState === WebSocket.OPEN) {
      peer.send(JSON.stringify({ t: 'peer_left' }));
    }
    rooms.delete(ws.roomCode);
  });
});

setInterval(() => {
  const cut = Date.now() - 7200000;
  for (const [k, r] of rooms) if (r.ts < cut) rooms.delete(k);
}, 3600000);

console.log('HTL relay server on port', process.env.PORT || 8080);
