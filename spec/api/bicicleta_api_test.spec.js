var Bicicleta = require("../../models/bicicleta");
var request = require("request");
var server = require("../../bin/www");

describe("Bicicleta API", () => {
    describe("GET BICICLETA /", () => {
        it("Esperamos Status 200", (done) => {
            expect(Bicicleta.allBicis.length).toBe(0);

            let a = new Bicicleta(1, "negro", "urbana", [
                -34.6012424,
                -58.3861497,
            ]);
            Bicicleta.add(a);

            // console.log('entra acá');
            request.get("http://localhost:3000/api/bicicletas", function (
                error,
                response,
                body
            ) {
                // deberia darme un error por intentar acceder a un servidor inactivo o entrando al puerto incorrecto, pero no lo hace, porque ejecuta antes de tiempo y saltea la funcion
                // logré atrapar el error utilizando la funcion done tambien en este test
                // console.log('pero acá no');
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe("POST BICICLETA / ", () => {
        it("Esperamos status 200 en el post", (done) => {
            var headers = { "content-type": "application/json" };
            var aBici =
                '{"id":10, "color": "rojo", "modelo": "urbana", "ubicacion": [-34, -54] }';
            request.post(
                {
                    headers: headers,
                    url: "http://localhost:3000/api/bicicletas/create",
                    body: aBici,
                },
                (err, res, body) => {
                    expect(res.statusCode).toBe(200);
                    expect(Bicicleta.findById(10).color).toBe("rojo");
                    done(); // esta keyword garantiza que el test no va a finalizar hasta no recibir esta funcion
                }
            );
        });
    });

    describe("UPDATE BICICLETA / ", () => {
        it("Esperamos status 200 en el post", (done) => {
            var headers = { "content-type": "application/json" };
            var aBici = '{"id":10, "color": "azul" }';
            request.post(
                {
                    headers: headers,
                    url: "http://localhost:3000/api/bicicletas/update",
                    body: aBici,
                },
                (err, res, body) => {
                    expect(res.statusCode).toBe(200);
                    expect(Bicicleta.findById(10).color).toBe("azul");
                    expect(Bicicleta.findById(10).modelo).toBe("urbana");
                    done(); // esta keyword garantiza que el test no va a finalizar hasta no recibir esta funcion
                }
            );
        });
    });

    describe("DELETE BICICLETA /", () => {
        it("Esperamos Status 200", (done) => {
            let b = new Bicicleta(2, "verde", "urbana", [
                -34.6012424,
                -58.3861497,
            ]);
            Bicicleta.add(b);

            let c = new Bicicleta(7, "naranja", "urbana", [
                -34.6012424,
                -58.3861497,
            ]);
            Bicicleta.add(c);

            // marca cuantas bicicletas hay
            let totalBicis = Bicicleta.allBicis.length;

            request.del(
                {
                    headers: { "content-type": "application/json" },
                    url: "http://localhost:3000/api/bicicletas/delete",
                    body: `{ "id": 7}`,
                },
                function (error, response, body) {
                    expect(response.statusCode).toBe(204);
                    expect(Bicicleta.allBicis.length).toBe(totalBicis - 1); // revisa que haya una bici menos
                    done();
                }
            );
        });
    });
});
