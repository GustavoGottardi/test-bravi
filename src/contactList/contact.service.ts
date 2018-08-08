import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable()

export class ContactService {

    private apiUrl = 'http://localhost:27017/api/contacts';
    private httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    }

	constructor(private http: HttpClient) {

    }

    private extractData(res: Response) {
        let body = res;
        return body || { };
    }
    
    getContacts(): Observable<any> {
        return this.http.get(this.apiUrl, this.httpOptions).pipe(
            map(this.extractData),
            catchError(this.handleError)
        );
    }

    save(data): Observable<any> {
        return this.http.post(this.apiUrl, JSON.stringify(data), this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    delete(id: String): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    update(data): Observable<any> {
        return this.http.put(`${this.apiUrl}/${data._id}`, JSON.stringify(data), this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }

}