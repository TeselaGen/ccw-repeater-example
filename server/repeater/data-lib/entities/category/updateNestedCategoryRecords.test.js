const populateNestedObjectsForUpdate = require('../../core/populateNestedObjectsForUpdate');

const updateNestedCategoryRecords = require('./updateNestedCategoryRecords');

jest.mock('../../core/populateNestedObjectsForUpdate')

describe("updateNestedCategoryRecords", () => {
    it("exports function", () => {
        expect(typeof updateNestedCategoryRecords).toBe('function');
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

        let result = updateNestedCategoryRecords.call(ctx, "db", "recordId", "records");

        expect(result).toEqual("nested objects");
        expect(populateNestedObjectsForUpdate).toBeCalled();
        expect(mockUpdateNestedObjects).toBeCalled();

    });
});