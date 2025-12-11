// Показать еще
/* =================================================================================== */
const btn = document.querySelector(".specoffers__nav-more");
const items = document.querySelectorAll(".specoffers__item.hidden");

btn.addEventListener("click", () => {
    items.forEach(el => el.classList.remove("hidden"));
});

// Выплывающий список
/* =================================================================================== */

const select = document.querySelector('.custom-select');
const selectField = document.querySelector('.custom-select__field');
const selectText = document.querySelector('.custom-select__text');
const dropdown = document.querySelector('.dropdown');
const dropdownItems = document.querySelectorAll('.dropdown__item');

if (dropdownItems.length > 0) {
    selectText.textContent = dropdownItems[0].textContent;
    dropdownItems[0].classList.add('checked');
}

selectField.addEventListener('click', () => {
    dropdown.classList.toggle('show');
    select.classList.toggle('open');
});

dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
        dropdownItems.forEach(i => i.classList.remove('checked'));
        item.classList.add('checked');
        selectText.textContent = item.textContent;

        dropdown.classList.remove('show');
        select.classList.remove('open');

        const category = item.dataset.value;
        if (category) showSlider(category);
    });
});

document.addEventListener('click', e => {
    if (!e.target.closest('.custom-select')) {
        dropdown.classList.remove('show');
        select.classList.remove('open');
    }
});

// Карточки спецпредложения
/* =================================================================================== */

document.querySelectorAll('.specoffers__card').forEach(card => {

    const minusBtn = card.querySelector('.minus');
    const plusBtn = card.querySelector('.plus');
    const valueEl = card.querySelector('.value');

    let value = 1;

    function updateButtonState() {
        if (value === 1) {
            minusBtn.style.color = '#BABABA';
            minusBtn.disabled = true;
        } else {
            minusBtn.style.color = '#111111';
            minusBtn.disabled = false;
        }
    }

    plusBtn.addEventListener('click', () => {
        value++;
        valueEl.textContent = value;
        updateButtonState();
    });

    minusBtn.addEventListener('click', () => {
        if (value > 1) value--;
        valueEl.textContent = value;
        updateButtonState();
    });

    updateButtonState();
});

// Пагинация и категории из выплывающего списка
// ===================================================================================

const globalPrev = document.querySelector('.specoffers__prev');
const globalNext = document.querySelector('.specoffers__next');
const globalPagination = document.querySelector('.specoffers__pagination');

const sliders = document.querySelectorAll('.specoffers__slider');
let swiperInstances = new Map();

function initSlider(container) {
    const prevEl = container.querySelector('.specoffers__prev');
    const nextEl = container.querySelector('.specoffers__next');
    const paginationEl = container.querySelector('.specoffers__pagination');

    const instance = new Swiper(container, {
        slidesPerView: 'auto',
        spaceBetween: 20,

        navigation: {
            nextEl: nextEl || undefined,
            prevEl: prevEl || undefined,
        },

        on: {
            init() {
                updateButtons(this);
                updatePaginationText(this);
            },
            slideChange() {
                updateButtons(this);
                updatePaginationText(this);
            },
            resize() {
                updateButtons(this);
                updatePaginationText(this);
            }
        }
    });

    instance._specPrevEl = prevEl;
    instance._specNextEl = nextEl;
    instance._specPaginationEl = paginationEl;

    return instance;
}

function updateButtons(swiper) {
    const prev = swiper._specPrevEl || (swiper.navigation && swiper.navigation.prevEl);
    const next = swiper._specNextEl || (swiper.navigation && swiper.navigation.nextEl);

    if (!prev || !next) return;

    if (swiper.isBeginning) {
        prev.classList.add('disabled');
    } else {
        prev.classList.remove('disabled');
    }

    if (swiper.isEnd) {
        next.classList.add('disabled');
    } else {
        next.classList.remove('disabled');
    }
}

function updatePaginationText(swiper) {
    const paginationEl = swiper._specPaginationEl || swiper.el.querySelector('.specoffers__pagination');
    if (!paginationEl) return;

    const current = (typeof swiper.realIndex === 'number') ? swiper.realIndex + 1 : 1;
    const total = swiper.slides ? swiper.slides.length : 0;

    paginationEl.textContent = `${current} из ${total}`;
}

function showSlider(category) {
    sliders.forEach(slider => {
        const match = slider.dataset.category === category;

        slider.style.display = match ? 'block' : 'none';

        if (match && !swiperInstances.has(slider)) {
            const inst = initSlider(slider);
            swiperInstances.set(slider, inst);
        }

        if (match && swiperInstances.has(slider)) {
            const inst = swiperInstances.get(slider);
            inst.update();
            updateButtons(inst);
            updatePaginationText(inst);
        }
    });
}

showSlider('popular');

// Кнопка написать отзыв
// ===================================================================================

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".reviews__button");

    btn.addEventListener("click", () => {
        btn.style.display = "none";

        const formWrap = document.createElement("div");
        formWrap.className = "reviews__form";

        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = 150;
        input.placeholder = "Напишите отзыв";
        input.className = "reviews__input";

        const sendBtn = document.createElement("button");
        sendBtn.textContent = "Отправить";
        sendBtn.className = "reviews__send";

        formWrap.appendChild(input);
        formWrap.appendChild(sendBtn);
        btn.parentNode.appendChild(formWrap);

        sendBtn.addEventListener("click", () => {
            const text = input.value.trim();

            if (!text) {
                alert("Введите текст отзыва!");
                return;
            }

            alert("Ваш отзыв отправлен:\n" + text);
            formWrap.remove();
            btn.style.display = "flex";
        });
    });
});

// Кнопка смотреть все фото в секции reviews
// ===================================================================================

document.addEventListener('click', function (e) {
    if (e.target.closest('.reviews__btn-more')) {
        const btn = e.target.closest('.reviews__btn-more');

        const review = btn.closest('.reviews__review');

        if (!review) return;

        review.querySelectorAll('.hidden').forEach(el => {
            el.classList.remove('hidden');
        });
    }
});

// Кнопка показать еще в секции reviews
// ===================================================================================

document.addEventListener("click", function (e) {
    const moreBtn = e.target.closest(".reviews__more");
    if (!moreBtn) return;

    const container = moreBtn.closest(".reviews").querySelector(".reviews__inner");
    if (!container) return;

    container.querySelectorAll(".reviews__review-hidden").forEach(el => {
        el.classList.remove("reviews__review-hidden");
    });
});

// Аккордион
// ===================================================================================

const elements = document.querySelectorAll(".faq-item");

elements.forEach(item => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
        elements.forEach(el => {
            if (el !== item) el.classList.remove("active");
        });

        item.classList.toggle("active");
    });
});

// Кнопка показать еще в секции news
// ===================================================================================

document.addEventListener('DOMContentLoaded', () => {
    const moreBtn = document.querySelector('.news__more');
    const hiddenItems = document.querySelectorAll('.news__item-hidden');

    if (moreBtn) {
        moreBtn.addEventListener('click', () => {
            hiddenItems.forEach(item => {
                item.classList.remove('news__item-hidden');
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const moreBtn = document.querySelector('.news__more');

    if (moreBtn) {
        moreBtn.addEventListener('click', () => {

            const hiddenItems = document.querySelectorAll('.news__item-hidden');

            hiddenItems.forEach(item => {
                item.classList.remove('news__item-hidden');
            });
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    function updateNewsItems() {
        const firstInner = document.querySelector('.news__inner');
        if (!firstInner) return;

        const items = firstInner.querySelectorAll('.news__item');
        if (items.length < 3) return;

        const thirdItem = items[2];

        if (window.innerWidth <= 600) {
            thirdItem.classList.add('news__item-hidden');
        } else {
            thirdItem.classList.remove('news__item-hidden');
        }
    }

    updateNewsItems();

    window.addEventListener('resize', updateNewsItems);
});

// Маска для телефона
// ===================================================================================

const telInputs = document.querySelectorAll('input[type="tel"]')
const im = new Inputmask('+7 (999) 999-99-99')
im.mask(telInputs)

const btnTwo = document.querySelector('.feedback__item:last-child .feedback__button');

btnTwo.addEventListener('click', () => {
    btnTwo.classList.toggle('active');
});

