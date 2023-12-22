import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InstrumentoListResponse } from '../models/instrumento-list.interface';
import { environment } from '../enviroment/enviroment';
import { CreateInstrumentResponse } from '../models/create-instrumento-request.interface';
import { POSTInstrumentoDTO } from '../models/create-instrumento.interface';
import { InstrumentoDetailResponse } from '../models/instrumento-details.interface';

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {

  constructor(private http: HttpClient) { }

  getInstrumentosFromAsignatura(id:string, page:number):Observable<InstrumentoListResponse>{
    return this.http.get<InstrumentoListResponse>(`${environment.apiBaseUrl}teacher/asignatura/${id}/instrumentos?page=${page}`);
  }
  createInstrumentosFromAsignatura(id:string, newIns: POSTInstrumentoDTO):Observable<CreateInstrumentResponse>{
    return this.http.post<CreateInstrumentResponse>(`${environment.apiBaseUrl}teacher/asignatura/${id}/instrumento`,
    {
      nombre: newIns.nombre,
      fecha: newIns.fecha,
      contenidos: newIns.contenidos,
      referentes: newIns.referentes
    },
      {
        headers:{
          'Content-Type': 'application/json'
        }
      }
    );
  }
  getInstrumentoDetails(id:string):Observable<InstrumentoDetailResponse>{
    return this.http.get<InstrumentoDetailResponse>(`${environment.apiBaseUrl}teacher/instrumento/${id}`);
  }
}
