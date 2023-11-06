const socket = io();
let user;
let chatBox = document.getElementById("chatBox");
let boton = document.getElementById("actualizar")

fetch(`/api/sessions/current`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then(res => res.ok ? res.json() : Promise.reject(res))
  .then(data => {
    user = data.first_name
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


chatBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    socket.emit("message", { user, message: chatBox.value });
    chatBox.value = "";
  }
});



socket.on("messageLogs", async (data) => {
  let log = document.getElementById("messageLogs");
  let messages = "";
  await data.forEach((message) => {
    messages += `<p><strong>${message.user}</strong>: ${message.message}</p>`;
  });

  log.innerHTML = messages;
});

socket.on("messageConected", (data) => {
  let log = document.getElementById("messageLogs");
  log.innerHTML += `<p><strong>${data}</strong></p>`;
});