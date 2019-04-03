
jest.mock('../../core/applyFilter');

const countCategory = require('./countCategory');
const applyFilter = require('../../core/applyFilter');

describe("countCategory", () => {
    it("countCategory executes count", async () => {

        let mockCount = jest.fn();
        let mockAllow = jest.fn(() => true);
        let mockFilter = jest.fn((filter) => filter);
        let mockAppendFilter = jest.fn(() => ({}));
        let mockCountQuery = "mock count query";

        let ctx = {
            db: () => ({ count: mockCount }),
            entities: {
                category: {
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
 
        let result = await countCategory.call(ctx, {});

        expect(mockCount).toHaveBeenCalled();
        expect(mockAllow).toHaveBeenCalled();
        expect(mockFilter).toHaveBeenCalled();
        expect(result).toEqual(mockCountQuery);
    });

    it("countCategory returns undefined if disallowed", async () => {
        let ctx = {
            db: () => ({ count: () => "qry" }),
            entities: {
                category: {
                    extensions: {
                        onSelect: {
                            allow: () => false,
                            filter: (filter) => filter
                        }
                    }
                }
            }
        };
 
        let result = await countCategory.call(ctx, {});

        expect(result).toBeUndefined();
    });
})