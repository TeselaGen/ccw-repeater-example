
jest.mock('../../core/applyFilter');

const deleteTypeUpdatesQuery = require('./deleteTypeUpdatesQuery');
const applyFilter = require('../../core/applyFilter');

describe("deleteTypeUpdatesQuery", () => {
    it("deleteTypeUpdatesQuery deletes records via a query", async () => {
        let statements = [
            {
                code: "123"
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
                typeUpdate: {
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
 
        let result = await deleteTypeUpdatesQuery.call(ctx, statements);

        expect(mockAllow).toHaveBeenCalled();
        expect(mockStatements).toHaveBeenCalled();
        expect(applyFilter).toHaveBeenCalled();
        expect(mockDb).toHaveBeenCalled();
        expect(mockDel).toHaveBeenCalled();
        expect(result).toEqual(1);
    });

    it("deleteTypeUpdatesQuery returns undefined", async () => {
        let statements = [
            {
                code: "123"
            }
        ];

        let ctx = {
            entities: {
                typeUpdate: {
                    extensions: {
                        onDeleteQuery: {
                            allow: () => false
                        }
                    }
                }
            }
        };
 
        let result = await deleteTypeUpdatesQuery.call(ctx, statements);

        expect(result).toBeUndefined();
    });
})