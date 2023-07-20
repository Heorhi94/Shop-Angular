import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'
import { Iproduct } from '../models/product'
import { Observable, delay, catchError, throwError,retry } from 'rxjs'
import { ErrorService } from './error.service'

@Injectable ({
    providedIn: 'root'
})

export class ProductsService {
    constructor (private http: HttpClient, private errorService: ErrorService){
    }

    getAll () : Observable<Iproduct[]> {
       return this.http.get<Iproduct[]>('http://fakestoreapi.com/products', {
        params: new HttpParams().append('limit', 10)
       }).pipe (
        delay(500),
        retry(2),
        catchError(this.errorHandler.bind(this))
       ) 
    }


    private errorHandler(error: HttpErrorResponse) {
        this.errorService.handle(error.message)
        return throwError(() => error.message)
    }
}
