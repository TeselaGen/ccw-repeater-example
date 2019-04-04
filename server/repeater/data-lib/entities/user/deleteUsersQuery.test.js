
jest.mock('../../core/applyFilter');

const deleteUsersQuery = require('./deleteUsersQuery');
const applyFilter = require('../../core/applyFilter');

describe("deleteUsersQuery", () => {
    it("deleteUsersQuery deletes records via a query", async () => {
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
                user: {
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
 
        let result = await deleteUsersQuery.call(ctx, statements);

        expect(mockAllow).toHaveBeenCalled();
        expect(mockStatements).toHaveBeenCalled();
        expect(applyFilter).toHaveBeenCalled();
        expect(mockDb).toHaveBeenCalled();
        expect(mockDel).toHaveBeenCalled();
        expect(result).toEqual(1);
    });

    it("deleteUsersQuery returns undefined", async () => {
        let statements = [
            {
                id: "123"
            }
        ];

        let ctx = {
            entities: {
                user: {
                    extensions: {
                        onDeleteQuery: {
                            allow: () => false
                        }
                    }
                }
            }
        };
 
        let result = await deleteUsersQuery.call(ctx, statements);

        expect(result).toBeUndefined();
    });
})