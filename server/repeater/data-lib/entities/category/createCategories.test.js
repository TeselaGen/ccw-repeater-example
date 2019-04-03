const createCategories = require('./createCategories');

jest.mock('../../core/getNestedParentRecords');
jest.mock('../../core/insertParentRecords');
jest.mock('../../core/getCidReferences');
jest.mock('../../core/resolveCidReferences');
jest.mock('../../core/mapAttributesToColumns');


const getNestedParentRecords = require('../../core/getNestedParentRecords');
const insertParentRecords = require('../../core/insertParentRecords');
const getCidReferences = require('../../core/getCidReferences');
const resolveCidReferences = require('../../core/resolveCidReferences');
const mapAttributesToColumns = require('../../core/mapAttributesToColumns');

describe("createCategories", () => {
    it("createCategories inserts records", async () => {
        let records = [
            {
                attr: "val"
            }
        ];

        let mockAllow = jest.fn(() => true);
        let mockRecords = jest.fn((recs) => recs);
        let mockCreateNestedRecords = jest.fn(() => Promise.resolve());
        let mockReturning = jest.fn(() => Promise.resolve(["123"]));
        let mockBatchInsert = jest.fn(() => {
            return {
                returning: mockReturning
            }
        })
        let mockDb = {
                batchInsert: mockBatchInsert
            };

        let ctx = {
            db: mockDb,
            entities: {
                category: {
                    extensions: {
                        onCreate: {
                            allow: mockAllow,
                            records: mockRecords
                        }
                    },
                    createNestedRecords: mockCreateNestedRecords
                }
            }
        };

        let result = await createCategories.call(ctx, records);

        expect(mockAllow).toHaveBeenCalled();
        expect(mockRecords).toHaveBeenCalled();
        
        expect(getNestedParentRecords).toHaveBeenCalled();
        expect(insertParentRecords).toHaveBeenCalled();
        expect(getCidReferences).toHaveBeenCalled();
        expect(resolveCidReferences).toHaveBeenCalled();

        expect(mockBatchInsert).toHaveBeenCalled();
        expect(mockReturning).toHaveBeenCalled();
        
        expect(mockCreateNestedRecords).toHaveBeenCalled();
        
        expect(result).toEqual(["123"]);
    });

    it("createCategories returns empty array", async () => {
        let records = [
            {
                id: "123"
            }
        ];

        let ctx = {
            entities: {
                category: {
                    extensions: {
                        onCreate: {
                            allow: () => false
                        }
                    }
                }
            }
        };
 
        let result = await createCategories.call(ctx, records);

        expect(result).toEqual([]);
    });

    it("createCategories throws error on cid as primary key", async () => {
        expect.assertions(1);

        let records = [
            {
                id: "&123"
            }
        ];

        let ctx = {
            entities: {
                category: {
                    extensions: {
                        onCreate: {
                            allow: () => true,
                            records: (rec) => rec
                        }
                    }
                }
            }
        };
        
        try{
            await createCategories.call(ctx, records)
        }catch(err){
            expect(err).toBeDefined();
        }
    });
})