import { Schema, model } from 'mongoose';

const DeliveryMan = new Schema({
  current_deliveries: {
    type: Number,
    default: 0,
    max: 10,
  },
  active: {
    type: Boolean,
    default: false,
  },
  drinked_alcohol: {
    type: Boolean,
    default: false,
  },
  taked_drugs: {
    type: Boolean,
    default: false,
  },
  sleeped_well: {
    type: Boolean,
    default: true,
  },
  packages: [{ type: Schema.Types.ObjectId, ref: 'Package' }],
});

const DeliveryManModel = model('Deliveryman', DeliveryMan);

export default DeliveryManModel;
