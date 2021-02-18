
// Variables ---->
let i = 0
let listaProductos = []
let productosEnCarrito = []
let containerCarrito = document.getElementById("carritoBody")
let containerTops = document.getElementById("topsTienda")
let containerCalzas = document.getElementById("calzasTienda")

// Objetos ---->  

class Producto {
    constructor(nombre, precio, cantidad, talla,imagen){
        this.nombre = nombre
        this.precio = precio
        this.cantidad = cantidad
        this.talla = talla
        this.imagen = imagen
    }
}

listaProductos = {

    "tops":[{
        "id":"1",
        "nombre":"Top Ladypink",
        "precio": 2000,
        "talla": ["S","M","L"],
        "imagen": "../images/tops/top-ladypink.jpeg",
    },{
        "id":"2",
        "nombre":"Top Laura",
        "precio":1500,
        "talla": ["S","M","L"],
        "imagen": "../images/tops/top-laura.jpg",
    },{
        "id":"3",
        "nombre":"Top Beige",
        "precio":1900,
        "talla": ["S","M","L"],
        "imagen": "../images/tops/Top-beige.jpg",
    },{
        "id":"4",
        "nombre":"Top Black",
        "precio":1800,
        "talla": ["S","M","L"],
        "imagen": "../images/tops/top-black.jpg",
    }],
    
    "calzas":[{
    
        "id":"5",
        "nombre":"Calza Dakota",
        "precio":3200,
        "talla": ["S","M","L"],
        "imagen": "../images/calzas/calza-dakota.jpg",
    },{
    
        "id":"6",
        "nombre":"Calza Jhonson",
        "precio":3100,
        "talla": ["S","M","L"],
        "imagen": "../images/calzas/calza-jhonson.jpg",
    },{
    
        "id":"7",
        "nombre":"Calza Mesh",
        "precio":3000,
        "talla": ["S","M","L"],
        "imagen": "../images/calzas/Calza-Mesh.jpg",
    },{
    
        "id":"8",
        "nombre":"Calza Corta Flower",
        "precio":2900,
        "talla": ["S","M","L"],
        "imagen": "../images/calzas/calza-corta-flower.jpeg",
    }]
}
