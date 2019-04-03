
jest.mock('../../core/applyFilter');

const deleteCategories = require('./deleteCategories');
const applyFilter = require('../../core/applyFilter');

describe("deleteCategories", () => {
    it("deleteCategories deletes records", async () => {
        let records = [
            {
                id: "123"
            }
        ];

        let mockAllow = jest.fn(() => true);
        let mockFilter = jest.fn((filter) => filter);
        let mockDel = jest.fn(() => Promise.resolve(1));
        let mockDeleteNestedRecords = jest.fn(() => Promise.resolve(1));
        let mockDb = jest.fn(() => "mock db");
        let mockAppendFilter = jest.fn(() => ({}));

        let ctx = {
            db: mockDb,
            entities: {
                category: {
                    extensions: {
                        onDelete: {
                            allow: mockAllow,
                            filter: mockFilter,
                            appendFilter: mockAppendFilter
                        }
                    },
                    deleteNestedRecords: mockDeleteNestedRecords
                }
            }
        };

        applyFilter.mockReturnValue({
            del: mockDel
        });
 
        let result = await deleteCategories.call(ctx, records);

        expect(mockAllow).toHaveBeenCalled();
        expect(mockFilter).toHaveBeenCalled();
        expect(mockDeleteNestedRecords).toHaveBeenCalled();
        expect(applyFilter).toHaveBeenCalled();
        expect(mockDb).toHaveBeenCalled();
        expect(mockDel).toHaveBeenCalled();
        expect(result).toEqual(2);
    });

    it("deleteCategories returns undefined", async () => {
        let records = [
            {
                id: "123"
            }
        ];

        let ctx = {
            entities: {
                category: {
                    extensions: {
                        onDelete: {
                            allow: () => false
                        }
                    }
                }
            }
        };
 
        let result = await deleteCategories.call(ctx, records);

        expect(result).toBeUndefined();
    });
})