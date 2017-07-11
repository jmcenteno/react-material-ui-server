'use strict';

import 'babel-polyfill';

import ShippingService from '../services/shipping';

export async function GetShippingRates(req, res, next) {
		
	try {

		console.log('BODY', req.body);

		const { addressTo, parcels } = req.body;
		const shipment = await ShippingService.createShipment(addressTo, parcels);
		let groups;
		
		// creating a shipment can take a while
		if (shipment.status == 'SUCCESS') {
			
			// return rates if shipment was created immediately
			res.json(shipment.rates);

		} else {

			let t = setInterval(() => {
				
				ShippingService.getShipment(shipment.object_id)
					.then(shipmentDetails => {

						if (shipmentDetails.status == 'SUCCESS') {
							
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
