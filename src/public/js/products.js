let inputBuscador = document.getElementById("buscador")
let busq = document.getElementById("optionOrden")
let btnBusq = document.getElementById("btnBuscar")
let inputBuscadorStock = document.getElementById("buscadorStock")
let btnBusqStock = document.getElementById("btnBuscarStock")
let btnAgregar = document.getElementById("btn1")

busq.addEventListener("change", () => {

    if (busq.value == "1") {
        window.location = `?sort=desc`;
    } else if (busq.value == "2") {
        window.location = `?sort=asc`;
    } else {
        window.location = `?sort=asc`;
    }
})

btnBusq.addEventListener("click", () => {
    window.location = `?query=${inputBuscador.value.toLowerCase()}`;
});

const addProduct= (idProduct)=>{
    alert("hola")
    alert(idProduct)
}

// btnAgregar.addEventListener("click", async () => {
//     alert("hola")

//     await fetch("/api/sessions/current", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     })
//         .then(res => res.ok ? res.json() : Promise.reject(res))
//         .then(data => {

//             console.log(data)

//         })
//         .catch(error => {
//             console.log(error)
//         })

// })


btnBusqStock.addEventListener("click", () => {
    window.location = `?stock=${inputBuscadorStock.value.toLowerCase()}`;
})