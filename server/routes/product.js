const express = require('express');
const router = express.Router();
const {Product} = require('../models/Product');
const multer = require('multer');

const {auth} = require("../middleware/auth");

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

router.post("/uploadProduct", auth, (req, res) => {
    // save all the data we got from the client(req.body) into the DB
    const product = new Product(req.body);

    product.save(err => {
        if (err) {
            return res.status(400).json({success: false, err});
        }
        return res.status(200).json({success: true});
    });
});

router.post("/getProducts", (req, res) => {
    // get all products
    // and add new conditions to get products
    let {order, sortBy, limit, skip, filterConditions, searchTerm} = req.body;
    order = order ? order : 'desc';
    sortBy = sortBy ? sortBy : '-1';
    limit = limit ? parseInt(limit) : 100;
    skip = parseInt(skip);

    let findArgs = {};
    // check keys in the filterConditions and use it to filter DB result
    for (let key in filterConditions) {
        if (filterConditions[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: filterConditions[key][0],
                    $lte: filterConditions[key][1]
                }
            } else {
                findArgs[key] = filterConditions[key];
            }
        }
    }

    if (searchTerm) {
        Product.find(findArgs)
            .find({$text: {$search: searchTerm}})
            .populate('writer')
            .sort([[order, sortBy]])
            .limit(limit)
            .skip(skip)
            .exec((err, products) => {
                if (err) {
                    return res.status(400).json({success: false, err});
                }
                return res.status(200).json({success: true, postSize: products.length, products});
            });
    } else {
        Product.find(findArgs)
            .populate('writer')
            .sort([[order, sortBy]])
            .limit(limit)
            .skip(skip)
            .exec((err, products) => {
                if (err) {
                    return res.status(400).json({success: false, err});
                }
                return res.status(200).json({success: true, postSize: products.length, products});
            });
    }
});

// id=${productId}&type=single or type=array
router.get('/products_by_id', (req, res) => {
    let {type, id: productId} = req.query;

    if (type === 'array') {
        let productIds = productId.split(',');
        productId = [];
        productId = [...productIds];
    }

    // find single data record from DB by using this productId
    Product.find({'_id': {$in: productId}})
        .populate('writer')
        .exec((err, product) => {
            if (err) {
                return res.status(400).send(err);
            }
            return res.status(200).send(product);
        });
});

module.exports = router;
