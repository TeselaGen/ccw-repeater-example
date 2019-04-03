const populateNestedObjectsForUpdate = require('../../core/populateNestedObjectsForUpdate');

const updateNestedTypeUpdateRecords = require('./updateNestedTypeUpdateRecords');

jest.mock('../../core/populateNestedObjectsForUpdate')

describe("updateNestedTypeUpdateRecords", () => {
    it("exports function", () => {
        expect(typeof updateNestedTypeUpdateRecords).toBe('function');
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

        let result = updateNestedTypeUpdateRecords.call(ctx, "db", "recordId", "records");

        expect(result).toEqual("nested objects");
        expect(populateNestedObjectsForUpdate).toBeCalled();
        expect(mockUpdateNestedObjects).toBeCalled();

    });
});