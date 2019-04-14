
const applyFilter = require('./applyFilter');

jest.mock('tg-knex-query-resolver');

const queryResolver = require('tg-knex-query-resolver');
const tableMap = require('../db/table-map.json');

jest.mock('../db/table-map.json', () => {
    return {
        tableMap: true
    };
});

describe("applyFilter", () => {

    beforeAll(() => {
        queryResolver.convertSimpleFilter.mockImplementation(() => "normalized filter")
        queryResolver.mapFieldNames.mockImplementation(() => "mapped query")
        queryResolver.parseQuery.mockImplementation(() => "parsed filter")
        queryResolver.resolveQuery.mockImplementation(() => "resolved query")
    });

    it("exports function", () => {
        expect(typeof applyFilter).toBe('function');
    });

    it("applies a filter", () => {
        jest.clearAllMocks();
        
        let qry = applyFilter("qry", "testModel", { status: "tested" });

        expect(qry).toEqual("resolved query");
        expect(queryResolver.convertSimpleFilter).toHaveBeenCalledWith("testModel", { status: "tested" });
        expect(queryResolver.mapFieldNames).toHaveBeenCalledWith("normalized filter", { tableMap: true });
        expect(queryResolver.parseQuery).toHaveBeenCalledWith("mapped query");
        expect(queryResolver.resolveQuery).toHaveBeenCalledWith("qry", "parsed filter", { filterOnly: true });

    });

    it("doesn't apply a null or undefined filter", () => {
        jest.clearAllMocks();
        
        let qry = applyFilter("qry", "testModel");

        expect(qry).toEqual("qry");
        expect(queryResolver.convertSimpleFilter).not.toHaveBeenCalled();
        expect(queryResolver.mapFieldNames).not.toHaveBeenCalled();
        expect(queryResolver.parseQuery).not.toHaveBeenCalled();
        expect(queryResolver.resolveQuery).not.toHaveBeenCalled();
    });
});