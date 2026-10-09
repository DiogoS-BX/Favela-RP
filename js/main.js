// Menu mobile
const toggle = document.querySelector('.header__toggle');
const menu = document.getElementById('menu');

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  menu.classList.toggle('is-open', !open);
});

menu.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
  }
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
