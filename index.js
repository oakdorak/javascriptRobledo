const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
            wrapper.style.transform = `translateX(${-100 * index}vw)`;
        });
});
const gomas = [ {
    sabor : "mora",
    mg : 10,
    precio : 100,
    stock : true
},
    {
    sabor : "fresa",
    mg : 15,
    precio : 150,
    stock : true
}]

console.log(gomas[0])