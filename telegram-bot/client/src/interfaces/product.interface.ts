export interface ProductInterfaces {
  id: number;
  name: string;
  slug: string;
  in_stock: boolean;
  price: number;
  average_stars: number | null;
  car_types: CarTypeInterfaces[];
  description: string;
  images: ImagesList[];
  category: CategoryInterfaces;
  video?: string | null;
  quantity: number;
}

export interface ImagesList {
  id: number;
  image: string;
  product: number;
}

export interface CarTypeInterfaces {
  id: number;
  name: string;
  slug: string;
  make: string;
  image: string;
  products: ProductInterfaces[];
}

export interface CategoryInterfaces {
  id: number;
  name: string;
  slug: string;
  products: ProductInterfaces[];
  image: string;
}
