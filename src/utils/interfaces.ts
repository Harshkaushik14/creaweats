export interface Category {
  name: string;
  icon: any;
}


export interface Restaurant {
  id: string;
  name: string;
  location: string;
  rating: number;
  hours: string;
  priceRange: string;
  deliveryTime: string;
  image: string;
  favorite: boolean;
  available: boolean;
}
