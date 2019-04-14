const populateNestedObjectsForDelete = require('../../core/populateNestedObjectsForDelete');

const deleteNestedUserRecords = require('./deleteNestedUserRecords');

jest.mock('../../core/populateNestedObjectsForDelete')

describe("deleteNestedUserRecords", () => {
    it("exports function", () => {
        expect(typeof deleteNestedUserRecords).toBe('function');
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

        let result = deleteNestedUserRecords.call(ctx, "db", "recordId", "records");

        expect(result).toEqual("nested objects");
        expect(populateNestedObjectsForDelete).toBeCalled();
        expect(mockDeleteNestedObjects).toBeCalled();

    });
});