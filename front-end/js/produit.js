//On crée une foncrion async pour pouvoir faire un await
(async function() {
    const articleId = getArticleId()
    const article = await getArticle(articleId)
    

    console.log(article)
    displayArticle(article)

    
    const articleName = document.querySelector(".card-title")
    let articlePrice = article.price
    const articleImage = article.imageUrl
    
    
    
    
    
    let carts = document.querySelector(".add-cart")

    
    carts.addEventListener('click', () => {
    
        let quantity = document.querySelector('#quantité')

        if (quantity.value > 0 && quantity.value < 100) {
            let article = {
            name : articleName.innerHTML,
            image : articleImage,
            price : parseInt(articlePrice)/100,
            quantity : parseFloat(quantity.value)
            }
        cartNumbers(article)
        console.log(localStorage.getItem('article'))  
        totalPrice(article)
        } else {
            console.log('erreur')
        }
          
        })
        onLoadCartNumbers()
        

    

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

function displayArticle(article, articlePrice) {
    document.getElementById("main").innerHTML += `
    <div class="card col-2">
        <img id="image-article" class="card-img-top" src="${article.imageUrl}" alt="Card image cap">
        <div class="card-body">  
            <h5 id="nom-article" class="card-title">${article.name}</h5>
            <p id="description-article" class="card-text">${article.description}</p>
            <p id="prix-article" class="card-text">${parseInt(article.price)/100}€</p>
            <p id quantité-article class="card-text">
            <label for="quantité">Quantité</label>
            <input type="number" id="quantité" name="quantité" value="1" min="1" max="100"</p>
            <a class="add-cart btn btn-outline-primary" href="#">Ajouter au panier</a>
        </div>
    </div>`
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
    
       
    if(localStorage.getItem("article") !== null){
        articleInCard = JSON.parse(localStorage.getItem("article"))
        localStorage.setItem('articleNumbers', articleNumbers + article.quantity)
        document.querySelector('.panier span').textContent = articleNumbers + article.quantity
    } else {
        localStorage.setItem('articleNumbers', article.quantity)
        
        
        document.querySelector('.panier span').textContent = article.quantity
    } 
    articleInCard.push(article)
    localStorage.setItem("article", JSON.stringify(articleInCard))
}

function totalPrice(article) {
    let cartPrice = localStorage.getItem('totalPrice')

    if(cartPrice != null) {
        cartPrice = parseInt(cartPrice)
        localStorage.setItem('totalPrice', cartPrice + article.price * parseInt(article.quantity))
    } else {
        localStorage.setItem('totalPrice', article.price * parseInt(article.quantity))
    }
}


