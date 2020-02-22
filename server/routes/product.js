const express = require('express');
const router = express.Router();

const multer = require('multer');

const { auth } = require("../middleware/auth");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' || ext !== '.jpeg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, jpeg, png are allowed'), false);
        }
        cb(null, true);
    }
});

const upload = multer({storage: storage}).single("file");

//=================================
//             Product
//=================================

router.post("/uploadImage", auth, (req, res) => {
    // after got that image from the client server
    // it needs to be saved inside the Node server

    upload(req, res, err => {
        if (err) {
            return res.json({success: false, err});
        }
        return res.json({success: true, image: res.req.file.path, fileName: res.req.file.fieldname});
    });

});

module.exports = router;
