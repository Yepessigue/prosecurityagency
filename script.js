
document.addEventListener('DOMContentLoaded', function() {
    const categoryLinks = document.querySelectorAll('#category-list a');
    const offcanvasElement = document.getElementById('offcanvasCategories');
    const categoryContent = document.getElementById('category-content');
    const offcanvas = new bootstrap.Offcanvas(offcanvasElement);

    categoryLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const category = this.getAttribute('data-category');
            
            // Changer le contenu affiché selon la catégorie
            switch (category) {
                case 'electronique':
                    categoryContent.innerHTML = `
                        <h1>Électronique</h1>
                        <p>Découvrez les gadgets électroniques les plus récents.</p>
                    `;
                    break;
                case 'mode':
                    categoryContent.innerHTML = `
                        <h1>Mode</h1>
                        <p>Tendances de la mode actuelle.</p>
                    `;
                    break;
                case 'maison':
                    categoryContent.innerHTML = `
                        <h1>Maison & Bureau</h1>
                        <p>Améliorez votre espace de vie et de travail.</p>
                    `;
                    break;
                case 'sport':
                    categoryContent.innerHTML = `
                        <h1>Sports & Outdoor</h1>
                        <p>Découvrez des équipements pour vos activités sportives.</p>
                    `;
                    break;
                case 'beaute':
                    categoryContent.innerHTML = `
                        <h1>Beauté & Santé</h1>
                        <p>Produits pour prendre soin de vous.</p>
                    `;
                    break;
                case 'livres':
                    categoryContent.innerHTML = `
                        <h1>Livres & Loisirs</h1>
                        <p>Laissez-vous inspirer par nos sélections.</p>
                    `;
                    break;
                default:
                    categoryContent.innerHTML = `
                        <h1>Bienvenue chez FinYouMan</h1>
                        <p>Découvrez les dernières tendances et offres.</p>
                    `;
            }

            // Fermer le menu
            offcanvas.hide();
        });
    });
});

async function genererFacture() {

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const fullname = document.getElementById("fullname").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  if (!fullname || !phone || !address) {
    alert("Veuillez remplir les champs obligatoires");
    return;
  }

  let y = 20;
  let total = 0;

  // ===== TITRE =====
  doc.setFontSize(18);
  doc.text("FACTURE", 90, y);
  y += 10;

  // ===== INFOS VENDEUR =====
  doc.setFontSize(12);
  doc.text("Vendeur :", 14, y);
  y += 6;
  doc.text("LunaLite Shop LTD", 14, y);
  y += 6;
  doc.text("info@lunaliteshop.com", 14, y);
  y += 6;
  doc.text("+9050001000", 14, y);
  y += 6;
  doc.text("Istanbul, Turquie", 14, y);

  y += 10;

  // ===== INFOS CLIENT =====
  doc.text("Client :", 14, y);
  y += 6;
  doc.text(fullname, 14, y);
  y += 6;
  doc.text(phone, 14, y);
  y += 6;
  doc.text(address, 14, y);

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
    total += itemTotal;

    doc.text(item.name, 14, y);
    doc.text(String(qty), 110, y);
    doc.text(price.toFixed(2) + " $", 130, y);
    doc.text(itemTotal.toFixed(2) + " $", 160, y);

    y += 6;
  });

  y += 5;

  const shipping = total > 0 ? 25 : 0;
  const finalTotal = total + shipping;

  // ===== TOTAUX =====
  doc.setFont(undefined, "bold");
  doc.text("Sous-total : " + total.toFixed(2) + " $", 130, y);
  y += 6;
  doc.text("Livraison : " + shipping.toFixed(2) + " TL", 130, y);
  y += 6;
  doc.text("TOTAL : " + finalTotal.toFixed(2) + " $", 130, y);

  // ===== SAUVEGARDE =====
  doc.save("Facture_LunaLite.pdf");
}
  