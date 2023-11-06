const registerForm = document.querySelector("#registerForm");

registerForm.addEventListener("submit", async (event) => {
	event.preventDefault();
	const data = new FormData(registerForm);
	const obj = {};
	data.forEach((value, key) => (obj[key] = value))
	await fetch("/api/sessions/register", {
		method: "POST",
		body: JSON.stringify(obj),
		headers: {
			"Content-Type": "application/json",
		},
	}).then(res => {
		if (res.status === 401) {
			alert(`Email already exist`);
		} else {

			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: 'Se creo usuario correctamente!',
				showConfirmButton: false,
				timer: 1500
			})

			setTimeout(() => {
				window.location = `/login`
			}, "3000");


		};
	}).catch(err => {
		return Swal.fire({
			icon: 'error',
			title: 'Error al crear usuario',
			text: `Error ${JSON.stringify(err)}`,
			footer: '<a href="">Consultar al administrador!</a>'
		})
	});
});