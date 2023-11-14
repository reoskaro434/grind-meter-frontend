import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  saveObject(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  private getTodaysTimestamp() {
    return new Date().setHours(0,0,0,0)
  }

  saveForToday(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify({value: value, timestamp: this.getTodaysTimestamp()}));
  }
  getForToday(key: string): any {
    const storedValue = localStorage.getItem(key);

    if (storedValue) {
      const storedObj = JSON.parse(storedValue);

      if (storedObj.timestamp === this.getTodaysTimestamp())
      {
        return storedObj.value;
      } else {
        localStorage.removeItem(key);
        return undefined
      }
    }
  }
  getObject(key: string): any {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : undefined;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
