export type Users = {
  id: number;
  name: string;
  image: string;
  contact: string;
  email: string;
  createdat: string;
  role: string;
  occupation: string;
  view: string;
  delete: any;
};
export type Artists = {
  id: number;
  firstname: string;
  lastname: string;
  contact: string;
  email: string;
  Occupation: string;
  totalproduct: number;
};

export interface Product {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: any;
  price: number;
  discount: number;
  artist: string;
  view: any;
  delete: any;
}

export interface AdProduct {
  id: string;
  title: string;
  description: string;
  image: any;
  price: number;
  discount: number;
  artist: string;
  quantity: number;
  userEmail: any;
}

export interface Order {
  id: number;
  formdata: Json;
  product: Json;
  total: number;
  revenue: number;
  totalrevenue: number;
  createdAt: string;
  ordernote: string;
  status: string;
  icon: any;
}
