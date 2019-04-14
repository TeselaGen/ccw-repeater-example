
const typeUpdate = require('../typeUpdate');

describe("typeUpdate", () => {
    

    it("exports entity definition", () => {
        expect(typeUpdate.tableName).toBeDefined();
        expect(typeUpdate.attributes).toBeDefined();
        expect(typeUpdate.extensions).toBeDefined();
        expect(typeof typeUpdate.query).toBe('function');
        expect(typeof typeUpdate.count).toBe('function');
        expect(typeof typeUpdate.get).toBe('function');
        expect(typeof typeUpdate.create).toBe('function');
        expect(typeof typeUpdate.update).toBe('function');
        expect(typeof typeUpdate.updateQuery).toBe('function');
        expect(typeof typeUpdate.delete).toBe('function');
        expect(typeof typeUpdate.deleteQuery).toBe('function');
        expect(typeof typeUpdate.createNestedRecords).toBe('function');
        expect(typeof typeUpdate.updateNestedRecords).toBe('function');
        expect(typeof typeUpdate.deleteNestedRecords).toBe('function');
    });

    describe("typeUpdate default extensions", () => {
        it("onCreate -> records returns records", async () => {
            let mockRecords = [
                {
                    id: 123
                },
                {
                    id: 124
                }
            ];
            let result = await typeUpdate.extensions.onCreate.records(mockRecords);
            expect(result).toEqual(mockRecords);
        });

        it("onCreate -> allow returns true", async () => {
            let result = await typeUpdate.extensions.onCreate.allow();
            expect(result).toBeTruthy();
        });

        it("onUpdate -> records returns records", async () => {
            let mockRecords = [
                {
                    id: 123
                },
                {
                    id: 124
                }
            ];
            let result = await typeUpdate.extensions.onUpdate.records(mockRecords);
            expect(result).toEqual(mockRecords);
        });

        it("onUpdate -> filter returns filter", async () => {
            let mockFilter = {
                id: [123, 124]
            };
            let result = await typeUpdate.extensions.onUpdate.filter(mockFilter);
            expect(result).toEqual(mockFilter);
        });

        it("onUpdate -> allow returns true", async () => {
            let result = await typeUpdate.extensions.onUpdate.allow();
            expect(result).toBeTruthy();
        });

        it("onUpdateQuery -> statements returns statements", async () => {
            let mockStatemetns = [
                {
                    values: {
                        status: "completed"
                    },
                    where: {
                        id: [123, 124]
                    }
                }
            ];
            let result = await typeUpdate.extensions.onUpdateQuery.statements(mockStatemetns);
            expect(result).toEqual(mockStatemetns);
        });

        it("onUpdateQuery -> allow returns true", async () => {
            let result = await typeUpdate.extensions.onUpdateQuery.allow();
            expect(result).toBeTruthy();
        });

        it("onDelete -> filter returns filter", async () => {
            let mockFilter = {
                id: [123, 124]
            };
            let result = await typeUpdate.extensions.onDelete.filter(mockFilter);
            expect(result).toEqual(mockFilter);
        });

        it("onDelete -> allow returns true", async () => {
            let result = await typeUpdate.extensions.onDelete.allow();
            expect(result).toBeTruthy();
        });

        it("onDeleteQuery -> statements returns statements", async () => {
            let mockStatemetns = [
                {
                    values: {
                        status: "completed"
                    },
                    where: {
                        id: [123, 124]
                    }
                }
            ];
            let result = await typeUpdate.extensions.onDeleteQuery.statements(mockStatemetns);
            expect(result).toEqual(mockStatemetns);
        });

        it("onDeleteQuery -> allow returns true", async () => {
            let result = await typeUpdate.extensions.onDeleteQuery.allow();
            expect(result).toBeTruthy();
        });

        it("onSelect -> fields returns fields", async () => {
            let mockFields = [
                "id",
                "status",
                "name"
            ];
            let result = await typeUpdate.extensions.onSelect.fields(mockFields);
            expect(result).toEqual(mockFields);
        });

        it("onSelect -> filter returns filter", async () => {
            let mockFilter = {
                id: [123, 124]
            };
            let result = await typeUpdate.extensions.onSelect.filter(mockFilter);
            expect(result).toEqual(mockFilter);
        });

        it("onSelect -> allow returns true", async () => {
            let result = await typeUpdate.extensions.onSelect.allow();
            expect(result).toBeTruthy();
        });
    });
});