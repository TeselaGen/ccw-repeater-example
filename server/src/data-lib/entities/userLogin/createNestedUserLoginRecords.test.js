const populateNestedObjectsForCreate = require('../../core/populateNestedObjectsForCreate');

const createNestedUserLoginRecords = require('./createNestedUserLoginRecords');

jest.mock('../../core/populateNestedObjectsForCreate')

describe("createNestedUserLoginRecords", () => {
    it("exports function", () => {
        expect(typeof createNestedUserLoginRecords).toBe('function');
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

        let result = createNestedUserLoginRecords.call(ctx, "db", "recordId", "records");

        expect(result).toEqual("nested objects");
        expect(populateNestedObjectsForCreate).toBeCalled();
        expect(mockCreateNestedObjects).toBeCalled();

    });
});