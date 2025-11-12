// ------------------- DOM Elements -------------------
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const closeBtn = document.querySelector(".close-btn");
const overlay = document.querySelector(".overlay");
const slider = document.querySelector(".slider");
const titleEl = document.querySelector(".description .title");
const contentEl = document.querySelector(".description .content");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let currentSlide = 0;
const slides = [
  {
    mobileImage: "./images/mobile-image-hero-1.jpg",
    desktopImage: "./images/desktop-image-hero-1.jpg",
    title: "Discover innovative ways to decorate",
    content:
      "We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.",
  },
  {
    mobileImage: "./images/mobile-image-hero-2.jpg",
    desktopImage: "./images/desktop-image-hero-2.jpg",
    title: "We are available all across the globe",
    content:
      "With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.",
  },
  {
    mobileImage: "./images/mobile-image-hero-3.jpg",
    desktopImage: "./images/desktop-image-hero-3.jpg",
    title: "Manufactured with the best materials",
    content:
      "Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.",
  },
];

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ------------------- Preload images -------------------
slides.forEach((slide) => {
  new Image().src = slide.mobileImage;
  new Image().src = slide.desktopImage;
});

// ------------------- Menu -------------------
function openMenu() {
  mobileNav.style.transform = "translateX(0)";
  overlay.style.display = "block";
}

function closeMenu() {
  mobileNav.style.transform = "translateX(-100%)";
  overlay.style.display = "none";
}

menuToggle.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

// ------------------- Helper: Get Image By Screen Size -------------------
function getActiveImage(slide) {
  return window.innerWidth < 768 ? slide.mobileImage : slide.desktopImage;
}

// ------------------- Show Slide -------------------
function showSlide(index) {
  const slide = slides[index];
  const imageUrl = getActiveImage(slide);

  slider.classList.add("is-fading");
  titleEl.classList.add("is-fading");
  contentEl.classList.add("is-fading");

  setTimeout(() => {
    slider.style.backgroundImage = `url('${imageUrl}')`;
    titleEl.textContent = slide.title;
    contentEl.textContent = slide.content;

    slider.classList.remove("is-fading");
    titleEl.classList.remove("is-fading");
    contentEl.classList.remove("is-fading");
  }, 400);
}

// ------------------- Init Slide -------------------

function initSlide(index) {
  const slide = slides[index];
  const imageUrl = getActiveImage(slide);

  slider.style.backgroundImage = `url('${imageUrl}')`;
  titleEl.textContent = slide.title;
  contentEl.textContent = slide.content;

  slider.style.opacity = 1;
  titleEl.style.opacity = 1;
  contentEl.style.opacity = 1;
}

// ------------------- Initial Load -------------------
initSlide(currentSlide);

// ------------------- Navigation -------------------
prevBtn.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

nextBtn.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

// ------------------- Initial Load -------------------
initSlide(currentSlide);

// ------------------- Update on resize -------------------
const debouncedResize = debounce(() => {

  const slide = slides[currentSlide];
  const newImageUrl = getActiveImage(slide);

  if (!slider.style.backgroundImage.includes(newImageUrl)) {
    showSlide(currentSlide);
  }
}, 250);

window.addEventListener("resize", debouncedResize);
