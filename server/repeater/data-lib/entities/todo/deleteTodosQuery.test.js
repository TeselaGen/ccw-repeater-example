
jest.mock('../../core/applyFilter');

const deleteTodosQuery = require('./deleteTodosQuery');
const applyFilter = require('../../core/applyFilter');

describe("deleteTodosQuery", () => {
    it("deleteTodosQuery deletes records via a query", async () => {
        let statements = [
            {
                Id: "123"
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
                todo: {
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
 
        let result = await deleteTodosQuery.call(ctx, statements);

        expect(mockAllow).toHaveBeenCalled();
        expect(mockStatements).toHaveBeenCalled();
        expect(applyFilter).toHaveBeenCalled();
        expect(mockDb).toHaveBeenCalled();
        expect(mockDel).toHaveBeenCalled();
        expect(result).toEqual(1);
    });

    it("deleteTodosQuery returns undefined", async () => {
        let statements = [
            {
                Id: "123"
            }
        ];

        let ctx = {
            entities: {
                todo: {
                    extensions: {
                        onDeleteQuery: {
                            allow: () => false
                        }
                    }
                }
            }
        };
 
        let result = await deleteTodosQuery.call(ctx, statements);

        expect(result).toBeUndefined();
    });
})