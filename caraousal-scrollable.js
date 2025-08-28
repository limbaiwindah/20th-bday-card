const carouselInner = document.querySelector('.carousel-inner');

let isDragging = false;
let startX;
let scrollLeft;
let velocity = 0;
let animationFrame;

// Pause animation function
function pauseAutoScroll() {
  carouselInner.style.animationPlayState = 'paused';
}

// Resume animation function
function resumeAutoScroll() {
  carouselInner.style.animationPlayState = 'running';
}

// Drag start
carouselInner.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - carouselInner.offsetLeft;
  scrollLeft = carouselInner.scrollLeft;
  velocity = 0;
  pauseAutoScroll();
  cancelAnimationFrame(animationFrame);
});

carouselInner.addEventListener('mouseleave', () => {
  if (isDragging) isDragging = false;
  flickMomentum();
});

carouselInner.addEventListener('mouseup', () => {
  if (isDragging) isDragging = false;
  flickMomentum();
});

// Dragging
carouselInner.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - carouselInner.offsetLeft;
  const walk = (x - startX);
  velocity = walk; // save last movement
  carouselInner.scrollLeft = scrollLeft - walk;
});

// Momentum scroll after drag
function flickMomentum() {
  if (Math.abs(velocity) < 0.5) {
    // small velocity, resume auto-scroll
    resumeAutoScroll();
    return;
  }
  velocity *= 0.95; // friction
  carouselInner.scrollLeft -= velocity;
  animationFrame = requestAnimationFrame(flickMomentum);
}

// Optional: enable touch events for desktop + mobile
carouselInner.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].pageX - carouselInner.offsetLeft;
  scrollLeft = carouselInner.scrollLeft;
  velocity = 0;
  pauseAutoScroll();
  cancelAnimationFrame(animationFrame);
});

carouselInner.addEventListener('touchend', () => {
  if (isDragging) isDragging = false;
  flickMomentum();
});

carouselInner.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const x = e.touches[0].pageX - carouselInner.offsetLeft;
  const walk = (x - startX);
  velocity = walk;
  carouselInner.scrollLeft = scrollLeft - walk;
});
