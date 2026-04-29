import sys
import zipfile
import xml.etree.ElementTree as ET

with zipfile.ZipFile(r'c:\Users\Enes\Desktop\Game Jam\park_macerasi_vibejam.docx') as docx:
    tree = ET.fromstring(docx.read('word/document.xml'))
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    
    with open(r'c:\Users\Enes\Desktop\Game Jam\docx_extracted_utf8.txt', 'w', encoding='utf-8') as f:
        for p in tree.findall('.//w:p', ns):
            texts = p.findall('.//w:t', ns)
            p_text = ''.join([t.text for t in texts if t.text])
            if p_text.strip():
                f.write(p_text + "\n")
