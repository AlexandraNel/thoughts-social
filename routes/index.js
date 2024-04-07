const router = require('express').Router();

//no homeroute as there is no landing/html routes in this proj
//mount api routes folder
router.use('/api', require('./api'));
//response for anything other than /api
router.use((req, res) => res.send('Wrong route!')); 

module.exports = router;