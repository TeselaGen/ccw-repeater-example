
const { set } = require('lodash');
const Promise = require('bluebird');

const getCategory = require('./getCategory');

describe("getCategory", () => {
    it("getCategory executes select by id", async () => {
        let mockResult = {
            id: "123"
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
                category: {
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
 
        let result = await getCategory.call(ctx, "123");

        expect(mockAllow).toHaveBeenCalled();
        expect(mockFields).toHaveBeenCalled();
        expect(mockFirst).toHaveBeenCalled();
        expect(mockWhere).toBeCalledWith({ id: "123" });
        expect(result).toMatchObject(mockResult);
    });

    it("getCategory returns undefined if id doesn't exist", async () => {

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
                category: {
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
 
        let result = await getCategory.call(ctx, "123");

        expect(mockAllow).toHaveBeenCalled();
        expect(mockFields).toHaveBeenCalled();
        expect(mockFirst).toHaveBeenCalled();
        expect(mockWhere).toBeCalledWith({ id: "123" });
        expect(result).toBeUndefined();
    });

    it("getCategory executes select by cid", async () => {
        let mockResult = {
            id: "123"
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
                category: {
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
 
        let result = await getCategory.call(ctx, "&123");

        expect(mockAllow).toHaveBeenCalled();
        expect(mockFields).toHaveBeenCalled();
        expect(mockFirst).toHaveBeenCalled();
        expect(mockWhere).toBeCalledWith({ cid: "123" });
        expect(result).toMatchObject(mockResult);
    });

    it("getCategory returns lastFetched", async () => {
        let mockResult = {
            id: "123"
        };
        
        let mockLastFetched = new Date();
        
        let expectedResult = {
            id: "123",
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
                category: {
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
 
        let result = await getCategory.call(ctx, "123", fields);

        expect(mockGetCurrentTimestamp).toHaveBeenCalled();
        expect(result).toMatchObject(expectedResult);
    });

    it("getCategory returns undefined if disallowed", async () => {
        let ctx = {
            db: () => ({ count: () => "qry" }),
            entities: {
                category: {
                    extensions: {
                        onSelect: {
                            allow: () => false
                        }
                    }
                }
            }
        };
 
        let result = await getCategory.call(ctx, "123");

        expect(result).toBeUndefined();
    });

    it("getCategory returns undefined if null key is passed", async () => {


        let mockAllow = jest.fn(() => true);

        let ctx = {
            entities: {
                category: {
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

        let result = await getCategory.call(ctx, null);

        expect(result).toBeUndefined();
    });

    it("getCategory returns undefined if undefined key is passed", async () => {


        let mockAllow = jest.fn(() => true);

        let ctx = {
            entities: {
                category: {
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

        let result = await getCategory.call(ctx);

        expect(result).toBeUndefined();
    });


})