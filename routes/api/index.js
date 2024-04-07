const router = require ('express').Router();
const userRoute = require ('./userRoutes');
const thoughtRoutes = require('./thoughtsRoutes');

router.use('/users', userRoute);
router.use('/thoughts', thoughtRoutes);

module.exports = router;