export type Users = {
  id: number;
  name: string;
  image: string;
  contact: string;
  email: string;
  createdat: string;
  role: string;
  userstatus: string;
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
  category: string;
  productstatus: string;
  permission: string;
  view: any;
  delete: any;
}

export interface Frame {
  id: string;
  frameimage: any;
  framename: string;
  frameprice: number;
  stockstatus: string;
  createdAt: string;
  view: any;
}

export interface AdProduct {
  id: string;
  title: string;
  description: string;
  image?: any;
  cimage: any;
  category: string;
  price: number;
  discount: number;
  artist: string;
  quantity: number;
  frameImg?: string;
  frameName?: string;
  framePrice?: number;
  userEmail: any;
  productstatus: string;
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
  date?: string;
}
