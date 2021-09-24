(async function() {

    displayOrderRecap()

})()
/*on affiche le numero de commande et le prix total du ls puis on vide le ls*/
function displayOrderRecap() {
    
    document.getElementById("main").innerHTML +=`<div class="card mb-5 pt-4 col-9 d-flex align-items-center justify-content-center container-fluid">
    <p class="mb-5">Votre commande a bien été prise en compte! votre numero de commande est le <span class="text-success">${localStorage.getItem("orderId")}<span><p>
    <p class="mb-5">Prix total : ${localStorage.getItem("totalPrice")}€<p>
    <a href="index.html" class="mt-4 btn btn-outline-secondary align-bottom">Retour</a>
    </div>` 
    
    localStorage.clear()
}