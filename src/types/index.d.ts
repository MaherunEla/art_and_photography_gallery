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
  img: any;
  price: number;
  discount: number;
  author: string;
}

export interface AdProduct {
  id: number;
  slug: string;
  title: string;
  description: string;
  img: any;
  price: number;
  discount: number;
  quantity: number;
  author: string;
}
