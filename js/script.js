document.addEventListener('DOMContentLoaded', function() {
   
    new WOW().init();
  
    
    document.querySelector('#navbar-toggler').addEventListener('click', function() {
      document.querySelector('.navbar-collapse').style.display = 'block';
      setTimeout(function() {
        document.querySelector('.navbar-collapse').style.display = '';
      }, 400);
    });
  
    
    window.addEventListener('scroll', function() {
      let pos = window.scrollTop();
      if (pos >= 100) {
        document.querySelector('.navbar').classList.add('cng-navbar');
      } else {
        document.querySelector('.navbar').classList.remove('cng-navbar');
      }
    });
  
    document.querySelectorAll('.squads .owl-carousel').forEach(function(element) {
      owlCarousel(element, {
        loop: true,
        margin: 10,
        autoplay: true,
        dots: true,
        nav: false,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 2
          },
          1000: {
            items: 3
          }
        }
      });
    });
  });


// faq
  document.querySelectorAll('.faq-head').forEach(function(element) {
    element.addEventListener('click', function() {
      element.nextElementSibling.classList.toggle('show-faq-content');
      let icon = element.querySelector('span i').getAttribute('class');
      if (icon === 'fas fa-plus') {
        element.querySelector('span').innerHTML = '<i class="fas fa-minus"></i>';
      } else {
        element.querySelector('span').innerHTML = '<i class="fas fa-plus"></i>';
      }
    });
  });