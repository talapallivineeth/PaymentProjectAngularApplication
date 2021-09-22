import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  baseUrl:string="http://localhost:8080"
  constructor(private http:HttpClient) { 
    
  }

  fetchCustomer(id:string):Observable<any>
  {
      return this.http.get(`${this.baseUrl}/customer/${id}`);
  }

  fetchBankname(id:string):Observable<any>
  {
      return this.http.get(`${this.baseUrl}/bank/${id}`);
  }

  doTransaction(data:any):Observable<any>
  {
      return this.http.post(`${this.baseUrl}/transaction/`,data);
  }

}
