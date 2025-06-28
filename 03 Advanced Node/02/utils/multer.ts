import multer from "multer";
import httpStatus from "http-status";

import ApiError from "./ApiError";

const storage: multer.StorageEngine = multer.diskStorage({
  destination(_req, _file, cb) {
    const filePath = `${__dirname}/../uploads`;
    cb(null, filePath);
  },

  filename(_req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload: multer.Multer = multer({
  storage,
  fileFilter(_req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new ApiError(httpStatus.BAD_REQUEST, "Only images are allowed") as unknown as null, false);
    }
    cb(null, true);
  },
});

export default upload;
