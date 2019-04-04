
jest.mock('../../core/applyFilter');

const countUser = require('./countUser');
const applyFilter = require('../../core/applyFilter');

describe("countUser", () => {
    it("countUser executes count", async () => {

        let mockCount = jest.fn();
        let mockAllow = jest.fn(() => true);
        let mockFilter = jest.fn((filter) => filter);
        let mockAppendFilter = jest.fn(() => ({}));
        let mockCountQuery = "mock count query";

        let ctx = {
            db: () => ({ count: mockCount }),
            entities: {
                user: {
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
 
        let result = await countUser.call(ctx, {});

        expect(mockCount).toHaveBeenCalled();
        expect(mockAllow).toHaveBeenCalled();
        expect(mockFilter).toHaveBeenCalled();
        expect(result).toEqual(mockCountQuery);
    });

    it("countUser returns undefined if disallowed", async () => {
        let ctx = {
            db: () => ({ count: () => "qry" }),
            entities: {
                user: {
                    extensions: {
                        onSelect: {
                            allow: () => false,
                            filter: (filter) => filter
                        }
                    }
                }
            }
        };
 
        let result = await countUser.call(ctx, {});

        expect(result).toBeUndefined();
    });
})