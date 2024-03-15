export type Users = {
  id: number;
  firstname: string;
  lastname: string;
  contact: string;
  email: string;
  Occupation: string;
  totalorder: number;
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
  id: string;
  slug: string;
  title: string;
  img: any;
  price: number;
  discount: number;
  author: string;
}

export interface AdProduct {
  id: string;
  slug: string;
  title: string;
  description: string;
  img: any;
  price: number;
  discount: number;
  quantity: number;
  author: string;
}
