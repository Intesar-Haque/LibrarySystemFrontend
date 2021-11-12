import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Books } from './books';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class BooksService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getBooks(): Observable<Books[]> {
    return this.http.get<Books[]>(`${this.apiServerUrl}/book/all`);
  }
  public getFilterBooks(params: any): Observable<Books[]> {
    return this.http.get<Books[]>(`${this.apiServerUrl}/book/pages`, {params});
  }
  public addBooks(books: Books): Observable<Books> {
    return this.http.post<Books>(`${this.apiServerUrl}/book/add`, books);
  }

  public updateBooks(books: Books): Observable<Books> {
    return this.http.put<Books>(`${this.apiServerUrl}/book/update`, books);
  }
  public findBooks(params: any): Observable<Books[]> {
    return this.http.get<Books[]>(`${this.apiServerUrl}/book/search`, {params});
  }
  public deleteBooks(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/book/delete/${bookId}`);
  }
}
