document.addEventListener('DOMContentLoaded', () => {

  function cargardatos() {
    $.get("/news",
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

    $("body").on("click", ".button-save-news", e => {
      var path = $(e.currentTarget)
        .prop("value");
      $.ajax({
        contentType: "application/String",
        dataType: "String",
        type: "POST",
        url: `/news/${path}`,
        data: JSON.stringify({ "body": "path" }),
      });
    });
}, false);


