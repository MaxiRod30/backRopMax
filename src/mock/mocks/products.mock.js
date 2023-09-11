import { faker } from "@faker-js/faker/locale/es";

export const generateProducts = () => {

  return {
    
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    thumbnail: ["https://www.blogdelfotografo.com/wp-content/uploads/2020/12/producto_fondo_negro.webp"],
    code: faker.random.alphaNumeric(8),
    stock: faker.random.numeric(2),
    category: faker.commerce.productMaterial(),
    status: true

  };
};
