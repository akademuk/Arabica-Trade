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
    initializeFilterPopup();
    initOfferAccordion();
    initToggleSwitch()
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
    if (!mapElements.length) {
        console.warn("No map elements found!");
        return;
    }

   
    mapElements.forEach((element) => {
        element.style.cursor = "pointer";
        element.dataset.initialFill = element.style.fill || ""; 
        element.dataset.hovered = "false"; 
    });

    const handleHover = (target, action) => {
        if (target.id?.startsWith("mapsImg")) {
            const idNumber = target.id.replace("mapsImg", "");
            const targetElement = document.querySelector(`.${baseClass}${idNumber}`);

            if (action === "add") {
                targetElement?.classList.add(hoverClass);
                target.style.fill = "#616E46";
                target.dataset.hovered = "true";
                console.log(`Hover added to ${target.id}`);
            } else if (action === "remove") {
                targetElement?.classList.remove(hoverClass);
                target.style.fill = target.dataset.initialFill;
                target.dataset.hovered = "false";
                console.log(`Hover removed from ${target.id}`);
            }
        }
    };

    document.addEventListener("click", (event) => {
        if (window.innerWidth < 3200) {
            const target = event.target;
            if (target.id?.startsWith("mapsImg")) {
                const idNumber = target.id.replace("mapsImg", "");
                const targetElement = document.querySelector(`.${baseClass}${idNumber}`);

                mapElements.forEach((el) => {
                    if (el !== target && el.dataset.hovered === "true") {
                        const relatedElement = document.querySelector(`.${baseClass}${el.id.replace("mapsImg", "")}`);
                        relatedElement?.classList.remove(hoverClass);
                        el.style.fill = el.dataset.initialFill; 
                        el.dataset.hovered = "false";
                    }
                });

                if (target.dataset.hovered === "true") {
                    handleHover(target, "remove");
                } else {
                    handleHover(target, "add");
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
    const modalContent = modal.querySelector(".popup-modal__content");
    const requestButtons = document.querySelectorAll(".request-call");

    if (!modal || !requestButtons.length || !modalContent) return;

    const openModal = () => {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";

        // Добавляем класс для анимации
        setTimeout(() => {
            modalContent.classList.add("show");
        }, 0); // Небольшая задержка для корректной работы transition
    };

    const closeModal = () => {
        // Удаляем класс для анимации
        modalContent.classList.remove("show");

        // Ждем завершения анимации перед скрытием модального окна
        setTimeout(() => {
            modal.style.display = "none";
            document.body.style.overflow = "";
        }, 300); // Длительность transition в CSS
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

// Green coffee
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

// Offer lists
function initializeFilterPopup() {
    const filterButton = document.getElementById('filter');
    const popupOverlay = document.getElementById('filterPopup');
    const closePopupButton = document.getElementById('close-filterPopup');

    if (!filterButton || !popupOverlay || !closePopupButton) {
        return;
    }

    const openPopup = () => {
        popupOverlay.style.display = 'block';
        document.body.classList.add('no-scroll');
    };

    const closePopup = () => {
        popupOverlay.style.display = 'none';
        document.body.classList.remove('no-scroll'); 
    };

    filterButton.addEventListener('click', openPopup);
    closePopupButton.addEventListener('click', closePopup);
    popupOverlay.addEventListener('click', (event) => {
        if (event.target === popupOverlay) {
            closePopup();
        }
    });
}

// Offer lists
function initOfferAccordion() {
    const detailButtons = document.querySelectorAll('.more-detail');
    if (!detailButtons.length) return;

    detailButtons.forEach(button => {
        button.addEventListener('click', function () {
            const offer = this.closest('.offer');
            const details = offer.querySelector('.product-details');
            const main = offer.querySelector('.offer-main');

            details.classList.toggle('expanded');

            main.classList.toggle('expanded');
        });
    });

    const quantityControls = document.querySelectorAll('.quantity-control');
    if (!quantityControls.length) return;

    quantityControls.forEach(control => {
        const input = control.querySelector('.quantity');
        const decreaseButton = control.querySelector('.decrease');
        const increaseButton = control.querySelector('.increase');

        decreaseButton.addEventListener('click', () => {
            let value = parseInt(input.value);
            if (value > 1) {
                input.value = value - 1;
            }
        });

        increaseButton.addEventListener('click', () => {
            let value = parseInt(input.value);
            input.value = value + 1;
        });
    });
}

// Offer lists
function initToggleSwitch() {
    const toggleCheckbox = document.getElementById("toggle-checkbox");
    const toggleLabel = document.getElementById("toggle-label");
    const elementsToToggle = document.querySelectorAll(".offer-header__none");
    const offerContainers = document.querySelectorAll(".offer");

    if (!toggleCheckbox || !toggleLabel || elementsToToggle.length === 0 || offerContainers.length === 0) {
        return;
    }

    // Функция для проверки ширины экрана
    function isMobileScreen() {
        return window.innerWidth < 768;
    }

    // Функция для обновления состояния
    function updateState() {
        if (isMobileScreen()) {
            // Если экран меньше 768px
            elementsToToggle.forEach((element) => {
                element.style.display = toggleCheckbox.checked ? "flex" : "none";
            });
            offerContainers.forEach((offer) => {
                if (toggleCheckbox.checked) {
                    offer.classList.add("active");
                } else {
                    offer.classList.remove("active");
                }
            });
        } else {
            // Если экран больше 768px
            elementsToToggle.forEach((element) => {
                element.style.display = ""; // Сбрасываем стиль
            });
            offerContainers.forEach((offer) => {
                offer.classList.remove("active"); // Убираем класс active
            });
        }
    }

    // Обработчик для переключателя
    function handleToggle() {
        if (isMobileScreen()) {
            elementsToToggle.forEach((element) => {
                element.style.display = toggleCheckbox.checked ? "flex" : "none";
            });
            offerContainers.forEach((offer) => {
                if (toggleCheckbox.checked) {
                    offer.classList.add("active");
                } else {
                    offer.classList.remove("active");
                }
            });

            toggleLabel.textContent = toggleCheckbox.checked ? "Condensed view" : "Expanded view";

            if (!toggleCheckbox.checked) {
                toggleLabel.classList.add("active");
            } else {
                toggleLabel.classList.remove("active");
            }
        }
    }

    // Слушаем события изменения чекбокса и изменения размера окна
    toggleCheckbox.addEventListener("change", handleToggle);
    window.addEventListener("resize", updateState);

    // Изначально обновляем состояние
    updateState();
}
