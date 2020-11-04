import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../models/location';
import { Hive } from '../models/hive';
import { ApiResult } from '../models/api-result';

@Injectable({
  providedIn: 'root'
})
export class HiveDataService {
  yardUrl = 'api/hives/locations';
  hiveUrl = 'api/hives/';

  constructor(@Inject('BASE_URL') private baseUrl: string, private http: HttpClient) { }

  addYard(new_yard: Location): Observable<ApiResult> {
    return this.http.post<ApiResult>(this.baseUrl + this.yardUrl, new_yard);
  }

  getYards(): Observable<Location[]> {
    return this.http.get<Location[]>(this.baseUrl + this.yardUrl);
  }

  addHive(new_hive: Hive): Observable<ApiResult> {
    new_hive.inspection_interval = +new_hive.inspection_interval;   
    return this.http.post<ApiResult>(this.baseUrl + this.hiveUrl, new_hive);
  }

  deleteHive(id: number): Observable<ApiResult> {
    return this.http.delete<ApiResult>(this.baseUrl + this.hiveUrl + `${id}`);
  }

  getHives(location_id: number): Observable<Hive[]> {
    return this.http.get<Hive[]>(this.baseUrl + this.hiveUrl + `in/${location_id}`);    
  }

  getHive(hive_id: number): Observable<Hive> {
    return this.http.get<Hive>(this.baseUrl + this.hiveUrl + `${hive_id}`);
  }

  getCheckedTodayHives(location_id: number): Observable<Hive[]> {
    return this.http.get<Hive[]>(this.baseUrl + this.hiveUrl + `filter/today/${location_id}`);
  }

  getOverdueHives(location_id: number): Observable<Hive[]> {
    return this.http.get<Hive[]>(this.baseUrl + this.hiveUrl + `filter/overdue/${location_id}`);
  }

  getUrgentHives(location_id: number): Observable<Hive[]> {
    return this.http.get<Hive[]>(this.baseUrl + this.hiveUrl + `filter/urgent/${location_id}`);
  }
}
