(async function() {
    let articleInLS = JSON.parse(localStorage.getItem("article"))

    displayCart()
    emptyCart()
    orderForm(articleInLS)

})()


function displayCart() {
    let cartArticles = localStorage.getItem("article")
    cartArticles = JSON.parse(cartArticles)

    if (cartArticles ) {
        Object.values(cartArticles).map(item => {
            document.getElementById("main").innerHTML +=`
            <div class="card mb-4 mx-2 p-0 col-9 col-xl-1 col-lg-3 col-md-4 col-sm-6">
        <img id="image-article" class="card-img-top" src="${item.image}" alt="Card image cap">
        <div class="card-body">  
            <h5 id="nom-article" class="card-title">${item.name}</h5>
            <p id="prix-article" class="card-text">prix : ${item.price}€</p>
            <p id quantité-article class="card-text">Quantité : ${item.quantity}</p>
        </div>
    </div>
            `
        })
        document.getElementById("total-price").innerHTML += `
        Prix total : ${localStorage.getItem("totalPrice")}€
        `
        
    } else {

        document.getElementById("order-form").hidden = true
        document.getElementById("main").innerHTML += `
        <p class="col-5">Désolé, votre panier est vide! <a href="index.html">retour au choix des articles</a></p>
        `
    }
}

function emptyCart() {
    const emptyCart = document.querySelector(".empty-cart")

    emptyCart.addEventListener("click", () => {
    localStorage.clear()
    document.location.reload()
})
}

function orderForm(articleInLS){

    const submit = document.querySelector("#submit")
    let userFirstName = document.querySelector("#firstName")
    let userLastName = document.querySelector("#lastName")
    let userEmail = document.querySelector("#email")
    let userAdress = document.querySelector("#adress")
    let userCity = document.querySelector("#city")
    let formErrorTxt = document.querySelector(".error-form")

    submit.addEventListener("click", () => {
        if (
            !userFirstName.value ||
            !userLastName.value ||
            !userEmail.value ||
            !userAdress.value ||
            !userCity.value
        ) {
            formErrorTxt.innerHTML += "tous les champs ne sont pas remplis !"
        } else {
            
            let articleInOrder = []
            articleInOrder.push(articleInLS)

            console.log(articleInOrder)

            const order = {
            contact: {
                    firstName: userFirstName.value,
                    lastName: userLastName.value,
                    city: userCity.value,
                    address: userAdress.value,
                    email: userEmail.value,
                },
                products: articleInOrder,
                
            }
        
            

            const APIRequest = {
                method: "POST",
                body: JSON.stringify(order),
                headers: {"Content-Type": "application/json"},
            }

            fetch("http://localhost:3000/api/furniture/order", APIRequest)
                .then((response) => response.json())
                .then((data) => {
                    localStorage.clear()
                    console.log(data)
                    localStorage.setItem("orderId", data.orderId)
                    
                    document.location.href = "Commande_valider.html"
                })
            .catch((err) => {
                alert("Une erreur est survenue :" + err)
            })    
        }
    })
}