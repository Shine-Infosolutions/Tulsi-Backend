const express = require('express');
const router = express.Router();
const crmController = require('../controllers/crmController');
const { auth, authorize } = require('../middleware/auth');

const roles = ['ADMIN', 'GM', 'FRONT DESK'];

router.get('/all', auth, authorize(roles), crmController.getAllCustomers);
router.get('/get/:id', auth, authorize(roles), crmController.getCustomerById);
router.post('/add', auth, authorize(roles), crmController.createCustomer);
router.put('/update/:id', auth, authorize(roles), crmController.updateCustomer);
router.delete('/delete/:id', auth, authorize(['ADMIN', 'GM']), crmController.deleteCustomer);

module.exports = router;
