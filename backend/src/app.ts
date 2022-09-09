import express from "express";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";

import * as v1 from "./routes/v1/index";

require("./config/database");
require("./config/passport");

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("trust proxy", true);

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200
};



app.use(helmet());
app.use(cors(corsOptions));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;


app.use("/api/v1",v1.default);

export default app;

