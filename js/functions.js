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
    removerAlerta()
}

//Funcion que remueve el alerta de añadir talla al producto
function removerAlerta(){
    let elementoAlerta = $("div.alert.alert-danger")
    if(elementoAlerta !== null){
        elementoAlerta.remove()
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


function alertAñadidoAlCarrito(){
    Swal.fire(
        '¡Genial!',
        'Se añadió tu producto al carrito',
        'success'
      )
}
//Crea los productos en el carrito
function crearProductos (){
    let carritoStorage = JSON.parse(localStorage.getItem("carrito"))
    
    limpiarDuplicadosCarrito()
    
    if(carritoStorage !== null){
        for(i = 0; i < carritoStorage.length; i++){
        let nombreEnCarro = carritoStorage[i].nombre
		let precioEnCarro = carritoStorage[i].precio
		let cantidadEnCarro = carritoStorage[i].cantidad
		let tallaEnCarro = carritoStorage[i].talla
		let imagenEnCarro = carritoStorage[i].imagen
		let cantidadTotalProductos = cantidadEnCarro + carritoStorage[i].cantidad
		let precioTotal = precioEnCarro + carritoStorage[i].precio
		
		const ROW_RESUMEN = $(`<p class="row">TOTAL(${cantidadTotalProductos}productos $${precioTotal}</p>`)
		const DIV_PRODUCTOS = $(`<div class="col-12 d-flex justify-content-between"></div>`)
		const IMG_PRODUCTO = $(`<img src="${imagenEnCarro}"> class="w-25"`)
		const INFO_PRODUCTO = $(`<div></div>`)
		const NOMBRE_PRODUCTO = $(`<p>${nombreEnCarro}</p>`)
		const TALLA_PRODUCTO = $(`<input type="button" value="${tallaEnCarro}"></input>`)
		const PRECIO_PRODUCTO = $(`<p>${precioEnCarro}</p>`)
		
		INFO_PRODUCTO.append(NOMBRE_PRODUCTO,TALLA_PRODUCTO,PRECIO_PRODUCTO)
		DIV_PRODUCTOS.append(IMG_PRODUCTO,INFO_PRODUCTO)
		containerCarrito.append(ROW_RESUMEN,DIV_PRODUCTOS)
        }
    }
}

//Cuando se hace click en el boton del carrito se generan los productos
$(".icon-cart").click(crearProductos())

function limpiarDuplicadosCarrito(){
    // Asigno el elemento padre a la variable place
    let place = $(containerCarrito)
    // Uso un while para que mientras el nodo padre tenga hijos, los vaya eliminando
    while (place.firstChild){
        place.remove(place.firstChild);
      }
    }

