function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.querySelector('.toggle-password');
    const isPasswordVisible = passwordInput.getAttribute('type') === 'text';

    if (isPasswordVisible) {
        passwordInput.setAttribute('type', 'password');
        passwordToggle.innerHTML = `<i class="fa fa-eye"></i> `; // Remove the text content
        
    } else {
        passwordInput.setAttribute('type', 'text');
        passwordToggle.innerHTML = ''; // Remove the text content
        passwordToggle.innerHTML = `<i class="fa fa-eye-slash"></i>`; 
    }
}

const loginForm = document.querySelector("#restoreForm");

loginForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const data = new FormData(loginForm);
	const obj = {};
	data.forEach((value, key) => (obj[key] = value))

	await fetch("/api/sessions/restorePassword", {
		method: "POST",
		body: JSON.stringify(obj),
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => {
		if (res.status == 401) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Datos incorrectos!'
			})
		}

		if (res.status == 200){
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: 'Se le envio un correo para recuperar la contraseña',
				showConfirmButton: false,
				timer: 2000
			  })

			  setTimeout(() => {
				window.location.replace("/login");
			  }, 2000);
			
		} 

	}).catch(err => {
		return `Catch error: ${err}`
	});

});