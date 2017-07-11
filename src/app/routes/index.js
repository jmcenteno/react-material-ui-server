'use strict';

import ShippingRoutes from './shipping';

export default function(app) {
  app.use('/api', ShippingRoutes)
};
