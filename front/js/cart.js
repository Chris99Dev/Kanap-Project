//Init LocalStorage
let productStorage = JSON.parse(localStorage.getItem("product"));

let cartValue = document.querySelector("#cart__items");

//Checking the Cart
function checkCart() {
    if (productStorage === null || productStorage == 0) {
        cartValue.innerHTML = "<p>Votre Panier est vide</p>";
        let formShow = document.getElementsByClassName('cart__order__form');
        let priceShow = document.getElementsByClassName('cart__price');
        for (let i = 0; i < formShow.length; i++) {
            formShow[i].style.display = "none";
        }

        for (let i = 0; i < priceShow.length; i++) {
            priceShow[i].style.display = "none";
        }

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
    let modifQuantity = document.getElementsByClassName('itemQuantity');

    for (let i = 0; i < modifQuantity.length; i++) {
        modifQuantity[i].addEventListener("change", (event) => {
            event.preventDefault();

            let productModif = productStorage[i].quantiteProduit;
            let modifQuantityValue = modifQuantity[i].valueAsNumber;

            const result = productStorage.find((el, index) => i == index);

            result.quantiteProduit = modifQuantityValue;
            productStorage[i].quantiteProduit = result.quantiteProduit;

            localStorage.setItem("product", JSON.stringify(productStorage));

            allTotals();
        })
    }
}
modifyQuantity();
//Delete product
function deleteProduct() {
    let btn_delete = document.querySelectorAll(".deleteItem");

    for (let i = 0; i < btn_delete.length; i++) {
        btn_delete[i].addEventListener("click", (event) => {
            event.preventDefault();

            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            let idDelete = productStorage[i].idProduit;
            let colorDelete = productStorage[i].couleurProduit;

            productStorage = productStorage.filter(el => el.idProduit !== idDelete || el.couleurProduit !== colorDelete);

            localStorage.setItem("product", JSON.stringify(productStorage));

            //Alerte when product is Deleted
            alert("Ce produit a bien été supprimé du panier");

            checkCart();
        })
    }
}
deleteProduct();

function getForm() {
    // Ajout des Regex
    let form = document.querySelector(".cart__order__form");

    //Création des expressions régulières
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    //validation du prénom
    const validFirstName = function (inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (!charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        } else {
            firstNameErrorMsg.innerHTML = '';
        }
    };

    // Ecoute de la modification du prénom
    form.firstName.addEventListener('change', function () {
        validFirstName(this);
    });

    //validation du nom
    const validLastName = function (inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'adresse
    const validAddress = function (inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de la ville
    const validCity = function (inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'email
    const validEmail = function (inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };

    // Ecoute de la modification du prénom
    form.firstName.addEventListener('change', function () {
        validFirstName(this);
    });

    // Ecoute de la modification du prénom
    form.lastName.addEventListener('change', function () {
        validLastName(this);
    });

    // Ecoute de la modification du prénom
    form.address.addEventListener('change', function () {
        validAddress(this);
    });

    // Ecoute de la modification du prénom
    form.city.addEventListener('change', function () {
        validCity(this);
    });

    // Ecoute de la modification du prénom
    form.email.addEventListener('change', function () {
        validEmail(this);
    });
}
getForm();

//Envoi des informations client au localstorage
function postForm() {
    const btn_commander = document.getElementById("order");

    //Ecouter le panier
    btn_commander.addEventListener("click", (event) => {

        //Récupération des coordonnées du formulaire client
        let form = document.querySelector(".cart__order__form");
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAddress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');


        //Construction d'un array depuis le local storage
        let idProducts = [];
        for (let i = 0; i < productStorage.length; i++) {
            idProducts.push(productStorage[i].idProduit);
        }
        console.log(idProducts);

        const order = {
            contact: {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAddress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: idProducts,
        }
        console.log(order);

        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
        };

        fetch("http://localhost:3000/api/products/order", options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                localStorage.clear();
                localStorage.setItem("orderId", data.orderId);

                document.location.href = "confirmation.html";
            })
            .catch((err) => {
                alert("Erreur sur le Fetch : " + err.message);
            });

        preventDefault();

    })
}
postForm();