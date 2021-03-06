
jest.mock('../../core/applyFilter');

const countTodo = require('./countTodo');
const applyFilter = require('../../core/applyFilter');

describe("countTodo", () => {
    it("countTodo executes count", async () => {

        let mockCount = jest.fn();
        let mockAllow = jest.fn(() => true);
        let mockFilter = jest.fn((filter) => filter);
        let mockAppendFilter = jest.fn(() => ({}));
        let mockCountQuery = "mock count query";

        let ctx = {
            db: () => ({ count: mockCount }),
            entities: {
                todo: {
                    extensions: {
                        onSelect: {
                            allow: mockAllow,
                            filter: mockFilter,
                            appendFilter: mockAppendFilter
                        },
                        onQuery: {
                            allow: mockAllow,
                            filter: mockFilter,
                            appendFilter: mockAppendFilter
                        }
                    }
                }
            }
        };

        applyFilter.mockReturnValue(mockCountQuery);
 
        let result = await countTodo.call(ctx, {});

        expect(mockCount).toHaveBeenCalled();
        expect(mockAllow).toHaveBeenCalled();
        expect(mockFilter).toHaveBeenCalled();
        expect(result).toEqual(mockCountQuery);
    });

    it("countTodo returns undefined if disallowed", async () => {
        let ctx = {
            db: () => ({ count: () => "qry" }),
            entities: {
                todo: {
                    extensions: {
                        onSelect: {
                            allow: () => false,
                            filter: (filter) => filter
                        }
                    }
                }
            }
        };
 
        let result = await countTodo.call(ctx, {});

        expect(result).toBeUndefined();
    });
})