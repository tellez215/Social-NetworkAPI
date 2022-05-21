const router = require('express').Router();
const thouhgtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

router.use('/thoughts', thouhgtRoutes);
router.use('./users', userRoutes);

module.exports = router;