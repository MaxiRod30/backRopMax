import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://127.0.0.1:3000');

describe('Testing RopMax', () => {

    describe('Test de Carts', async() => { 

        it('Debe agregar un producto al carrito', async () => { 
            const result = await requester.post('/api/carts/64d253fd60c0adb3371944a8/product/650c92232efbf4c6c0950322').send();
            expect(result.status).to.equal(302); 
        });

        it('Debe actualizar la cantidad de un producto en el carrito', async () => { 
            const result = await requester.put('/api/carts/64d253fd60c0adb3371944a8/products/650c92232efbf4c6c0950322').send({
                quantity: 10
            });
            expect(result.status).to.equal(200); 
        });

        it('Debe vaciar el carrito', async () => { 
            const result = await requester.delete('/api/carts/64d253fd60c0adb3371944a8').send();
            expect(result.status).to.equal(200); 
        });

        it('Debe eliminar el carrito', async () => { 
            const result = await requester.post('/api/cart/64d253fd60c0adb3371944a8').send();
            expect(result.status).to.equal(200);            
        });

    });
});

