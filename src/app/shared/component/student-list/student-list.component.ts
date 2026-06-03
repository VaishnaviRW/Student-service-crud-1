import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { IStd } from '../../model/std';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmationComponent } from '../get-confirmation/get-confirmation.component';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
StdArr !: IStd[]
  constructor(private studservice : StudentService,
              private matdialog : MatDialog,
              private snackbar : SnackbarService
  ) { }

  ngOnInit(): void {
    this.studservice.fetchstudents()
    .subscribe({
      next : data =>{
        this.StdArr = data
      }
    })
  }
  onRemove(stdId : string){
    let config = new MatDialogConfig()
    config.width = '300px'
    config.disableClose = true
    config.data = `Are You Sure ? you Want To Remove This Id ${stdId}`

    let matref = this.matdialog.open(GetConfirmationComponent,config)
    matref.afterClosed()
    .subscribe(res =>{
      if(res){
        this.studservice.onremovestd(stdId)
        .subscribe({
          next : data => this.snackbar.opensnackbar(data.msg),
          error : err => this.snackbar.opensnackbar(err.msg)
        })
      }
    })
  }
  onEdit(std : IStd){
    this.studservice.EditStudentSub$.next(std)
  }
  trackByfun(index : number, std : IStd){
    return std.stdId
  }

}
