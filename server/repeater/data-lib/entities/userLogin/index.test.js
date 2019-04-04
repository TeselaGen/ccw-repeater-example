
const userLogin = require('../userLogin');

describe("userLogin", () => {
    

    it("exports entity definition", () => {
        expect(userLogin.tableName).toBeDefined();
        expect(userLogin.attributes).toBeDefined();
        expect(userLogin.extensions).toBeDefined();
        expect(typeof userLogin.query).toBe('function');
        expect(typeof userLogin.count).toBe('function');
        expect(typeof userLogin.get).toBe('function');
        expect(typeof userLogin.create).toBe('function');
        expect(typeof userLogin.update).toBe('function');
        expect(typeof userLogin.updateQuery).toBe('function');
        expect(typeof userLogin.delete).toBe('function');
        expect(typeof userLogin.deleteQuery).toBe('function');
        expect(typeof userLogin.createNestedRecords).toBe('function');
        expect(typeof userLogin.updateNestedRecords).toBe('function');
        expect(typeof userLogin.deleteNestedRecords).toBe('function');
    });

    describe("userLogin default extensions", () => {
        it("onCreate -> records returns records", async () => {
            let mockRecords = [
                {
                    id: 123
                },
                {
                    id: 124
                }
            ];
            let result = await userLogin.extensions.onCreate.records(mockRecords);
            expect(result).toEqual(mockRecords);
        });

        it("onCreate -> allow returns true", async () => {
            let result = await userLogin.extensions.onCreate.allow();
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
            let result = await userLogin.extensions.onUpdate.records(mockRecords);
            expect(result).toEqual(mockRecords);
        });

        it("onUpdate -> filter returns filter", async () => {
            let mockFilter = {
                id: [123, 124]
            };
            let result = await userLogin.extensions.onUpdate.filter(mockFilter);
            expect(result).toEqual(mockFilter);
        });

        it("onUpdate -> allow returns true", async () => {
            let result = await userLogin.extensions.onUpdate.allow();
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
            let result = await userLogin.extensions.onUpdateQuery.statements(mockStatemetns);
            expect(result).toEqual(mockStatemetns);
        });

        it("onUpdateQuery -> allow returns true", async () => {
            let result = await userLogin.extensions.onUpdateQuery.allow();
            expect(result).toBeTruthy();
        });

        it("onDelete -> filter returns filter", async () => {
            let mockFilter = {
                id: [123, 124]
            };
            let result = await userLogin.extensions.onDelete.filter(mockFilter);
            expect(result).toEqual(mockFilter);
        });

        it("onDelete -> allow returns true", async () => {
            let result = await userLogin.extensions.onDelete.allow();
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
            let result = await userLogin.extensions.onDeleteQuery.statements(mockStatemetns);
            expect(result).toEqual(mockStatemetns);
        });

        it("onDeleteQuery -> allow returns true", async () => {
            let result = await userLogin.extensions.onDeleteQuery.allow();
            expect(result).toBeTruthy();
        });

        it("onSelect -> fields returns fields", async () => {
            let mockFields = [
                "id",
                "status",
                "name"
            ];
            let result = await userLogin.extensions.onSelect.fields(mockFields);
            expect(result).toEqual(mockFields);
        });

        it("onSelect -> filter returns filter", async () => {
            let mockFilter = {
                id: [123, 124]
            };
            let result = await userLogin.extensions.onSelect.filter(mockFilter);
            expect(result).toEqual(mockFilter);
        });

        it("onSelect -> allow returns true", async () => {
            let result = await userLogin.extensions.onSelect.allow();
            expect(result).toBeTruthy();
        });
    });
});