function main() {
    const idOrder = document.getElementById("orderId");
    idOrder.innerHTML = localStorage.getItem("orderId");
    localStorage.clear();
}

main();