const resolveCidReferences = require('./resolveCidReferences');

describe("resolveCidReferences", () => {
    it("exports function", () => {
        expect(typeof resolveCidReferences).toBe('function');
    });
});