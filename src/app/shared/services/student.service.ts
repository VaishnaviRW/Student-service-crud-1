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

            fname: "may",
            lname: "Doe",
            email: "May@gmail.com",
            contact: "9876543210",
            stdId: '123',
            isActive: true
        },
        {
            fname: "Snehal",
            lname: "Patil",
            email: "snehal.patil@gmail.com",
            contact: "9123456780",
            stdId: '124',
            isActive: false
        },
        {

            fname: "june",
            lname: "Doe",
            email: "june@gmail.com",
            contact: "9988776655",
            stdId: '125',
            isActive: true
        },
        {

            fname: "Rocky",
            lname: "sharma",
            email: "Rocky@gmail.com",
            contact: "9012345678",
            stdId: '126',
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
