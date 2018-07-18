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
      console.log('fin')
      cargardatos()
    }
  });

}, false);

 
 var search = document.getElementById("search"),
    news = document.getElementsByTagName("h5"),
    forEach = Array.prototype.forEach;

search.addEventListener("keyup", function(e){
  
    var choice = this.value;
  
    forEach.call(news, function(n){
      console.log(n.innerHTML.toLowerCase());
        if (n.innerHTML.toLowerCase().search(choice.toLowerCase()) == -1)
            n.parentNode.parentNode.style.display = "none";        
        else
            n.parentNode.style.display = "block";        
    });
}, false); 