"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = sampleMiddleware;
function sampleMiddleware(req, res, next) {

	next();
}