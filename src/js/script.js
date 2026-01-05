const menuBtn = document.querySelector('.header__menu-btn');
const body = document.body;
const header = document.querySelector('.header');
const pathname = window.location.pathname;
const normalizedPath = pathname.endsWith('/') ? `${pathname}index.html` : pathname;
const isHomePage = body?.classList.contains('page--home') && (/\/index\.html$/).test(normalizedPath);


function closeMenu() {
    menuBtn?.classList.remove('is-open');
    body.classList.remove('menu-open');
    menuBtn?.setAttribute('aria-expanded', 'false');
}

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        const isOpen = body.classList.contains('menu-open');
        menuBtn.classList.toggle('is-open', !isOpen);
        body.classList.toggle('menu-open');
        menuBtn.setAttribute('aria-expanded', String(!isOpen));
    });
}


const navLinks = document.querySelectorAll('.nav__link, .footer__link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        const hasAnchor = href.includes('#');

        if (hasAnchor) {
            const [pagePath, anchor] = href.split('#');
            const currentPage = window.location.pathname;
            const pageFileName = pagePath.split('/').pop();
            const currentFileName = currentPage.split('/').pop();

            if (pageFileName === currentFileName) {
                e.preventDefault();
                closeMenu();

                const targetElement = document.getElementById(anchor);
                if (targetElement) {
                    setTimeout(() => {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 300);
                }
            } else {
                closeMenu();
            }
        } else {
            closeMenu();
        }
    });
});

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


const glossaryTerms = {
    fr: {
        'chromosome': 'chromosome',
        'chromosomes': 'chromosome',
        'génétique': 'genetique',
        'chromosome X': 'chromosome-xy',
        'chromosome Y': 'chromosome-xy',
        'effet Matilda': 'effet-matilda',
        'invisibilisation': 'invisibilisation',
        'sexisme': 'sexisme',
        'reconnaissance scientifique': 'reconnaissance-scientifique',
        'fission nucléaire': 'fission-nucleaire',
        'radioactivité': 'radioactivite',
        'théorème de Noether': 'theoreme-noether',
        'diffraction des rayons X': 'diffraction-rayons-x',
        'double hélice': 'double-helice',
        'ADN': 'double-helice',
        'FIFDU': 'fifdu',
        'bourses de recherche': 'bourses-recherche',
        'histoire du genre': 'histoire-genre',
        'stéréotypes de genre': 'stereotypes-genre',
        'égalité dans la science': 'egalite-science',
        'représentation des femmes': 'representation-femmes',
        'légitimité scientifique': 'legitimite-scientifique',
        'réhabilitation': 'rehabilitation',
        'pionnière': 'pionniere',
        'pionnières': 'pionniere',
        'prix Nobel': 'prix-nobel',
        'laboratoire': 'laboratoire',
        'recherche scientifique': 'recherche-scientifique',
        'biographie': 'biographie'
    },
    en: {
        'chromosome': 'chromosome',
        'chromosomes': 'chromosome',
        'genetics': 'genetique',
        'X chromosome': 'chromosome-xy',
        'Y chromosome': 'chromosome-xy',
        'Matilda Effect': 'effet-matilda',
        'Matilda effect': 'effet-matilda',
        'invisibilization': 'invisibilisation',
        'sexism': 'sexisme',
        'scientific recognition': 'reconnaissance-scientifique',
        'nuclear fission': 'fission-nucleaire',
        'radioactivity': 'radioactivite',
        'Noether\'s theorem': 'theoreme-noether',
        'X-ray diffraction': 'diffraction-rayons-x',
        'double helix': 'double-helice',
        'DNA': 'double-helice',
        'IFUW': 'fifdu',
        'research grants': 'bourses-recherche',
        'gender history': 'histoire-genre',
        'gender stereotypes': 'stereotypes-genre',
        'equality in science': 'egalite-science',
        'representation of women': 'representation-femmes',
        'scientific legitimacy': 'legitimite-scientifique',
        'rehabilitation': 'rehabilitation',
        'pioneer': 'pionniere',
        'pioneers': 'pionniere',
        'Nobel Prize': 'prix-nobel',
        'laboratory': 'laboratoire',
        'scientific research': 'recherche-scientifique',
        'biography': 'biographie'
    }
};

function initGlossaryLinks() {
    const lang = document.documentElement.lang || 'fr';
    const isGlossaryPage = pathname.includes('glossaire') || pathname.includes('glossary');
    const isExcludedPage = pathname.includes('galerie') ||
        pathname.includes('gallery') ||
        pathname.includes('contact') ||
        pathname.includes('index');

    if (isGlossaryPage || isExcludedPage) return;

    const terms = glossaryTerms[lang] || glossaryTerms.fr;
    const glossaryPath = lang === 'en' ? '/en/glossary.html' : '/fr/glossaire.html';

    const contentElements = document.querySelectorAll('.main p, .main li:not(.glossaire__item), .main figcaption');

    contentElements.forEach(element => {
        let html = element.innerHTML;


        const sortedTerms = Object.keys(terms).sort((a, b) => b.length - a.length);

        sortedTerms.forEach(term => {
            const id = terms[term];
            const regex = new RegExp(`\\b(${term})\\b(?![^<]*>)`, 'gi');
            html = html.replace(regex, `<a href="${glossaryPath}#${id}" class="glossary-link">$1</a>`);
        });

        element.innerHTML = html;
    });
}

initGlossaryLinks();
