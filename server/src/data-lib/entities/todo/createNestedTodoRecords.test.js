const populateNestedObjectsForCreate = require('../../core/populateNestedObjectsForCreate');

const createNestedTodoRecords = require('./createNestedTodoRecords');

jest.mock('../../core/populateNestedObjectsForCreate')

describe("createNestedTodoRecords", () => {
    it("exports function", () => {
        expect(typeof createNestedTodoRecords).toBe('function');
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

        let result = createNestedTodoRecords.call(ctx, "db", "recordId", "records");

        expect(result).toEqual("nested objects");
        expect(populateNestedObjectsForCreate).toBeCalled();
        expect(mockCreateNestedObjects).toBeCalled();

    });
});