
jest.mock('../../core/applyFilter');

const deleteCategoriesQuery = require('./deleteCategoriesQuery');
const applyFilter = require('../../core/applyFilter');

describe("deleteCategoriesQuery", () => {
    it("deleteCategoriesQuery deletes records via a query", async () => {
        let statements = [
            {
                id: "123"
            }
        ];

        let mockAllow = jest.fn(() => true);
        let mockStatements = jest.fn((stmts) => stmts);
        let mockDel = jest.fn(() => Promise.resolve(1));
        let mockDb = jest.fn(() => "mock db");
        let mockAppendFilter = jest.fn(() => ({}));

        let ctx = {
            db: mockDb,
            entities: {
                category: {
                    extensions: {
                        onDeleteQuery: {
                            allow: mockAllow,
                            statements: mockStatements,
                            appendFilter: mockAppendFilter
                        }
                    }
                }
            }
        };

        applyFilter.mockReturnValue({
            del: mockDel
        });
 
        let result = await deleteCategoriesQuery.call(ctx, statements);

        expect(mockAllow).toHaveBeenCalled();
        expect(mockStatements).toHaveBeenCalled();
        expect(applyFilter).toHaveBeenCalled();
        expect(mockDb).toHaveBeenCalled();
        expect(mockDel).toHaveBeenCalled();
        expect(result).toEqual(1);
    });

    it("deleteCategoriesQuery returns undefined", async () => {
        let statements = [
            {
                id: "123"
            }
        ];

        let ctx = {
            entities: {
                category: {
                    extensions: {
                        onDeleteQuery: {
                            allow: () => false
                        }
                    }
                }
            }
        };
 
        let result = await deleteCategoriesQuery.call(ctx, statements);

        expect(result).toBeUndefined();
    });
})