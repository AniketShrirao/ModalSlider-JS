/* Author: Aniket*/

// Get Elements Required for Modal
var html = document.querySelector('html');
var Posts = document.querySelectorAll('.posts li');
var Modal = document.querySelector('.posts-slider');
var imageinsideModal = document.querySelector('.modalSlider img');
var close = document.createElement('span');

// Modal Function started
function ModalSlider(html,Posts,Modal,imageinsideModal,close) {
  // Hide Modal At First
  var postarray = Array.from(Posts);
  // Append Close Button to the Modal Dynamically
  Modal.appendChild(close);
  close.classList.add('close');
  // Add click function to every post
  for (var post in postarray) {
    postarray[post].addEventListener('click',openModal);
  }

  // openModal Function started
  function openModal(){
    // Get Current image/Post & source on click
    var currentImg = this.children[0].children[0];
    var url = currentImg.src; 
    // stop background scroll
    html.classList.add('noscroll');
    // make Modal appear
    Modal.classList.add('show');
    // add current image path to Modal image 
    imageinsideModal.setAttribute('src',url);
    if(Modal.classList.contains('show')) {
      // carousel utility function called
      SliderCarousel(slider,btns,slides,dots);
    }
  };
  // Close Modal Function
  function closeModal(){
    Modal.classList.remove('show');
    html.classList.remove('noscroll');
  };
  // Calling close Modal function on close button click 
  close.addEventListener('click',closeModal);
  // Calling close Modal function on Background of Modal click
  Modal.addEventListener('click',function(e){
    if (e.target.classList.contains("posts-slider")) {
      Modal.classList.remove('show');
      html.classList.remove('noscroll');
    }
  });
}
// Calling Modal Function
ModalSlider(html,Posts,Modal,imageinsideModal,close);

// Slider Container
var slider = document.querySelector(".modalSlider");
// Control Buttons
var btns = document.querySelectorAll(".btn");
// Slides/Images
var slides = document.querySelectorAll(".slide figure");
// Carousel Dots
var dots = document.querySelectorAll('.dot');

// carousel utility function
function SliderCarousel(slider,btns,slides,dots) {
	var index = 1;
	var dotIndex = 0;
	var size = slides[index].clientWidth;

// To transition the slides
	function slide() {
		slider.classList.remove('transition-inactive');		
		slider.classList.add('transition-active');
		update();
	}

	// To translate the slides
	function update() {
		slider.style.transform = "translateX("+ (-size * index) +"px)";
		// to make current Carousel dot active
		dots.forEach(function(dot) {
			dot.classList.remove('dot-active');
		});
		dots[dotIndex].classList.add('dot-active');
	}
	update();

	// change the index of carousel dots based on current slide
	function ChangeDotOnBtn() {
		if(this.id === "prev") {
			if(index <= 0) {
				return;
			}
			index--;
			if(dotIndex === 0){
				dotIndex = 4;
			}
			else {
				dotIndex--;
			}
		}
		else {
			if(index === slides.length-1 ) {
				return;
			}
			index++;
			if(dotIndex === 4) {
				dotIndex = 0;
			}
			else {
				dotIndex++;
			}
		}
		slide();
	}

	// get the dots current value from data-attribute
	function dotChange() {
		let i = Number(this.getAttribute('dot-index'));
		dotIndex = i;
		index = i + 1;
		slide();
	}

	// cloning of first and last slide to give slider effect at the end of every transition
	slider.addEventListener('transitionend', function() {
		if(slides[index].parentNode.id === "first") {
			slider.classList.add('transition-inactive');		
			slider.classList.remove('transition-active');
			index = slides.length - 2;
			slider.style.transform = "translateX("+ (-size * index) +"px)";
		}
		else if(slides[index].parentNode.id === "last") {
			slider.classList.add('transition-inactive');		
			slider.classList.remove('transition-active');
			index = 1;
			slider.style.transform = "translateX("+ (-size * index) +"px)";
		}
	})
	// Events assigned to the Control buttons
	btns.forEach( function(btn) {
		btn.addEventListener('click', ChangeDotOnBtn);
	});
	// Events assigned to the Carousel dots
	dots.forEach(function(dot) {
		dot.addEventListener('click', dotChange);
	});
}
