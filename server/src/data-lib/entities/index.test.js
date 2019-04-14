const initEntities = require('../entities');

describe("initEntities", () => {
    it("exports init function", () => {
        expect(typeof initEntities).toBe('function');
    });

    it("initiliazes entities", () => {
        let mockDataLib = {
            entities: {}
        };

        expect(Object.keys(mockDataLib.entities).length > 0).toBeFalsy();

        initEntities(mockDataLib);

        expect(Object.keys(mockDataLib.entities).length > 0).toBeTruthy();
    });
});