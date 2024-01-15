const examRouter = require("./exam");


function route(app: any) {
    app.use("/api/v1/exam", examRouter);
}

module.exports = route;
