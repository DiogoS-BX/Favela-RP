"""Gera o pacote para subir no servidor (export estático do Next).

Saída em deploy/:
  cup.html          -> substitui o cup.html da raiz do site (URL /cup)
  cup-assets/       -> css, js e imagens da página (vai na raiz do site)
e o arquivo deploy/cup-deploy.zip com os dois.
"""
import re, shutil, zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "cup"
OUT = ROOT / "deploy"
PREFIX = "/cup-assets/"

shutil.rmtree(OUT, ignore_errors=True)
(OUT / "cup-assets").mkdir(parents=True)
for d in ("css", "js", "assets"):
    shutil.copytree(SRC / d, OUT / "cup-assets" / d)
(OUT / "cup-assets" / "assets" / "LEIA-ME.md").unlink(missing_ok=True)

html = (SRC / "index.html").read_text(encoding="utf-8")
# o <base> dinâmico só é necessário para caminhos relativos; aqui viram absolutos
html = re.sub(r"\s*<script>\s*// Garante que os caminhos relativos.*?</script>", "", html, flags=re.S)
html = re.sub(r'(href|src)="(css|js|assets)/', rf'\1="{PREFIX}\2/', html)
assert 'src="assets/' not in html and 'href="css/' not in html
(OUT / "cup.html").write_text(html, encoding="utf-8")

with zipfile.ZipFile(OUT / "cup-deploy.zip", "w", zipfile.ZIP_DEFLATED) as z:
    for f in sorted(OUT.rglob("*")):
        if f.is_file() and f.name != "cup-deploy.zip":
            z.write(f, f.relative_to(OUT))
print("ok:", OUT / "cup-deploy.zip")
