import { Injectable } from '@angular/core';
import { StudentList } from './mock-students';
import { Student } from './student';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private messageService : MessageService) { }

  getStudents(): Observable<Student[]> {
    this.messageService.add('StudentService: fetched students');
    return of(StudentList);
  }
}
