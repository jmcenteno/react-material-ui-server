'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _shippo = require('shippo');

var _shippo2 = _interopRequireDefault(_shippo);

var _shippo3 = require('../../config/shippo');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ShippingService = function () {
  function ShippingService() {
    _classCallCheck(this, ShippingService);

    this.shippo = (0, _shippo2.default)(_shippo3.API_TOKEN);
  }

  _createClass(ShippingService, [{
    key: 'createShipment',
    value: function createShipment(addressTo) {
      var _this = this;

      var parcels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      return new Promise(function (resolve, reject) {

        _this.shippo.shipment.create({
          address_from: _shippo3.SENDER_ADDRESS,
          address_to: addressTo,
          parcels: parcels,
          async: true
        }, function (err, shipment) {

          if (!err) {
            return resolve(shipment);
          }

          return reject(err);
        });
      });
    }
  }, {
    key: 'getShipment',
    value: function getShipment(shipmentId) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {

        _this2.shippo.shipment.retrieve(shipmentId).then(function (response) {
          resolve(response);
        }, function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'getRatesByShipment',
    value: function getRatesByShipment(shipmentId) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {

        _this3.shippo.shipment.rates(shipmentId).then(function (response) {

          var rates = response.results.map(function (item) {
            return {
              name: item.servicelevel.name,
              provider: item.provider,
              duration: item.duration_terms,
              price: item.amount
            };
          });

          resolve(rates);
        }, function (error) {

          reject(error);
        });
      });
    }
  }]);

  return ShippingService;
}();

exports.default = new ShippingService();