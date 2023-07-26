export interface PackageInterface {
  client: string;
  destination: string;
  creation_date: Date;
  package_status: boolean;
  delivery_date: Date;
  package_weight: number;
  additional_information: string;
  id: number;
}
