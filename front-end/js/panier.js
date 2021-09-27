(async function() {

    displayCart()
    emptyCart()
    orderForm()

})()

/*fonction qui récupère les infos du ls pour les afficher dans la page panier*/
function displayCart() {
    let cartArticles = localStorage.getItem("article")
    cartArticles = JSON.parse(cartArticles)

    if (cartArticles) {
/*si le ls existe on recupère le contenu, qu'on place dans un objet pour
pouvoir afficher dynamiquement les articles dans le panier*/
        Object.values(cartArticles).map(item => {
            document.getElementById("articles").innerHTML +=`
            <div class="card mb-4 mx-2 p-0 col-9 col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <img id="image-article" class="card-img-top" src="${item.image}" alt="Card image cap">
                <div class="card-body">  
                    <h5 id="nom-article" class="card-title">${item.name}</h5>
                    <p id="prix-article" class="card-text">prix : ${item.price}€</p>
                    <p id="quantité-article" class="card-text">Quantité : ${item.quantity}</p>
                </div>
            </div>`
        })
/*on récuprère le prix total dans le ls pour l'afficher*/
        document.getElementById("total-price").innerHTML += `
        Prix total : ${localStorage.getItem("totalPrice")}€
        `
        
    } else {
/*si le ls est vide on affiche un message avec un lien de redirection*/
        document.querySelector(".container").hidden = true
        document.getElementById("main").innerHTML += `
        <div class="redirection-message card mb-5 pt-4 col-9 d-flex align-items-center justify-content-center"><p>Désolé, votre panier est vide! <a href="index.html">retour au choix des articles</a></p></div>
        `
    }
}

/*fonction pour vider le panier avec un bouton*/
function emptyCart() {
    const emptyCart = document.querySelector(".empty-cart")

    emptyCart.addEventListener("click", () => {
    localStorage.clear()
    document.location.reload()
})
}

/*fonction qui va vérifier les données du formulaire et gérer l'envoi à l'API*/
function orderForm(){

    let articleInLS = JSON.parse(localStorage.getItem("article"))
    const submit = document.querySelector("#submit")
    let userFirstName = document.querySelector("#firstName")
    let userLastName = document.querySelector("#lastName")
    let userEmail = document.querySelector("#email")
    let userAddress = document.querySelector("#adress")
    let userCity = document.querySelector("#city")
    let formErrorTxt = document.querySelector(".error-form")

    submit.addEventListener("click", () => {
        checkEmail(userEmail)
        console.log(checkEmail(userEmail))
        if (
/*si tous les champs ne sont pas remplis on affiche un message d'erreur*/
            !userFirstName.value ||
            !userLastName.value ||
            !userEmail.value ||
            !userAddress.value ||
            !userCity.value
        ) {
            formErrorTxt.innerHTML = "tous les champs ne sont pas remplis !"
            formErrorTxt.style.color = "red"
/*si le champ email n'est pas correct, on affiche encore un message d'erreur*/
        } else if (checkEmail(userEmail) == false) {
            formErrorTxt.innerHTML = "veuillez entrer un email valide!"
            formErrorTxt.style.color = "red"
        } else {
/*si le formulaire est bien rempli, on ajoute tous les id des articles,
contenus dans le ls, dans un tableau*/
           const articleId = []
           for (let articlesBought of articleInLS){
                articleId.push(articlesBought._id)
           }
           console.log(articleId)
/*on crée l'objet qui sera envoyé à l'API et qui contient un tableau
avec les données utilisateurs et un tableau avec les id des articles*/
            const order = {
                contact: {
                    firstName: userFirstName.value,
                    lastName: userLastName.value,
                    email: userEmail.value,
                    address: userAddress.value,
                    city: userCity.value
                },
                products: articleId,
            }
           
            console.log(order)
/*configuration de la requête de type "POST" pour envoyer les
données à l'API*/
                const options = {
                    method: "POST",
                    body: JSON.stringify(order),
                    headers: { "Content-Type": "application/json" },
                }

/*on envoie les données et on récupère le numéro de commande
que l'API nous renvoie avec un fetch*/
                fetch("http://localhost:3000/api/furniture/order", options)
                    .then((response) => response.json())
                    .then((data) => {
                        
                        console.log(data)
/*on stocke le numero de commande dans le ls et on redirige
vers la page de validation de commande*/
                        localStorage.setItem("orderId", data.orderId)

                        document.location.href = "Commande_validation.html"
                    })
            }    
        })

}

function checkEmail(userEmail) {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!reg.test(userEmail.value)) return false;
    return true;
}