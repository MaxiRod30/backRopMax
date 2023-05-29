
 import  Server from "./src/models/server.js";
 import ProductManager from "./src/models/productManager.js"

 const products = new ProductManager("data.json")

 products.addProduct("Producto1","Descripcion1",100,"img",1,10)
 products.addProduct("Producto2","Descripcion2",200,"img",2,20)
 products.addProduct("Producto3","Descripcion3",300,"img",3,30)

 const server = new Server();

 server.listen();