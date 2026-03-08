// index.js


import { Accueil, showCart, ManageAllButtonClick } from './module.js';

window.onload = function() {

  Accueil();

  const cartCanvas = document.getElementById('cartCanvas');
  cartCanvas.addEventListener('show.bs.offcanvas', function () {
    showCart();
  });

  const buttons = document.querySelectorAll(".firebase-btn");

  buttons.forEach(button => {

    button.addEventListener("click", function(){

      const path = this.dataset.db;

      ManageAllButtonClick(path + "/");

    });

  });

};









/*
import {
//  loadCart
  Accueil, 
  showCart, 
ManageAllButtonClick,

 } from './module.js';

window.onload = function() {
  Accueil();
  //loadCart(); 

  const cartCanvas = document.getElementById('cartCanvas');
  cartCanvas.addEventListener('show.bs.offcanvas', function () {
    showCart();
  });
};

//-----------------------------------------------CLICK FUNCTIONS-----------------------


document.getElementById('button1_pergola').onclick = ManageAllButtonClick;


*/


















/*
import {

     Accueil,
     showCart
    
    } from './module.js';


/*
window.onload = function() {
    Accueil();
  };
  
  */
/*
  window.onload = function() {
  Accueil();

  const cartIcon = document.querySelector(".cart-icon");

  cartIcon.addEventListener("click", () => {
    showCart();
  });
};

let cart = JSON.parse(localStorage.getItem("cart")) || [];*/