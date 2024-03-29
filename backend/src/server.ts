import dotenv from "dotenv";
dotenv.config();
import errorHandler from "errorhandler";
import app from "./app";

if (process.env.NODE_ENV === "development") {
    app.use(errorHandler());
}


/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
    console.log("App is running at http://localhost:%d in %s mode", app.get("port"),app.get("env"));
});

export default server;