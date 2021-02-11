



/*function pedirDatosProducto(){
    
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
*/