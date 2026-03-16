const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  number: { type: String, required: true, trim: true },
  address: { type: String, trim: true },
  reason: { type: String, trim: true },
  notes: { type: String, trim: true },
  deleted: { type: Boolean, default: false },
}, { timestamps: true });

customerSchema.index({ deleted: 1, createdAt: -1 });
customerSchema.index({ number: 1 });

module.exports = mongoose.models.Customer || mongoose.model('Customer', customerSchema);
