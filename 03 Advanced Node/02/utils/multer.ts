import multer from "multer";
import httpStatus from "http-status";

import ApiError from "./ApiError";

// const storage: multer.StorageEngine = multer.diskStorage({
//   destination(_req, _file, cb) {
//     const filePath = `${__dirname}/../uploads`;
//     cb(null, filePath);
//   },

//   filename(_req, file, cb) {
//     const filename = `${Date.now()}-${file.originalname}`;
//     cb(null, filename);
//   },
// });

const upload: multer.Multer = multer({
  // storage,
  fileFilter(_req, file, cb) {
    const maxFileSize = 3 * 1024 * 1024;

    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new ApiError(httpStatus.BAD_REQUEST, "Only images are allowed") as unknown as null, false);
    } else if (file.size > maxFileSize) {
      cb(new ApiError(httpStatus.BAD_REQUEST, "File size should not exceed 3mb") as unknown as null, false);
    } else {
      cb(null, true);
    }
  },
});

export default upload;
