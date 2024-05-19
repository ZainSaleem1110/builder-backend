export class CreateOrderDto {
  user_id: number;
  description?: string;
  note?: string;
  status?: string;
  order_step?: number;
  payment_via?: string;
  payment_status?: string;
  total_installments?: number;
  installment_duration_type?: string;
  total_amount?: string;
  total_duration?: string;
  phases?: Array<string>;
  addon?: number;
  delivery?: string;
  platforms?: Array<number>;
  features?: Array<number>;
  category_id?: number;
  template_id?: number;
  duration?: string;
  duration_type?: string;
  billing?: {
    type: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    partment_number: number;
    address: string;
    city: string;
    country: string;
    state: string;
    zipcode: string;
  };
  custom_project?: {
    name: string;
    category_id: number;
    templates: Array<number>;
  };
  payment_method?: {
    card: string;
    name: string;
    expiry_data: string;
    cvv: string;
  };

  project_title?: string;
  order_id?: number;
  addon_cost?: string;
  templates?: Array<number>;
  selectedTemplates?: Array<any>;
  custom_cost?: number;
  fixed_cost?: number;
  standard_care?: number;
  standard_duration?: string;
  featuresList?: Array<any>;
  instllment_duration_type?: string;
  installment_first?: number;
  installment_second?: number;
  installments?: Array<any>;
  first_deposit?: number;
  estimated_date?: string;
}
