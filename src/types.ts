export interface iProductData {
  price: string;
  color: string;
}

export interface iProduct {
  data: iProductData;
  name: string;
  id: string;
}

export enum eStatus {
  idle,
  loading,
  success,
  failed,
}
