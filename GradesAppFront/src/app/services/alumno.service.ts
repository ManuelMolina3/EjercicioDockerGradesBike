import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlumnoProfesorListResponse } from '../models/alumno-profesor-list.inteface';
import { environment } from '../enviroment/enviroment';
import { POSTAlumnoDTO } from '../models/create-alumno.interface';
import { CreatedAlumnoResponse } from '../models/create-alumno-request.interface';

const API_BASE_URL = 'profesor';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private http: HttpClient) { }

  getAlumnoProfesor(id: string): Observable<AlumnoProfesorListResponse>{
    return this.http.get<AlumnoProfesorListResponse>(`${environment.apiBaseUrl}${API_BASE_URL}/${id}/alumnos`);
  }

  createAlumno(alumno: POSTAlumnoDTO):Observable<CreatedAlumnoResponse>{
    return this.http.post<CreatedAlumnoResponse>(`${environment.apiBaseUrl}alumno/`,
    {
      "nombre": alumno.nombre,
      "apellidos": alumno.apellidos,
      "fechaNacimiento": alumno.fechaNacimiento,
      "email": alumno.email,
      "telefono": alumno.telefono,
      "username": alumno.username,
      "password": alumno.password
    });
  }
}
