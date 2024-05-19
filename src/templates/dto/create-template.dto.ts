export class CreateTemplateDto {
  name: string;
  description:string;
  vertical_id: number;
  addons_id:number;
  phases_id:number;
  platforms_id:number;
  price?: number;
  features?: Array<number>;
  images?: Array<string>;
  mobileImages?: Array<string>;
  logo: string;

}
