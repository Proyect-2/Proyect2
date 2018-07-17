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


}, false);