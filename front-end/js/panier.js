(async function() {
    
    
    
    const articleName = document.querySelector(".card-title")
    let articlePrice = document.getElementById("prix-article")
    const articleId = document.querySelector(`${article._id}`)
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
    
    
    
    
})()








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
        articleInCard[article.quantity] += 1
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

onLoadCartNumbers()