import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../models/location';
import { Hive } from '../models/hive';

@Injectable({
  providedIn: 'root'
})
export class HiveDataService {
  yardUrl = 'api/hives/locations';
  hiveUrl = 'api/hives/';

  constructor(@Inject('BASE_URL') private baseUrl: string, private http: HttpClient) { }

  getYards(): Observable<Location[]> {
    return this.http.get<Location[]>(this.baseUrl + this.yardUrl);
  }

  getHives(location_id: number): Observable<Hive[]> {
    return this.http.get<Hive[]>(this.baseUrl + this.hiveUrl + `in/${location_id}`);    
  }

  getHive(hive_id: number): Observable<Hive> {
    return this.http.get<Hive>(this.baseUrl + this.hiveUrl + `${hive_id}`);
  }



  
}
