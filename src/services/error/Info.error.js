const generateProductErrorInfo = (product) =>{
    return `
    List if required properties:
    title: Needs to be a string, received ${product.title}
    description: Needs to be a string, received ${product.description}
    price: Needs to be a number, received ${product.price}
    thumbnail: Needs to be a array, received ${product.thumbnail}
    code: Needs to be a string, received ${product.code}
    stock: Needs to be a number, received ${product.stock}
    category: Needs to be a string, received ${product.category}
    `
}