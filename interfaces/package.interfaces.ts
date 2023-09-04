import mongoose from 'mongoose'
export interface PackageInterface {
	_id?: mongoose.Types.ObjectId;
	client: string;
	destination: string;
	creation_date?: Date;
	package_status: boolean;
	package_weight: number;
	additional_information: string;
}
