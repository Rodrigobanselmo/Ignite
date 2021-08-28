import { IDateProvider } from '../models/IDateProvider';

class FakeDateProvider implements IDateProvider {
  addHours(date: Date, hours: number): Date {
    const dateTime = date.getTime();
    return new Date(dateTime + 1000 * 3600 * hours);
  }
  addDay(date: Date, days: number): Date {
    const dateTime = date.getTime();
    return new Date(dateTime + 1000 * 3600 * 24 * days);
  }
  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return end_date.getTime() < start_date.getTime();
  }
  dateNow(): Date {
    return new Date();
  }
  compareInHours(start_date: Date, end_date: Date): number {
    const diff = end_date.getTime() - start_date.getTime();
    return diff / (1000 * 3600);
  }
  convertToUTC(date: Date): string {
    return date.toUTCString();
  }
  compareInDays(start_date: Date, end_date: Date): number {
    const diff = end_date.getTime() - start_date.getTime();
    return diff / (1000 * 3600 * 24);
  }
}

export { FakeDateProvider };
