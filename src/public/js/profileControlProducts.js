const registerForm = document.querySelector("#registerForm");

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(registerForm);
    const obj = {};
    data.forEach((value, key) => (obj[key] = value))
    await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
        },
    }).then(res => res.ok ? res.json() : Promise.reject(res))
        .then(data => {
            if (data.error) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Error ${data.error}`,
                    footer: '<a href="">Consultar al administrador!</a>'
                })
            }
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto guardado!',
                showConfirmButton: false,
                timer: 1500
            })
            registerForm.reset()
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al guardar el producto!',
                footer: '<a href="">Consultar al administrador!</a>'
            })

        })
});