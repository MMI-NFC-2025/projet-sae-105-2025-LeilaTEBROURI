// Ajout : fermeture du menu avec le bouton X
const navClose = document.querySelector('.nav__close');
if (navClose) {
    navClose.addEventListener('click', (e) => {
        e.stopPropagation();
        menuBtns.forEach(btn => {
            btn.setAttribute('aria-expanded', 'false');
            btn.classList.remove('is-open');
        });
        nav.classList.remove('nav--open');
    });
}



const nav = document.querySelector('.nav');
const menuBtns = document.querySelectorAll('.header__menu-btn');

menuBtns.forEach(menuBtn => {
    menuBtn.addEventListener('click', () => {
        const isOpen = nav.classList.contains('nav--open');
        if (isOpen) {
            menuBtns.forEach(btn => {
                btn.setAttribute('aria-expanded', 'false');
                btn.classList.remove('is-open');
            });
            nav.classList.remove('nav--open');
        } else {
            menuBtns.forEach(btn => {
                btn.setAttribute('aria-expanded', 'true');
                btn.classList.add('is-open');
            });
            nav.classList.add('nav--open');
        }
    });
});
