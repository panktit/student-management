import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  
  student: Student;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.studentService.getStudent(id)
      .subscribe(student => this.student = student);
  }

  save(): void {
    this.studentService.updateStudent(this.student)
      .subscribe(() => this.goBack());
  }
  goBack(): void {
    this.location.back();
  }
}
