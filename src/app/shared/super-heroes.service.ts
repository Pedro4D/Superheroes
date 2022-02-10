import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Constants } from './constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperHeroesService {

  constructor(private http: HttpClient) { }

  getSuperheroes() : Observable<any> {
    const urlFile = Constants.DATA_URL;
    return this.http.get(urlFile).pipe(take(1));
  }
}
