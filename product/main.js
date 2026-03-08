let cart = JSON.parse(localStorage.getItem("cart")) || [];

firebase.database().ref('accueil/').once('value')
.then(snapshot => {

  const posts_div = document.getElementById("posts");
  posts_div.innerHTML = "";

  const data = snapshot.val();

  for (let [key, value] of Object.entries(data)) {

    let col = document.createElement("div");
    col.className = 'col-6 col-lg-2 mb-4';

    col.innerHTML = `
      <div class="product-card">

        <a href="product.html?id=${key}">
          <img src="${value.imageURL}" class="product-img">
        </a>

        <h5>${value.productname}</h5>
        <div>${value.montant_actuel} TL</div>

        <button class="add-btn">Ajouter</button>

      </div>
    `;

    posts_div.appendChild(col);

    col.querySelector(".add-btn").addEventListener("click", () => {

      let existing = cart.find(item => item.id === key);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          id: key,
          name: value.productname,
          price: value.montant_actuel,
          image: value.imageURL,
          quantity: 1
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      alert("Produit ajouté au panier");
    });

  }

});