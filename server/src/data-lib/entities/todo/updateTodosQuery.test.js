
const { set } = require('lodash');
const Promise = require('bluebird');

const updateTodosQuery = require('./updateTodosQuery');

jest.mock('../../core/applyFilter');
jest.mock('../../core/getCidReferences');
jest.mock('../../core/resolveCidReferences');

const applyFilter = require('../../core/applyFilter');
const getCidReferences = require('../../core/getCidReferences');
const resolveCidReferences = require('../../core/resolveCidReferences');


describe("updateTodosQuery", () => {
    it("updateTodosQuery updates records via a query", async () => {
        jest.clearAllMocks();

        let statements = [
            {
                values: {
                    attr: "value"
                },
                where: {
                    id: "123"
                }
            }
        ];

        let mockResult = [{
            id: "123"
        }];

        let mockAllow = jest.fn(() => true);
        let mockAppendFilter = jest.fn(() => ({}));
        let mockStatements = jest.fn((stmts) => stmts);
        let mockSelect = jest.fn();
        let mockDb = jest.fn((val) => {
            return {
                qry: val,
                select: mockSelect
            }
        });
        let mockUpdate = jest.fn(()=> {
            return Promise.resolve();
        })

        let ctx = {
            db: mockDb,
            entities: {
                todo: {
                    extensions: {
                        onUpdateQuery: {
                            allow: mockAllow,
                            statements: mockStatements,
                            appendFilter: mockAppendFilter
                        }
                    }
                }
            }
        };

        set(ctx, 'db.client.config.client', 'pg');

        applyFilter.mockImplementation((val) => {
            if(val && val.qry){
                return { update: mockUpdate };
            }else{
                return mockResult;
            }
        });

        let result = await updateTodosQuery.call(ctx, statements);

        expect(mockAllow).toHaveBeenCalled();
        expect(mockStatements).toHaveBeenCalled();
        expect(result).toMatchObject(["123"]);
    });

    it("updateTodosQuery returns empty array if disallowed", async () => {
        let ctx = {
            db: () => ({ count: () => "qry" }),
            entities: {
                todo: {
                    extensions: {
                        onUpdateQuery: {
                            allow: () => false
                        }
                    }
                }
            }
        };

        let result = await updateTodosQuery.call(ctx);

        expect(result).toEqual([]);
    });
})