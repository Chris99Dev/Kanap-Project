var loc = window.location.href;
var url = new URL(loc);
var idProduct = url.searchParams.get("id");
console.log(idProduct); //Show Id of the product
var product = "";
//Color choice
var colorChoice = document.querySelector('#colors');
//Quantity choice
var productQuantity = document.querySelector('#quantity');

getProduct();

//Recuperation des donnees de API
function getProduct() {
    fetch("http://localhost:3000/api/products/" + idProduct)
        .then((reponse) => {
            return reponse.json();
        })

        .then(function (returnAPI) {
            product = returnAPI;
            console.table(product);
            if (product) {
                getPost(product);
            }
        })
        .catch((error) => {
            console.log("Erreur de la requete API");
        })
}

//Function Creation de la carte article
function getPost(product) {
    //Insert Image
    var productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = product.imageUrl;
    productImg.alt = product.altTxt;

    //Change H1
    var productName = document.getElementById("title").innerHTML = product.name;

    //Change Price
    var productPrice = document.getElementById('price').innerHTML = product.price;

    //Change Descritpion
    var productDescription = document.getElementById('description').innerHTML = product.description;

    //Color List
    for (var colors of product.colors) {
        console.table(colors);
        var productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }

    addToCart(product);
}

// //Function ajout dans le panier
// function addToCart(product) {
//     const btn_addToCart = document.querySelector('#addToCart');

//     //Add Listener on Btn AddToCart
//     btn_addToCart.addEventListener("click", (event) => {
//         if (quantityPicked.value > 0 && quantityPicked.value <= 100 && quantityPicked.value != 0) {

//             let colorChoice = colorPicked.value;
//             let productQuantity = quantityPicked.value;

//             let infoProduct = {
//                 idProduit: idProduct,
//                 couleurProduit: colorChoice,
//                 quantiteProduit: Number(productQuantity),
//                 nomProduit: article.name,
//                 prixProduit: article.price,
//                 imgProduit: article.imageUrl
//             };


//         }
//     })
// }
//recuperation du choix de couleur

//Recuperation du choix du nombre entre 1 et 100
