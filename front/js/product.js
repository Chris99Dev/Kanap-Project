let loc = window.location.href;
let url = new URL(loc);
let idProduct = url.searchParams.get("id");
let product = "";

//Color choice
let colorChoice = document.querySelector('#colors');
//Quantity choice
let productChoice = document.querySelector('#quantity');

getProduct();

//Recuperation des donnees de API
function getProduct() {
    fetch("http://localhost:3000/api/products/" + idProduct)
        .then((reponse) => {
            return reponse.json();
        })

        .then(function (returnAPI) {
            product = returnAPI;
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
    productImg.alt = product.altTxt;

    //Change H1
    let productName = document.getElementById("title").innerHTML = product.name;

    //Change Price
    let productPrice = document.getElementById('price').innerHTML = product.price;

    //Change Descritpion
    let productDescription = document.getElementById('description').innerHTML = product.description;

    //Color List
    for (let colors of product.colors) {
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
        //Waiting to have at least 1 and between 0 to 100 object choose and color choose too
        if (productChoice.value != 0 && productChoice.value <= 100) {

            let colorValue = colorChoice.value;
            let productQuantity = productChoice.value;

            let infoProduct = {
                idProduit: idProduct,
                couleurProduit: colorValue,
                quantiteProduit: Number(productQuantity),
                nomProduit: product.name,
                prixProduit: product.price,
                imgProduit: product.imageUrl
            };

            //Init the Local Storage
            let productStorage = JSON.parse(localStorage.getItem("product"));

            //check if there is already an item in the cart
            // if (productStorage) {
            //     let productIn = productStorage.find(
            //         if (productIn) {

            //         }
            //     )
            // }

        }
    })
}
