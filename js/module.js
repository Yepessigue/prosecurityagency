// myModule.js
let cart = [];
let products = {};
let currentCategory = "";

let allProducts = [];
let currentIndex = 0;
const itemsPerPage = 12;

let col = document.createElement('div');
col.className = 'col-6 col-lg-2 mb-4';
var firebaseConfig = {
  apiKey: "AIzaSyBiohw97qpDetAfk8ffvAmWcEJeqRzuT9Q",
    authDomain: "istmarchegouro.firebaseapp.com",
    databaseURL: "https://istmarchegouro-default-rtdb.firebaseio.com",
    projectId: "istmarchegouro",
    storageBucket: "istmarchegouro.appspot.com",
    messagingSenderId: "929248422215",
    appId: "1:929248422215:web:892622df425bc69e2d8462",
    measurementId: "G-FZWHW8KVHV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/*
export function handleClick1() {

  firebase.database().ref('attieke/').once('value').then(function(snapshot) {

    const posts_div = document.getElementById('posts');
    posts_div.innerHTML = "";

    const data = snapshot.val();
    products = data;
    console.log(products);

    for (let [key, value] of Object.entries(data)) {

      // colonne bootstrap
      let col = document.createElement('div');
      col.className = col.className = 'col-6 col-lg-2 mb-4';

      col.innerHTML = `
        <div class="card h-100">
          
          <img src="${value.imageURL}" class="card-img-top" alt="${value.productname}">

          <div class="card-body d-flex flex-column">

            <h5 class="card-title" style="margin-bottom:5px;">
              ${value.productname}
            </h5>

            <p class="card-text" style="margin-bottom:5px;">
              ${value.detail}
            </p>

            <!-- étoiles -->
            <div class="star-rating" style="margin-bottom:5px;">
              <span style="color: gold;">★</span>
              <span style="color: gold;">★</span>
              <span style="color: gold;">★</span>
              <span style="color: gold;">★</span>
              <span style="color: lightgray;">★</span>
            </div>

            <p class="card-text" style="margin-bottom:5px;">
              ${value.montant_actuel} TL
            </p>

            <p class="card-text text-muted" style="margin-bottom:10px;">
              prix panier ${value.montant_panier || value.montant_actuel} TL
            </p>

            <!-- quantité -->
            <div class="d-flex justify-content-center align-items-center mb-2">
              <button type="button" class="btn btn-sm btn-outline-secondary quantity-btn" data-value="-">-</button>
              <span class="mx-2 quantity-value">1</span>
              <button type="button" class="btn btn-sm btn-outline-secondary quantity-btn" data-value="+">+</button>
            </div>

            <!-- bouton -->
            <button type="button"
              class="btn btn-primaryy mt-auto order-btn"
              id="${key}">
              J'ajouter au panier
            </button>

          </div>
        </div>
      `;

      posts_div.appendChild(col);

      /* =======================
         LOGIQUE JS (inchangée)
      ======================= */
/*
      const quantityValue = col.querySelector(".quantity-value");
      const quantityButtons = col.querySelectorAll(".quantity-btn");
      const orderButton = col.querySelector(".order-btn");

      quantityButtons.forEach(btn => {
        btn.addEventListener("click", () => {
          let inc = btn.dataset.value === "+" ? 1 : -1;
          let qty = parseInt(quantityValue.textContent, 10);
          if (qty + inc >= 1) {
            quantityValue.textContent = qty + inc;
          }
        });
      });

     orderButton = col.querySelector(".add-btn");

orderButton.addEventListener("click", function() {

  const quantity = parseInt(quantityValue.textContent);

  const productData = {
    id: this.dataset.id,
    name: value.productname,
    detail: value.detail,
    price: Number(value.montant_actuel),
    image: value.imageURL,
    quantity: quantity
  };


});


    }
  });
}
*/


//----------------------------------------

export function ManageAllButtonClick(path) {

  currentCategory = path; // 🔥 stocke la catégorie

  firebase.database().ref(path).once('value').then(function(snapshot) {

    const data = snapshot.val();

    allProducts = Object.entries(data);

    currentIndex = 0;

    renderProducts();

  });

}
/*
export function ManageAllButtonClick(path) {

  firebase.database().ref(path).once('value').then(function(snapshot) {

    const data = snapshot.val();

    allProducts = Object.entries(data);

    currentIndex = 0;

    renderProducts();

  });

}
*/
/*
export function ManageAllButtonClick() {

  firebase.database().ref('pergola/').once('value').then(function(snapshot) {

    const data = snapshot.val();

    // 🔥 Stocker tous les produits
    allProducts = Object.entries(data);

    currentIndex = 0; // reset pagination

    renderProducts(); // afficher les 12 premiers

  });

}

*/


//---------------------------------------ACCUEIL-----------------------------------------

export function Accueil() {

  firebase.database().ref('prosecaccueil/').once('value').then(function(snapshot) {

    const data = snapshot.val();

    // 🔥 Stocker tous les produits
    allProducts = Object.entries(data);

    currentIndex = 0; // reset pagination

    renderProducts(); // afficher les 12 premiers

  });

}


/*
export function Accueil() {

  firebase.database().ref('accueil/').once('value').then(function(snapshot) {

    const posts_div = document.getElementById('posts');
    posts_div.innerHTML = "";

    const data = snapshot.val();
    console.log(data);

    for (let [key, value] of Object.entries(data)) {

      let col = document.createElement('div');
     col.className = 'col-6 col-lg-2 mb-4';

      col.innerHTML = `
<div class="product-card">

  <img src="${value.imageURL}" class="product-img" alt="${value.productname}">

  <div class="product-content">

    <h5 class="product-title">${value.productname}</h5>
    <div class="product-detail">${value.detail}</div>

    <div class="stars">
      ★ ★ ★ ★ <span class="star-gray">★</span>
    </div>

    <div class="price">${value.montant_actuel} TL</div>

    <div class="price-cart">
      prix panier ${value.montant_panier || value.montant_actuel} TL
    </div>

    <div class="quantity-box">
      <button class="qty-btn minus">−</button>
      <span class="quantity-value">1</span>
      <button class="qty-btn plus">+</button>
    </div>

   <button class="add-btn" data-id="${key}">
  <i class="bi bi-cart-plus"></i>
   Ajoutez
</button>
  </div>
</div>
`;

      posts_div.appendChild(col);

      // ===== GESTION QUANTITÉ =====
      const quantityValue = col.querySelector(".quantity-value");
      const plusBtn = col.querySelector(".plus");
      const minusBtn = col.querySelector(".minus");

      plusBtn.addEventListener("click", () => {
        quantityValue.textContent = parseInt(quantityValue.textContent) + 1;
      });

      minusBtn.addEventListener("click", () => {
        let qty = parseInt(quantityValue.textContent);
        if (qty > 1) {
          quantityValue.textContent = qty - 1;
        }
      });

      // ===== AJOUT AU PANIER =====
      const addBtn = col.querySelector(".add-btn");

    addBtn.addEventListener("click", () => {

  const quantity = parseInt(quantityValue.textContent);

  let existing = cart.find(item => item.id === key);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: key,
      name: value.productname,
      price: Number(value.montant_actuel), // 🔥 IMPORTANT
      image: value.imageURL,
      quantity: quantity
    });
  }

  quantityValue.textContent = 1; // reset quantité visuelle

 renderCart(); // 🔥 UN SEUL appel
});

    }

  });

}
*/
//-------------------PANIER/////////////////////////////


// ==========================
// PANIER SYSTEME
// ==========================

cart = JSON.parse(localStorage.getItem("cart")) || [];
/*
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  if (cartCount) {
    cartCount.textContent = totalItems;
  }
}
*/

/*
document.addEventListener("click", (e) => {

  let button = e.target.closest(".add-btn");

  if (button) {

    let id = button.dataset.id;

    let product = products[id];

    if (!product) return;

    let existing = cart.find(item => item.id === id);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({
        id: id,
        name: product.productname,
        price: product.montant_actuel,
        image: product.imageURL,
        quantity: 1
      });
    }

   // alert(cart);
    //updateCartCount();
    renderCart() 
  }
});
*/




/*SHOW CARD*//*
export function showCart() {

  const cartContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");

  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {

    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "d-flex justify-content-between align-items-center mb-3";

    div.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        <img src="${item.image}" width="50">
        <div>
          <strong>${item.name}</strong><br>
          ${item.quantity} x ${item.price} TL
        </div>
      </div>

      <button class="btn btn-sm btn-danger remove-btn" data-id="${item.id}">
        ✕
      </button>
    `;

    cartContainer.appendChild(div);
  });

  totalElement.textContent = total + " TL";

  // Supprimer produit
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      const id = this.dataset.id;
      cart = cart.filter(item => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(cart));
      showCart();
     // updateCartCount();
     renderCart() ;
    });
  });
}
 */

export function showCart() {

  const cartContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");
  const badge = document.getElementById("cart-count");

  cartContainer.innerHTML = "";

  let total = 0;
  let totalQuantity = 0;

  cart.forEach((item, index) => {

    const itemTotal = item.price * item.quantity;

    total += itemTotal;
    totalQuantity += item.quantity;

    const div = document.createElement("div");
    div.className = "d-flex justify-content-between align-items-center mb-3 border-bottom pb-2";

    div.innerHTML = `
      <div class="d-flex align-items-center gap-2">

        <img src="${item.image}" width="60" height="60" class="rounded">

        <div>
          <strong>${item.name}</strong>

          <div class="d-flex align-items-center mt-2">
            <button class="btn btn-sm btn-outline-secondary minus-btn">-</button>
            <span class="mx-2 fw-bold">${item.quantity}</span>
            <button class="btn btn-sm btn-outline-secondary plus-btn">+</button>
          </div>

          <small class="text-muted">${item.price} $ / unité</small>
        </div>
      </div>

      <div class="text-end">
        <div class="fw-bold">${itemTotal} $</div>
        <button class="btn btn-sm btn-danger remove-btn">✕</button>
      </div>
    `;

    // ➖
    div.querySelector(".minus-btn").addEventListener("click", () => {
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      showCart();
    });

    // ➕
    div.querySelector(".plus-btn").addEventListener("click", () => {
      cart[index].quantity++;
      localStorage.setItem("cart", JSON.stringify(cart));
      showCart();
    });

    // ❌ Supprimer
    div.querySelector(".remove-btn").addEventListener("click", () => {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      showCart();
    });

    cartContainer.appendChild(div);
  });

  totalElement.textContent = total + " $";

  if (badge) {
    badge.textContent = totalQuantity;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

//----------------------LA FONCTION POUR METRE LES PRODUITS DANS CART İTEMS


 function renderCart() {

  const cartItemsDiv = document.getElementById("cart-items");
  const totalDiv = document.getElementById("cart-total");
  const badge = document.getElementById("cart-count");

  if (!cartItemsDiv) return;

  cartItemsDiv.innerHTML = "";

  let subtotal = 0;
  let totalQuantity = 0;

  cart.forEach((item, index) => {

    const price = Number(item.price);
    const quantity = Number(item.quantity);
    const itemTotal = price * quantity;

    subtotal += itemTotal;
    totalQuantity += quantity;

    const itemDiv = document.createElement("div");
    itemDiv.className = "d-flex align-items-center justify-content-between mb-3 border-bottom pb-2";

    itemDiv.innerHTML = `
      <div class="d-flex align-items-center">
        <img src="${item.image}" width="60" height="60" class="me-2 rounded">

        <div>
          <div class="fw-bold">${item.name}</div>

          <div class="d-flex align-items-center mt-2">
            <button class="btn btn-sm btn-outline-secondary minus-btn" ${quantity <= 1 ? "disabled" : ""}>-</button>
            <span class="mx-2 fw-bold">${quantity}</span>
            <button class="btn btn-sm btn-outline-secondary plus-btn">+</button>
          </div>

          <small class="text-muted">${price.toFixed(2)} TL / unité</small>
        </div>
      </div>

      <div class="text-end">
        <div class="fw-bold">${itemTotal.toFixed(2)} TL</div>
        <button class="btn btn-sm btn-danger mt-1 remove-btn">X</button>
      </div>
    `;

    // ➖
    itemDiv.querySelector(".minus-btn")?.addEventListener("click", () => {
      cart[index].quantity--;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });

    // ➕
    itemDiv.querySelector(".plus-btn").addEventListener("click", () => {
      cart[index].quantity++;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });

    // ❌ Supprimer
    itemDiv.querySelector(".remove-btn").addEventListener("click", () => {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });

    cartItemsDiv.appendChild(itemDiv);
  });

  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + shipping;

  totalDiv.textContent = total.toFixed(2) + " TL";

  if (badge) {
    badge.textContent = totalQuantity;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

 renderCart();
//updateCartCount();




export function loadCart() {
  try {
    const storedCart = localStorage.getItem("cart");
    cart = storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Erreur chargement panier :", error);
    cart = [];
  }
}

/*
document.getElementById("checkout-btn").addEventListener("click", function () {

  const container = document.getElementById("checkout-form-container");

  if (container.style.display === "block") {
    container.style.display = "none";
    return;
  }

  container.style.display = "block";

  container.innerHTML = `
    <div class="card p-3 shadow-sm">

      <h5 class="mb-3">Informations de livraison</h5>

      <input type="text" id="fullname" class="form-control mb-2" placeholder="Nom complet">
      <input type="text" id="phone" class="form-control mb-2" placeholder="Téléphone">
      <input type="email" id="email" class="form-control mb-2" placeholder="Email">

      <input type="text" id="country" class="form-control mb-2" placeholder="Pays">
      <input type="text" id="city" class="form-control mb-2" placeholder="Ville / Quartier">

      <textarea id="address" class="form-control mb-2" placeholder="Adresse complète"></textarea>
      <textarea id="message" class="form-control mb-3" placeholder="Message (optionnel)"></textarea>
<button class="btn btn-dark w-100 fw-bold" onclick="generateInvoice()">
  GÉNÉRER FACTURE
</button>

    </div>
  `;
});

*/

/*-------------------------------------------------- */

/*
function generateInvoice() {

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const fullname = document.getElementById("fullname")?.value.trim();
  const phone = document.getElementById("phone")?.value.trim();
  const address = document.getElementById("address")?.value.trim();

  if (!fullname || !phone || !address) {
    alert("Veuillez remplir les champs obligatoires");
    return;
  }

  if (!cart || cart.length === 0) {
    alert("Votre panier est vide");
    return;
  }

  let y = 20;
  let total = 0;

  // ===== TITRE =====
  doc.setFontSize(18);
  doc.text("FACTURE", 85, y);
  y += 10;

  // ===== INFOS CLIENT =====
  doc.setFontSize(12);
  doc.text("Client : " + fullname, 14, y);
  y += 6;
  doc.text("Téléphone : " + phone, 14, y);
  y += 6;
  doc.text("Adresse : " + address, 14, y);
  y += 10;

  // ===== TABLE HEADER =====
  doc.setFont(undefined, "bold");
  doc.text("Produit", 14, y);
  doc.text("Qté", 110, y);
  doc.text("Prix", 130, y);
  doc.text("Total", 160, y);
  doc.setFont(undefined, "normal");

  y += 6;

  // ===== PRODUITS =====
  cart.forEach(item => {

    const price = Number(item.price);
    const qty = Number(item.quantity);
    const itemTotal = price * qty;

    if (isNaN(itemTotal)) return;

    total += itemTotal;

    doc.text(item.name, 14, y);
    doc.text(String(qty), 110, y);
    doc.text(price.toFixed(2) + " TL", 130, y);
    doc.text(itemTotal.toFixed(2) + " TL", 160, y);

    y += 6;
  });

  const shipping = total > 0 ? 25 : 0;
  const finalTotal = total + shipping;

  y += 5;

  // ===== TOTAUX =====
  doc.setFont(undefined, "bold");
  doc.text("Sous-total : " + total.toFixed(2) + " TL", 130, y);
  y += 6;
  doc.text("Livraison : " + shipping.toFixed(2) + " TL", 130, y);
  y += 6;
  doc.text("TOTAL : " + finalTotal.toFixed(2) + " TL", 130, y);

  // ===== SAVE PDF =====
  doc.save("Facture_LunaLite.pdf");
}
*/


// ===============================
// CHECKOUT FORM TOGGLE
// ===============================
const checkoutBtn = document.getElementById("checkout-btn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", function () {




  const container = document.getElementById("checkout-form-container");

  if (container.style.display === "block") {
    container.style.display = "none";
    return;
  }

  container.style.display = "block";
  container.innerHTML = `
    <div class="card p-3 shadow-sm">

      <h5 class="mb-3">Informations de livraison</h5>

      <input type="text" id="fullname" class="form-control mb-2" placeholder="Nom complet">
      <input type="text" id="phone" class="form-control mb-2" placeholder="Téléphone">
      <input type="email" id="email" class="form-control mb-2" placeholder="Email">

      <input type="text" id="country" class="form-control mb-2" placeholder="Pays">
      <input type="text" id="city" class="form-control mb-2" placeholder="Ville / Quartier">

      <textarea id="address" class="form-control mb-3" placeholder="Adresse complète"></textarea>

      <button id="generate-btn" class="btn btn-dark w-100 fw-bold">
        GÉNÉRER FACTURE
      </button>

    </div>
  `;

  // 🔥 IMPORTANT : Ajouter l’event après injection
  document.getElementById("generate-btn")
    .addEventListener("click", generateInvoice);

});
}

// ===============================
// EXEMPLE PANIER (OBLIGATOIRE)
// ===============================
/*
 cart = [
  { name: "Produit A", price: 100, quantity: 2 },
  { name: "Produit B", price: 50, quantity: 1 }
];
*/

// ===============================
// GENERATE PDF INVOICE
// ===============================

function generateInvoice() {

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const fullname = document.getElementById("fullname")?.value.trim();
  const phone = document.getElementById("phone")?.value.trim();
  const address = document.getElementById("address")?.value.trim();

  if (!fullname || !phone || !address) {
    alert("Veuillez remplir les champs obligatoires");
    return;
  }

  if (!cart || cart.length === 0) {
    alert("Votre panier est vide");
    return;
  }

  let y = 20;
  let total = 0;

  doc.setFontSize(18);
  doc.text("FACTURE", 85, y);
  y += 10;

  const today = new Date().toLocaleDateString();
  doc.setFontSize(11);
  doc.text("Date : " + today, 14, y);
  y += 10;

  doc.setFontSize(12);
  doc.text("Client : " + fullname, 14, y);
  y += 6;
  doc.text("Téléphone : " + phone, 14, y);
  y += 6;
  doc.text("Adresse : " + address, 14, y);
  y += 10;

  doc.setFont(undefined, "bold");
  doc.text("Produit", 14, y);
  doc.text("Qté", 110, y);
  doc.text("Prix", 130, y);
  doc.text("Total", 160, y);
  doc.setFont(undefined, "normal");
  y += 6;

  let whatsappMessage = "🧾 Nouvelle commande\n\n";
  whatsappMessage += "Client: " + fullname + "\n";
  whatsappMessage += "Téléphone: " + phone + "\n";
  whatsappMessage += "Adresse: " + address + "\n\n";

  cart.forEach(item => {

    const price = Number(item.price);
    const qty = Number(item.quantity);
    const itemTotal = price * qty;

    if (isNaN(itemTotal)) return;

    total += itemTotal;

    doc.text(item.name, 14, y);
    doc.text(String(qty), 110, y);
    doc.text(price.toFixed(2) + " $", 130, y);
    doc.text(itemTotal.toFixed(2) + " $", 160, y);

    whatsappMessage += `${item.name} x${qty} = ${itemTotal.toFixed(2)} $\n`;

    y += 6;
  });

  const shipping = total > 0 ? 25 : 0;
  const finalTotal = total + shipping;

  y += 5;

  doc.setFont(undefined, "bold");
  doc.text("Sous-total : " + total.toFixed(2) + " $", 130, y);
  y += 6;
  doc.text("Livraison : " + shipping.toFixed(2) + " $", 130, y);
  y += 6;
  doc.text("TOTAL : " + finalTotal.toFixed(2) + " $", 130, y);

  // ===== GENERER PDF =====
  doc.save("Facture_LunaLite.pdf");
setTimeout(() => {
  window.open("https://wa.me/905521506208", "_blank");
}, 800);
}


/*
function generateInvoice() {

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const fullname = document.getElementById("fullname")?.value.trim();
  const phone = document.getElementById("phone")?.value.trim();
  const address = document.getElementById("address")?.value.trim();

  if (!fullname || !phone || !address) {
    alert("Veuillez remplir les champs obligatoires");
    return;
  }

  if (!cart || cart.length === 0) {
    alert("Votre panier est vide");
    return;
  }

  let y = 20;
  let total = 0;

  // ===== TITRE =====
  doc.setFontSize(18);
  doc.text("FACTURE", 85, y);
  y += 10;

  // ===== DATE =====
  const today = new Date().toLocaleDateString();
  doc.setFontSize(11);
  doc.text("Date : " + today, 14, y);
  y += 10;

  // ===== INFOS CLIENT =====
  doc.setFontSize(12);
  doc.text("Client : " + fullname, 14, y);
  y += 6;
  doc.text("Téléphone : " + phone, 14, y);
  y += 6;
  doc.text("Adresse : " + address, 14, y);
  y += 10;

  // ===== HEADER TABLE =====
  doc.setFont(undefined, "bold");
  doc.text("Produit", 14, y);
  doc.text("Qté", 110, y);
  doc.text("Prix", 130, y);
  doc.text("Total", 160, y);
  doc.setFont(undefined, "normal");
  y += 6;

  // ===== PRODUITS =====
  cart.forEach(item => {

    const price = Number(item.price);
    const qty = Number(item.quantity);
    const itemTotal = price * qty;

    if (isNaN(itemTotal)) return;

    total += itemTotal;

    doc.text(item.name, 14, y);
    doc.text(String(qty), 110, y);
    doc.text(price.toFixed(2) + " TL", 130, y);
    doc.text(itemTotal.toFixed(2) + " TL", 160, y);

    y += 6;
  });

  const shipping = total > 0 ? 25 : 0;
  const finalTotal = total + shipping;

  y += 5;

  // ===== TOTAUX =====
  doc.setFont(undefined, "bold");
  doc.text("Sous-total : " + total.toFixed(2) + " TL", 130, y);
  y += 6;
  doc.text("Livraison : " + shipping.toFixed(2) + " TL", 130, y);
  y += 6;
  doc.text("TOTAL : " + finalTotal.toFixed(2) + " TL", 130, y);

  // ===== SAVE =====
  doc.save("Facture_LunaLite.pdf");
}
*/
//--------------------------------------Notification-----------------------

// ===== NOTIFICATION AJOUT PANIER =====

function showAddNotification(button) {
  const toast = document.createElement("div");
  toast.className = "toast-add";
  toast.innerHTML = "✔ Produit ajouté !";

  button.parentElement.style.position = "relative";
  button.parentElement.appendChild(toast);

  toast.style.bottom = (button.offsetHeight + 10) + "px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%) translateY(10px)";

  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2000);
}


// Event global pour tous les boutons
document.addEventListener("click", function(e) {
  const btn = e.target.closest(".add-btn");
  if (btn) {
    showAddNotification(btn);
  }
});

//-----------------------------------LOAD-------------------------

//let currentIndex = 0;
//const itemsPerPage = 12;
//let allProducts = [];

// Quand tu récupères tes produits Firebase :
function loadProducts(productsData) {
  allProducts = Object.entries(productsData);
  renderProducts();
}


/*
function renderProducts() {
  const container = document.getElementById("posts");
  container.innerHTML = "";

  const slice = allProducts.slice(currentIndex, currentIndex + itemsPerPage);

  slice.forEach(([key, value]) => {
    let col = document.createElement("div");
    col.className = 'col-6 col-md-4 col-lg-2 mb-4 d-flex';

    col.innerHTML = `
      <div class="product-card">
        <img src="${value.imageURL}" class="product-img">
        <div class="product-content">
          <h5>${value.productname}</h5>
          <div>${value.montant_actuel} TL</div>
        </div>
      </div>
    `;

    container.appendChild(col);
  });

  // ✅ METTRE ICI
  document.getElementById("prevBtn").disabled = currentIndex === 0;
  document.getElementById("nextBtn").disabled =
    currentIndex + itemsPerPage >= allProducts.length;
}
*/


function renderProducts() {

  const posts_div = document.getElementById("posts");
  posts_div.innerHTML = "";

  const slice = allProducts.slice(currentIndex, currentIndex + itemsPerPage);

  slice.forEach(([key, value]) => {

    let col = document.createElement("div");
    col.className = 'col-12 col-lg-2 mb-4';

    col.innerHTML = `
<div class="product-card">

<a href="product.html?id=${key}&cat=${currentCategory}">
  <img src="${value.imageURL}" class="product-img" alt="${value.productname}">
</a>

  <div class="product-content">

    <h5 class="product-title">${value.productname}</h5>
    <div class="product-detail">${value.detail}</div>

    <div class="stars">
      ★ ★ ★ ★ <span class="star-gray">★</span>
    </div>

    <div class="price">${value.montant_actuel} $</div>

    <div class="price-cart">
      prix panier ${value.montant_panier || value.montant_actuel} $
    </div>

    <div class="quantity-box">
      <button class="qty-btn minus">−</button>
      <span class="quantity-value">1</span>
      <button class="qty-btn plus">+</button>
    </div>

    <button class="add-btn">
      <i class="bi bi-cart-plus"></i>
      Ajoutez
    </button>

  </div>
</div>
`;

    posts_div.appendChild(col);

    // ===== GESTION QUANTITÉ =====
    const quantityValue = col.querySelector(".quantity-value");
    const plusBtn = col.querySelector(".plus");
    const minusBtn = col.querySelector(".minus");

    plusBtn.addEventListener("click", () => {
      quantityValue.textContent = parseInt(quantityValue.textContent) + 1;
    });

    minusBtn.addEventListener("click", () => {
      let qty = parseInt(quantityValue.textContent);
      if (qty > 1) quantityValue.textContent = qty - 1;
    });

    // ===== AJOUT PANIER =====
    const addBtn = col.querySelector(".add-btn");

    addBtn.addEventListener("click", () => {

      const quantity = parseInt(quantityValue.textContent);

      let existing = cart.find(item => item.id === key);

      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({
          id: key,
          name: value.productname,
          price: Number(value.montant_actuel),
          image: value.imageURL,
          quantity: quantity
        });
      }

      quantityValue.textContent = 1;

      renderCart();
    });

  });

  // 🔥 Gestion activation/désactivation boutons
  document.getElementById("prevBtn").disabled = currentIndex === 0;
  document.getElementById("nextBtn").disabled =
    currentIndex + itemsPerPage >= allProducts.length;
}

/*---------------------------------------------------------------------*/

const nextBtn = document.getElementById("nextBtn");
if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    if (currentIndex + itemsPerPage < allProducts.length) {
      currentIndex += itemsPerPage;
      renderProducts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

/*
document.getElementById("nextBtn").addEventListener("click", () => {

  if (currentIndex + itemsPerPage < allProducts.length) {
    currentIndex += itemsPerPage;
    renderProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

});
*/

const prevBtn = document.getElementById("prevBtn");
if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    if (currentIndex - itemsPerPage >= 0) {
      currentIndex -= itemsPerPage;
      renderProducts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

/*
document.getElementById("prevBtn").addEventListener("click", () => {

  if (currentIndex - itemsPerPage >= 0) {
    currentIndex -= itemsPerPage;
    renderProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

});
*/
/* ----------------------------------------------------------*/

// ===============================
// AJOUT PRODUIT DEPUIS PRODUCT.HTML
// ===============================

export function addProductToCart(productData) {

  if (!productData || !productData.id) return;

  let existing = cart.find(item => item.id === productData.id);

  if (existing) {
    existing.quantity += productData.quantity || 1;
  } else {
    cart.push({
      id: productData.id,
      name: productData.name,
      price: Number(productData.price),
      image: productData.image,
      quantity: productData.quantity || 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));



  renderCart(); // 🔥 actualise immédiatement le panier
}


//********************Get clicked button */

/*-------------------------------AFFİCHEUR DU DESCRIPTION PRODUITS------------------------------------ */


document.addEventListener("DOMContentLoaded", function () {

  //renderCart(); // 🔥 important pour afficher le panier au chargement

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  var urlParams = new URLSearchParams(window.location.search);
  var productId = urlParams.get("id");
  var category = urlParams.get("cat");

  if (!productId) return;

  var firebaseConfig = {
    apiKey: "AIzaSyBiohw97qpDetAfk8ffvAmWcEJeqRzuT9Q",
    authDomain: "istmarchegouro.firebaseapp.com",
    databaseURL: "https://istmarchegouro-default-rtdb.firebaseio.com",
    projectId: "istmarchegouro",
    storageBucket: "istmarchegouro.appspot.com",
    messagingSenderId: "929248422215",
    appId: "1:929248422215:web:892622df425bc69e2d8462"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  firebase.database().ref(category + '/' + productId).once('value')
    .then(snapshot => {

      const value = snapshot.val();
      if (!value) return;

      document.getElementById("productName").innerText = value.productname;
      document.getElementById("productDescription").innerText = value.detail;
      document.getElementById("productPrice").innerText = value.montant_actuel + " $";
      document.getElementById("productImage").src = value.imageURL;

      const qty = document.getElementById("quantity");

      document.getElementById("plus").onclick = () => {
        qty.innerText = parseInt(qty.innerText) + 1;
      };

      document.getElementById("minus").onclick = () => {
        if (parseInt(qty.innerText) > 1)
          qty.innerText = parseInt(qty.innerText) - 1;
      };

      document.getElementById("addToCart").onclick = () => {

        const quantity = parseInt(qty.innerText) || 1;

        let existing = cart.find(item => item.id === productId);

        if (existing) {
          existing.quantity += quantity;
     
        } else {
          cart.push({
            id: productId,
            name: value.productname,
            price: Number(value.montant_actuel),
            image: value.imageURL,
            quantity: quantity
          });
         
        }


// ← IMPORTANT

        localStorage.setItem("cart", JSON.stringify(cart));
       this.location.reload();
      //renderCart(); 
      // 🔥 met à jour le offcanvas immédiatement

      //  alert("Produit ajouté au panier ✔");
      };

    });

});

//---------------------------------------------


document.addEventListener("DOMContentLoaded", function () {

  //renderCart(); // 🔥 important pour afficher le panier au chargement

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  var urlParams = new URLSearchParams(window.location.search);
  var productId = urlParams.get("id");

  if (!productId) return;

  var firebaseConfig = {
    apiKey: "AIzaSyBiohw97qpDetAfk8ffvAmWcEJeqRzuT9Q",
    authDomain: "istmarchegouro.firebaseapp.com",
    databaseURL: "https://istmarchegouro-default-rtdb.firebaseio.com",
    projectId: "istmarchegouro",
    storageBucket: "istmarchegouro.appspot.com",
    messagingSenderId: "929248422215",
    appId: "1:929248422215:web:892622df425bc69e2d8462"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  firebase.database().ref('prosecaccueil/' + productId).once('value')
    .then(snapshot => {

      const value = snapshot.val();
      if (!value) return;

      document.getElementById("productName").innerText = value.productname;
      document.getElementById("productDescription").innerText = value.detail;
      document.getElementById("productPrice").innerText = value.montant_actuel + " $";
      document.getElementById("productImage").src = value.imageURL;

      const qty = document.getElementById("quantity");

      document.getElementById("plus").onclick = () => {
        qty.innerText = parseInt(qty.innerText) + 1;
      };

      document.getElementById("minus").onclick = () => {
        if (parseInt(qty.innerText) > 1)
          qty.innerText = parseInt(qty.innerText) - 1;
      };

      document.getElementById("addToCart").onclick = () => {

        const quantity = parseInt(qty.innerText) || 1;

        let existing = cart.find(item => item.id === productId);

        if (existing) {
          existing.quantity += quantity;
     
        } else {
          cart.push({
            id: productId,
            name: value.productname,
            price: Number(value.montant_actuel),
            image: value.imageURL,
            quantity: quantity
          });
           
        }

// ← IMPORTANT

        localStorage.setItem("cart", JSON.stringify(cart));
       this.location.reload();
      //renderCart(); 
      // 🔥 met à jour le offcanvas immédiatement

      //  alert("Produit ajouté au panier ✔");
      };

    });

});

//--------Notification pour Ajouter au panier cote detail-----------------------------
document.addEventListener("click", function(e) {
  const btn = e.target.closest("#addToCart");
  if (btn) {
    showAddNotification(btn);
    
  }
});
