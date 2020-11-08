var Bicicleta = require("../../models/bicicleta");

//antes de cada test vaciar el array all bicis
beforeEach(() => {
    Bicicleta.allBicis = [];
});

describe("Teste de Bicicleta.allBicis", () => {
    it("Comienza Vacia", () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

describe("Test de Bicicleta.add", () => {
    it("Se agrega una bicicleta:", () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        let b = new Bicicleta(1, "blanca", "urbana", [-34.596932, -58.3861497]);
        Bicicleta.add(b);

        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(b);
    });
});

describe("Bicicleta.findById", () => {
    it("Debe devolver la bici con id 1", () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        let aBici = new Bicicleta(1, "verde", "urbana");
        let aBici2 = new Bicicleta(2, "roja", "urbana");
        Bicicleta.add(aBici);
        Bicicleta.add(aBici2);

        let targetBici = Bicicleta.findById(1);
        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(aBici.color);
        expect(targetBici.modelo).toBe(aBici.modelo);
    });
});

describe("Testeando Bicicletas.removeById", () => {
    it("Debe remover la bici con id 2", () => {
        //Chequeando que allBicis este vacio
        expect(Bicicleta.allBicis.length).toBe(0);

        //Creando 2 bicicletas y agregandolas a allBicis
        let aBici = new Bicicleta(1, "verde", "urbana");
        let aBici2 = new Bicicleta(2, "roja", "urbana");
        Bicicleta.add(aBici);
        Bicicleta.add(aBici2);

        //chequeando que allBicis tenga 2 bicicletas agregadas
        expect(Bicicleta.allBicis.length).toBe(2);

        //removiendo la segunda bicicleta
        Bicicleta.removeById(2);

        //chequeando que haya una sola bicicleta y que la removida sea la segunda
        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0].id !== 2).toBe(true);
    });
});
