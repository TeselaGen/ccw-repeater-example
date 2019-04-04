const populateNestedObjectsForDelete = require('../../core/populateNestedObjectsForDelete');

const deleteNestedUserLoginRecords = require('./deleteNestedUserLoginRecords');

jest.mock('../../core/populateNestedObjectsForDelete')

describe("deleteNestedUserLoginRecords", () => {
    it("exports function", () => {
        expect(typeof deleteNestedUserLoginRecords).toBe('function');
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

        let result = deleteNestedUserLoginRecords.call(ctx, "db", "recordId", "records");

        expect(result).toEqual("nested objects");
        expect(populateNestedObjectsForDelete).toBeCalled();
        expect(mockDeleteNestedObjects).toBeCalled();

    });
});