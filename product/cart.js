// js/cart.js

export let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Sauvegarder panier
export function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Ajouter produit au panier
export function addToCart(product, quantity = 1) {

  let existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
      quantity: quantity
    });
  }

  saveCart();
}

// Re-render panier (optionnel)
export function renderCart() {
  saveCart();
  console.log("Panier actuel :", cart);
}