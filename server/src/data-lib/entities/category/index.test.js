
const category = require('../category');

describe("category", () => {
    

    it("exports entity definition", () => {
        expect(category.tableName).toBeDefined();
        expect(category.attributes).toBeDefined();
        expect(category.extensions).toBeDefined();
        expect(typeof category.query).toBe('function');
        expect(typeof category.count).toBe('function');
        expect(typeof category.get).toBe('function');
        expect(typeof category.create).toBe('function');
        expect(typeof category.update).toBe('function');
        expect(typeof category.updateQuery).toBe('function');
        expect(typeof category.delete).toBe('function');
        expect(typeof category.deleteQuery).toBe('function');
        expect(typeof category.createNestedRecords).toBe('function');
        expect(typeof category.updateNestedRecords).toBe('function');
        expect(typeof category.deleteNestedRecords).toBe('function');
    });

    describe("category default extensions", () => {
        it("onCreate -> records returns records", async () => {
            let mockRecords = [
                {
                    id: 123
                },
                {
                    id: 124
                }
            ];
            let result = await category.extensions.onCreate.records(mockRecords);
            expect(result).toEqual(mockRecords);
        });

        it("onCreate -> allow returns true", async () => {
            let result = await category.extensions.onCreate.allow();
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
            let result = await category.extensions.onUpdate.records(mockRecords);
            expect(result).toEqual(mockRecords);
        });

        it("onUpdate -> filter returns filter", async () => {
            let mockFilter = {
                id: [123, 124]
            };
            let result = await category.extensions.onUpdate.filter(mockFilter);
            expect(result).toEqual(mockFilter);
        });

        it("onUpdate -> allow returns true", async () => {
            let result = await category.extensions.onUpdate.allow();
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
            let result = await category.extensions.onUpdateQuery.statements(mockStatemetns);
            expect(result).toEqual(mockStatemetns);
        });

        it("onUpdateQuery -> allow returns true", async () => {
            let result = await category.extensions.onUpdateQuery.allow();
            expect(result).toBeTruthy();
        });

        it("onDelete -> filter returns filter", async () => {
            let mockFilter = {
                id: [123, 124]
            };
            let result = await category.extensions.onDelete.filter(mockFilter);
            expect(result).toEqual(mockFilter);
        });

        it("onDelete -> allow returns true", async () => {
            let result = await category.extensions.onDelete.allow();
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
            let result = await category.extensions.onDeleteQuery.statements(mockStatemetns);
            expect(result).toEqual(mockStatemetns);
        });

        it("onDeleteQuery -> allow returns true", async () => {
            let result = await category.extensions.onDeleteQuery.allow();
            expect(result).toBeTruthy();
        });

        it("onSelect -> fields returns fields", async () => {
            let mockFields = [
                "id",
                "status",
                "name"
            ];
            let result = await category.extensions.onSelect.fields(mockFields);
            expect(result).toEqual(mockFields);
        });

        it("onSelect -> filter returns filter", async () => {
            let mockFilter = {
                id: [123, 124]
            };
            let result = await category.extensions.onSelect.filter(mockFilter);
            expect(result).toEqual(mockFilter);
        });

        it("onSelect -> allow returns true", async () => {
            let result = await category.extensions.onSelect.allow();
            expect(result).toBeTruthy();
        });
    });
});