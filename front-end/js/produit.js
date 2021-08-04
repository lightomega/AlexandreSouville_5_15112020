//On crée une foncrion async pour pouvoir faire un await
(async function() {
    const articleId = getArticleId()
    const article = await getArticle(articleId)
    console.log(article)
    displayArticle(article)

    const articleName = document.querySelector(".card-title")
    let articlePrice = document.getElementById("prix-article")
    
    articlePrice = parseInt(articlePrice.innerHTML)/100
    console.log(articleId)
    
    
    let carts = document.querySelector(".add-cart")

    
    carts.addEventListener('click', () => {
    
        let article = {
            name : articleName.innerHTML,
            price : articlePrice,
            quantity : 0
            }
        cartNumbers(article)
            
        })
        onLoadCartNumbers()

    console.log(localStorage.getItem('article'))

})()

function getArticleId() {
   return new URL(location.href).searchParams.get("id") 
}

function getArticle(articleId) {
    return fetch(`http://localhost:3000/api/furniture/${articleId}`)
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
            <a class="add-cart btn btn-outline-primary" href="#">Ajouter au panier</a>
        </div>
    </a></div>`
}


function onLoadCartNumbers() {
    let articleNumbers = localStorage.getItem('articleNumbers')

    if(articleNumbers) {
        document.querySelector('.panier span').textContent = articleNumbers
    }
}

function cartNumbers(article) {
    console.log("le produit est ", article.name)
    let articleNumbers = localStorage.getItem('articleNumbers')
    articleNumbers = parseInt(articleNumbers)
    let articleInCard = []

       
    if(localStorage.getItem("article") !== null && article.quantity !== null){
        articleInCard[article.quantity] ++
        articleInCard = JSON.parse(localStorage.getItem("article"))
        document.querySelector('.panier span').textContent = articleNumbers + 1
        localStorage.setItem('articleNumbers', articleNumbers + 1)
    } else {
        localStorage.setItem('articleNumbers', 1)
        
        
        document.querySelector('.panier span').textContent = 1
    } 
    articleInCard.push(article)
    localStorage.setItem("article", JSON.stringify(articleInCard))
    
    console.log(articleInCard)
    
}



