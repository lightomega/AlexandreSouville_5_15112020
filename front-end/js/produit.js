(async function() {

    const id = getArticleId()
    const article = await getArticle(id)

    displayArticle(article)
    addToCart(article, id)
    onLoadCartNumbers()

})()

/*on récupère l'id du produit présent dans l'url*/
function getArticleId() {
   return new URL(location.href).searchParams.get("id") 
}

/*on récupère uniquement l'article correspondant à l'id*/
function getArticle(id) {
    return fetch(`http://localhost:3000/api/furniture/${id}`)
        .then(function(http_idResponse) {
            return http_idResponse.json()
        })
        .then(function(articles) {
           return articles
        })
        .catch(function(error) {
            alert(error)
        })
}

/*on affiche dynamiquement l'article grace a l'id précédemment récupéré dans l'URL */
function displayArticle(article) {
    document.getElementById("main").innerHTML += `
    <div class="card p-0 my-5 col-9 col-lg-3 col-md-5 col-sm-7">
        <img id="image-article" class="card-img-top" src="${article.imageUrl}" alt="Card image cap">
        <div class="card-body">  
            <h5 id="nom-article" class="card-title">${article.name}</h5>
            <p id="description-article" class="card-text">${article.description}</p>
            <p id="prix-article" class="card-text">Prix : ${parseInt(article.price)/100}€</p>
            <label for="vernis-selct" class="mb-4">vernis :</label>

                <select name="vernis" id="vernis-select">
                </select>

            <p id="quantité-article" class="card-text mb-4">
            <label for="quantité" class="mb-4">Quantité : </label>
            <input type="number" id="quantité" name="quantité" value="1" min="1" max="100"</p>
            <a class="add-cart btn btn-outline-primary" href="#">Ajouter au panier</a>
            <p id="confirmation-text" class="card-text"></p>
        </div>
    </div>`

    let varnishSelect = document.getElementById("vernis-select");
      for (let i = 0; i < article.varnish.length; i++) {
        let option = document.createElement("option");
        option.innerText = article.varnish[i];
        varnishSelect.appendChild(option)
      }
}

/*fonction qui va créer les informations pour le panier*/
function addToCart (article, id) {
    let confirmation = document.getElementById("confirmation-text")
/*on crée un event listener pour le bouton d'ajout au panier*/
    let carts = document.querySelector(".add-cart")
    carts.addEventListener('click', () => {

    let quantity = document.querySelector('#quantité')

    if (quantity.value > 0 && quantity.value < 100) {
/*si la quantité est comprise entre 1 et 100, on créé un objet avec 
les informations du produit*/
        let articleAdded = {
        name: article.name,
        _id: id,
        image: article.imageUrl,
        price: parseInt(article.price)/100,
        quantity: parseFloat(quantity.value)
        }

/*on execute ensuite les fonctions qui vont stocker l'article ajouté 
dans le localstorage et on affiche un message de validation*/
        cartNumbers(articleAdded) 
        totalPrice(articleAdded)

        confirmation.innerHTML += `le produit a bien été ajouté au panier!`
        confirmation.style.color = "green"
        setTimeout("location.reload(true);", 2000)

        } else {
/*si la quantité n'est pas correcte, on affiche un message d'erreur*/
            confirmation.innerHTML += `la quantité doit être comprise entre 1 et 100`
            confirmation.style.color = "red"
            setTimeout("location.reload(true);", 2000)
        }
        
    })
}

/*affichage du compteur du panier*/
function onLoadCartNumbers() {
    let articleNumbers = localStorage.getItem('articleNumbers')

    if(articleNumbers) {
        document.querySelector('.panier span').textContent = articleNumbers
    }
}

/*ajout des articles au ls et mise à jour du compteur du panier*/
function cartNumbers(articleAdded) {
    
    let articleNumbers = localStorage.getItem('articleNumbers')
    articleNumbers = parseInt(articleNumbers)
    
/*on crée le tableau qui contiendra l'objet précédemment créé*/
    let articleInCart = []
    
       
    if(localStorage.getItem("article") !== null){
/*si le ls n'est pas vide on rempli le tableau avec le contenu du ls et on
met à jour la quantité du panier dans le ls et sur le compteur*/
        articleInCart = JSON.parse(localStorage.getItem("article"))
        localStorage.setItem('articleNumbers', articleNumbers + articleAdded.quantity)
        document.querySelector('.panier span').textContent = articleNumbers + articleAdded.quantity
    } else {
/*si le ls est vide on ajoute les nouvelles quantités*/
        localStorage.setItem('articleNumbers', articleAdded.quantity)
        
        
        document.querySelector('.panier span').textContent = articleAdded.quantity
    } 
/*puis on ajoute le dernier article dans le tableau et on le stocke dans le ls*/
    articleInCart.push(articleAdded)
    localStorage.setItem("article", JSON.stringify(articleInCart))
}

/*calcul du prix total*/
function totalPrice(article) {
    let cartPrice = localStorage.getItem('totalPrice')

    if(cartPrice != null) {
        cartPrice = parseInt(cartPrice)
        localStorage.setItem('totalPrice', cartPrice + article.price * parseInt(article.quantity))
    } else {
        localStorage.setItem('totalPrice', article.price * parseInt(article.quantity))
    }
}