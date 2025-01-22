// const { name } = require("browser-sync");

$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 1000,
        // adaptiveHeight: true,
        prevArrow: `<button type="button" class="slick-prev"><img src="icons/chevron-left-solid.png"></button>`,
        nextArrow: `<button type="button" class="slick-next"><img src="icons/chevron-right-solid.png"></button>`,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    // $(`.catalog-item__link`).each(function (i) {
    //     $(this).on(`click`, function (e) {
    //         e.preventDefault();
    //         $(`.catalog-item__content`).eq(i).toggleClass(`catalog-item__content_active`);
    //         $(`.catalog-item__list`).eq(i).toggleClass(`catalog-item__list_active`);
    //     })
    // });

    // $(`.catalog-item__back`).each(function (i) {
    //     $(this).on(`click`, function (e) {
    //         e.preventDefault();
    //         $(`.catalog-item__content`).eq(i).toggleClass(`catalog-item__content_active`);
    //         $(`.catalog-item__list`).eq(i).toggleClass(`catalog-item__list_active`);
    //     })
    // });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on(`click`, function (e) {
                e.preventDefault();
                $(`.catalog-item__content`).eq(i).toggleClass(`catalog-item__content_active`);
                $(`.catalog-item__list`).eq(i).toggleClass(`catalog-item__list_active`);
            })
        });
    };

    toggleSlide(`.catalog-item__link`);
    toggleSlide(`.catalog-item__back`);

    // Modal

    $(`[data-modal=consultation]`).on(`click`, function () {
        $(`.overlay, #consultation`).fadeIn(`slow`);
    });
    $(`.modal__close`).on(`click`, function () {
        $(`.overlay, #consultation, #thanks, #order`).fadeOut(`slow`)
    });

    // $(`.button_mini`).on(`click`, function () {
    //     $(`.overlay, #order`).fadeIn(`slow`);
    // });

    $(`.button_mini`).each(function (i) {
        $(this).on(`click`, function () {
            $(`#order .modal__descr`).text($(`.catalog-item__subtitle`).eq(i).text())
            $(`.overlay, #order`).fadeIn(`slow`);
        });
    });

    // Forms

    function valideForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите своё имя",
                    minlength: jQuery.validator.format("Введите минимум {0} символа!")
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введён адрес почты"
                }
            }
        });
    };

    valideForms(`#consultation-form`);
    valideForms(`#consultation form`);
    valideForms(`#order form`);

    $(`input[name=phone]`).mask("+38(999) 999-9999");

    $(`form`).submit(function (e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            URL: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $(`#consultation, #order`).fadeOut();
            $(`.overlay, #thanks`).fadeIn(`slow`);

            $(`form`).trigger(`reset`);
        });
        return false;
    });

    //smooth scroll and pageup

    $(window).scroll(function () {
        if ($(this).scrollTop() > 1600) {
            $(`.pageup`).fadeIn();
        } else {
            $(`.pageup`).fadeOut
        }
    });

    const $page = $('html, body');
    $('a[href*=#up]').click(function () {
        $page.animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 700);
        return false;
    });

    new WOW().init();
});