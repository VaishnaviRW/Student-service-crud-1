import { Injectable } from '@angular/core';
import { IStd, IStdRes } from '../model/std';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  EditStudentSub$ : Subject<IStd> = new Subject<IStd>()

  StdArr : Array<IStd>  = [
      {
          fname: "Aarav",
          lname: "Kulkarni",
          email: "aarav.kulkarni@gmail.com",
          contact: "9876123450",
          stdId: "201",
          isActive: true
      },
      {
          fname: "Priya",
          lname: "Deshmukh",
          email: "priya.deshmukh@gmail.com",
          contact: "9123987654",
          stdId: "202",
          isActive: false
      },
      {
          fname: "Rohan",
          lname: "Joshi",
          email: "rohan.joshi@gmail.com",
          contact: "9988123456",
          stdId: "203",
          isActive: true
      },
      {
          fname: "Neha",
          lname: "Shinde",
          email: "neha.shinde@gmail.com",
          contact: "9012678453",
          stdId: "204",
          isActive: false
      }
  
    ];
  constructor() { }

  fetchstudents():Observable<IStd[]>{
    return of(this.StdArr)
  }
  onstdadd(stdobj : IStd) : Observable<IStdRes>{
    this.StdArr.push(stdobj)
    return of({
      msg : `The Student Item Is Added Successfully !!`,
      data : stdobj
    })
  }

  onremovestd(stdId  :string): Observable<IStdRes>{
    let getindex = this.StdArr.findIndex(s => s.stdId === stdId)
     let removestd = this.StdArr.splice(getindex,1)
    return of({
      msg : `The Student Is ${removestd[0].stdId} Is removed Successfully !!`,
      data : removestd[0]
    })
  }

  onstudentupdate(updatedobj : IStd){
    let getindex = this.StdArr.findIndex(s => s.stdId ===  updatedobj.stdId)
    this.StdArr[getindex] = updatedobj
    return of({
      msg : `The Student Is ${updatedobj.stdId} Is updated Successfully !!`,
      data : updatedobj
    })
  }
}
