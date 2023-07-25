export interface Package {
  client: string;
  destination: string;
  creation_date: Date;
  package_status: boolean;
  delivery_date: Date | null;  
  package_weight: number; 
  additional_information: string | null; 
}