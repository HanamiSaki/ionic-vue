const MongoClient = require('mongodb').MongoClient;
const http = require('http');
const httpServer = http.createServer();

httpServer.on("request", (req, res) => {
    if(req.method==="POST" && req.url === "/login") {
        let user;
        req.on("data", (chunk)=>{
            let data = "";
            data += chunk;
            user = JSON.parse(data)
            console.log(user)
        });
    }
})

httpServer.listen(3000, () => {
    console.log("running");

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

    let findData = {
        $and:[{"username":"HanamiSaki"}, {"password":"admin"}]
    }
    
    let insertData = {
        username: "Hanami_Saki",
        password: "admin"
    }

    let updateData = [
        {$or:[{"username":"Hanami_Saki"}, {"password":"admin"}]}, 
        {$set:{"password":"12345678", "root": "yes"}}
    ]

    let deleteData = {
        $and:[{"username":"Hanami_Saki"}, {"password":"12345678"}]
    }
    

    const mongo = new Connect(databaseInfo);
    mongo.setFindData(findData);
    mongo.init()
    .then(col => {
        const strategy = new Strategy(col);
        return strategy.findOne(mongo.data)
        // return strategy.insertOne(mongo.data)
        // return strategy.updateMany(mongo.data)
        // return strategy.deleteOne(mongo.data)
    })
    .then(res => {
        console.log(res)
    })
});

class Connect {
    constructor(info) {
        this.db = info.db;
        this.col = info.col;
        this.url = info.url;
        this.opt = info.opt;
        this.data = null;
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

    setFindData(data) {
        this.data = data
    }

    setInsertData(data) {
        this.data = data
    }

    setUpdateData(data) {
        this.data = data
    }

    setDeleteData(data) {
        this.data = data
    }
}

class Strategy {
    constructor(col) {
        this.col = col
    }

    findOne(data) {
        return this.col.findOne(data)
    }

    findMany(data) {
        return this.col.find(data).toArray()
    }

    findAll() {
        return this.col.find().toArray()
    }

    insertOne(data) {
        return this.col.insertOne(data);
    }

    updateOne(data) {
        return this.col.updateOne(data[0], data[1])
    }

    updateMany(data) {
        return this.col.updateMany(data[0], data[1])
    }

    deleteOne(data) {
        return this.col.deleteOne(data);
    }

    deleteMany(data) {
        return this.col.deleteMany(data);
    }
}
