//import { renderCart } from "../js/module"; // ⚠️ adapte le chemin si besoin

document.addEventListener("DOMContentLoaded", function () {

  //renderCart(); // 🔥 important pour afficher le panier au chargement

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  var urlParams = new URLSearchParams(window.location.search);
  var productId = urlParams.get("id");

  if (!productId) return;

  var firebaseConfig = {
     apiKey: "AIzaSyBkffdz4g4k392LPSqwZyl_iIzU5IITAw0",
  authDomain: "lunayesdecotest.firebaseapp.com",
  databaseURL: "https://lunayesdecotest-default-rtdb.firebaseio.com",
  projectId: "lunayesdecotest",
  storageBucket: "lunayesdecotest.firebasestorage.app",
  messagingSenderId: "582072673061",
  appId: "1:582072673061:web:8502c6d6c24527b83430cc",
  measurementId: "G-RV809TL5XD"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  firebase.database().ref('accueil/' + productId).once('value')
    .then(snapshot => {

      const value = snapshot.val();
      if (!value) return;

      document.getElementById("productName").innerText = value.productname;
      document.getElementById("productDescription").innerText = value.detail;
      document.getElementById("productPrice").innerText = value.montant_actuel + " TL";
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

        localStorage.setItem("cart", JSON.stringify(cart));

       //renderCart(); // 🔥 met à jour le offcanvas immédiatement

        alert("Produit ajouté au panier ✔");
      };

    });

});