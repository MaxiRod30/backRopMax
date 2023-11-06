

const add = async (idProduct, cantidadActual) => {

    let dataProduct = await fetch(`/api/products/${idProduct}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(data => {
            return data.data
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al agregar el producto!',
                footer: `<a href="">${error}</a>`
            })
            window.location = `/products/?page=1`
        })

    if (dataProduct.stock >= (parseInt(cantidadActual) + 1)) {

        let dataUser = await fetch(`/api/sessions/current`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(data => {
                return data
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error al logiarse!',
                    footer: `<a href="/login">LOGIN!</a>`
                })
                return window.location = `/faillogin`
            })


        let raw = JSON.stringify({
            "quantity": parseInt(cantidadActual) + 1
        });

        let dataMod = await fetch(`/api/carts/${dataUser.cart}/products/${dataProduct._id}`, {
            method: "PUT",
            body: raw,
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(data => {
                window.location = `/cart`
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error en la base de datos!',
                    footer: `<a href="">Contacte a administrador!</a>`
                })
                window.location = `/products/?page=1`
            })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Material sin stock!',
            footer: `<a href="">Contacte al vendedor!</a>`
        })
    }
}

const sub = async (idProduct, cantidadActual) => {

    let dataProduct = await fetch(`/api/products/${idProduct}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(data => {
            return data.data
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al buscar el producto!',
                footer: `<a href="">${error}</a>`
            })
            window.location = `/products/?page=1`
        })

    if (parseInt(cantidadActual) != 0) {

        let dataUser = await fetch(`/api/sessions/current`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(data => {
                return data
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error al logiarse!',
                    footer: `<a href="/login">LOGIN!</a>`
                })
                return window.location = `/faillogin`
            })


        let raw = JSON.stringify({
            "quantity": parseInt(cantidadActual) - 1
        });

        let dataMod = await fetch(`/api/carts/${dataUser.cart}/products/${dataProduct._id}`, {
            method: "PUT",
            body: raw,
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(data => {
                window.location = `/cart`
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error en la base de datos!',
                    footer: `<a href="">Contacte a administrador!</a>`
                })
                window.location = `/products/?page=1`
            })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Agregue productos!',
            text: 'Producto con cantidad 0',
        })
    }
}

const deleteProd = async (idProduct) => {

    let dataProduct = await fetch(`/api/products/${idProduct}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(data => {
            return data.data
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al buscar el producto, vuelva a intentarlo!',
            })
            window.location = `/products/?page=1`
        })

    let dataUser = await fetch(`/api/sessions/current`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(data => {
            return data
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al logiarse!',
                footer: `<a href="/login">LOGIN!</a>`
            })
            return window.location = `/faillogin`
        })


        let dataDELETE = await fetch(`/api/carts/${dataUser.cart}/products/${dataProduct._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(data => {
                window.location = `/cart`
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de la base de datos!',
                    text: 'No se pudo borrar del carrito!',
                    footer: `<a href="/login">LOGIN!</a>`
                })
                return window.location = `/cart`
            })
}

const finalizarCompra = async () => {

    let dataUser = await fetch(`/api/sessions/current`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(data => {
            return data
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al logiarse!',
                footer: `<a href="/login">LOGIN!</a>`
            })
            return setTimeout(() => {
                window.location = `/faillogin`
              }, "2000");
        })


        let cartPurchase = await fetch(`/api/${dataUser.cart}/purchase`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(data => {
                if(data.error){
                    return  Swal.fire({
                        icon: 'error',
                        title: 'Sin productos en el carrito!',
                        text: 'Agregue productos!',
                    })
                }
                
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Compra realizada con exito!',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  
                  setTimeout(() => {
                    window.location = `/products/?page=1`
                  }, "2000");
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de la base de datos!',
                    text: 'No se pudo realizar el ticket!',
                })
                return window.location = `/cart`
            })
}