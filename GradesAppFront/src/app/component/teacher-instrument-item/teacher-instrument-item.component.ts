import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { AllInstrumentoDTO } from '../../models/instrumento-list.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReferentsService } from '../../services/referents.service';

@Component({
  selector: 'app-teacher-instrument-item',
  templateUrl: './teacher-instrument-item.component.html',
  styleUrl: './teacher-instrument-item.component.css'
})
export class TeacherInstrumentItemComponent{
  @Input() instrument!: AllInstrumentoDTO;
  @Input() asignaturaId !: string;


  
  popoverClicked(event: MouseEvent) {
    event.stopPropagation();
  }
  
}
