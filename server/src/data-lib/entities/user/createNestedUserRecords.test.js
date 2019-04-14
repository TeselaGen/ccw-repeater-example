const populateNestedObjectsForCreate = require('../../core/populateNestedObjectsForCreate');

const createNestedUserRecords = require('./createNestedUserRecords');

jest.mock('../../core/populateNestedObjectsForCreate')

describe("createNestedUserRecords", () => {
    it("exports function", () => {
        expect(typeof createNestedUserRecords).toBe('function');
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

        let result = createNestedUserRecords.call(ctx, "db", "recordId", "records");

        expect(result).toEqual("nested objects");
        expect(populateNestedObjectsForCreate).toBeCalled();
        expect(mockCreateNestedObjects).toBeCalled();

    });
});