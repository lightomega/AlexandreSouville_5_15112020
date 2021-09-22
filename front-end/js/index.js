/*la fonction principale du code, auto appelée, qui execute les autres fonctions*/
(async function() {

    const articles = await getArticles()
    
    for (article of articles) {
        let articlePrice = parseInt(`${article.price}`)/100
        displayArticle(article, articlePrice)
    }

    onLoadCartNumbers()
})()

/*on crée ici une fonction qui avec un fetch qui va récupérer les données sur l'API
puis on stocke la fonction dans une constante*/
function getArticles() {
    return fetch("http://localhost:3000/api/furniture")
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

/*on se sert de la constante précédemment créée pour l'insérer en tant que paramètre
de la fonction qui affiche les articles et on passe l'id du produit dans l'URL*/
function displayArticle(article, articlePrice) {
    document.getElementById("main").innerHTML += `
    <div class="card w-10 p-0 mb-5 mx-2 col-7 col-xl-3 col-lg-5 col-md-5 col-sm-7"><a href="Produit.html?id=${article._id}" id="lien_produit">
        <img id="image-article" class="card-img-top" src="${article.imageUrl}" alt="Card image cap">
        <div class="card-body">  
            <h5 id="nom-article" class="card-title">${article.name}</h5>
            <p id="description-article" class="card-text">${article.description}</p>
            <p id="prix-article" class="card-text">Prix : ${articlePrice}€</p>
        </div>
    </a></div>`
}

/*on affiche un compteur d'articles pour le panier */
function onLoadCartNumbers() {
    let articleNumbers = localStorage.getItem('articleNumbers')

    if(articleNumbers) {
        document.querySelector('.panier span').textContent = articleNumbers
    }
}