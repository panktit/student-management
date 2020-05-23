import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentList } from "../mock-students";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students = StudentList;
  
  selectedStudent: Student;
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(student: Student): void {
    this.selectedStudent = student;
  }
}
