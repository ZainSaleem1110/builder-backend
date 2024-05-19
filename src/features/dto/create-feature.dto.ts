export class CreateFeatureDto {
  name: string;
  cost: number;
  category_id: number;
  duration: number;
  customization_cost:number;
  duration_type: string;
  images?: Array<string>;
  mobileImages?: Array<string>;
  description?: string;
}
