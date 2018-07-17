document.addEventListener('DOMContentLoaded', () => {

  console.log('entra')

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
      console.log('fin')
      cargardatos()
    }
  });


}, false);