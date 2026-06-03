import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IStd } from '../../model/std';
import { StudentService } from '../../services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  geteditstd !: IStd
isInEditMode : boolean = false
@ViewChild('StudentForm') StudentForm !: NgForm
  constructor(private stdservice : StudentService,
              private matdialog : MatDialog,
              private snackbar : SnackbarService
  ) { }

  ngOnInit(): void {
    this.patchstdvalue()
  }
  onstdsubmit(){
    if(this.StudentForm.valid){
      let stdobj : IStd = {
        ...this.StudentForm.value,stdId: Date.now().toString()
      }
      this.StudentForm.reset()
      this.stdservice.onstdadd(stdobj)
      .subscribe({
        next : data => {
          this.snackbar.opensnackbar(data.msg)
        },
        error : err =>{
          this.snackbar.opensnackbar(err.msg)
        }
      })
    }
  }

  patchstdvalue(){
    this.stdservice.EditStudentSub$.subscribe({
      next : data =>{
        this.geteditstd = data
        this.isInEditMode = true
        this.StudentForm.form.patchValue(data)
      }
    })
  }
  onUpdate(){
    if(this.StudentForm.valid){
      let updatedobj : IStd = {
        ...this.StudentForm.value,stdId : this.geteditstd.stdId
      }
      this.StudentForm.reset()
      this.isInEditMode = false
      this.stdservice.onstudentupdate(updatedobj)
      .subscribe({
        next : data => this.snackbar.opensnackbar(data.msg),
        error : err => this.snackbar.opensnackbar(err.msg)
      })
    }
  }

}
