export type Response = {
  message: string;
};

export type PayProductLoad = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock?: number;
}[];
