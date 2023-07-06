const socket = io();

function updateProducts(products) {
  const ul = document.getElementById("listaProducts");
  ul.innerHTML = '';

  products.forEach(product => {
    const li = document.createElement('li');
    li.textContent = product.title;
    li.className = "real-time-item";
    ul.appendChild(li);
  });
};

socket.on("products", products => {
  updateProducts(products);
});