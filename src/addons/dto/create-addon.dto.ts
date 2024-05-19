export class CreateAddonDto {
  name: string;
  tagline: string;
  image?: string;
  duration: number;
  duration_type: string;
  cost: number;
  number_of_users: number;
  features: Array<any>;
}
