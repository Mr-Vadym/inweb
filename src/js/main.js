jQuery(function () {
    // Додавання обробників подій для кнопок '.search-btn' та '.close'
    $(".search-btn, .close").on("click", function (event) {
        event.preventDefault(); // Запобігаємо перезавантаженню сторінки при натисканні на кнопку
        $(".search").toggleClass("active"); // Перемикаємо клас 'active' для '.search'

        // Викликаємо функцію з фокусом після завершення анімації
        $(".search").one("transitionend", function () {
            if ($(this).hasClass("active")) {
                $(this).find(".search__type").focus();
            }
        });
    });

  
});



