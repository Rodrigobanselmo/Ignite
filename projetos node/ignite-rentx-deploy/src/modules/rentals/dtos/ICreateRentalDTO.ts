interface ICreateRentalDTO {
  user_id: string;
  car_id: string;
  return_date: Date;
  total: number;
}

export { ICreateRentalDTO };
