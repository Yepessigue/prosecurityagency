
<script>
    /*
    
document.addEventListener("DOMContentLoaded", function() {
// 🔥 CONFIG FIREBASE (garde la tienne si déjà initialisée
//  ailleurs)
var config = {
 apiKey: "AIzaSyBiohw97qpDetAfk8ffvAmWcEJeqRzuT9Q",
  authDomain: "istmarchegouro.firebaseapp.com", 
  databaseURL: "https://istmarchegouro-default-rtdb.firebaseio.com",
  projectId: "istmarchegouro",
  storageBucket: "istmarchegouro.appspot.com",
  messagingSenderId: "929248422215",
  appId: "1:929248422215:web:892622df425bc69e2d8462",
  measurementId: "G-FZWHW8KVHV"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

// 🔥 Récupérer ID depuis URL
var urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// 🔥 Charger produit
firebase.database().ref('accueil/' + productId).once('value')
.then(snapshot => {

  const product = snapshot.val();
  if(!product) return;

  document.getElementById("productName").innerText = product.productname;
  document.getElementById("productPrice").innerText = product.montant_actuel + " TL";
  document.getElementById("oldPrice").innerText = product.montant_ancien ? product.montant_ancien + " TL" : "";
  document.getElementById("productDescription").innerText = product.detail;
  document.getElementById("productImage").src = product.imageURL;

});

// 🔥 Quantité
const qty = document.getElementById("quantity");

document.getElementById("plus").onclick = () => {
  qty.innerText = parseInt(qty.innerText) + 1;
};

document.getElementById("minus").onclick = () => {
  if(parseInt(qty.innerText) > 1)
    qty.innerText = parseInt(qty.innerText) - 1;
};



// 🔥 Panier
let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.getElementById("addToCart").onclick = () => {

  const quantity = parseInt(qty.innerText);

  let existing = cart.find(item => item.id === productId);

  if(existing){
    existing.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      name: document.getElementById("productName").innerText,
      price: document.getElementById("productPrice").innerText,
      image: document.getElementById("productImage").src,
      quantity: quantity
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  document.getElementById("cart-count").innerText =
    cart.reduce((total, item) => total + item.quantity, 0);

  alert("Produit ajouté au panier ✔");
};
});

*/

</script>