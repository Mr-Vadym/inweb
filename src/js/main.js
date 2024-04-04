jQuery(function () {
    $(".burger-btn, .sidebar__close, .overlay").on("click", function (event) {
        event.preventDefault(); // Запобігаємо перезавантаженню сторінки при натисканні на кнопку
        $(".sidebar").toggleClass("active"); // Перемикаємо клас 'active' для '.search'
        $(".header").toggleClass("active"); // Перемикаємо клас 'active' для '.search'
        $(".burger-btn").toggleClass("active"); // Перемикаємо клас 'active' для '.search'
        $("body").toggleClass("locked"); // Перемикаємо клас 'active' для '.search'
        $(".search").removeClass("active"); // Перемикаємо клас 'active' для '.search'
    }); // Додавання обробників подій для кнопок '.search-btn' та '.close'

    $(".search-btn, .search__close").on("click", function (event) {
        event.preventDefault(); // Запобігаємо перезавантаженню сторінки при натисканні на кнопку
        $(".search").toggleClass("active"); // Перемикаємо клас 'active' для '.search'
        $(".sidebar").removeClass("active"); // Перемикаємо клас 'active' для '.search'

        // Викликаємо функцію з фокусом після завершення анімації
        $(".search").one("transitionend", function () {
            if ($(this).hasClass("active")) {
                $(this).find(".search__type").focus();
            }
        });
    });

    $(".more-slider__articles").slick({
        infinite: true,
        dots: false,
        speed: 700,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1310,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    arrows: false,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    arrows: false,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,

                }
            }

        ]
    });
});

