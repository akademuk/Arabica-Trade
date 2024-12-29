document.addEventListener("DOMContentLoaded", () => {
  initHeroVideo();
  initBurgerMenu();
  initSubmenuToggle();
  initHeaderScroll();
  initCardHoverEffect();
  initDynamicHoverEffect();
  initSequentialFadeIn();
  initAccordion();
  initializeAccordion('.footer__accordion');
  initSmoothScroll();
});

function initHeroVideo() {
    const heroBackground = document.querySelector(".hero__background");
  
    if (!heroBackground) {
        return;
    }
  
    const heroImage = heroBackground.querySelector(".hero__background-img");
    const heroVideo = heroBackground.querySelector(".hero__background-video");
  
    if (!heroImage || !heroVideo) {
        return;
    }
  
    window.addEventListener("load", () => {
        heroImage.style.opacity = "0";
        heroVideo.style.opacity = "1";
    });
}

function initBurgerMenu() {
    const burger = document.querySelector(".header__burger");
    const menu = document.querySelector(".mobile-menu");
    const overlay = document.querySelector(".overlay");
    const body = document.body;

    if (!burger || !menu || !overlay) {
        return;
    }

    const animationDuration = 400;

    const openMenu = () => {
        const scrollY = window.scrollY;
        body.dataset.scrollY = scrollY;
        burger.classList.add("active");
        menu.classList.add("active");
        overlay.classList.add("active");

        body.style.position = "fixed";
        body.style.top = `-${scrollY}px`;
        body.style.width = "100%";
        body.style.overflow = "hidden";
    };

    const closeMenu = (targetId = null) => {
        burger.classList.remove("active");
        menu.classList.remove("active");
        overlay.classList.remove("active");

        requestAnimationFrame(() => {
            body.style.position = "";
            body.style.top = "";
            body.style.width = "";
            body.style.overflow = "";
            window.scrollTo(0, parseInt(body.dataset.scrollY || "0"));

            if (targetId) {
                setTimeout(() => {
                    document.getElementById(targetId)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }, animationDuration);
            }
        });
    };

    burger.addEventListener("click", () => {
        burger.classList.contains("active") ? closeMenu() : openMenu();
    });

    overlay.addEventListener("click", closeMenu);

    menu.addEventListener("click", (event) => {
        const target = event.target;

        if (target.tagName === "A" && target.nextElementSibling?.classList.contains("submenu")) {
            event.preventDefault();
            event.stopPropagation();
            target.nextElementSibling.classList.toggle("active");
            return;
        }

        if (target.tagName === "A" && !target.nextElementSibling?.classList.contains("submenu")) {
            const targetId = target.getAttribute("href").slice(1);
            closeMenu(targetId);
        }
    });
}
  
function initSubmenuToggle() {
    const menuItems = document.querySelectorAll(".menu-item");

    if (!menuItems.length || window.innerWidth >= 1200) {
        return;
    }

    menuItems.forEach(item => {
        item.addEventListener("click", function (event) {
            menuItems.forEach(el => {
                if (el !== item) el.classList.remove("active");
            });

            item.classList.toggle("active");

            if (item.querySelector(".submenu")) {
                event.preventDefault();
            }
        });
    });
}
  
function initHeaderScroll() {
    const header = document.querySelector("header");
    const scrollThreshold = 100;
    const headerScrolledClass = "scrolled";

    if (!header) {
        return;
    }

    function toggleHeaderClass() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add(headerScrolledClass);
        } else {
            header.classList.remove(headerScrolledClass);
        }
    }

    window.addEventListener("scroll", toggleHeaderClass);
    toggleHeaderClass();
}

function initCardHoverEffect() {
    const cards = document.querySelectorAll(".we-offer__box-card");

    if (!cards.length) return;

    function updateCardBehavior() {
        const windowWidth = window.innerWidth;

        if (windowWidth <= 1200) {
            cards.forEach((card) => card.classList.add("expanded"));
        } else {
            cards.forEach((card) => card.classList.remove("expanded"));

            if (cards[0]) {
                cards[0].classList.add("expanded");
            }

            cards.forEach((card) => {
                card.addEventListener("mouseenter", () => {
                    cards.forEach((c) => c.classList.remove("expanded"));
                    card.classList.add("expanded");
                });
            });
        }
    }

    updateCardBehavior();

    window.addEventListener("resize", updateCardBehavior);
}

function initDynamicHoverEffect() {
    const baseClass = "coffee-origins__location";
    const hoverClass = "hovered";

    const mapElements = document.querySelectorAll("[id^='mapsImg']");
    if (!mapElements.length) return;

    mapElements.forEach((element) => {
        element.style.cursor = "pointer";
    });

    document.addEventListener("mouseover", (event) => {
        const target = event.target;

        if (target.id?.startsWith("mapsImg")) {
            const idNumber = target.id.replace("mapsImg", "");
            const targetElement = document.querySelector(`.${baseClass}${idNumber}`);
            targetElement?.classList.add(hoverClass);
            target.style.fill = "#616E46";
        }
    });

    document.addEventListener("mouseout", (event) => {
        const target = event.target;

        if (target.id?.startsWith("mapsImg")) {
            const idNumber = target.id.replace("mapsImg", "");
            const targetElement = document.querySelector(`.${baseClass}${idNumber}`);
            targetElement?.classList.remove(hoverClass);
            target.style.fill = "";
        }
    });
}

function initSequentialFadeIn() {
    const icons = document.querySelectorAll(".our-warehouses__icon");
    const container = document.querySelector(".our-warehouses");
    const delay = 1500;
    let isAnimated = false;

    if (!icons.length || !container) return;

    function onScroll() {
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top <= windowHeight && rect.bottom >= 0 && !isAnimated) {
            isAnimated = true;

            icons.forEach((icon, index) => {
                setTimeout(() => {
                    icon.classList.add("shown");
                }, index * delay);
            });

            window.removeEventListener("scroll", onScroll);
        }
    }

    window.addEventListener("scroll", onScroll);

    onScroll();
}

function initAccordion() {
    const accordionItems = document.querySelectorAll(".order__accordion-item");

    if (!accordionItems.length) return;

    accordionItems.forEach((item, index) => {
        const header = item.querySelector(".order__accordion-header");
        if (!header) return;

        if (index === 0) {
            item.classList.add("active");
        }

        header.addEventListener("click", () => {
            const isActive = item.classList.contains("active");

            accordionItems.forEach((i) => i.classList.remove("active"));

            if (!isActive) {
                item.classList.add("active");
            }
        });
    });
}

function initializeAccordion(selector) {
    const accordion = document.querySelector(selector);

    if (!accordion) return;

    const buttons = accordion.querySelectorAll('.footer__accordion-button');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const collapse = button.nextElementSibling;
            const isActive = collapse.classList.contains('active');

            buttons.forEach((btn) => {
                btn.classList.remove('active');
                btn.nextElementSibling?.classList.remove('active');
            });

            if (!isActive) {
                setTimeout(() => {
                    collapse.classList.add('active');
                    button.classList.add('active');
                }, 200);
            }
        });
    });
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                event.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

















