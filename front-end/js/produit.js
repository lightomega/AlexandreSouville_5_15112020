//On crée une foncrion async pour pouvoir faire un await
(async function() {
    const id = getArticleId()
    const article = await getArticle(id)

    displayArticle(article)
    addToCart(article, id)
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

function displayArticle(article) {
    document.getElementById("main").innerHTML += `
    <div class="card p-0 col-9 col-lg-3 col-md-5 col-sm-7">
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

function addToCart (article, id) {
    const articleName = document.querySelector(".card-title")
    let articlePrice = article.price
      
    const articleImage = article.imageUrl
    let carts = document.querySelector(".add-cart")


    carts.addEventListener('click', () => {

    let quantity = document.querySelector('#quantité')

    if (quantity.value > 0 && quantity.value < 100) {

        let articleAdded = {
        name: articleName.innerHTML,
        _id: id,
        image: articleImage,
        price: parseInt(articlePrice)/100,
        quantity: parseFloat(quantity.value)
        }

        cartNumbers(articleAdded)

        console.log(localStorage.getItem('article'))  

        totalPrice(articleAdded)

        document.getElementById("confirmation-text").innerHTML += `le produit a bien été ajouté au panier!`
        setTimeout("location.reload(true);", 2000)

        } else {

            document.getElementById("confirmation-text").innerHTML += `la quantité doit être comprise entre 1 et 100`
            setTimeout("location.reload(true);", 2000)
        }
        
    })
}

function onLoadCartNumbers() {
    let articleNumbers = localStorage.getItem('articleNumbers')

    if(articleNumbers) {
        document.querySelector('.panier span').textContent = articleNumbers
    }
}

function cartNumbers(articleAdded) {
    console.log("le produit est ", articleAdded.name)
    let articleNumbers = localStorage.getItem('articleNumbers')
    articleNumbers = parseInt(articleNumbers)
    
    let articleInCard = []
    
       
    if(localStorage.getItem("article") !== null){
        articleInCard = JSON.parse(localStorage.getItem("article"))
        localStorage.setItem('articleNumbers', articleNumbers + articleAdded.quantity)
        document.querySelector('.panier span').textContent = articleNumbers + articleAdded.quantity
    } else {
        localStorage.setItem('articleNumbers', articleAdded.quantity)
        
        
        document.querySelector('.panier span').textContent = articleAdded.quantity
    } 
    articleInCard.push(articleAdded)
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


