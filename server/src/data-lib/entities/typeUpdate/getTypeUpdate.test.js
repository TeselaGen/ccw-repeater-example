
const { set } = require('lodash');
const Promise = require('bluebird');

const getTypeUpdate = require('./getTypeUpdate');

describe("getTypeUpdate", () => {
    it("getTypeUpdate executes select by code", async () => {
        let mockResult = {
            code: "123"
        };

        let mockAllow = jest.fn(() => true);
        let mockFields = jest.fn((fields) => fields);
        let mockWhere = jest.fn(() => Promise.resolve(mockResult))
        let mockFirst = jest.fn(() => {
            return {
                where: mockWhere
            }
        });

        let ctx = {
            db: () => ({ first: mockFirst }),
            entities: {
                typeUpdate: {
                    extensions: {
                        onSelect: {
                            allow: mockAllow,
                            fields: mockFields
                        },
                        onGet: {
                            allow: mockAllow,
                            fields: mockFields
                        }
                    }
                }
            }
        };

        set(ctx, 'db.client.config.client', 'pg');
 
        let result = await getTypeUpdate.call(ctx, "123");

        expect(mockAllow).toHaveBeenCalled();
        expect(mockFields).toHaveBeenCalled();
        expect(mockFirst).toHaveBeenCalled();
        expect(mockWhere).toBeCalledWith({ code: "123" });
        expect(result).toMatchObject(mockResult);
    });

    it("getTypeUpdate returns undefined if code doesn't exist", async () => {

        let mockAllow = jest.fn(() => true);
        let mockFields = jest.fn((fields) => fields);
        let mockWhere = jest.fn(() => Promise.resolve())
        let mockFirst = jest.fn(() => {
            return {
                where: mockWhere
            }
        });

        let ctx = {
            db: () => ({ first: mockFirst }),
            entities: {
                typeUpdate: {
                    extensions: {
                        onSelect: {
                            allow: mockAllow,
                            fields: mockFields
                        },
                        onGet: {
                            allow: mockAllow,
                            fields: mockFields
                        }
                    }
                }
            }
        };

        set(ctx, 'db.client.config.client', 'pg');
 
        let result = await getTypeUpdate.call(ctx, "123");

        expect(mockAllow).toHaveBeenCalled();
        expect(mockFields).toHaveBeenCalled();
        expect(mockFirst).toHaveBeenCalled();
        expect(mockWhere).toBeCalledWith({ code: "123" });
        expect(result).toBeUndefined();
    });

    it("getTypeUpdate executes select by cid", async () => {
        let mockResult = {
            code: "123"
        };

        let mockAllow = jest.fn(() => true);
        let mockFields = jest.fn((fields) => fields);
        let mockWhere = jest.fn(() => Promise.resolve(mockResult))
        let mockFirst = jest.fn(() => {
            return {
                where: mockWhere
            }
        });

        let ctx = {
            db: () => ({ first: mockFirst }),
            entities: {
                typeUpdate: {
                    extensions: {
                        onSelect: {
                            allow: mockAllow,
                            fields: mockFields
                        },
                        onGet: {
                            allow: mockAllow,
                            fields: mockFields
                        }
                    }
                }
            }
        };

        set(ctx, 'db.client.config.client', 'pg');
 
        let result = await getTypeUpdate.call(ctx, "&123");

        expect(mockAllow).toHaveBeenCalled();
        expect(mockFields).toHaveBeenCalled();
        expect(mockFirst).toHaveBeenCalled();
        expect(mockWhere).toBeCalledWith({ cid: "123" });
        expect(result).toMatchObject(mockResult);
    });

    it("getTypeUpdate returns lastFetched", async () => {
        let mockResult = {
            code: "123"
        };
        
        let mockLastFetched = new Date();
        
        let expectedResult = {
            code: "123",
            lastFetched: mockLastFetched
        };

        let fields = [ "lastFetched" ]

        let mockAllow = jest.fn(() => true);
        let mockFields = jest.fn((fields) => fields);
        let mockWhere = jest.fn(() => Promise.resolve(mockResult))
        let mockFirst = jest.fn(() => {
            return {
                where: mockWhere
            }
        });

        let mockGetCurrentTimestamp = jest.fn(() => Promise.resolve(mockLastFetched) );

        let ctx = {
            db: () => ({ first: mockFirst }),
            entities: {
                typeUpdate: {
                    extensions: {
                        onSelect: {
                            allow: mockAllow,
                            fields: mockFields
                        },
                        onGet: {
                            allow: mockAllow,
                            fields: mockFields
                        }
                    }
                }
            },
            getCurrentTimestamp: mockGetCurrentTimestamp
        };

        set(ctx, 'db.client.config.client', 'pg');
 
        let result = await getTypeUpdate.call(ctx, "123", fields);

        expect(mockGetCurrentTimestamp).toHaveBeenCalled();
        expect(result).toMatchObject(expectedResult);
    });

    it("getTypeUpdate returns undefined if disallowed", async () => {
        let ctx = {
            db: () => ({ count: () => "qry" }),
            entities: {
                typeUpdate: {
                    extensions: {
                        onSelect: {
                            allow: () => false
                        }
                    }
                }
            }
        };
 
        let result = await getTypeUpdate.call(ctx, "123");

        expect(result).toBeUndefined();
    });

    it("getTypeUpdate returns undefined if null key is passed", async () => {


        let mockAllow = jest.fn(() => true);

        let ctx = {
            entities: {
                typeUpdate: {
                    extensions: {
                        onSelect: {
                            allow: mockAllow
                        },
                        onGet: {
                            allow: mockAllow
                        }
                    }
                }
            }
        };

        let result = await getTypeUpdate.call(ctx, null);

        expect(result).toBeUndefined();
    });

    it("getTypeUpdate returns undefined if undefined key is passed", async () => {


        let mockAllow = jest.fn(() => true);

        let ctx = {
            entities: {
                typeUpdate: {
                    extensions: {
                        onSelect: {
                            allow: mockAllow
                        },
                        onGet: {
                            allow: mockAllow
                        }
                    }
                }
            }
        };

        let result = await getTypeUpdate.call(ctx);

        expect(result).toBeUndefined();
    });


})