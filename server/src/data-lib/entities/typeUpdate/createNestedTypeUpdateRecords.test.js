const populateNestedObjectsForCreate = require('../../core/populateNestedObjectsForCreate');

const createNestedTypeUpdateRecords = require('./createNestedTypeUpdateRecords');

jest.mock('../../core/populateNestedObjectsForCreate')

describe("createNestedTypeUpdateRecords", () => {
    it("exports function", () => {
        expect(typeof createNestedTypeUpdateRecords).toBe('function');
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

        let result = createNestedTypeUpdateRecords.call(ctx, "db", "recordId", "records");

        expect(result).toEqual("nested objects");
        expect(populateNestedObjectsForCreate).toBeCalled();
        expect(mockCreateNestedObjects).toBeCalled();

    });
});