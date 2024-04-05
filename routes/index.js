const router = require('express').Router();
const apiRoutes = require('./api');

//mount api routes folder
router.use('/api', apiRoutes);
//response for
router.use((req, res) => res.send('Wrong route!')); 

module.exports = router;