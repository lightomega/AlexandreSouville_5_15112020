(async function() {
    const articles = await getArticles()
    console.log(articles)
    for (article of articles) {
        displayArticle(article)
    }
})()

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

function displayArticle(article) {
    document.getElementById("main").innerHTML += `
    <div class="card col-2"><a href="Produit.html?id=${article._id}" id="lien_produit">
        <img id="image-article" class="card-img-top" src="${article.imageUrl}" alt="Card image cap">
        <div class="card-body">  
            <h5 id="nom-article" class="card-title">${article.name}</h5>
            <p id="description-article" class="card-text">${article.description}</p>
            <p id="prix-article" class="card-text">${article.price}</p>
        </div>
    </a></div>`
}