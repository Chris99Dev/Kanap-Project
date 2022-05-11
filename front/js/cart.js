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

            location.reload();
        })
    }
}

//Get Form
function getForm() {
    //get the DOM form
    let form = document.querySelector(".cart__order__form");
    form.setAttribute("id", "form");

    //Create RegExp
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
    let charRegEx = new RegExp("^[a-zA-Z ,.'-]+$");

    //Change Name
    form.firstName.addEventListener('change', function () {
        validFirstName(this);
    });
    //change Lastname
    form.lastName.addEventListener('change', function () {
        validLastName(this);
    });
    //change address
    form.address.addEventListener('change', function () {
        validAddress(this);
    });
    //change city
    form.city.addEventListener('change', function () {
        validCity(this);
    });
    //change mail
    form.email.addEventListener('change', function () {
        validEmail(this);
    });

    //Valid the FirstName
    const validFirstName = function (inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (charRegEx.test(inputFirstName.value) == true) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //Valid the LastName
    const validLastName = function (inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegEx.test(inputLastName.value) == true) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //Valid the Address
    const validAddress = function (inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value) == true) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //Valid the City
    const validCity = function (inputCity) {
        let CityErrorMsg = inputCity.nextElementSibling;

        if (charRegEx.test(inputCity.value) == true) {
            CityErrorMsg.innerHTML = '';
        } else {
            CityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //Valid the Email
    const validEmail = function (inputMail) {
        let emailErrorMsg = inputMail.nextElementSibling;

        if (emailRegExp.test(inputMail.value) == true) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

}


//Send the Form
function postForm() {
    const btn_commander = document.getElementById("order");
    let clientData = form.firstName.value + form.lastName.value + form.city.value + form.address.value + form.email.value;
    if (clientData == 5) {
        postForm();
    } else {
        console.log("DataMISSING");
        btn_commander.display = false;
    };
    //Event on button
    btn_commander.addEventListener("click", (event) => {

        //get Info from Form
        let inputFirstName = document.getElementById("firstName");
        let inputLastName = document.getElementById("lastName");
        let inputAddress = document.getElementById("address");
        let inputCity = document.getElementById("city");
        let inputMail = document.getElementById("email");

        //Construct Array from local storage
        let idProducts = [];
        for (let i = 0; i < productStorage.length; i++) {
            idProducts.push(productStorage[i].idProduit);
        }
        console.log(idProducts);

        const order = {
            contact: {
                firstName: inputFirstName.value,
                lastName: inputLastName.value,
                address: inputAddress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: idProducts,
        }

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
    })
}


checkCart();
allTotals();
modifyQuantity();
deleteProduct();
getForm();