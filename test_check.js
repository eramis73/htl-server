PE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <title>ELEKTRİK TUZAĞI — ÖLÜM GÖLLERİ</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; user-select: none; font-family: 'Press Start 2P', monospace; }
    body { overflow: hidden; background: #263238; }
    canvas { display: block; width: 100vw; height: 100vh; }
    
    #ui-layer { position: absolute; inset: 0; pointer-events: none; z-index: 100; }
    #main-menu {
      position: absolute; inset: 0; background: rgba(38, 50, 56, 0.90); backdrop-filter: blur(8px);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      color: white; pointer-events: auto; transition: opacity 0.5s;
    }
    #main-menu h1 { font-size: 28px; color: #ffb74d; margin-bottom: 25px; text-align: center; line-height: 1.5; letter-spacing: 2px;}
    #main-menu p { font-size: 10px; color: #eceff1; text-align: center; max-width: 800px; line-height: 2.5; margin-bottom: 40px; }
    .highlight { color: #81c784; }
    
    #float-container { position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 200; }
    .floating-text {
      position: absolute; font-size: 14px; font-weight: bold; pointer-events: none;
      animation: floatUp 1.2s ease-out forwards; text-shadow: 2px 2px 0 #000;
    }
    @keyframes floatUp {
      0% { transform: translate(-50%, 0) scale(1); opacity: 1; }
      100% { transform: translate(-50%, -60px) scale(1.5); opacity: 0; }
    }
    
    .btn {
      background: #ffb74d; color: #000; font-size: 16px;
      padding: 15px 35px; border: none; border-radius: 8px; cursor: pointer;
      box-shadow: 0 4px 0 #ef6c00; transition: transform 0.1s, box-shadow 0.1s;
    }
    .btn:active { transform: translateY(4px); box-shadow: 0 0 0 #ef6c00; }
    
    #hud {
      position: absolute; top: 0; left: 0; width: 100%; padding: 15px 25px;
      display: flex; justify-content: center; align-items: flex-start; gap: 30px; pointer-events: none;
    }
    .score-card, #level-display { 
      background: rgba(0, 0, 0, 0.4); color: #fff; padding: 12px 18px; border: none; 
      font-size: 10px; border-radius: 8px; backdrop-filter: blur(4px); line-height: 1.6;
    }
  </style>
</head>
<body>
<div id="ui-layer">
  <div id="float-container"></div>
  <div id="main-menu">
    <h1>⚡️ ÖLÜM GÖLLERİ: TEK KİŞİLİK MÜCADELE ⚡️</h1>
    <p>
      <span class="highlight">BİRİNCİ OYUNCU:</span> WASD veya YÖN=Hareket | <b>BOŞLUK / ENTER</b>=Elektrik Tipi | SHIFT=Atılma <br><br>
      <b>HEDEF SABİT:</b> Her bölümde sadece kendi <b>tuzağının içinde öldürdüğün 20 zombi</b> ile bölüm geçersin!<br>
      Zombileri göle düşürerek yok edebilirsin (Ancak göle düşen zombiler skora yansımaz, bölümü bitirmez).<br><br>
      <b>PARLAK ELMASLAR:</b> Arenaya dağılmış mavi elmaslar sana çılgın miktarda puan kazandırır ama bölümü bitirmek için şart değiller. Puan kasmak için daha fazla risk almaya var mısın?<br><br>
      <b>KORKUTUCU GÖLLER:</b> Haritadaki ölümcül göller, <b>HER BÖLÜMDE %10 DAHA FAZLA BÜYÜYOR!</b><br>
    </p>
    <button class="btn" id="start-btn">SAVAŞA BAŞLA</button>
  </div>
  
  <div id="hud" style="display: none;">
    <div class="score-card" id="p1-score">Puan: 0</div>
    <div id="level-display">BÖLÜM 1<br><small id="hud-zombies">Öldürülen: 0 / 20 | Zombi: 0</small></div>
  </div>
</div>

<script type="importmap">{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js"}}