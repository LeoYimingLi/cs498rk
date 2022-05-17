/* Your JS here. */
// console.log('Hello World!');

/* Carousel */
var slideIndex = 1;
showSlides(slideIndex);

function plusSlide(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}

var arrow1 = document.getElementById("arrow1");
var arrow2 = document.getElementById("arrow2");
arrow1.onclick = function() {
    plusSlide(-1);
}
arrow2.onclick = function() {
    plusSlide(1);
}





/* resize: navbar's padding + logo's font size */
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    mouse_height = document.documentElement.scrollTop;
    if (mouse_height > 25) {
        document.getElementById("navbar").style.padding = "10px 10px";
        document.getElementById("logo").style.fontSize = "25px";
    } else {
        document.getElementById("navbar").style.padding = "50px 10px";
        document.getElementById("logo").style.fontSize = "35px";
    }

    document.getElementById("node1").classList.remove("active");
    document.getElementById("node2").classList.remove("active");
    document.getElementById("node3").classList.remove("active");
    var padding_value = 70; 
    // get the height of sections
    var h0 = document.getElementById("title0").clientHeight - padding_value;
    var h1 = h0 + document.getElementById("title1").clientHeight - padding_value;
    var h2 = h1 + document.getElementById("title2").clientHeight;
    var h3 = h2 + document.getElementById("title3").clientHeight;
    if (mouse_height > h0) {  // make the navbar highlight according to the position of mouse 
        if (mouse_height < h1) {
            document.getElementById("node1").classList.add("active");
        } else if (mouse_height < h2) {
            document.getElementById("node2").classList.add("active");
        } else if (mouse_height < h3) {
            document.getElementById("node3").classList.add("active");
        } 
    }   
}





/* modal */
var item1 = document.getElementById('item1');
var item2 = document.getElementById('item2');
var item3 = document.getElementById('item3');

var modal1 = document.getElementById('modal1');
var modal2 = document.getElementById('modal2');
var modal3 = document.getElementById('modal3');

var close1 = document.getElementById("close1");
var close2 = document.getElementById("close2");
var close3 = document.getElementById("close3");
// when the user clicks on the modal(icon), show the bigger image;
item1.onclick = function(){
    modal1.style.display = "block";
}
item2.onclick = function(){
    modal2.style.display = "block";
}
item3.onclick = function(){
    modal3.style.display = "block";
}
// When the user clicks on botton (x), close the modal
close1.onclick = function() {
    modal1.style.display = "none";
}
close2.onclick = function() {
    modal2.style.display = "none";
}
close3.onclick = function() {
    modal3.style.display = "none";
}
