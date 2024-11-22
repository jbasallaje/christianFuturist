let currentIndex = 0;
let totalItems;
let visibleItemsCount = 0;
let itemWidth = 0;

function initCarousel() {
  const items = document.querySelectorAll('.carousel-item');
  totalItems = items.length;

  // Initialize item width and visible item count
  calculateVisibleItems();

  // Set initial position of the carousel
  updateCarouselPosition();

  // Listen for window resize to recalculate visible items
  window.addEventListener('resize', calculateVisibleItems);
}

function calculateVisibleItems() {
  const carousel = document.querySelector('.carousel');
  const item = document.querySelector('.carousel-item');

  // Calculate the width of each item
  itemWidth = item.offsetWidth;

  // Calculate how many items fit within the carousel's width
  const carouselWidth = carousel.offsetWidth;
  visibleItemsCount = Math.floor(carouselWidth / itemWidth);

  // console.log(`Visible items: ${visibleItemsCount}`);
}

function moveSlide(direction) {
  const items = document.querySelectorAll('.carousel-item');
  const carouselTrack = document.querySelector('.carousel-track');

  currentIndex += direction;

  // Loop back to the first item after reaching the last item
  if (currentIndex >= totalItems - visibleItemsCount + 1) {
    currentIndex = 0;
  }

  // Loop to the last item when going to the previous item from the first
  if (currentIndex < 0) {
    currentIndex = totalItems - visibleItemsCount;
  }

  // Update the position
  updateCarouselPosition();
}

function updateCarouselPosition() {
  const carouselTrack = document.querySelector('.carousel-track');
  const offset = -(currentIndex * itemWidth); // Move the track based on the current index
  carouselTrack.style.transform = `translateX(${offset}px)`;
}

document.addEventListener('DOMContentLoaded', initCarousel);

let slideIndex = 0;
function showSlides() {
  const slides = document.querySelectorAll('.carousel-item-mobile');
  slides.forEach((slide, index) => { slide.style.transform = `translateX(${-slideIndex * 100}%)`; });
}
function nextSlide() {
  const slides = document.querySelectorAll('.carousel-item-mobile');
  slideIndex = (slideIndex + 1) % slides.length;
  showSlides();
}
function prevSlide() {
  const slides = document.querySelectorAll('.carousel-item-mobile');
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlides();

}
document.addEventListener('DOMContentLoaded', showSlides);

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navRight = document.getElementById('nav-right');
  const toggleMenu = () => {
    navRight.classList.toggle('active');
  };
  const closeMenu = (event) => {
    if (!navRight.contains(event.target) && !menuToggle.contains(event.target)) {
      navRight.classList.remove('active');
    }
  };
  menuToggle.addEventListener('click', toggleMenu);
  document.addEventListener('click', closeMenu); // Close the menu when a menu item is clicked 
  const menuItems = navRight.querySelectorAll('a');
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      navRight.classList.remove('active');
    });
  });
});

function scrollToVisibleSection() {
  const menuToggle = document.getElementById('menu-toggle');
  const navRight = document.getElementById('nav-right');
  const closeMenu = (event) => {
    if (!menuToggle.contains(event.target)) {
      navRight.classList.remove('active');
    }
  };

  const desktopSection = document.getElementById('conversations-desktop');
  const mobileSection = document.getElementById('conversations-mobile');

  if (window.getComputedStyle(desktopSection).display !== 'none') {
    desktopSection.scrollIntoView({ behavior: 'auto' });
  } else if (window.getComputedStyle(mobileSection).display !== 'none') {
    mobileSection.scrollIntoView({ behavior: 'auto' });
  }

  document.addEventListener('click', closeMenu);
}

// Check for URL parameter and scroll to the correct section 
const urlParams = new URLSearchParams(window.location.search);
const section = urlParams.get('section');
if (section === 'conversations') {
  scrollToVisibleSection();
}
