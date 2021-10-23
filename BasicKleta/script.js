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



//Add to cart functionalities
//variables
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-btn');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');

//Cart
let cart = [];

// Getting the products
class Products {
    async getProduct() {
        try {
            let result = fetch('products.json');
            let data = await (await result).json();
            let products = data.items;

            // iterate through the item
            // deconstruct the item
            products = products.map(item => {
                //ES6 Destructuring 
                const { title, price } = item.fields;
                const { id } = item.sys;

                // different due to contenful
                const image = item.fields.image.fields.file.url;

                return { title, price, id, image };
            });

            return products;
        } catch (error) {
            console.log(error);
        }
    }
}

// display products
class UI {
    displayProducts(products) {
        // console.log(products);
        let result = "";
        products.forEach(product => {
            result +=
                ` 
            <article class="product">
                <div class="img-container">
                    <img src=${product.image} alt="product-1" class="product-img">
                    <button class="bag-btn" data-id=${product.id}><i class="fas fa-shopping-cart"></i>add to cart</button>
                </div>
                <h3>${product.title}</h3>
                <h4>₱${product.price.toLocaleString()}</h4>
            </article> 
            `;
        });
        productsDOM.innerHTML = result;
    }
}

// local storage
class Storage {

}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();

    // get all products
    products.getProduct().then(products => ui.displayProducts(products));
})