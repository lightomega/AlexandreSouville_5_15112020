(async function() {

    displayOrderId()

})()

function displayOrderId() {
    const orderId = document.querySelector("#main")

    orderId.innerText = localStorage.getItem("orderId")

    localStorage.clear()
}