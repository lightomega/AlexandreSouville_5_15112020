(async function() {

    displayOrderId()

})()

function displayOrderId() {
    const confirmation = document.querySelector("#validation")

    confirmation.innerHTML +=`<p>Votre commande a bien été prise en compte! votre numero de commande est le ${localStorage.getItem("orderId")}` 

    
}