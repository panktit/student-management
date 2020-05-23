import { Injectable } from '@angular/core';
import { StudentList } from './mock-students';
import { Student } from './student';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor() { }

  getStudents(): Observable<Student[]> {
    return of(StudentList);
  }
}
