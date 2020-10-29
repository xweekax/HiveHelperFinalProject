import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActionDetail } from '../models/action-detail';
import { PrimaryAction } from '../models/primary-action';
import { SecondaryAction } from '../models/secondary-action';
import { TertiaryAction } from '../models/tertiary-action';
import { ApiResult } from '../models/api-result';

@Injectable({
  providedIn: 'root'
})
export class ActionDataService {
    
  DetailsUrl = 'api/actions/';

  constructor(@Inject('BASE_URL') private baseUrl: string, private http: HttpClient) { }

  getActionDetails(hive_id: number): Observable<ActionDetail[]> {
    return this.http.get<ActionDetail[]>(this.baseUrl + this.DetailsUrl + `details/${hive_id}`);
  }
  getPrimaryActions(): Observable<PrimaryAction[]> {
    return this.http.get<PrimaryAction[]>(this.baseUrl + this.DetailsUrl + 'primary');
  }
  getSecondaryActions(primary_id: number): Observable<SecondaryAction[]> {
    return this.http.get<SecondaryAction[]>(this.baseUrl + this.DetailsUrl + `secondary/${primary_id}`);
  }
  getTertiaryActions(secondary_id: number): Observable<TertiaryAction[]> {
    return this.http.get<TertiaryAction[]>(this.baseUrl + this.DetailsUrl + `tertiary/${secondary_id}`);
  }
  updateActionDetail(action: ActionDetail): Observable<ApiResult> {
    return this.http.put<ApiResult>(this.baseUrl + this.DetailsUrl + 'details', action);
  }
  addActionDetail(action: ActionDetail): Observable<ApiResult> {
    return this.http.post<ApiResult>(this.baseUrl + this.DetailsUrl + 'details', action);
  }
}
