(async function() {
    
    displayCart()


})()


function displayCart() {
    let cartArticles = localStorage.getItem("article")
    cartArticles = JSON.parse(cartArticles)

    if (cartArticles ) {
        document.getElementById("main").innerHTML += ''
        Object.values(cartArticles).map(item => {
            document.getElementById("main").innerHTML +=`
            <div class="article">
                <p>X</p>
                <span>${item.name}</span>
            </div>
            `
        })
    }
}