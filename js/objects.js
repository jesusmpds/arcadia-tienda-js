
// Variables ---->
let i = 0
let listaProductos = []
let productosEnCarrito = []
let containerCarrito = $("#carritoBody")
let containerTops = $("#topsTienda")
let containerCalzas = $("#calzasTienda")

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