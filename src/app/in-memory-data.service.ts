import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const students = [
      { id: 11 , fname: 'Gary' , lname: 'Berg'},
      { id: 12 , fname: 'Nell' , lname: 'Scott'},
      { id: 13 , fname: 'Camilla' , lname: 'Rogers'},
      { id: 14 , fname: 'Steven' , lname: 'Winters'},
      { id: 15 , fname: 'Paula' , lname: 'Mitchell'},
      { id: 16 , fname: 'Allen' , lname: 'Phillips'},
      { id: 17 , fname: 'Brenna' , lname: 'Lester'},
      { id: 18 , fname: 'Prescott' , lname: 'Mosley'},
      { id: 19 , fname: 'Edward' , lname: 'Henry'},
      { id: 20 , fname: 'Levi' , lname: 'Barr'}
    ];

    return {students};
  }

  genId(students: Student[]): number {
    return students.length > 0 ? Math.max(...students.map(student => student.id)) + 1 : 11;
  }
}
