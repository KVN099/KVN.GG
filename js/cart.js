
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCounter() {
    const cartCounter = document.querySelector(".badge");
    if (cartCounter) {
        cartCounter.textContent = cart.length;
    }
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(event) {
    const button = event.target;
    const productCard = button.closest(".product-card");
    const title = productCard.querySelector(".product-title").textContent;
    const priceText = productCard.querySelector(".product-price").textContent.replace("LKR ", "").replace(",", "");
    const price = parseFloat(priceText) || 0; 
    const image = productCard.querySelector(".product-image").src;

    const item = { title, price, image };

    cart.push(item);
    saveCart();
    updateCartCounter();
}

function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = ""; 
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-cart">Your cart is empty</p>`;
    } else {
        cart.forEach((item, index) => {
            
            const itemPrice = item.price ? parseFloat(item.price) : 0;
            total += itemPrice;

            const cartItem = document.createElement("li");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="item-details">
                    <p class="item-title">${item.title}</p>
                    <p class="item-price">LKR ${itemPrice.toLocaleString()}</p>
                </div>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    totalPriceElement.textContent = `LKR ${total.toLocaleString()}`;
}

function removeFromCart(event) {
    if (!event.target.classList.contains("remove-item")) return;

    const index = event.target.dataset.index;
    cart.splice(index, 1);
    saveCart();
    renderCart();
    updateCartCounter();
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", addToCart);
    });

    updateCartCounter();

    if (document.getElementById("cart-items")) {
        renderCart();
        document.getElementById("cart-items").addEventListener("click", removeFromCart);
    }
});
