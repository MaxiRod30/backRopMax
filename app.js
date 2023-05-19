const fs = require('fs')

class ProductManager{

    #path
    #codification

    constructor() {
        this.#path = "info.json";
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

    #validarParams(params){
        return Object.values(params).some(e => e === undefined);
    }

    #isInProducts(param){
        const data = this.getProducts();
        return data.some(e => e.code === param);
    }

    addProduct(title, description, price, thumbnail, code, stock){
        const productos = this.getProducts()

        let maxID = 0
        productos.forEach(e => {
            if (e.id >= maxID) maxID = e.id
        });
        
        const product = {
            id : maxID + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        if(!this.#validarParams(product))
        {
            
            if(!this.#isInProducts(product.code))
            {
                productos.push(product)
                this.#writeFile(this.#path,productos)
                console.log("Se agrego producto")
                
            }else{
                console.log("Esta repetido el code")
            }
        }else{
            console.log("Faltan parametros")
        }
    }

    getProducts(){
        return this.#readFile(this.#path,this.#codification) || false
    }

    getProductById(id){
        let products = this.getProducts()
        if(products){
            return products.find(e => e.id === id) || "Not Found"
        }
        return "Error en la lectura del archivo"
    }

    updateProduct(id, campo, value){
        const productos = this.getProducts();
        const obj =  this.getProductById(id);

        if(obj && (obj != "Not Found") && productos){
            if(campo in obj){
                if(value){
                    obj[campo] = value
                    const prod = productos.map(function(e){
                        if(e.id === obj.id) e = obj
                        return e 
                    })
                    this.#writeFile(this.#path,prod)
                }else{
                    return console.log("Update: Error en el valor")
                }
            }else{
                return console.log("Update: Error en el campo")
            }
        }else{
            return console.log("Update: No se encontro producto")
        }
    }

    deleteProduct(id){
        const productos = this.getProducts();
        const index = productos.findIndex((e) => e.id === id);

        if((index != -1) && productos){
            productos.splice(index, 1);
            this.#writeFile(this.#path,productos)
            console.log(`Delete: Producto borrado ID:${index+1}`)
        }else{
            return console.log("Delete: No se encontro producto")
        }
    }
}

let p = new ProductManager()

    console.log( p.getProducts())
    console.log("***************************")

    p.addProduct("Producto1","Descripcion1",100,"imagen1",1,1)
    p.addProduct("Producto2","Descripcion2",200,"imagen2",2,2)
    p.addProduct("Producto3","Descripcion3",300,"imagen3",3,3)

    console.log("***************************")
    console.log( p.getProducts())
    console.log("***************************")

    p.updateProduct(1,"title","Producto100")
    p.updateProduct(2,"title","Producto200")
    p.updateProduct(2,"price",200000)
    p.updateProduct(1,"price",1)
    console.log( p.getProducts())
    console.log("***************************")
    
    p.updateProduct(22,"price")
    p.updateProduct(22)
    p.updateProduct(22,"papa",2)

    console.log("***************************")

    p.deleteProduct(2)
    p.deleteProduct(30)
    console.log( p.getProducts())

    console.log("***************************")

    p.addProduct("Producto4","Descripcion4",400,"imagen4",4,4)
    console.log( p.getProducts())
    console.log("***************************")



   