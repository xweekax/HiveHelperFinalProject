import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class HiveDataService {
  yardUrl = 'api/hives/locations';
  constructor(@Inject('BASE_URL') private baseUrl: string, private http: HttpClient) { }

  getYards(): Observable<Location[]> {
    return this.http.get<Location[]>(this.baseUrl + this.yardUrl);
  }
}
