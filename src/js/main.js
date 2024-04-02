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

        // normal options...

        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        // variableWidth: true,

        // the magic
        responsive: [{

            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                infinite: true
            }

        }, {

            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                dots: true
            }

        }, {

            breakpoint: 300,
            settings: "unslick" // destroys slick

        }]
    });
});
