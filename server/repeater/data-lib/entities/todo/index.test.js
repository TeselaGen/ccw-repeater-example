
const todo = require('../todo');

describe("todo", () => {
    

    it("exports entity definition", () => {
        expect(todo.tableName).toBeDefined();
        expect(todo.attributes).toBeDefined();
        expect(todo.extensions).toBeDefined();
        expect(typeof todo.query).toBe('function');
        expect(typeof todo.count).toBe('function');
        expect(typeof todo.get).toBe('function');
        expect(typeof todo.create).toBe('function');
        expect(typeof todo.update).toBe('function');
        expect(typeof todo.updateQuery).toBe('function');
        expect(typeof todo.delete).toBe('function');
        expect(typeof todo.deleteQuery).toBe('function');
        expect(typeof todo.createNestedRecords).toBe('function');
        expect(typeof todo.updateNestedRecords).toBe('function');
        expect(typeof todo.deleteNestedRecords).toBe('function');
    });

    describe("todo default extensions", () => {
        it("onCreate -> records returns records", async () => {
            let mockRecords = [
                {
                    id: 123
                },
                {
                    id: 124
                }
            ];
            let result = await todo.extensions.onCreate.records(mockRecords);
            expect(result).toEqual(mockRecords);
        });

        it("onCreate -> allow returns true", async () => {
            let result = await todo.extensions.onCreate.allow();
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
            let result = await todo.extensions.onUpdate.records(mockRecords);
            expect(result).toEqual(mockRecords);
        });

        it("onUpdate -> filter returns filter", async () => {
            let mockFilter = {
                id: [123, 124]
            };
            let result = await todo.extensions.onUpdate.filter(mockFilter);
            expect(result).toEqual(mockFilter);
        });

        it("onUpdate -> allow returns true", async () => {
            let result = await todo.extensions.onUpdate.allow();
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
            let result = await todo.extensions.onUpdateQuery.statements(mockStatemetns);
            expect(result).toEqual(mockStatemetns);
        });

        it("onUpdateQuery -> allow returns true", async () => {
            let result = await todo.extensions.onUpdateQuery.allow();
            expect(result).toBeTruthy();
        });

        it("onDelete -> filter returns filter", async () => {
            let mockFilter = {
                id: [123, 124]
            };
            let result = await todo.extensions.onDelete.filter(mockFilter);
            expect(result).toEqual(mockFilter);
        });

        it("onDelete -> allow returns true", async () => {
            let result = await todo.extensions.onDelete.allow();
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
            let result = await todo.extensions.onDeleteQuery.statements(mockStatemetns);
            expect(result).toEqual(mockStatemetns);
        });

        it("onDeleteQuery -> allow returns true", async () => {
            let result = await todo.extensions.onDeleteQuery.allow();
            expect(result).toBeTruthy();
        });

        it("onSelect -> fields returns fields", async () => {
            let mockFields = [
                "id",
                "status",
                "name"
            ];
            let result = await todo.extensions.onSelect.fields(mockFields);
            expect(result).toEqual(mockFields);
        });

        it("onSelect -> filter returns filter", async () => {
            let mockFilter = {
                id: [123, 124]
            };
            let result = await todo.extensions.onSelect.filter(mockFilter);
            expect(result).toEqual(mockFilter);
        });

        it("onSelect -> allow returns true", async () => {
            let result = await todo.extensions.onSelect.allow();
            expect(result).toBeTruthy();
        });
    });
});