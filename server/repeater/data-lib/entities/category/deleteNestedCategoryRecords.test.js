const populateNestedObjectsForDelete = require('../../core/populateNestedObjectsForDelete');

const deleteNestedCategoryRecords = require('./deleteNestedCategoryRecords');

jest.mock('../../core/populateNestedObjectsForDelete')

describe("deleteNestedCategoryRecords", () => {
    it("exports function", () => {
        expect(typeof deleteNestedCategoryRecords).toBe('function');
    });

    it("populates nested objects and calls base method", () => {
        jest.clearAllMocks();
        const mockDeleteNestedObjects = jest.fn(() => "nested objects");
        let ctx = {
            deleteNestedObjects: mockDeleteNestedObjects
        };

        populateNestedObjectsForDelete.mockImplementation(() => {
            return "populated nested objects";
        });

        let result = deleteNestedCategoryRecords.call(ctx, "db", "recordId", "records");

        expect(result).toEqual("nested objects");
        expect(populateNestedObjectsForDelete).toBeCalled();
        expect(mockDeleteNestedObjects).toBeCalled();

    });
});