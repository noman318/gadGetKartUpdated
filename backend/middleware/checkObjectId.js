import { isValidObjectId } from "mongoose";

function checkObjectId(req, res, next) {
  console.log("req.params.id", req.params.id);
  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error(`Invalid ObjectId of:  ${req.params.id}`);
  }
  next();
}

export default checkObjectId;
