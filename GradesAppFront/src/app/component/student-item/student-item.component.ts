import { Component, Input } from '@angular/core';
import { AlumnoP } from '../../models/alumno-profesor-list.inteface';

@Component({
  selector: 'app-student-item',
  templateUrl: './student-item.component.html',
  styleUrl: './student-item.component.css'
})
export class StudentItemComponent {

  @Input() alumno!: AlumnoP;
}
