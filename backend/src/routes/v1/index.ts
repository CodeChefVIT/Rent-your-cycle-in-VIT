import { Router } from "express";
const router = Router();

import * as userRoute from "./user/user.route";
import * as bikeRoute from "./bike/bike.route";
router.get("/", (req, res) => {
    res.send("Hello World!");
});

router.use("/user", userRoute.default);
router.use("/bike", bikeRoute.default);


export default router;

