'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.GetShippingRates = GetShippingRates;

require('babel-polyfill');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _shipping = require('../services/shipping');

var _shipping2 = _interopRequireDefault(_shipping);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GetShippingRates(req, res, next) {
	var _req$body, addressTo, parcels, shipment, groups, t;

	return regeneratorRuntime.async(function GetShippingRates$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					_context.prev = 0;
					_req$body = req.body, addressTo = _req$body.addressTo, parcels = _req$body.parcels;
					_context.next = 4;
					return regeneratorRuntime.awrap(_shipping2.default.createShipment(addressTo, parcels));

				case 4:
					shipment = _context.sent;
					groups = void 0;

					// creating a shipment can take a while

					if (shipment.status == 'SUCCESS') {

						// return rates if shipment was created immediately
						groups = groupRatesByProvider(shipment.rates);

						res.json(groups);
					} else {
						t = setInterval(function () {

							_shipping2.default.getShipment(shipment.object_id).then(function (shipmentDetails) {

								if (shipmentDetails.status == 'SUCCESS') {

									groups = groupRatesByProvider(shipmentDetails.rates);
									clearInterval(t);

									res.json(shipmentDetails.rates);
								}
							}).catch(function (error) {

								clearInterval(t);
								res.status(500).send(error);
							});
						}, 1000);
					}

					_context.next = 14;
					break;

				case 9:
					_context.prev = 9;
					_context.t0 = _context['catch'](0);


					console.log(_context.t0);
					res.status(500).send(_context.t0);

					next();

				case 14:
				case 'end':
					return _context.stop();
			}
		}
	}, null, this, [[0, 9]]);
}

function groupRatesByProvider(rates) {
	return _lodash2.default.groupBy(rates, function (item) {
		return item.provider;
	});
}