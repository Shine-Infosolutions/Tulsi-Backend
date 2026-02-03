const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { auth, authorize } = require('../middleware/auth');
const { dashboardLimiter } = require('../middleware/rateLimiter');
const { cacheMiddleware } = require('../middleware/cache');

// Dashboard stats (Admin, GM, Accounts) - Cache for 2 minutes
router.get('/stats', dashboardLimiter, cacheMiddleware(120), auth, authorize(['ADMIN', 'GM', 'ACCOUNTS', 'FRONT DESK']), dashboardController.getDashboardStats);

// Fast basic stats for quick loading - Cache for 1 minute
router.get('/basic-stats', dashboardLimiter, cacheMiddleware(60), auth, authorize(['ADMIN', 'GM', 'ACCOUNTS', 'FRONT DESK']), dashboardController.getBasicStats);

// Download dashboard stats as CSV
router.get('/download-csv', auth, authorize(['ADMIN', 'GM', 'ACCOUNTS', 'FRONT DESK']), dashboardController.downloadDashboardCSV);

// Individual CSV exports
router.get('/export/total-bookings', auth, authorize(['ADMIN', 'GM', 'ACCOUNTS', 'FRONT DESK']), dashboardController.exportTotalBookings);
router.get('/export/active-bookings', auth, authorize(['ADMIN', 'GM', 'ACCOUNTS', 'FRONT DESK']), dashboardController.exportActiveBookings);
router.get('/export/cancelled-bookings', auth, authorize(['ADMIN', 'GM', 'ACCOUNTS', 'FRONT DESK']), dashboardController.exportCancelledBookings);
router.get('/export/revenue', auth, authorize(['ADMIN', 'GM', 'ACCOUNTS', 'FRONT DESK']), dashboardController.exportRevenue);
router.get('/export/online-payments', auth, authorize(['ADMIN', 'GM', 'ACCOUNTS', 'FRONT DESK']), dashboardController.exportOnlinePayments);
router.get('/export/cash-payments', auth, authorize(['ADMIN', 'GM', 'ACCOUNTS', 'FRONT DESK']), dashboardController.exportCashPayments);
router.get('/export/restaurant-orders', auth, authorize(['ADMIN', 'GM', 'ACCOUNTS', 'FRONT DESK']), dashboardController.exportRestaurantOrders);
router.get('/export/laundry-orders', auth, authorize(['ADMIN', 'GM', 'ACCOUNTS', 'FRONT DESK']), dashboardController.exportLaundryOrders);

module.exports = router;