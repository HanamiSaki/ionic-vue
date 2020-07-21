class databaseInfo extends AnotherClass {
    data = null;
    url = "mongodb://Hanami_Saki:123456789@localhost:27017/";
    opt = {
        w: 1,    
        native_parser: false,
        poolSize: 5,
        connectTimeoutMS: 500,
        auto_reconnect: true,
        useNewUrlParser: true
    };

    fn = async (err, db) => {
        try {
            let col = await db.db(this.db).collection(this.col);

            let result = await col.findOne(this.data);

            this.result = result;
        } catch (err) {
            console.log(err);
        } finally {
            db.close();
        }
    };
}

class Mongo {
    data = null;
    callback = null;

    constructor(db: string, col: string) {
        this.db = db;
        this.col = col;

        this.fn = {
            findMongo: async (err, db) => {
                try {
                    let col = await db.db(this.db).collection(this.col);
                    let result = await col.findOne(this.data);
                    this.callback(result);
                } catch (err) {
                    console.log(err);
                } finally {
                    db.close();
                }
            },

            insertMongo: async (err, db) => {
                try {
                    let col = await db.db(this.db).collection(this.col);
                    let result = await col.insertOne(this.data);
                    this.callback(result);
                } catch (err) {
                    console.log(err);
                } finally {
                    db.close();
                }
            },

            updateMongo: async (err, db) => {
                try {
                    let col = await db.db(this.db).collection(this.col);
                    let result = await col.updateOne(this.data);
                    this.callback(result);
                } catch (err) {
                    console.log(err);
                } finally {
                    db.close();
                }
            },

            deleteMongo: async (err, db) => {
                try {
                    let col = await db.db(this.db).collection(this.col);
                    let result = await col.deleteOne(this.data);
                    this.callback(result);
                } catch (err) {
                    console.log(err);
                } finally {
                    db.close();
                }
            }
        }
    }

    setFindData(data) {
        this.data = data;
    }
}
