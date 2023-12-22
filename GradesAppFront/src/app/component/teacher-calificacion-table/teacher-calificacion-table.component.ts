import { Component, Input, OnInit, TemplateRef, inject } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { CalificacionesService } from '../../services/calificaciones.service';
import { Alumno, Calificacion, Referente } from '../../models/calificaciones-instrumento.interface';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { POSTCalificacionDTO } from '../../models/create-calificacion.interface';

@Component({
  selector: 'app-teacher-calificacion-table',
  templateUrl: './teacher-calificacion-table.component.html',
  styleUrl: './teacher-calificacion-table.component.css'
})
export class TeacherCalificacionTableComponent implements OnInit{
  @Input() referentes!: Referente[];
  calificaciones !: Calificacion[];
  alumnos : Alumno[] = [];
  instrumentoId: string ="";
  asignaturaId: string ="";
  route: ActivatedRoute = inject(ActivatedRoute);
  calf: number = 0;
  calfErr: string = "";
  codRef : string = "";
  codAlumn : string = "";


  constructor( private calificacionService: CalificacionesService, private modalService: NgbModal){
    this.instrumentoId = this.route.snapshot.params['id'];
    this.asignaturaId = this.route.snapshot.params['id_asig'];
  }

  ngOnInit(): void {
      
      this.calificacionService.getInstrumentoDetails(this.instrumentoId).subscribe({
        next: resp => {
          
          this.calificaciones = resp.content;
          console.log(this.calificaciones);
          console.log(this.alumnos);
          this.calificaciones.forEach(calf => {
            if(!this.alumnos.map(al => al.id).includes(calf.alumno.id)){
              this.alumnos.push(calf.alumno);
            }
              
          });
          console.log(this.alumnos);
          
        },
        error: err => {
          if(err.status = 404){
            window.location.href = `${environment.localHost}not-found`;
          }
        }
      });
  }
  open(content: TemplateRef<any>, numberRef: number, numberAl: number) {
    this.codRef = this.referentes[numberRef].codReferente;
    this.codAlumn = this.alumnos[numberAl].id;
    this.modalService.open(content, { scrollable: true });
  }
  toSave(){
    let toSave: POSTCalificacionDTO = new POSTCalificacionDTO(this.codRef, this.codAlumn,this.calf);
    this.calificacionService.createCalificacion(this.instrumentoId, toSave).subscribe({
      next: data=> {
        window.location.href = `${environment.localHost}teacher/subject/${this.asignaturaId}/instrument/${this.instrumentoId}`
      }, error: err => {
        if(err.status == 400){
          let badReq = err.error;
          console.log(badReq);
          let errors = badReq.body.fields_errors;
          errors.forEach((error: { field: string; message: string; }) => {
            this.calfErr = error.message;
          });
        }
      }
    });
  }
}
