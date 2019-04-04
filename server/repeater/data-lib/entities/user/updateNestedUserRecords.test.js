const populateNestedObjectsForUpdate = require('../../core/populateNestedObjectsForUpdate');

const updateNestedUserRecords = require('./updateNestedUserRecords');

jest.mock('../../core/populateNestedObjectsForUpdate')

describe("updateNestedUserRecords", () => {
    it("exports function", () => {
        expect(typeof updateNestedUserRecords).toBe('function');
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

        let result = updateNestedUserRecords.call(ctx, "db", "recordId", "records");

        expect(result).toEqual("nested objects");
        expect(populateNestedObjectsForUpdate).toBeCalled();
        expect(mockUpdateNestedObjects).toBeCalled();

    });
});