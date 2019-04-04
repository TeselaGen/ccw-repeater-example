const populateNestedObjectsForUpdate = require('../../core/populateNestedObjectsForUpdate');

const updateNestedUserLoginRecords = require('./updateNestedUserLoginRecords');

jest.mock('../../core/populateNestedObjectsForUpdate')

describe("updateNestedUserLoginRecords", () => {
    it("exports function", () => {
        expect(typeof updateNestedUserLoginRecords).toBe('function');
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

        let result = updateNestedUserLoginRecords.call(ctx, "db", "recordId", "records");

        expect(result).toEqual("nested objects");
        expect(populateNestedObjectsForUpdate).toBeCalled();
        expect(mockUpdateNestedObjects).toBeCalled();

    });
});