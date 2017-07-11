'use strict';

import 'babel-polyfill';
import _ from 'lodash';

import ShippingService from '../services/shipping';

export async function GetShippingRates(req, res, next) {
		
	try {

		const { addressTo, parcels } = req.body;
		const shipment = await ShippingService.createShipment(addressTo, parcels);
		let groups;
		
		// creating a shipment can take a while
		if (shipment.status == 'SUCCESS') {
			
			// return rates if shipment was created immediately
			groups = groupRatesByProvider(shipment.rates);

			res.json(groups);

		} else {

			let t = setInterval(() => {
				
				ShippingService.getShipment(shipment.object_id)
					.then(shipmentDetails => {

						if (shipmentDetails.status == 'SUCCESS') {
							
							groups = groupRatesByProvider(shipmentDetails.rates);
							clearInterval(t);

							res.json(shipmentDetails.rates);
							
						}
						
					})
					.catch(error => {

						clearInterval(t);
						res.status(500).send(error);

					});

			}, 1000);

		}

	} catch (error) {
		
		console.log(error);
		res.status(500).send(error);
		
		next();

	}

}

function groupRatesByProvider(rates) {
	return _.groupBy(rates, (item) => {
		return item.provider
	});
}
