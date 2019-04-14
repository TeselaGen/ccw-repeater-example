
const { set } = require('lodash');
const Promise = require('bluebird');

const getUser = require('./getUser');

describe("getUser", () => {
    it("getUser executes select by id", async () => {
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
                user: {
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
 
        let result = await getUser.call(ctx, "123");

        expect(mockAllow).toHaveBeenCalled();
        expect(mockFields).toHaveBeenCalled();
        expect(mockFirst).toHaveBeenCalled();
        expect(mockWhere).toBeCalledWith({ id: "123" });
        expect(result).toMatchObject(mockResult);
    });

    it("getUser returns undefined if id doesn't exist", async () => {

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
                user: {
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
 
        let result = await getUser.call(ctx, "123");

        expect(mockAllow).toHaveBeenCalled();
        expect(mockFields).toHaveBeenCalled();
        expect(mockFirst).toHaveBeenCalled();
        expect(mockWhere).toBeCalledWith({ id: "123" });
        expect(result).toBeUndefined();
    });

    it("getUser executes select by cid", async () => {
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
                user: {
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
 
        let result = await getUser.call(ctx, "&123");

        expect(mockAllow).toHaveBeenCalled();
        expect(mockFields).toHaveBeenCalled();
        expect(mockFirst).toHaveBeenCalled();
        expect(mockWhere).toBeCalledWith({ cid: "123" });
        expect(result).toMatchObject(mockResult);
    });

    it("getUser returns lastFetched", async () => {
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
                user: {
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
 
        let result = await getUser.call(ctx, "123", fields);

        expect(mockGetCurrentTimestamp).toHaveBeenCalled();
        expect(result).toMatchObject(expectedResult);
    });

    it("getUser returns undefined if disallowed", async () => {
        let ctx = {
            db: () => ({ count: () => "qry" }),
            entities: {
                user: {
                    extensions: {
                        onSelect: {
                            allow: () => false
                        }
                    }
                }
            }
        };
 
        let result = await getUser.call(ctx, "123");

        expect(result).toBeUndefined();
    });

    it("getUser returns undefined if null key is passed", async () => {


        let mockAllow = jest.fn(() => true);

        let ctx = {
            entities: {
                user: {
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

        let result = await getUser.call(ctx, null);

        expect(result).toBeUndefined();
    });

    it("getUser returns undefined if undefined key is passed", async () => {


        let mockAllow = jest.fn(() => true);

        let ctx = {
            entities: {
                user: {
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

        let result = await getUser.call(ctx);

        expect(result).toBeUndefined();
    });


})