# Favela Gaming — página Competitivo (/cup)

Página estática (HTML + CSS + JS, sem build) do League Royale Favela Gaming, feita a partir do design no Figma.
Ela substitui a página `https://favelagaming.gg/cup`.

```
cup/
  index.html
  css/style.css
  js/main.js
  assets/      imagens (lista em cup/assets/LEIA-ME.md)
```

Os caminhos são relativos: a pasta `cup/` funciona em qualquer endereço (`/cup`, `/cup/` ou dentro de subpastas).

`index.html` e `_redirects` na raiz servem só para o preview (GitHub Pages / Netlify) e não devem ir para o site.

## Ver localmente

```bash
python3 -m http.server 8000
# abra http://localhost:8000/cup/
```

## Subir no servidor (export estático do Next)

```bash
python3 scripts/gerar_deploy.py   # gera deploy/cup.html, deploy/cup-assets/ e deploy/cup-deploy.zip
```

Na raiz do site: renomeie o `cup.html` atual para backup (ex.: `cup_OLD3.html`), envie o `cup-deploy.zip`
e extraia. Ficam `cup.html` (nova página em /cup) e a pasta `cup-assets/`.
