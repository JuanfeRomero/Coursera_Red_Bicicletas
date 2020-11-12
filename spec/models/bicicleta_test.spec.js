var mongoose = require('mongoose');
const { db } = require('../../models/bicicleta');
var Bicicleta = require('../../models/bicicleta');

//antes de cada test vaciar el array all bicis

describe('Testing Bicicletas', () => {
    beforeEach((done) => {
        //inicializa la base de datos testdb
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).catch(err => console.log(err));

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error: '));
        db.once('open', function () {
            console.log('We are connected to test database!');
        });

        done();
    });

    afterEach((done) => {
        Bicicleta.deleteMany({}, function (err, success) {
            if (err) console.log(err);
            db.close();
            done();
        });
    });

    describe('Bicicleta.createInstance', () => {
        it('Crear una instancia de bicicleta y verificar que este correcta', (done) => {
            var bici = Bicicleta.createInstance(1, 'verde', 'urbana', [
                -34.5,
                -54.1,
            ]);

            expect(bici.code).toBe(1);
            expect(bici.color).toBe('verde');
            expect(bici.modelo).toBe('urbana');
            expect(bici.ubicacion[0]).toEqual(-34.5);
            expect(bici.ubicacion[1]).toEqual(-54.1);
            done();
        });
    });

    describe('Bicicleta.allBicis', () => {
        it('Comienza vacia', (done) => {
            Bicicleta.allBicis(function (err, bicis) {
                console.log(bicis);
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });

    describe('Bicicleta.add', () => {
        it('agrego solo una bici', (done) => {
            var aBici = new Bicicleta({
                code: 1,
                color: 'verde',
                modelo: 'urbana',
            });
            Bicicleta.add(aBici, function (err, newBici) {
                if (err) console.log(err);
                Bicicleta.allBicis(function (err, bicis) {
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(aBici.code);

                    done();
                });
            });
        });
    });

    describe('Bicicleta.findByCode', () => {
        it('debe devolver la bici con code 1', (done) => {
            Bicicleta.allBicis((err, bicis) => {
                expect(bicis.length).toEqual(0);

                let aBici = new Bicicleta({
                    code: 1,
                    color: 'verde',
                    modelo: 'urbana',
                });
                Bicicleta.add(aBici, function (err, newBici) {
                    if (err) console.log(err);

                    let aBici2 = new Bicicleta({
                        code: 2,
                        color: 'rojo',
                        modelo: 'montaña',
                    });
                    Bicicleta.add(aBici2, function (err, newBici) {
                        if (err) console.log(err);
                        Bicicleta.findByCode(2, function (err, targetBici) {
                            expect(targetBici.code).toBe(aBici2.code);
                            expect(targetBici.color).toBe(aBici2.color);
                            expect(targetBici.modelo).toBe(aBici2.modelo);

                            done();
                        });
                    });
                });
            });
        });
    });

    describe('Bicicleta.removeByCode', () => {
        it('debe devolver allBicis con length 1', (done) => {
            //Primero busca las bicicletas para estar seguro que son 0
            Bicicleta.allBicis((err, bicis) => {
                expect(bicis.length).toEqual(0);
                if (err) console.log(err);
                // crear las 2 bicicletas
                let aBici = new Bicicleta({
                    code: 1,
                    color: 'verde',
                    modelo: 'urbana',
                });
                let aBici2 = new Bicicleta({
                    code: 2,
                    color: 'rojo',
                    modelo: 'montaña',
                });
                // agregamos las 2 bicis
                Bicicleta.add(aBici, function (err, newBici) {
                    if (err) console.log(err);
                    Bicicleta.add(aBici2, function (err, newBici) {
                        if (err) console.log(err);
                        Bicicleta.allBicis((err, wBicis) => {
                            if (err) console.log(err);
                            expect(wBicis.length).toBe(2);
                            // removemos la primera
                            Bicicleta.removeByCode(1, (err, bicis2) => {
                                // volvemos a pedir todas las bicis, revisamos que haya 1 y que la que quedo sea la segunda.
                                Bicicleta.allBicis((err, bicis) => {
                                    expect(bicis.length).toBe(1);
                                    expect(bicis[0].code).toBe(2);

                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

// describe("Teste de Bicicleta.allBicis", () => {
//     it("Comienza Vacia", () => {
//         expect(Bicicleta.allBicis.length).toBe(0);
//     });
// });

// describe("Test de Bicicleta.add", () => {
//     it("Se agrega una bicicleta:", () => {
//         expect(Bicicleta.allBicis.length).toBe(0);
//         let b = new Bicicleta(1, "blanca", "urbana", [-34.596932, -58.3861497]);
//         Bicicleta.add(b);

//         expect(Bicicleta.allBicis.length).toBe(1);
//         expect(Bicicleta.allBicis[0]).toBe(b);
//     });
// });

// describe("Bicicleta.findById", () => {
//     it("Debe devolver la bici con id 1", () => {
//         expect(Bicicleta.allBicis.length).toBe(0);
//         let aBici = new Bicicleta(1, "verde", "urbana");
//         let aBici2 = new Bicicleta(2, "roja", "urbana");
//         Bicicleta.add(aBici);
//         Bicicleta.add(aBici2)-;

//         let targetBici = Bicicleta.findById(1);
//         expect(targetBici.id).toBe(1);
//         expect(targetBici.color).toBe(aBici.color);
//         expect(targetBici.modelo).toBe(aBici.modelo);
//     });
// });

// describe("Testeando Bicicletas.removeById", () => {
//     it("Debe remover la bici con id 2", () => {
//         //Chequeando que allBicis este vacio
//         expect(Bicicleta.allBicis.length).toBe(0);

//         //Creando 2 bicicletas y agregandolas a allBicis
//         let aBici = new Bicicleta(1, "verde", "urbana");
//         let aBici2 = new Bicicleta(2, "roja", "urbana");
//         Bicicleta.add(aBici);
//         Bicicleta.add(aBici2);

//         //chequeando que allBicis tenga 2 bicicletas agregadas
//         expect(Bicicleta.allBicis.length).toBe(2);

//         //removiendo la segunda bicicleta
//         Bicicleta.removeById(2);

//         //chequeando que haya una sola bicicleta y que la removida sea la segunda
//         expect(Bicicleta.allBicis.length).toBe(1);
//         expect(Bicicleta.allBicis[0].id !== 2).toBe(true);
//     });
// });
