const menuBtn = document.querySelector('.header__menu-btn');
const body = document.body;
const header = document.querySelector('.header');
const pathname = window.location.pathname;
const normalizedPath = pathname.endsWith('/') ? `${pathname}index.html` : pathname;
const isHomePage = body?.classList.contains('page--home') && (/\/index\.html$/).test(normalizedPath);

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        const isOpen = body.classList.contains('menu-open');
        menuBtn.classList.toggle('is-open', !isOpen);
        body.classList.toggle('menu-open');
        menuBtn.setAttribute('aria-expanded', String(!isOpen));
    });
}

if (header) {
    const updateHeaderState = () => {
        if (!isHomePage) {
            header.classList.add('header--scrolled');
            return;
        }

        const scrolled = window.scrollY > 0;
        header.classList.toggle('header--scrolled', scrolled);
    };

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
}
