import chai from 'chai';
import supertest from 'supertest';


const expect = chai.expect;
const requester = supertest('http://127.0.0.1:3000');

describe('Testing RopMax', () => {

    describe('Test de Sessions', () => { 

        it('Debe registrar un usuario', async function () { 
            this.timeout(5000); 

            const user = {
                first_name: "MaxiPrueba",
                last_name: "RodriguezPrueba",
                email: "ropamax95@gmail.com",
                phone: 326598 ,
                age: 30,
                password: 'Q1w2e3r4t5',
            };

            try {
                const response = await requester.post('/api/sessions/register').send(user);
                expect(response.status).to.equal(302); 
            } catch (error) {
                throw error;
            }
        });


        it('Debe loggear un user y devolver una COOKIE', async () => { 
            const result = await requester.post('/api/sessions/login').send({
                email: "ropamax95@gmail.com",
                password: 'Q1w2e3r4t5'
            });

            const cookieResult = result.headers['set-cookie'][0];
            expect(cookieResult).to.be.ok;
            expect(cookieResult.split('=')[0]).to.be.eql('authToken');
            expect(cookieResult.split('=')[1]).to.be.ok;
        }); 
    });
});