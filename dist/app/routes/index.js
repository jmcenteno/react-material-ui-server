'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {
  app.use('/api', _shipping2.default);
};

var _shipping = require('./shipping');

var _shipping2 = _interopRequireDefault(_shipping);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;