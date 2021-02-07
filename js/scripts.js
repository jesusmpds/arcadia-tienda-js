/*
1)Saludar
2)Pedir el nombre del producto, talla y cantidad al cliente
3)Convertir ese texto a un Array
4)Revisar si hay en Stock comparando con los productos existentes
5)Avisar que hay stock o no. Si hay stock agregar al carrito
6)Preguntar si quiere agregar más artículo o intentar de nuevo
7)Si quiere agregar más ir al paso 2)
8) Si no quiere agregar más mostrar el usuario el resumen de la compra
*/

alert("¡Bienvenido a tu carrito interactivo! Responde las siguientes preguntas y tomaremos tu pedido")

// Variables ---->
let datosProductoIngresado = ""
let listaProductos = []
let productosEnCarrito = []

// Objetos ---->
class Usuario {
    constructor(nombre,apellido,email){
        this.nombre = nombre
        this.apellido = apellido
        this.email = email
    }
}

class Producto {
    constructor(nombre, precio, cantidad, talla){
        this.nombre = nombre
        this.precio = precio
        this.cantidad = cantidad
        this.talla = talla
        
    }
}

class Carrito {
    constructor(articuloNombre, articuloPrecio, cantidad, articuloTalla){
        this.articuloNombre = articuloNombre
        this.articuloPrecio = articuloPrecio
        this.cantidad = cantidad
        this.talla = articuloTalla
    }
    mostrarDatos() {
        return this.nombre, this.precio, this.cantidad, this.talla
    }
}

// Productos

let producto1 = new Producto("toplaura",1500)
let producto2 = new Producto("topblack",1800)
let producto3 = new Producto("topbeige",1600)
listaProductos.push(producto1, producto2, producto3)
console.log(producto3)

//Declaracion de Funciones ---->

function pedirDatosProducto(){
    
    datosProductoIngresado = prompt("¿Cuál prenda quisiera llevar?", 
        "Ingrese el nombre, talla y cantidad separado por comas")
    
	datosProductoIngresado = formatearTexto(datosProductoIngresado)
	datosProductoIngresado = conversionArray(datosProductoIngresado)
	datosProductoIngresado = new Producto (datosProductoIngresado[0], undefined, parseInt(datosProductoIngresado[2]),datosProductoIngresado[1] )

    while(datosProductoIngresado == "" || datosProductoIngresado == null){
        datosProductoIngresado = prompt("Debe ingresar los datos de la prenda", 
        "Ingrese uno por vez.")
    }
	console.log(datosProductoIngresado)
    return datosProductoIngresado
    
}

function formatearTexto(texto){
	return texto.replace(/ /g,"").toLowerCase()
}

function conversionArray (texto2){
	return texto2.split(",")
}

function buscarPrenda(array,producto) {

    hayStock = false
	for (var i = 0; i < array.length; i++){
		if(array[i].nombre == producto.nombre){
			alert("Hay stock")
			hayStock = true
			agregarPrecio(i,producto,array)
			agregarAlCarrito(datosProductoIngresado)
			break
		}
	}
	if (!hayStock){
    alert(`Esa prenda no está en nuestro inventario`)
    }
}

function agregarPrecio(i,producto, productoBD){
	return producto.precio = productoBD[i].precio
}

function agregarAlCarrito(producto){
	let carrito1 = new Carrito(producto.nombre, producto.precio, producto.cantidad, producto.talla)
	productosEnCarrito.push(carrito1)
	return productosEnCarrito
}

function pedirMasProductos () {
	let agregarMas = "no"
	agregarMas = prompt("¿Desea agregar más prendas?", "Si o No")
	agregarMas = formatearTexto(agregarMas)
	while (agregarMas == "si"){
		pedirDatosProducto()
		buscarPrenda(listaProductos,datosProductoIngresado)
		agregarMas = prompt("¿Desea agregar más prendas?", "Si o No")
		agregarMas = formatearTexto(agregarMas)
	}
	
}

function resumenDelPedido (array){
	for(var i = 0; i < array.length; i++){
		alert(`Prenda: ${array[i].articuloNombre} - Talla: ${array[i].talla} - Cantidad: ${array[i].cantidad} - Precio: ${array[i].articuloPrecio}`)
		total = 0
		total = parseInt(total + array[i].articuloPrecio * array[i].cantidad)	
	}
	alert(`Total: ${total}`)
}

// Llamar a las Funciones ---->
pedirDatosProducto()
buscarPrenda(listaProductos,datosProductoIngresado)
console.log(productosEnCarrito[0])
pedirMasProductos()
resumenDelPedido(productosEnCarrito)


