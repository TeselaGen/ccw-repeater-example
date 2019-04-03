const populateNestedObjectsForDelete = require('../../core/populateNestedObjectsForDelete');

const deleteNestedTodoRecords = require('./deleteNestedTodoRecords');

jest.mock('../../core/populateNestedObjectsForDelete')

describe("deleteNestedTodoRecords", () => {
    it("exports function", () => {
        expect(typeof deleteNestedTodoRecords).toBe('function');
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

        let result = deleteNestedTodoRecords.call(ctx, "db", "recordId", "records");

        expect(result).toEqual("nested objects");
        expect(populateNestedObjectsForDelete).toBeCalled();
        expect(mockDeleteNestedObjects).toBeCalled();

    });
});