//Init LocalStorage
let productStorage = JSON.parse(localStorage.getItem("product"));
let cartValue = document.querySelector("#cart__items");

console.table(productStorage);

//Checking the Cart
function checkCart() {
    if (productStorage === null || productStorage == 0) {
        cartValue.innerHTML = "<p>Votre Panier est vide</p>";
    } else {
        for (let product in productStorage) {
            let productArticle = document.createElement("product");
            document.querySelector("#cart__items").appendChild(productArticle);

            //Filling Cart product object
            productArticle.innerHTML = `
            <article class="cart__item" data-id="${productStorage[product].idProduit}" data-color="${productStorage[product].couleurProduit}">
                <div class="cart__item__img">
                    <img src="${productStorage[product].imgProduit}" alt="${productStorage[product].altTxtProduit}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${productStorage[product].nomProduit}</h2>
                        <p>${productStorage[product].couleurProduit}</p>
                        <p>${productStorage[product].prixProduit} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productStorage[product].quantiteProduit}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>
            `
        }
    }
}
checkCart();

//Edit Quantity for Product
function modifyQuantity() {
    let quantityItem = document.querySelectorAll(".itemQuantity");

    for (let i = 0; i < quantityItem.length; i++) {
        quantityItem[i].addEventListener("change", (event) => {

            let quantity = productStorage[i].quantiteProduit;
            let quantityItemValue = quantityItem.valueAsNumber;


        })

    }
}

//Get Total for Quantity and Price
function allTotals() {
    //get Quantity
    let quantite = document.getElementsByClassName('itemQuantity');
    let quantiteLength = quantite.length;
    totalQuantite = 0;

    //Calcul Total Quantity
    for (let i = 0; i < quantiteLength; i++) {
        totalQuantite += quantite[i].valueAsNumber;
    }
    //show Total Quantity Product
    document.getElementById('totalQuantity').innerHTML = totalQuantite;

    //Total Price
    totalPrice = 0;

    //Calcul Total Porducts Price
    for (let i = 0; i < quantiteLength; i++) {
        totalPrice += (quantite[i].valueAsNumber * productStorage[i].prixProduit);
    }

    //Show Total Price
    document.getElementById('totalPrice').innerHTML = totalPrice;
}
allTotals();


//modify quantity
function modifyQuantity() {
    let modifQuantity = document.querySelectorAll(".itemQuantity");

    for (let i = 0; i < modifQuantity.length; i++) {
        modifQuantity[i].addEventListener("change", (event) => {
            event.preventDefault();

            let productModif = productStorage[i].quantiteProduit;
            let modifQuantityValue = modifQuantity[i].valueAsNumber;

            const result = productStorage.find((el) => el.modifQuantityValue !== productModif);

            result.quantiteProduit = modifQuantityValue;
            productStorage[i].quantiteProduit = result.quantiteProduit;

            localStorage.setItem("product", JSON.stringify(productStorage));

            //refresh Url
            location.reload();
        })
    }
}
modifyQuantity();