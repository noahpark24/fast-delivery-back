import mongoose, { Schema, Document } from "mongoose";

interface IPackage extends Document {
  client: string;
  destination: string;
  creation_date: Date;
  package_status: string;
  delivery_date: Date | null;  
  package_weight: number; 
  additional_information: string | null; 
}

const PackageSchema: Schema = new Schema({
  client: {
    type: String,
    required: [true, "Please enter client name"],
     
  },
  destination: {
    type: String,
    required: [true, "Please enter a destination for your package"],
     
  },
  creation_date: {
    type: Date,
    required: [true, "Please enter the creation date"],
  },
  package_status: {
    type: String,
    required: [true, "Please enter the package status"],
  },
  delivery_date: {
    type: Date,  
    default: null, 
    required: [true, "Please enter the delivery date"],
  },
  package_weight: {
    type: Number, 
    default: 0,  
    required: [true, "Please enter the package weight"],
  },
  additional_information: {
    type: String,  
    default: null,  
  },
});

const Package = mongoose.model<IPackage>("Package", PackageSchema);

export default Package;
