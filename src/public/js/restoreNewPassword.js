const loginForm = document.querySelector("#restoreNewPasswordForm");

loginForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const data = new FormData(loginForm);
	const obj = {};
	data.forEach((value, key) => (obj[key] = value))

	await fetch("/api/sessions/restoreNewPassword", {
		method: "POST",
		body: JSON.stringify(obj),
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => {
		if (res.status == 404) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Contraseña igual a la de antes"
			})
		}
		if (res.status == 200){
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: 'Se cambio contraseña correctamente!',
				showConfirmButton: false,
				timer: 1500
			  })

			  setTimeout(() => {
				window.location.replace("/login");
			  }, 2000);
			
		} 

	}).catch(err => {
		return `Catch error: ${err}`
	});

});