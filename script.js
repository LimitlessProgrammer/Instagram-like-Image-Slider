const list = document.querySelector('.list');
const items = document.querySelectorAll('.item');
const dots = document.querySelectorAll('.dot');
const thumbnails = document.querySelectorAll('.thumbnails img');
const lightbox = document.querySelector('.lightbox');
const lightboxContent = document.querySelector('.lightbox-content');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeLightbox = document.querySelector('.close');
let currentIndex = 0;
let autoSlideInterval;

// Function to update the carousel view
function updateCarousel(index) {
    const width = items[0].clientWidth;
    list.style.transform = `translateX(-${index * width}px)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

// Next and Previous buttons functionality
document.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel(currentIndex);
});

document.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel(currentIndex);
});

// Autoplay functionality
function startAutoplay() {
    autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel(currentIndex);
    }, 3000); // Change slide every 3 seconds
}

function stopAutoplay() {
    clearInterval(autoSlideInterval);
}

// Start autoplay when the page loads
startAutoplay();

// Pause autoplay on hover
document.querySelector('.carousel').addEventListener('mouseover', stopAutoplay);
document.querySelector('.carousel').addEventListener('mouseout', startAutoplay);

// Dots functionality (click on dots to navigate)
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel(currentIndex);
    });
});

// Thumbnail functionality (click on thumbnails to navigate)
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', (e) => {
        currentIndex = parseInt(e.target.getAttribute('data-index'));
        updateCarousel(currentIndex);
    });
});

// Lightbox functionality
items.forEach((item, index) => {
    item.querySelector('img').addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxContent.src = item.querySelector('img').getAttribute('data-src');
        lightboxCaption.textContent = item.querySelector('.caption').textContent;
    });
});

closeLightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Swipe Gesture Support
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.carousel').addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.carousel').addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX) {
        currentIndex = (currentIndex + 1) % items.length;
    } else if (touchEndX > touchStartX) {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
    }
    updateCarousel(currentIndex);
}

// Keyboard Navigation
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel(currentIndex);
    } else if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel(currentIndex);
    }
});
