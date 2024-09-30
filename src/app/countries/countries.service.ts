import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ServiceBase } from '../core/base/service.base';
import { CountryModel } from './countries.model';

@Injectable({ providedIn: 'root' })
export class CountriesService implements ServiceBase<CountryModel> {
  private readonly httpClient = inject(HttpClient);
  get apiUrl() { return 'https://freetestapi.com/api/v1/countries'};

  getItems = (): Observable<CountryModel[]> => this.httpClient.get<CountryModel[]>(this.apiUrl);
  getItem = (id: string) => this.httpClient.get<CountryModel>(`${this.apiUrl}/${id}`);
  addItem = (value: CountryModel) => this.httpClient.post<CountryModel>(this.apiUrl, { value });
  updateItem = (value: CountryModel) => this.httpClient.put<CountryModel>(`${this.apiUrl}/${value.id}`, value);
  deleteItem = (value: CountryModel) => this.httpClient.delete(`${this.apiUrl}/${value.id}`);
}
