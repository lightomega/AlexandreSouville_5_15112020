(async function() {
    const articles = await getArticles()
    console.log(articles)
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

let carts = document.querySelectorAll('.add-cart')

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers()
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers')

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

onLoadCartNumbers()