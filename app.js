
class ProductManager{

    #products

    constructor() {
        this.#products = [];
       
    }

    validarParams(params){
        return Object.values(params).some(e => e === undefined);
    }

    isInProducts(param){
        return this.#products.some(e => e === param);
    }

    addProduct(title, description, price, thumbnail, code, stock){
    
        const product = {
            id : this.#products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        if(!this.validarParams(product))
        {
            if(!this.isInProducts(product.code))
            {
                this.#products.push(product)
                console.log("Se agrego producto")
                
            }else{
                console.log("Esta repetido el code")
            }
        }else{
            console.log("Faltan parametros")
        }
    }

    getProducts(){
        return this.#products;
    }

    getProductById(id){
        return this.#products.find(e => e.id === id) || "Not Found"
    }
}

