const router = require('express').Router();
const multer = require('multer');
const {
    createCategory,
    getAllCategories,
    updateCategory,
    deletCategory,
} = require('../controller/categories.controller');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/new', upload.single('categoryImage'), createCategory);
router.get('/', getAllCategories);
router.put('/:id', upload.single('categoryImage'), updateCategory)
router.delete('/:id', deletCategory);

module.exports = router;
