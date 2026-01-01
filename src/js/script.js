const nav = document.querySelector('.nav');
const menuBtn = document.querySelector('.header__menu-btn');
const body = document.body;

if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
        const isOpen = nav.classList.contains('nav--open');
        nav.classList.toggle('nav--open');
        body.classList.toggle('menu-open');
        menuBtn.classList.toggle('is-open', !isOpen);
        menuBtn.setAttribute('aria-expanded', String(!isOpen));
    });
}
