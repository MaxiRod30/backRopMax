document.addEventListener('DOMContentLoaded', function () {
    const currentURL = window.location.pathname;
    const products = document.getElementById('products');
    const principal = document.getElementById('principal');
    const cart = document.getElementById('cart');
    const chat = document.getElementById('chat');
    const realTimeProducts = document.getElementById('realTimeProducts');

    if (currentURL == '/products/') {
        products.classList.add('clicked');
    } 
    else if (currentURL == '/') {
        principal.classList.add('clicked');
    } 
    else if (currentURL == '/cart') {
        cart.classList.add('clicked');
    }
    else if (currentURL == '/chat') {
        chat.classList.add('clicked');
    }
    else if (currentURL == '/realTimeProducts') {
        realTimeProducts.classList.add('clicked');
    }else{
        principal.classList.add('clicked');
    }
    
});
