const API = "https://fakestoreapi.com/products";

async function fetchProducts() {
    const res = await fetch(API);
    if (!res.ok) throw new Error("Fetch Error");
    return res.json();
}

function reload(products) {
    const container_products = document.querySelector(".container-products");
    container_products.innerHTML = "";

    for (let i of products) {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${i.image}" alt="${i.title}">
            <h3>${i.title}</h3>
            <p>$${i.price}</p>
            <button class="add-btn">Add to cart</button>
        `;

        const btn = card.querySelector("button");
        btn.addEventListener("click", () => {
            window.dispatchEvent(
                new CustomEvent("add-to-cart", { detail: i })
            );
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push(i);
            localStorage.setItem("cart", JSON.stringify(cart));
        });

        container_products.appendChild(card);
    }
}

fetchProducts().then(reload);
