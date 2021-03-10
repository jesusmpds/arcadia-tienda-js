function renderizarProductos (baseDeDatosProductos,accederTalla,container){
    
    for (let element of baseDeDatosProductos){

        // Div para crear la columna
        const DIV_COL = $('<div class="col-sm-6 col-md-4 col-xl-3"></div>')
        // div para crear la card
        const DIV_CARD = $('<div class="card"></div>')
        //img del producto
        let imgProducto = $(`<img class="card-img-top" src="${element["imagen"]}" alt="${element["nombre"]}" loading="lazy">`)
        // Card body
        const CARD_BODY = $('<div class="card-body"></div>')
        // Titulo de la card del producto
        let tituloProducto = $(`<h5 class="card-title">${element["nombre"]}</h5>`)
        // Div wrapper para el precio y talla 
        const DIV_WRAPPER = $('<div class="d-flex flex-row justify-content-between"></div>')
        // Precio
        let precioProducto = $(`<p class="card-title">${element["precio"]}</p>`)
        // Tallas : creo el tag ul y recorro el array de tallas creando los botones para cada talla
        // Añado un evento para añadirle al boton de agregar al carrito la talla que necesita.
        let listaTallas = $('<ul class="list-group list-group-horizontal"></ul>')
        for(let talla of accederTalla){
            let boton = document.createElement("button")
            $(boton).addClass("list-group-item p-2")
            $(boton).attr("producto",element.id)
            $(boton).text(talla)
            $(listaTallas).append(boton)
            $(boton).click(agregarTalla)
            }
        // Boton para agregar al carrito
        let btnAgregarCarrito = $(`<a class="btn btn-primary mt-4" producto="${element.id}">Agregar al carrito</a>`)
        btnAgregarCarrito.click(agregarCarrito)
        // Insertar tags dentro de cada una
        container.append(DIV_COL)
        DIV_COL.append(DIV_CARD)
        DIV_CARD.append(imgProducto,CARD_BODY)
        CARD_BODY.append(tituloProducto,DIV_WRAPPER,btnAgregarCarrito)
        DIV_WRAPPER.append(precioProducto,listaTallas)
        
        entrarEstilo(DIV_COL)
    }
}

// Animación de entrada productos
function entrarEstilo(elementos) {
    $(elementos).hide()
    $(elementos).fadeIn(2000)
}

//Añadir talla al boton de agregar carrito correspondiente. Añadir estilo
function agregarTalla (){
    let botonTalla = $(this).attr("producto")
    let arrayBotonesAgregarCarrito = $("a.btn.btn-primary.mt-4")
    let botonesTallas = $("button.list-group-item")
    for(i = 0; i < botonesTallas.length; i++){
        $(botonesTallas[i]).removeClass("selected")
    }
    $(this).addClass("selected")
    
    for (let i = 0; i < arrayBotonesAgregarCarrito.length; i++){
        $(arrayBotonesAgregarCarrito[i]).removeAttr("talla")
        if(botonTalla == $(arrayBotonesAgregarCarrito[i]).attr("producto")){
            $(arrayBotonesAgregarCarrito[i]).attr("talla",$(this).text())
        }
    }
}

//Añade alerta para que el usuario seleccione una talla
function alertaAñadirTalla() {
    Swal.fire({
        icon: 'error',
        title: '¡Oh no!',
        text: 'Elige una talla para añadir tu prenda al carrito',
      })
}

function alertAñadidoAlCarrito(){
    Swal.fire(
        '¡Genial!',
        'Se añadió tu producto al carrito',
        'success'
      )
}

//Añadir al carrito en LocalStorage para luego generar los elementos.
function agregarCarrito() {
    let productoId = $(this).attr("producto")
    let indexTops = listaProductos.tops.findIndex( index=> index.id  === productoId);
    let indexCalzas = listaProductos.calzas.findIndex( index=> index.id  === productoId);
    let tallaSeleccionada = $(this).attr("talla")
    
    if(localStorage.getItem("carrito") !== null){
        // Si no es null entonces a carrito le asigno el valor parseado de la clave "carrito" del storage
        productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
    }
    
    if(tallaSeleccionada == null) {
        alertaAñadirTalla()
    } else{
        if(indexTops == -1){
            let nuevoProductoCarrito = new Producto(listaProductos.calzas[indexCalzas].nombre,listaProductos.calzas[indexCalzas].precio, 1, tallaSeleccionada,listaProductos.calzas[indexCalzas].imagen)
            enCarrito(nuevoProductoCarrito,productosEnCarrito)
            
        } else if(indexCalzas == -1){
            let nuevoProductoCarrito = new Producto(listaProductos.tops[indexTops].nombre,listaProductos.tops[indexTops].precio, 1, tallaSeleccionada,listaProductos.tops[indexTops].imagen)
            enCarrito(nuevoProductoCarrito,productosEnCarrito)
        }
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
        alertAñadidoAlCarrito()
        crearProductos()
    }
}

// Funcion que incrementa la cantidad de un producto y evita duplicados
function enCarrito(nuevoProducto,arrayCarrito){
    if(arrayCarrito.length !== 0){
        for(let i = 0; i < arrayCarrito.length; i++){
            if(nuevoProducto.nombre === arrayCarrito[i].nombre && nuevoProducto.talla === arrayCarrito[i].talla){
                return arrayCarrito[i].cantidad++
            }
        }
    }
    arrayCarrito.push(nuevoProducto)
}



//Crea los productos en el carrito
function crearProductos (){
    let carritoStorage = JSON.parse(localStorage.getItem("carrito"))
    
    limpiarDuplicadosCarrito()
    
    if(carritoStorage !== null){
    //Creo resumen de la compra
        function cantidadResumen(productos,cantidad) {
            let total = 0
            productos.forEach(item => total += item[cantidad])
            return total
        }
        
        function precioResumen(productos,cantidad,precio) {
            let total = 0
            productos.forEach(item => total += (item[cantidad] * item[precio]))
            return total
        }
        
        let cantidadTotal = cantidadResumen(carritoStorage,"cantidad")
        let precioTotal = precioResumen(carritoStorage,"cantidad","precio")
        
        function unoOVariosProductos(){
            if(cantidadTotal === 1){
                return "producto"
            }else{
                return "productos"
            }
        }
            const DIV_RESUMEN = $("#precioTotal")
            const RESUMEN_CARRO = $(`<p class="row">TOTAL: ${cantidadTotal} ${unoOVariosProductos()} ($${precioTotal})</p>`)
            
            DIV_RESUMEN.append(RESUMEN_CARRO)
        
        // Creo productos en el carrito
        for(i = 0; i < carritoStorage.length; i++){
            let nombreEnCarro = carritoStorage[i].nombre
    		let precioEnCarro = carritoStorage[i].precio
    		let cantidadEnCarro = carritoStorage[i].cantidad
    		let tallaEnCarro = carritoStorage[i].talla
    		let imagenEnCarro = carritoStorage[i].imagen
    		
    		const DIV_PRODUCTOS = $("#listaProductosCarrito")
    		const PRODUCTO_DIV = $(`<div class="media border rounded w-100 mb-2"></div>`)
    		const DIV_IMAGEN = $(`<div class="col-6 col-md-4"></div>`)
            const IMG_PRODUCTO = $(`<img src="${imagenEnCarro}" class="mr-3 w-100">`)
            const DIV_INFO_PRODUCTO = $(`<div class="col-6 col-md-8 media-body p-3"></div>`)
            const DIV_NOMBRE_PRECIO = $(`<div class="row justify-content-between"></div>`)
            const HEADING_NOMBRE = $(`<h3 class="mt-0 ">${nombreEnCarro}</h3>`)
    		const HEADING_PRECIO= $(`<h3 class="pr-3"> $${precioEnCarro}</h3>`)
    		const HEADING_TALLA= $(`<h3 class="mt-5">Talla:<p class="d-inline"> ${tallaEnCarro}</p></h3>`)
    		const DIV_CANTIDAD_PRODUCTO = $(`<div class="d-flex justify-content-between mt-5" id="cantidadProducto"></div>`)
    		const SELECT = $(`<select></select>`)
    		const BOTON_REMOVER = $(`<button type="button" class="col-1 close" aria-label="Close"></button>`)
    		const BOTON_SPAN = $(`<span aria-hidden="true">&times;</span>`)
    		
    		//Añado los elementos
    		DIV_PRODUCTOS.append(PRODUCTO_DIV)
            PRODUCTO_DIV.append(DIV_IMAGEN,DIV_INFO_PRODUCTO,BOTON_REMOVER)
            DIV_IMAGEN.append(IMG_PRODUCTO)
            DIV_INFO_PRODUCTO.append(DIV_NOMBRE_PRECIO,HEADING_TALLA,DIV_CANTIDAD_PRODUCTO)
            DIV_CANTIDAD_PRODUCTO.append(SELECT)
            DIV_NOMBRE_PRECIO.append(HEADING_NOMBRE,HEADING_PRECIO)
    		BOTON_REMOVER.append(BOTON_SPAN)
    		// Creo Option tags del uno al 10 para la cantidad de productos y la añado al select
    		for(let i = 1; i< 11; i++){
    		    let option = $(`<option value="${i}">${i}</option>`)
    		    SELECT.append(option)
    		}
    		//Añadir valor de la cantidad al select
    		SELECT.val(cantidadEnCarro)
    		// TODO: SELECT.on()
        }   
    }
}
//Cuando se hace click en el boton del carrito se generan los productos
$(".icon-cart").click(crearProductos())

function limpiarDuplicadosCarrito(){
    $("#precioTotal").empty()
    $("#listaProductosCarrito").empty()
}