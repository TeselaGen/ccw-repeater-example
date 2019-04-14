
const { set } = require('lodash');
const Promise = require('bluebird');

const queryTodo = require('./queryTodo');

jest.mock('../../core/buildQuery')

const buildQuery = require('../../core/buildQuery');

describe("queryTodo", () => {
    it("queryTodo executes query", async () => {
        jest.clearAllMocks();

        let mockResult = [{
            id: "123"
        }];

        let mockAllow = jest.fn(() => true);
        let mockFields = jest.fn((fields) => fields);
        let mockFilter = jest.fn((filter) => filter);

        let ctx = {
            db: () => {},
            entities: {
                todo: {
                    extensions: {
                        onSelect: {
                            allow: mockAllow,
                            filter: mockFilter,
                            fields: mockFields
                        }
                    }
                }
            }
        };

        set(ctx, 'db.client.config.client', 'pg');
 
        buildQuery.mockImplementation(() => {
            return Promise.resolve(mockResult);
        });

        let result = await queryTodo.call(ctx);

        expect(mockAllow).toHaveBeenCalled();
        expect(mockFields).toHaveBeenCalled();
        expect(mockFilter).toHaveBeenCalled();
        expect(result).toMatchObject(mockResult);
    });

    it("queryTodo returns lastFetched", async () => {
        jest.clearAllMocks();

        let mockResult = [{
            id: "123"
        }];
        
        let mockLastFetched = new Date();
        
        let expectedResult = [{
            id: "123",
            lastFetched: mockLastFetched
        }];

        let mockAllow = jest.fn(() => true);
        let mockFields = jest.fn((fields) => fields);
        let mockFilter = jest.fn((filter) => filter);
        let mockGetCurrentTimestamp = jest.fn(() => Promise.resolve(mockLastFetched) );
        let mockAppendFilter = jest.fn(() => ({}));

        let ctx = {
            db: () => { },
            entities: {
                todo: {
                    extensions: {
                        onSelect: {
                            allow: mockAllow,
                            filter: mockFilter,
                            fields: mockFields,
                            appendFilter: mockAppendFilter
                        },
                        onQuery: {
                            allow: mockAllow,
                            filter: mockFilter,
                            fields: mockFields,
                            appendFilter: mockAppendFilter
                        }
                    }
                }
            },
            getCurrentTimestamp: mockGetCurrentTimestamp
        };

        set(ctx, 'db.client.config.client', 'pg');
 
        buildQuery.mockImplementation(() => {
            return Promise.resolve(mockResult);
        });

        let result = await queryTodo.call(ctx, ["lastFetched"]);

        expect(mockGetCurrentTimestamp).toHaveBeenCalled();
        expect(result).toMatchObject(expectedResult);
    });

    it("queryTodo returns empty array if disallowed", async () => {
        let ctx = {
            db: () => ({ count: () => "qry" }),
            entities: {
                todo: {
                    extensions: {
                        onSelect: {
                            allow: () => false
                        }
                    }
                }
            }
        };
 
        let result = await queryTodo.call(ctx);

        expect(result).toEqual([]);
    });



})