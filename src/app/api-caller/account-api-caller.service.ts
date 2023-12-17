import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Account} from "../models/account";
@Injectable({
  providedIn: 'root'
})
export class AccountApiCallerService {

  constructor(private http: HttpClient) {
  }

  public updateAccount(account: Account) {
    return this.http.post<{}>(`${environment.apiURL}/account/update`, account);
  }

  public getAccount() {
    return this.http.get<Account>(`${environment.apiURL}/account/get`);
  }
}
