(async function() {

    displayOrderRecap()

})()
/*on affiche le numero de commande et le prix total du ls puis on vide le ls*/
function displayOrderRecap() {
    const confirmation = document.querySelector("#validation")

    confirmation.innerHTML +=`<div class="col-6">
    <p>Votre commande a bien été prise en compte! votre numero de commande est le ${localStorage.getItem("orderId")}<p>
    <p>Prix total : ${localStorage.getItem("totalPrice")}€<p>
    <a href="index.html">Retour<a>
    </div>` 
    
    localStorage.clear()
}
