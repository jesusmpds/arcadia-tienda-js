
// Variables ---->
let i = 0
let listaProductos = []
let productosEnCarrito = []
let containerCarrito = $("#carritoBody")
let containerTops = $("#topsTienda")
let containerCalzas = $("#calzasTienda")

// Objetos ---->  

class Producto {
    constructor(id,nombre, precio, cantidad, talla,imagen){
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.cantidad = cantidad
        this.talla = talla
        this.imagen = imagen
    }
}