export interface SellOrder {
  orders?: OrdersEntity[] | null;
  volume: string;
}
export interface OrdersEntity {
  amount: string;
  remain: string;
  price: string;
  value: string;
}
