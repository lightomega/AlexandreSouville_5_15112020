(async function() {
    const articleId = getArticleId()
    const article = await getArticle(articleId)
    console.log(article)
    displayArticle(article)
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


let carts = document.querySelectorAll('.add-cart')

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers()
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers')
console.log("running")
    if(productNumbers) {
        document.querySelector('.panier span').textContent = productNumbers
    }
}

function cartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers')
    

    productNumbers = parseInt(productNumbers)
    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1)
        
        document.querySelector('.panier span').textContent = productNumbers + 1
    } else {
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('.panier span').textContent = 1
    }
    
}
