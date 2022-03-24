var loc = window.location.href;
var url = new URL(loc);
var idProduct = url.searchParams.get("id");
let product = "";
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
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = product.imageUrl;
    productImg.alt = article.altTxt;

    //Change H1
    let productName = document.getElementById('title');
    productName.innerHTML = product.name;

    //Change Price
    let productPrice = document.getElementById('price');
    productPrice.innerHTML = product.price;

    //Change Descritpion
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = product.description;

    //Color List
    for (let colors of product.colors) {
        console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }

    addToCart(product);
}

//Function ajout dans le panier
function addToCart(product) {
    const btn_addToCart = document.querySelector('#addToCart');

    //Add Listener on Btn AddToCart
    btn_addToCart.addEventListener("click", (event) => {
        if (quantityPicked.value > 0 && quantityPicked.value <= 100 && quantityPicked.value != 0) {

            //
        }
    })
}
//recuperation du choix de couleur

//Recuperation du choix du nombre entre 1 et 100
