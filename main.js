$(window).on("load", function () {
  $(".loader-wrapper").fadeOut("slow");
  $("html").css("overflow", "inherit");
  $("body").css("overflow-y", "scroll");
})

$(document).ready(function () {

  $('.carousel').carousel({
    interval: 3000
  });

  $('.carousel').carousel('cycle');

  const TypeWriter = function (txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  // Type Method
  TypeWriter.prototype.type = function () {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fulltxt = this.words[current];
    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fulltxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fulltxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fulltxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move on to the next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }

  init();

  // Init App
  function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    //Init TypeWriter
    new TypeWriter(txtElement, words, wait);
  }

  //This smooth scroll function comes from the answer to this thread
  //https://stackoverflow.com/questions/7717527/smooth-scrolling-when-clicking-an-anchor-link
  //and has been modified
  let isScrolling = false;
  $(document).on('click', 'a[href^="#"]', function (event) {
    if (isScrolling == false) {
      isScrolling = true;
      event.preventDefault();
      $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
      }, 800);
      setTimeout(function () {
        isScrolling = false;
      }, 800)
    }
  });
});