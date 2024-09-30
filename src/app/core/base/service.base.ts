import { Observable } from 'rxjs';

export interface GetService<T> {
  getItems(): Observable<T[]>;
}

export interface GetByIdService<T> {
  getItem(id: string): Observable<T>;
}

export interface AddService<T> {
  addItem(value: T): Observable<T>;
}

export interface UpdateService<T> {
  updateItem(value: T): Observable<T>;
}

export interface DeleteService<T> {
  deleteItem(value: T): Observable<any>;
}

export interface ServiceBase<T> extends GetService<T>, AddService<T>, UpdateService<T>, DeleteService<T> {
}
