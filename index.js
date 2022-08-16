document.addEventListener("DOMContentLoaded" , () => {
    fetchData()
})

const fetchData = async () => {
    try{
        const res = await fetch('api.json')
        const data = await res.json()
        console.log(data)
        pintarProductos(data)
        detectarBotones(data)
    } catch (error){
        console.log(error)
    }
}

const contenedorProductos = document.querySelector('#contenedor-productos')
const pintarProductos = (data) =>{
    const template = document.querySelector('#template-productos').content
    const fragment = document.createDocumentFragment()
    
    data.forEach(producto => {
        template.querySelector('img').setAttribute('src', producto.thumbnailUrl)
        template.querySelector('h4').textContent = producto.title
        template.querySelector('p').textContent = producto.precio
        template.querySelector('button').dataset.id = producto.id
        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })
    contenedorProductos.appendChild(fragment)
}

let carrito = {

}

const detectarBotones = (data) => {
    const botones = document.querySelectorAll('.card button')

    botones.forEach(btn => {
        btn.addEventListener('click', () =>{
            const producto = data.find(item => item.id === parseInt(btn.dataset.id))
            producto.cantidad = 1
            //console.log(carrito)
            if (carrito.hasOwnProperty(producto.id)) {
                producto.cantidad = carrito[producto.id].cantidad + 1
            }
            console.log(carrito)
            
            carrito[producto.id] = { ...producto}
            pintarCarrito ()

        })

    })
}
const items = document.querySelector('#items')

const pintarCarrito = () => {

    items.innerHTML = ""

    const template = document.querySelector('#template-carrito').content
    const fragment = document.createDocumentFragment()

    Object.values(carrito).forEach(producto =>{
        console.log(producto)
        template.querySelector('th').textContent = producto.id
        template.querySelectorAll('td')[0].textContent = producto.title
        template.querySelectorAll('td')[1].textContent = producto.cantidad
        template.querySelectorAll('td')[3].textContent = producto.precio * producto.cantidad

        template.querySelector('.btn-success').dataset.id = producto.id
        template.querySelector('.btn-warning').dataset.id = producto.id

        const clone = template.cloneNode(true)
        fragment.appendChild(clone)

    })
    items.appendChild(fragment)

    pintarFooter()
    accionBotones()
}

const footer = document.getElementById('footer-carrito')
const pintarFooter = () => {
    footer.innerHTML = ""
    
    const template = document.querySelector('#template-footer').content
    const fragment = document.createDocumentFragment()

    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0)

    template.querySelectorAll('td')[0].textContent = nCantidad
    template.querySelector('span').textContent = nPrecio
    console.log(nPrecio)

    const clone = template.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)
    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click',() => {
        carrito = {}
        pintarCarrito()
    })
}

const accionBotones = () => {
    const botonesAgregar =  document.querySelectorAll('#items .btn-success')
    const botonesEliminar =  document.querySelectorAll('#items .btn-warning')

    botonesAgregar.forEach(btn => {
        btn.addEventListener('click', () => {
            const producto = carrito[btn.dataset.id]
            producto.cantidad ++
            carrito[btn.dataset.id] = {...producto}
            pintarCarrito()
        }) 
    })

    botonesEliminar.forEach(btn => {
        btn.addEventListener('click', () => {
            const producto = carrito[btn.dataset.id]
            producto.cantidad --
            if(producto.cantidad === 0) {
                delete carrito[btn.dataset.id]
            } else {
                carrito[btn.dataset.id] = {...producto}
            }
            pintarCarrito()
        }) 
    })
}

const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        wrapper.style.transform = `translateX(${-100 * index}vw)`;
    });
})