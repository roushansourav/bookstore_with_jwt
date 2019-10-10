const router = require('express').Router();
const userController = require('../../controllers/users');

router.post('/register',userController.register);
router.post('/login',userController.login);


module.exports = router;
