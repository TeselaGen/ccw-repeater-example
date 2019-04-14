const populateNestedObjectsForDelete = require('../../core/populateNestedObjectsForDelete');

const deleteNestedTypeUpdateRecords = require('./deleteNestedTypeUpdateRecords');

jest.mock('../../core/populateNestedObjectsForDelete')

describe("deleteNestedTypeUpdateRecords", () => {
    it("exports function", () => {
        expect(typeof deleteNestedTypeUpdateRecords).toBe('function');
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

        let result = deleteNestedTypeUpdateRecords.call(ctx, "db", "recordId", "records");

        expect(result).toEqual("nested objects");
        expect(populateNestedObjectsForDelete).toBeCalled();
        expect(mockDeleteNestedObjects).toBeCalled();

    });
});