const populateNestedObjectsForUpdate = require('../../core/populateNestedObjectsForUpdate');

const updateNestedTodoRecords = require('./updateNestedTodoRecords');

jest.mock('../../core/populateNestedObjectsForUpdate')

describe("updateNestedTodoRecords", () => {
    it("exports function", () => {
        expect(typeof updateNestedTodoRecords).toBe('function');
    });

    it("populates nested objects and calls base method", () => {
        jest.clearAllMocks();
        const mockUpdateNestedObjects = jest.fn(() => "nested objects");
        let ctx = {
            updateNestedObjects: mockUpdateNestedObjects
        };

        populateNestedObjectsForUpdate.mockImplementation(() => {
            return "populated nested objects";
        });

        let result = updateNestedTodoRecords.call(ctx, "db", "recordId", "records");

        expect(result).toEqual("nested objects");
        expect(populateNestedObjectsForUpdate).toBeCalled();
        expect(mockUpdateNestedObjects).toBeCalled();

    });
});