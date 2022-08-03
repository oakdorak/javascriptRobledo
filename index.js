const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");
const carrito = document.querySelectorAll( ".anadir, .btn");

for (i = 0; i < carrito.length; i++) {
    carrito[i].addEventListener("click", () => {
        console.log("Añadido al carrito");
    });
}

menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        wrapper.style.transform = `translateX(${-100 * index}vw)`;
    });
})

const gomaMora = {
    sabor : "mora",
    mg : 10,
    precio : 100,
    stock : true
}

const gomaFresa = {
    sabor : "fresa",
    mg : 15,
    precio : 150,
    stock : true
}

const gomas = [gomaMora,gomaFresa]

console.log(gomas)