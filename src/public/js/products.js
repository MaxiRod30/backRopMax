let inputBuscador = document.getElementById("buscador")
let busq = document.getElementById("optionOrden")
let btnBusq = document.getElementById("btnBuscar")
let inputBuscadorStock = document.getElementById("buscadorStock")
let btnBusqStock = document.getElementById("btnBuscarStock")

busq.addEventListener("change", ()=>{

    if(busq.value == "1"){
        window.location = `?sort=desc`;
    }else if(busq.value =="2"){
        window.location = `?sort=asc`;
    }else{
        window.location = `?sort=asc`;
    }
})

btnBusq.addEventListener("click", ()=>{
     window.location = `?query=${inputBuscador.value.toLowerCase()}`;
})


btnBusqStock.addEventListener("click", ()=>{
     window.location = `?stock=${inputBuscadorStock.value.toLowerCase()}`;
})