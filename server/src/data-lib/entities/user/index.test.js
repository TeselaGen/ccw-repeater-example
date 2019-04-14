
const user = require('../user');

describe("user", () => {
    

    it("exports entity definition", () => {
        expect(user.tableName).toBeDefined();
        expect(user.attributes).toBeDefined();
        expect(user.extensions).toBeDefined();
        expect(typeof user.query).toBe('function');
        expect(typeof user.count).toBe('function');
        expect(typeof user.get).toBe('function');
        expect(typeof user.create).toBe('function');
        expect(typeof user.update).toBe('function');
        expect(typeof user.updateQuery).toBe('function');
        expect(typeof user.delete).toBe('function');
        expect(typeof user.deleteQuery).toBe('function');
        expect(typeof user.createNestedRecords).toBe('function');
        expect(typeof user.updateNestedRecords).toBe('function');
        expect(typeof user.deleteNestedRecords).toBe('function');
    });

    describe("user default extensions", () => {
        it("onCreate -> records returns records", async () => {
            let mockRecords = [
                {
                    id: 123
                },
                {
                    id: 124
                }
            ];
            let result = await user.extensions.onCreate.records(mockRecords);
            expect(result).toEqual(mockRecords);
        });

        it("onCreate -> allow returns true", async () => {
            let result = await user.extensions.onCreate.allow();
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
            let result = await user.extensions.onUpdate.records(mockRecords);
            expect(result).toEqual(mockRecords);
        });

        it("onUpdate -> filter returns filter", async () => {
            let mockFilter = {
                id: [123, 124]
            };
            let result = await user.extensions.onUpdate.filter(mockFilter);
            expect(result).toEqual(mockFilter);
        });

        it("onUpdate -> allow returns true", async () => {
            let result = await user.extensions.onUpdate.allow();
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
            let result = await user.extensions.onUpdateQuery.statements(mockStatemetns);
            expect(result).toEqual(mockStatemetns);
        });

        it("onUpdateQuery -> allow returns true", async () => {
            let result = await user.extensions.onUpdateQuery.allow();
            expect(result).toBeTruthy();
        });

        it("onDelete -> filter returns filter", async () => {
            let mockFilter = {
                id: [123, 124]
            };
            let result = await user.extensions.onDelete.filter(mockFilter);
            expect(result).toEqual(mockFilter);
        });

        it("onDelete -> allow returns true", async () => {
            let result = await user.extensions.onDelete.allow();
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
            let result = await user.extensions.onDeleteQuery.statements(mockStatemetns);
            expect(result).toEqual(mockStatemetns);
        });

        it("onDeleteQuery -> allow returns true", async () => {
            let result = await user.extensions.onDeleteQuery.allow();
            expect(result).toBeTruthy();
        });

        it("onSelect -> fields returns fields", async () => {
            let mockFields = [
                "id",
                "status",
                "name"
            ];
            let result = await user.extensions.onSelect.fields(mockFields);
            expect(result).toEqual(mockFields);
        });

        it("onSelect -> filter returns filter", async () => {
            let mockFilter = {
                id: [123, 124]
            };
            let result = await user.extensions.onSelect.filter(mockFilter);
            expect(result).toEqual(mockFilter);
        });

        it("onSelect -> allow returns true", async () => {
            let result = await user.extensions.onSelect.allow();
            expect(result).toBeTruthy();
        });
    });
});