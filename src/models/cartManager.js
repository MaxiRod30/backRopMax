import fs from 'fs';

export default class CartManager{

    #path
    #codification

    constructor(path) {
        this.#path = path ;
        this.#codification = "utf-8";
        this.#initDB();
    }

    #initDB() {
        const data = this.#readFile(this.#path,this.#codification)

        if(!data){
            try {
                this.#writeFile(this.#path,[])
            } catch (error) {
                console.log(error)
            }
        }
    }

    #readFile(path, cod){
        try {
             if(fs.existsSync(this.#path)){
                return JSON.parse(fs.readFileSync(path,cod) || `[]`)
             }
            return false

        } catch (error) {
            console.log("Error al leer el archivo",error)
        }
    }

    #writeFile(path,dataObj){
        try {
            let data = JSON.stringify(dataObj);
             fs.writeFileSync(path,data)
        } catch (error) {
            console.log("Error en la escritura del archivo" ,error)
        }  
    }

    addCart(){
        const carts = this.getCarts()
       
        let maxID = 0
        carts.forEach(e => {
            if (e.id >= maxID) maxID = e.id
        });
        
        const cart = {
            id : maxID + 1,
            products:[]
        }
        carts.push(cart)
        this.#writeFile(this.#path,carts)
        console.log("Se agrego un nuevo carrito")       
           
    }
    
    addProductInCart(idCart,idProduct){
        const carts = this.getCarts()
        const cartFind = carts.find(e => e.id == idCart);
        
        if (!cartFind){
            return console.log("No se encontro carrito");
        }

        let product ={
            id: idProduct,
            quantity: 1
        }

        const productInCarrito = cartFind.products.find(e => e.id == idProduct)

        if(productInCarrito)
        {
            productInCarrito.quantity++
        }else{
            cartFind.products.push(product)
        }

        const cart = carts.map(function(e){
            if(e.id === cartFind.id) e = cartFind
                return e 
            })
            this.#writeFile(this.#path,cart)
            return JSON.stringify(cart)
        
    }

    getCarts(){
        return this.#readFile(this.#path,this.#codification) || false
    }

    getProductInCartById(id){
        let carts = this.getCarts()
        if(carts){
            let cartFind = carts.find(e => e.id === id) || "Not Found"
            return cartFind.products
        }
        return "Error en la lectura del archivo"
    }

    deleteCart(id){
        const carts = this.getProducts();
        const index = carts.findIndex((e) => e.id === id);

        if((index != -1) && carts){
            carts.splice(index, 1);
            this.#writeFile(this.#path,carts)
            console.log(`Delete: Producto borrado ID:${index+1}`)
        }else{
            return console.log("Delete: No se encontro producto")
        }
    }
}