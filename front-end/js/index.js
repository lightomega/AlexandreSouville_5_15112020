(async function() {
    const articles = await getArticles()
    console.log(articles)
    displayArticles(articles)
})()

function getArticles() {
    return fetch("http://localhost:3000/api/furniture")
        .then(function(httpNameResponse) {
           return httpNameResponse.json()
        })
        .then(function(articles) {
            return articles
        })
        .catch(function(error) {
            alert(error)
        })
}

function displayArticles() {
    const templateElt = document.getElementById("templateArticle")
    const cloneElt = document.importNode(templateElt.contentEditable, true)

    cloneElt.getElementById
}