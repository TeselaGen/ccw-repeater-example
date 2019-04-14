
jest.mock('../../core/applyFilter');

const countUserLogin = require('./countUserLogin');
const applyFilter = require('../../core/applyFilter');

describe("countUserLogin", () => {
    it("countUserLogin executes count", async () => {

        let mockCount = jest.fn();
        let mockAllow = jest.fn(() => true);
        let mockFilter = jest.fn((filter) => filter);
        let mockAppendFilter = jest.fn(() => ({}));
        let mockCountQuery = "mock count query";

        let ctx = {
            db: () => ({ count: mockCount }),
            entities: {
                userLogin: {
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
 
        let result = await countUserLogin.call(ctx, {});

        expect(mockCount).toHaveBeenCalled();
        expect(mockAllow).toHaveBeenCalled();
        expect(mockFilter).toHaveBeenCalled();
        expect(result).toEqual(mockCountQuery);
    });

    it("countUserLogin returns undefined if disallowed", async () => {
        let ctx = {
            db: () => ({ count: () => "qry" }),
            entities: {
                userLogin: {
                    extensions: {
                        onSelect: {
                            allow: () => false,
                            filter: (filter) => filter
                        }
                    }
                }
            }
        };
 
        let result = await countUserLogin.call(ctx, {});

        expect(result).toBeUndefined();
    });
})