import { Schema, model } from "mongoose";
import { RepartidorInterface } from "../interfaces/delivery.interfaces";

const RepartidorSchema = new Schema<RepartidorInterface>({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  max_deliveries_per_day: {
    type: Number,
    default: 10,
    min: 1,
    max: 10,
  },
  current_deliveries: {
    type: Number,
    default: 0,
  },
});

const Repartidor = model<RepartidorInterface>("Repartidor", RepartidorSchema);

export default Repartidor;
