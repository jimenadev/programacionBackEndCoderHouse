const socket = io();

let user;
const productos = document.getElementById("products");

window.addEventListener("load", (event) => {
      socket.emit("listProducts");
});

socket.on("products", (data) => {
  console.log("🚀 ~ file: chat.js:30 ~ socket.on ~ data", data);
 let messages = "";
  data.products.forEach((p) => {
    messages += `<tr><td>${p.id}</td>
                <td>${p.status}</td>
                <td>${p.title}</td>
                <td>${p.description}</td>
                <td>${p.code}</td>
                <td>${p.price}</td>
                <td>${p.stock}</td>
                <td>${p.category}</td>
                <td>${p.thumbnails}</td></tr>`;
  });
  productos.innerHTML = messages;
});


