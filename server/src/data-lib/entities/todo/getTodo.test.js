
const { set } = require('lodash');
const Promise = require('bluebird');

const getTodo = require('./getTodo');

describe("getTodo", () => {
    it("getTodo executes select by id", async () => {
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
                todo: {
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
 
        let result = await getTodo.call(ctx, "123");

        expect(mockAllow).toHaveBeenCalled();
        expect(mockFields).toHaveBeenCalled();
        expect(mockFirst).toHaveBeenCalled();
        expect(mockWhere).toBeCalledWith({ id: "123" });
        expect(result).toMatchObject(mockResult);
    });

    it("getTodo returns undefined if id doesn't exist", async () => {

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
                todo: {
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
 
        let result = await getTodo.call(ctx, "123");

        expect(mockAllow).toHaveBeenCalled();
        expect(mockFields).toHaveBeenCalled();
        expect(mockFirst).toHaveBeenCalled();
        expect(mockWhere).toBeCalledWith({ id: "123" });
        expect(result).toBeUndefined();
    });

    it("getTodo executes select by cid", async () => {
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
                todo: {
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
 
        let result = await getTodo.call(ctx, "&123");

        expect(mockAllow).toHaveBeenCalled();
        expect(mockFields).toHaveBeenCalled();
        expect(mockFirst).toHaveBeenCalled();
        expect(mockWhere).toBeCalledWith({ cid: "123" });
        expect(result).toMatchObject(mockResult);
    });

    it("getTodo returns lastFetched", async () => {
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
                todo: {
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
 
        let result = await getTodo.call(ctx, "123", fields);

        expect(mockGetCurrentTimestamp).toHaveBeenCalled();
        expect(result).toMatchObject(expectedResult);
    });

    it("getTodo returns undefined if disallowed", async () => {
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
 
        let result = await getTodo.call(ctx, "123");

        expect(result).toBeUndefined();
    });

    it("getTodo returns undefined if null key is passed", async () => {


        let mockAllow = jest.fn(() => true);

        let ctx = {
            entities: {
                todo: {
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

        let result = await getTodo.call(ctx, null);

        expect(result).toBeUndefined();
    });

    it("getTodo returns undefined if undefined key is passed", async () => {


        let mockAllow = jest.fn(() => true);

        let ctx = {
            entities: {
                todo: {
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

        let result = await getTodo.call(ctx);

        expect(result).toBeUndefined();
    });


})