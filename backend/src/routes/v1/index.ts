import { Router } from "express";
const router = Router();

import * as userRoute from "./user/user.route";

router.get("/", (req, res) => {
    res.send("Hello World!");
});

router.use("/user", userRoute.default);



export default router;

