import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('user:password')
  })
};

@Injectable({
  providedIn: 'root'
})

export class PersonService {


  private baseUrl = 'https://person-project.azurewebsites.net/person-project/v1/persons';

  constructor(private http: HttpClient) { }

  getPerson(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, httpOptions);
  }

  createPerson(person: Object): Observable<Object> {

    var json = {
      "person": [
         person
      ]
  }

    return this.http.post(`${this.baseUrl}`, json, httpOptions);
  }

  updatePerson(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value, httpOptions);
  }

  deletePerson(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getPersonsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`, httpOptions);
  }
}