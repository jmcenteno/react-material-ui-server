'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _shipping = require('../controllers/shipping');

var router = require('express').Router();

/**
 * POST /sample/service
 * Sample route
 */
router.post('/shipping-rates', _shipping.GetShippingRates);

exports.default = router;