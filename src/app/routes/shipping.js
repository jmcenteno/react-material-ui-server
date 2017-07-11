'use strict';

const router = require('express').Router();

import { GetShippingRates } from '../controllers/shipping'

/**
 * POST /sample/service
 * Sample route
 */
router.post('/shipping-rates', GetShippingRates);

export default router;
