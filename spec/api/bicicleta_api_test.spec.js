var mongoose = require('mongoose')
var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');
const { db } = require('../../models/bicicleta');

var baseURL = 'http://localhost:3000/api/bicicletas';

describe('Bicicleta API', () => {

    beforeAll((done) => {
        Bicicleta.deleteMany({}, function(err, success){
            if (err) console.log(err);
            done();
        })
    })

    describe('GET BICICLETA /', () => {
        it('Esperamos Status 200 y base de datos vacia.', (done) => {
            request.get(baseURL, function (error, response, body) {
                var allBicis = JSON.parse(body)
                console.log('log bicis GET: '+ allBicis);
                expect(response.statusCode).toBe(200);
                expect(allBicis.bicicleta.length).toBe(0)
                done();
            });
        });
    });

    describe('POST BICICLETA /create ', () => {
        it('Esperamos status 200 en el post', (done) => {
            var headers = { 'content-type': 'application/json' };
            var aBici = '{ "id":10, "color": "rojo", "modelo": "urbana", "ubicacion": [-34, -54] }';
            request.post(
                {
                    headers: headers,
                    url: `${baseURL}/create`,
                    body: aBici,
                },
                (err, res, body) => {
                    expect(res.statusCode).toBe(200);
                    var bici = JSON.parse(body).bicicleta;
                    console.log(`Log POST create 200: ${bici.code} ${bici.color} ${bici.modelo} ${bici.ubicacion}`);
                    expect(bici.code).toBe(10);
                    expect(bici.color).toBe('rojo');
                    expect(bici.ubicacion[0]).toBe(-34);
                    expect(bici.ubicacion[1]).toBe(-54);
                    done(); // esta keyword garantiza que el test no va a finalizar hasta no recibir esta funcion
                }
            );
        });
    });

    describe('UPDATE BICICLETA /update ', () => {
        it('Esperamos status 200 en el post', (done) => {
            var headers = { 'content-type': 'application/json' };
            var aBici = '{"code": 10, "color": "azul" }';
            request.post(
                {
                    headers: headers,
                    url: `${baseURL}/update`,
                    body: aBici,
                },
                (err, res, body) => {
                    expect(res.statusCode).toBe(200);
                    var bici = JSON.parse(body).bicicleta;
                    expect(bici.code).toBe(10);
                    expect(bici.color).toBe('azul');
                    done()
                }
            );
        });
    });

    describe('DELETE BICICLETA /', () => {
        it('Esperamos Status 200', (done) => {
            let b = Bicicleta.createInstance(2, 'verde', 'urbana', [
                -34.6012424,
                -58.3861497,
            ]);
            let c = new Bicicleta({ code: 7, color:'naranja', modelo:'urbana', ubicacion:[
                -34.6012424,
                -58.3861497,
            ]});
            Bicicleta.add(b, (err, bBici) => {
                if(err) console.log(err);
                Bicicleta.add(c, (err, cBici) => {
                    if(err) console.log(err);
                    // marca cuantas bicicletas hay
                    let totalBicis;
                    Bicicleta.allBicis((err, tBicis) => {
                        console.log('total bicis es: ' + tBicis.length);
                        totalBicis = tBicis.length;
                        request.del(
                            {
                                headers: { 'content-type': 'application/json' },
                                url: `${baseURL}/delete`,
                                body: `{ "code": 7}`,
                            },
                            function (error, response, body) {
                                expect(response.statusCode).toBe(204);
                                Bicicleta.allBicis((err, tBicis2) =>{
                                    console.log('Total de bicis 2 es: ' + tBicis2.length);
                                    expect(tBicis2.length).toBe(totalBicis - 1); // revisa que haya una bici menos
                                    done()
                                })
                            }
                        );
                    })
                })
            });

        });
    });
});
