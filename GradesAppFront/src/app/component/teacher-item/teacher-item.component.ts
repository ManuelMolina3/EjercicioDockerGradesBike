import { Component, Input } from '@angular/core';
import { Teacher } from '../../models/teacher-list-response';

@Component({
  selector: 'app-teacher-item',
  templateUrl: './teacher-item.component.html',
  styleUrl: './teacher-item.component.css'
})
export class TeacherItemComponent {

  @Input() teacher!: Teacher;

  popoverClicked(event: MouseEvent) {
    event.stopPropagation();
  }

  getChar() {
    return this.teacher.nombre.charAt(0);
  }
}
