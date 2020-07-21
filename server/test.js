const MongoClient = require('mongodb').MongoClient;
const http = require('http');
const httpServer = http.createServer();

httpServer.listen(1080, () => {
    console.log("running");

    let data = {
        $and:[{"username":"HanamiSaki"}, {"password":"admin"}]
    }

    const collection = new Connect(databaseInfo);
    const strategy = new Strategy(data);

    collection.init()
    .then(col => {
        return strategy.find(col)
    })
    .then(res => {
        console.log(res)
    })
});

let databaseInfo = {
    db: '学生管理系统',
    col: 'user',
    url: "mongodb://Hanami_Saki:123456789@localhost:27017/",
    opt: {
        w: 1,
        native_parser: false,
        poolSize: 5,
        connectTimeoutMS: 500,
        auto_reconnect: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
}

class Connect {
    constructor(info) {
        this.db = info.db;
        this.col = info.col;
        this.url = info.url;
        this.opt = info.opt;
    }

    init() {
        return new Promise(resolve => {
            MongoClient.connect(this.url, this.opt, async(err, db) => {
                try {
                    let col = await db.db(this.db).collection(this.col);
                    resolve(col);
                } catch (err) {
                    console.log(err);
                } finally {
                    //db.close();
                }
            });
        });
    }
}

class Strategy {
    constructor(data) {
        this.data = data;
    }

    find(col) {
        return col.findOne(this.data);
    }
}
