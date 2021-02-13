function renderizarProductos (baseDeDatosProductos,accederTalla,container){

    for (let element of baseDeDatosProductos){

        // Div para crear la columna
        let divCol = document.createElement("div")
        divCol.classList.add('col-sm-6', 'col-md-4', 'col-xl-3')
        // div para crear la card
        let divCard = document.createElement("div")
        divCard.classList.add('card')
        //img del producto
        let imgProducto = document.createElement("img")
        imgProducto.classList.add('card-img-top')
        imgProducto.setAttribute("src",element["imagen"])
        imgProducto.setAttribute("alt",element["nombre"])
        imgProducto.setAttribute("loading","lazy")
        // Card body
        let cardBody = document.createElement("div")
        cardBody.classList.add("card-body")
        // Titulo de la card del producto
        let tituloProducto = document.createElement("h5")
        tituloProducto.classList.add("card-title")
        tituloProducto.textContent = element["nombre"]
        // Div wrapper para el precio y talla 
        let divWrapper = document.createElement("div")
        divWrapper.classList.add("d-flex", "flex-row", "justify-content-between")
        // Precio
        let precioProducto = document.createElement("p")
        precioProducto.classList.add("card-text", "align-self-center")
        precioProducto.textContent = `$ ${element["precio"]} `
        // Tallas : creo el tag ul y recorro el array de tallas creando los botones para cada talla
        // Añado un evento para añadirle al boton de agregar al carrito la talla que necesita.
        let listaTallas = document.createElement("ul")
        listaTallas.classList.add("list-group","list-group-horizontal")
            for(let talla of accederTalla){
             boton = document.createElement("button")
             boton.classList.add("list-group-item", "p-2")
             boton.textContent = talla
             boton.setAttribute("producto",element.id)
             boton.addEventListener("click",añadirTalla)
             listaTallas.appendChild(boton)
            }
        // Boton para agregar al carrito
        let btnAgregarCarrito = document.createElement("a")
        btnAgregarCarrito.classList.add("btn", "btn-primary", "mt-4")
        btnAgregarCarrito.setAttribute("producto",element.id)
        btnAgregarCarrito.textContent = "Agregar al carrito"
        
        // Insertar tags dentro de cada una
        container.appendChild(divCol)
        divCol.appendChild(divCard)
        divCard.append(imgProducto,cardBody)
        cardBody.append(tituloProducto,divWrapper,btnAgregarCarrito)
        divWrapper.append(precioProducto,listaTallas)
    }
}

//Añadir talla al boton de agregar carrito correspondiente. Añadir estilo
function añadirTalla (){
    let botonTalla = this.getAttribute("producto")
    let arrayBotonesAgregarCarrito = document.querySelectorAll("a.btn.btn-primary.mt-4")
    let botonesTallas = document.querySelectorAll("button.list-group-item")
    for(i = 0; i < botonesTallas.length; i++){
        botonesTallas[i].classList.remove("selected")
    }
    this.classList.add("selected")
    
    for (let i = 0; i < arrayBotonesAgregarCarrito.length; i++){
        arrayBotonesAgregarCarrito[i].removeAttribute("talla")
        if(botonTalla == arrayBotonesAgregarCarrito[i].getAttribute("producto")){
            arrayBotonesAgregarCarrito[i].setAttribute("talla",this.textContent)
        }
    }
}
