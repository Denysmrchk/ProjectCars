import axios from 'axios';
import { IFetchCarForUser } from '@/components/cards/CardCar/types';

export default class fetchCar {
  static async postCar(car: IFetchCarForUser, category: string, message: string): Promise<void> {
    await axios.post('https://6634b3649bb0df2359a26fed.mockapi.io/projectCars/garage', {
      ...car,
      category: category,
      message: message,
    });
  }
  static async getCar() {
    const response = axios.get('https://6634b3649bb0df2359a26fed.mockapi.io/projectCars/carsArray');
    return response;
  }
  static async getCarUser() {
    const response = axios.get('https://6634b3649bb0df2359a26fed.mockapi.io/projectCars/garage');
    return response;
  }
  static async putCarInGarage(id: number): Promise<void> {
    await fetch(`https://6634b3649bb0df2359a26fed.mockapi.io/projectCars/garage/${id}`, {
      method: 'PUT', // or PATCH
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ message: null, category: 'carInGarage' }),
    });
  }
  static async putCarOnSale(id: number, message: string, price: number): Promise<void> {
    await fetch(`https://6634b3649bb0df2359a26fed.mockapi.io/projectCars/garage/${id}`, {
      method: 'PUT', // or PATCH
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ category: 'carInGarage', message: message, priceOnSale: price }),
    });
  }
  static async deleteCarFromMessages(id: number) {
    await axios.delete(`https://6634b3649bb0df2359a26fed.mockapi.io/projectCars/garage/${id}`);
  }
  static async putCarSalesHistory(id: number, earned: number): Promise<void> {
    await fetch(`https://6634b3649bb0df2359a26fed.mockapi.io/projectCars/garage/${id}`, {
      method: 'PUT', // or PATCH
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ category: 'salesHistory', priceOnSale: earned, message: '' + '' }),
    });
  }
}
