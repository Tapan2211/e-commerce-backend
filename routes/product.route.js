const router = require('express').Router();
const multer = require('multer');
const {
    createProduct,
    getProductByCategory,
    updateProduct,
    deleteProduct
} = require('../controller/product.controller');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/new', upload.single('image'), createProduct);
router.get('/category/:categoryName', getProductByCategory);
router.put('/:id', upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
