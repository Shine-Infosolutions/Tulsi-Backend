const Customer = require('../models/Customer');

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const { search } = req.query;
    const query = { deleted: false };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { number: { $regex: search, $options: 'i' } },
        { reason: { $regex: search, $options: 'i' } },
      ];
    }

    const customers = await Customer.find(query).sort({ createdAt: -1 });
    res.json({ success: true, customers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single customer
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id, deleted: false });
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json({ success: true, customer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create customer
exports.createCustomer = async (req, res) => {
  try {
    const { name, number, address, reason, notes } = req.body;
    const customer = new Customer({ name, number, address, reason, notes });
    await customer.save();
    res.status(201).json({ success: true, customer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update customer
exports.updateCustomer = async (req, res) => {
  try {
    const { name, number, address, reason, notes } = req.body;
    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id, deleted: false },
      { name, number, address, reason, notes },
      { new: true }
    );
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json({ success: true, customer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Soft delete customer
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id, deleted: false },
      { deleted: true },
      { new: true }
    );
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json({ success: true, message: 'Customer deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
