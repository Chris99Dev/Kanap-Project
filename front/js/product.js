var loc = window.location.href;
var url = new URL(loc);
var idProduct = url.searchParams.get("id");

//Color choice
var colorChoice = document.querySelector('#colors');
//Quantity choice
var productQuantity = document.querySelector('#quantity');

// console.log(idProduct);
// console.log(url);

//Recuperation des donnees de API
function getProduct() {
    fetch("http://localhost:3000/api/products/" + idProduct)
        .then((reponse) => {
            return reponse.json();
        })
}

//Function Creation de la carte article

//Function ajout dans le panier

//recuperation du choix de couleur

//Recuperation du choix du nombre entre 1 et 100
