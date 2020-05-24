import { Injectable } from '@angular/core';
import { Student } from './student';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private messageService : MessageService, private http: HttpClient) { }

  private studentsUrl = 'api/students';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl)
      .pipe(
        tap(_ => this.log('fetched students')),
        catchError(this.handleError<Student[]>('getStudents', []))
      );
  }

  getStudent(id: number): Observable<Student> {
    const url = `${this.studentsUrl}/${id}`;
    return this.http.get<Student>(url)
      .pipe(
        tap(_ => this.log(`fetched student id = ${id}`)),
        catchError(this.handleError<Student>(`getStudent id = ${id}`))
    );
  }

  updateStudent(student: Student): Observable<any> {
    return this.http.put(this.studentsUrl, student, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated student id = ${student.id}`)),
        catchError(this.handleError<any>('updateStudent'))
    );
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentsUrl, student, this.httpOptions)
      .pipe(
        tap((newStudent: Student) => this.log(`added student with id = ${newStudent.id}`)),
        catchError(this.handleError<Student>('addStudent'))
    );
  }

  deleteStudent(student: Student | number): Observable<Student> {
    const id = typeof student === 'number' ? student : student.id;
    const url = `${this.studentsUrl}/${id}`;

    return this.http.delete<Student>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted student id = ${id}`)),
        catchError(this.handleError<Student>('deleteStudent'))
    );
  }

  searchStudents(term: string): Observable<Student[]> {
    if(!term.trim()) {
      return of([]);
    }

    return this.http.get<Student[]>(`${this.studentsUrl}/?fname=${term}`)
      .pipe(
        tap(x => x.length ? 
          this.log(`found students matching "${term}"`):
          this.log(`no students matching "${term}"`)),
          catchError(this.handleError<Student[]>('searchStudents', []))
      );
  }
  
  private log(message: string) {
    this.messageService.add(`StudentService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
