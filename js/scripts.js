// Llamar a las Funciones ---->
$(document).ready(
    $.ajax({
        url:"../productos.json",
        type: "GET",
        dataType:"json",
    }).done(function (productos) {
        listaProductos = productos
        renderizarProductos (listaProductos.tops,listaProductos.tops[0].talla,containerTops),
        renderizarProductos (listaProductos.calzas,listaProductos.calzas[0].talla,containerCalzas)
        
        })
)
