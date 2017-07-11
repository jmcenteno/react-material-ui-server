import shippo from 'shippo';

import { API_TOKEN, SENDER_ADDRESS as addressFrom } from '../../config/shippo';

class ShippingService {
  
  constructor() {

    this.shippo = shippo(API_TOKEN);

  }
  
  createShipment(addressTo, parcels = []) {
    return new Promise((resolve, reject) => {

      this.shippo.shipment.create({
        address_from: addressFrom,
        address_to: addressTo,
        parcels: parcels,
        async: true
      }, (err, shipment) => {
        
        if (!err) {
          return resolve(shipment);
        }

        return reject(err);

      });

    });
  }

  getShipment(shipmentId) {
    return new Promise((resolve, reject) => {

      this.shippo.shipment.retrieve(shipmentId)
        .then(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );

    });
  }

  getRatesByShipment(shipmentId) {
    return new Promise((resolve, reject) => {

      this.shippo.shipment.rates(shipmentId)
        .then(
          (response) => {

            const rates = response.results.map(item => {
              return {
                name: item.servicelevel.name,
                provider: item.provider,
                duration: item.duration_terms,
                price: item.amount
              };
            });

            resolve(rates);

          },
          (error) => {

            reject(error);

          }
        );

    });
  }

}

export default new ShippingService();
