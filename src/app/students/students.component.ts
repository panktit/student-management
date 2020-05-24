import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Student[];

  constructor( private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }
  
  getStudents(): void {
    this.studentService.getStudents()
      .subscribe(students => this.students = students);
  }

  add(fname: string, lname: string): void {
    fname = fname.trim();
    lname = lname.trim();
    if (!fname || !lname) { return; }4
    console.log("In component add: ",{ fname, lname } as Student);
    this.studentService.addStudent({ fname, lname } as Student)
      .subscribe(student => {
        this.students.push(student);
      });
  }

  delete(student: Student): void {
    this.students = this.students.filter(s => s !== student);
    this.studentService.deleteStudent(student).subscribe();
  }
}
