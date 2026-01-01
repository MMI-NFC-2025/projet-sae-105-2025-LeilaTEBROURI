const menuBtn = document.querySelector('.header__menu-btn');
const body = document.body;

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        const isOpen = body.classList.contains('menu-open');
        menuBtn.classList.toggle('is-open', !isOpen);
        body.classList.toggle('menu-open');
        menuBtn.setAttribute('aria-expanded', String(!isOpen));
    });
}
