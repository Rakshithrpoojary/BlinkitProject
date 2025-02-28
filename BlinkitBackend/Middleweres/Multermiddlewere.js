import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Executing multer"), console.log("file", file);

    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    console.log("filename", file);

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
