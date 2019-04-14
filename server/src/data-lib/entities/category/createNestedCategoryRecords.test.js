const populateNestedObjectsForCreate = require('../../core/populateNestedObjectsForCreate');

const createNestedCategoryRecords = require('./createNestedCategoryRecords');

jest.mock('../../core/populateNestedObjectsForCreate')

describe("createNestedCategoryRecords", () => {
    it("exports function", () => {
        expect(typeof createNestedCategoryRecords).toBe('function');
    });

    it("populates nested objects and calls base method", () => {
        jest.clearAllMocks();
        const mockCreateNestedObjects = jest.fn(() => "nested objects");
        let ctx = {
            createNestedObjects: mockCreateNestedObjects
        };

        populateNestedObjectsForCreate.mockImplementation(() => {
            return "populated nested objects";
        });

        let result = createNestedCategoryRecords.call(ctx, "db", "recordId", "records");

        expect(result).toEqual("nested objects");
        expect(populateNestedObjectsForCreate).toBeCalled();
        expect(mockCreateNestedObjects).toBeCalled();

    });
});