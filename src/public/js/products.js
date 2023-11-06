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

const addProduct = async (idProduct) => {

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
				text: 'Producto no encontrado!',
				footer: '<a href="">Consultar al administrador!</a>'
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
			return window.location = `/faillogin`
		})

	if (dataProduct.owner == dataUser.email) {
		return Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'No puede agregar un producto creado por usted!',
		})
	}
	
	await fetch(`/api/carts/${dataUser.cart}/product/${dataProduct._id}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(res => res.ok ? res.json() : Promise.reject(res))
		.then(data => {
			if (data.error) {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Sin stock de este producto!',
					footer: '<a href="">Consultar al vendedor!</a>'
				})
			}
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: 'Se agrego al carrito!',
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
				title: 'Oops...',
				text: `Error ${JSON.stringify(error)}`,
				footer: '<a href="">Consultar al administrador!</a>'
			})

		})
}

btnBusqStock.addEventListener("click", () => {
	window.location = `?stock=${inputBuscadorStock.value.toLowerCase()}`;
})