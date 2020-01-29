const express = require('express')
const router = express.Router()

const customMdw = require('../middleware/custom');
const MonumentsController = require('../controllers/monuments')


//GET UNPROTECTED
router.get('/', MonumentsController.getController);
router.get('/:id', MonumentsController.getByIdController);
//POST PROTECTED
router.post('/', customMdw.ensureAuthenticated, MonumentsController.postController);
//PUT PROTECTED
router.put('/', customMdw.ensureAuthenticated, MonumentsController.putController);
//DELETE PROTECTED AND NEED ROLE SUPER_ADMIN => (ON SERVICE)
router.delete('/:id', customMdw.ensureAuthenticated, MonumentsController.deleteByIdController);

module.exports = router