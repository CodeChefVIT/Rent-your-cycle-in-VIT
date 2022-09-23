import { Router } from "express";
import passport from "passport";
import { createBike, getBikeByID, getBikes, removeBike, rentABike, myBikes } from "../../../controllers/bike.controller";

const router = Router();

router.post("/create", passport.authenticate("jwt", { passReqToCallback: true, session: false }), createBike);
router.get("/all", getBikes);
router.get("/:id", getBikeByID);
router.delete("/delete/:id", passport.authenticate("jwt", { passReqToCallback: true, session: false }), removeBike);
router.put("/rent", passport.authenticate("jwt", { passReqToCallback: true, session: false }), rentABike);
router.get('/mybikes', passport.authenticate("jwt", { passReqToCallback: true, session: false }), myBikes);

export default router;