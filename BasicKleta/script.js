// Product Details 
const database = [
    {}
];


// toggle menu bar 
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

//carousel section
const slides = document.querySelectorAll('.slide-container');
const dots = document.querySelectorAll('.dot');
let currentSlide = 1;

//Javascript for image slider manual navigation
const manualNav = (manual) => {
    slides.forEach((slide) => {
        slide.classList.remove('active');

        dots.forEach((dot) => {
            dot.classList.remove('active');
        });
    });

    slides[manual].classList.add('active');
    dots[manual].classList.add('active');
}

dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        manualNav(i);
        currentSlide = i;
    });
});

//Javascript for image slider automatic navigation
const repeat = function (activeClass) {
    let active = document.getElementsByClassName('active');
    let i = 1;

    let repeater = () => {
        setTimeout(function () {
            [...active].forEach((activeSlide) => {
                activeSlide.classList.remove('active');
            });

            slides[i].classList.add('active');
            dots[i].classList.add('active');
            i++;

            if (slides.length == i) {
                i = 0;
            }
            if (i >= slides.length) {
                return;
            }
            repeater();
        }, 10000);
    }
    repeater();
}
repeat();