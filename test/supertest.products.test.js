import chai from 'chai'
import supertest from 'supertest'


const expect = chai.expect
const requester = supertest('http://127.0.0.1:3000')

describe('Testing RopMax', () => {
    it('Debería devolver Status 200 si existen Productos que mostrar', async () => {

        const response = await requester.get('/api/products');
        expect(response.status).to.equal(200);
        const responseBody = response.text;
        expect(typeof responseBody).to.equal('string');
    });
});

describe('Testing RopMax', () => {
    describe('Test de Productos', () => {
        it('En el endpoint POST / debe registrar un producto', async () => {

            const response = await requester
                .post('/api/products')
                .field('title', 'Producto de prueba')
                .field('category', 'Categoria de prueba')
                .field('size', 'Talle de prueba')
                .field('code', 'Codigo de prueba')
                .field('description', 'Descripcion de prueba')
                .field('price', 1212)
                .field('stock', 12)
                .attach('thumbnail', []);

            expect(response.status).to.equal(200);
        });
    });
});