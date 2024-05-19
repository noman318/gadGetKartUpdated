import path from "path";
import { Router } from "express";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extName = filetypes.test(path.extname(file.originalname).toLowerCase());
  console.log("extName", extName);
  const mimetype = filetypes.test(file.mimetype);
  console.log("mimetype", mimetype);

  if (extName && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only");
  }
}

const uplaod = multer({
  storage,
});

router.post("/", uplaod.single("image"), (req, res) => {
  res.send({
    message: "Image Uploaded",
    image: `${req.file.path}`,
  });
});

export default router;
