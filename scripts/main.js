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
    initRequestCallPopup();
    initReadMoreFeature();
    initExpandableBlocks();
});

// Home
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

// Home
function initBurgerMenu() {
    const burger = document.querySelector(".header__burger");
    const menu = document.querySelector(".mobile-menu");
    const overlay = document.querySelector(".overlay");
    const header = document.querySelector(".header");
    const body = document.body;

    if (!burger || !menu || !overlay || !header) {
        return;
    }

    const animationDuration = 400;

    const openMenu = () => {
        burger.classList.add("active");
        menu.classList.add("active");
        overlay.classList.add("active");
        body.classList.add("body-lock");
        header.classList.add("scrolled");
    };

    const closeMenu = (targetId = null) => {
        burger.classList.remove("active");
        menu.classList.remove("active");
        overlay.classList.remove("active");
        body.classList.remove("body-lock");

        if (targetId) {
            setTimeout(() => {
                document.getElementById(targetId)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }, animationDuration);
        }
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

// Home
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

// Home
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

// Home
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

// Home
function initDynamicHoverEffect() {
    const baseClass = "coffee-origins__location";
    const hoverClass = "hovered";

    const mapElements = document.querySelectorAll("[id^='mapsImg']");
    if (!mapElements.length) return;

    mapElements.forEach((element) => {
        element.style.cursor = "pointer";
    });

    const handleHover = (target, action) => {
        if (target.id?.startsWith("mapsImg")) {
            const idNumber = target.id.replace("mapsImg", "");
            const targetElement = document.querySelector(`.${baseClass}${idNumber}`);
            if (action === "add") {
                targetElement?.classList.add(hoverClass);
                target.style.fill = "#616E46";
            } else if (action === "remove") {
                targetElement?.classList.remove(hoverClass);
                target.style.fill = "";
            }
        }
    };

    document.addEventListener("mouseover", (event) => {
        if (window.innerWidth >= 1200) {
            handleHover(event.target, "add");
        }
    });

    document.addEventListener("mouseout", (event) => {
        if (window.innerWidth >= 1200) {
            handleHover(event.target, "remove");
        }
    });

    document.addEventListener("click", (event) => {
        if (window.innerWidth < 1200) {
            const target = event.target;
            if (target.id?.startsWith("mapsImg")) {
                const idNumber = target.id.replace("mapsImg", "");
                const targetElement = document.querySelector(`.${baseClass}${idNumber}`);

                document.querySelectorAll(`.${baseClass}`).forEach((el) => {
                    if (el !== targetElement) el.classList.remove(hoverClass);
                });

                if (targetElement?.classList.contains(hoverClass)) {
                    targetElement.classList.remove(hoverClass);
                    target.style.fill = "";
                } else {
                    targetElement?.classList.add(hoverClass);
                    target.style.fill = "#616E46";
                }
            }
        }
    });
}

// Home
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

// Home
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

// Home
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

// Home
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

// Home
function initRequestCallPopup() {
    const modal = document.getElementById("requestCallModal");
    const closeBtn = modal.querySelector(".popup-modal__close");
    const requestButtons = document.querySelectorAll(".request-call");

    if (!modal || !requestButtons.length) return;

    const openModal = () => {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        modal.style.display = "none";
        document.body.style.overflow = "";
    };

    requestButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            openModal();
        });
    });

    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) closeModal();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeModal();
    });
}

// WHAT WE DO
const swiperContainer = document.querySelector('.swiper-container');
if (swiperContainer) {
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        spaceBetween: 8,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            init: function () {
                const realSlidesCount = this.el.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)').length;
                document.querySelector('.total-slides').textContent = String(realSlidesCount).padStart(2, '0');
                document.querySelector('.current-slide').textContent = String(this.realIndex + 1).padStart(2, '0');
            },
            slideChange: function () {
                document.querySelector('.current-slide').textContent = String(this.realIndex + 1).padStart(2, '0');
            },
        },
    });
}

// Peru
const sliderElement = document.querySelector('.full-slider');
if (sliderElement) {
    const swiper = new Swiper('.full-slider', {
        lazy: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: true,
    });
}

// Green coffee
function initReadMoreFeature() {
    const contentBoxes = document.querySelectorAll('.brief__content-box');

    contentBoxes.forEach((contentBox) => {
        const readMoreButton = contentBox.querySelector('.brief__content-read');
        const contentText = contentBox.querySelector('.brief__content-text');

        if (contentText && readMoreButton) {
            readMoreButton.addEventListener('click', () => {
                contentBox.classList.toggle('expanded');
                readMoreButton.classList.toggle('rotated'); 

                const buttonTextNode = readMoreButton.querySelector('span');

                if (buttonTextNode) {
                    buttonTextNode.textContent = contentBox.classList.contains('expanded') 
                        ? ' Read less' 
                        : ' Read more';
                }
            });
        }
    });
}

function initExpandableBlocks() {
    const blocks = document.querySelectorAll('.guide__item');

    if (blocks.length > 0) {
        const firstBlock = blocks[0];
        firstBlock.classList.add('active'); 

        blocks.forEach((block) => {
            block.addEventListener('click', () => {
                if (window.innerWidth <= 1200) { 
                    blocks.forEach((b) => b.classList.remove('active')); 
                    block.classList.toggle('active');
                }
            });

            block.addEventListener('mouseenter', () => {
                if (window.innerWidth > 1200) { 
                    blocks.forEach((b) => b.classList.remove('active'));
                    block.classList.add('active');
                }
            });

            block.addEventListener('mouseleave', () => {
                if (window.innerWidth > 1200) { 
                    blocks.forEach((b) => b.classList.remove('active'));
                    firstBlock.classList.add('active');
                }
            });
        });
    }
}



