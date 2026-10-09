// Menu mobile (tela cheia)
const toggle = document.querySelector('.header__toggle');
const menu = document.getElementById('menu');

function setMenu(open) {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  menu.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
}

toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
menu.addEventListener('click', (e) => { if (e.target.tagName === 'A') setMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

// Links internos (#secao): rola na própria página, mesmo com <base> ativo
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    history.replaceState(null, '', location.pathname + link.getAttribute('href'));
  });
});

// Enquanto os assets do Figma não forem adicionados em /assets,
// mostra uma caixa com o nome do arquivo esperado no lugar da imagem.
function showPlaceholder(img) {
  const box = document.createElement('div');
  box.className = 'img-missing';
  box.textContent = img.dataset.label || img.getAttribute('src');
  box.style.width = getComputedStyle(img).width;
  img.replaceWith(box);
}

document.querySelectorAll('img[data-label]').forEach((img) => {
  if (img.complete && img.naturalWidth === 0) showPlaceholder(img);
  else img.addEventListener('error', () => showPlaceholder(img), { once: true });
});
