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