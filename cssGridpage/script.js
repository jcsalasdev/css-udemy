

const list = document.querySelector(".gallery-carousel_img-list");
const imgs = Array.from(list.children);
const nextButton = document.querySelector(".gallery-carousel_btn--right");
const prevButton = document.querySelector(".gallery-carousel_btn--left");
const carouselNav = document.querySelector(".gallery-carousel_nav");
const dots = Array.from(carouselNav.children);


const imgWidth = imgs[0].getBoundingClientRect().width;

const setImgPosition = (img, index) => {
    img.style.left = imgWidth * index + "px";
};
imgs.forEach(setImgPosition);

const moveToImg = (list, currentImg, targetImg) => {
    list.style.transform = "translateX(-" + targetImg.style.left + ")";

    currentImg.classList.remove("current--img");
    targetImg.classList.add("current--img");
};

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove("current--img");
    targetDot.classList.add("current--img");
    };

nextButton.addEventListener("click", (e) => {
    const currentImg = list.querySelector(".current--img");
    const nextImg = currentImg.nextElementSibling;

    moveToImg(list, currentImg, nextImg);
});

prevButton.addEventListener("click", (e) => {
    const currentImg = list.querySelector(".current--img");
    const prevImg = currentImg.previousElementSibling;

    moveToImg(list, currentImg, prevImg);
});

carouselNav.addEventListener("click", (e) => {
    const targetDot = e.target.closest("button");
    if (!targetDot) return;

    const currentImg = list.querySelector(".current--img");
    const currentDot = carouselNav.querySelector(".current--img");
    const targetIndex = dots.findIndex((dot) => dot === targetDot);
    const targetImg = imgs[targetIndex];

    moveToImg(list, currentImg, targetImg);
    updateDots(currentDot, targetDot)
});
