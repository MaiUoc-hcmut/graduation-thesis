const coursesRouter = require("./courses");

function route(app: any) {
    app.use("/api/v1/courses", coursesRouter);
}

module.exports = route;
