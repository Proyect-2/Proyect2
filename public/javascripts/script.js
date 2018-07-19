document.addEventListener('DOMContentLoaded', () => {

    function cargardatos() {
        $.get("/:le",
            function (data) {
                if (data != "") {
                    $(".mensaje:last").after(data);
                }
            });
    }

    $(window).scroll(function () {
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
            cargardatos()
        }
    });

}, false);


var search = document.getElementById("search"),
    news = document.getElementsByTagName("h5"),
    forEach = Array.prototype.forEach;

search.addEventListener("keyup", function (e) {

    var choice = this.value;

    forEach.call(news, function (n) {
        console.log(n.innerHTML.toLowerCase());
        if (n.innerHTML.toLowerCase().search(choice.toLowerCase()) == -1)
            n.parentNode.parentNode.style.display = "none";
        else
            n.parentNode.style.display = "block";
    });
}, false);


$("body").on("click", ".button-save-news", e => {
    var path = $(e.currentTarget)
        .prop("value");
    $.ajax({
        contentType: "application/String",
        dataType: "String",
        type: "POST",
        url: `/news/${path}`,
        data: JSON.stringify({
            "body": "path"
        }),
    });    
});

//LOGIN
$('.form').find('input, textarea').on('keyup blur focus', function (e) {

    var $this = $(this),
        label = $this.prev('label');


    if (e.type === 'keyup') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.removeClass('highlight');
        }
    } else if (e.type === 'focus') {

        if ($this.val() === '') {
            label.removeClass('highlight');
        } else if ($this.val() !== '') {
            label.addClass('highlight');
        }
    }

});

$('.tab a').on('click', function (e) {

    e.preventDefault();

    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');

    target = $(this).attr('href');


    $('.tab-content > div').not(target).hide();

    $(target).fadeIn(600);

});