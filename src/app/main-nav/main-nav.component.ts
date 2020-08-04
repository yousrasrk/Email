import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Routes, RouterModule } from '@angular/router';
import { MatDialog, MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {NewEmailComponent} from '../new-email/new-email.component';
import { EmailService } from '../services/email.service'
import { EmailComponent } from '../email/email.component';
import{ FormBuilder,FormGroup,FormControl, RequiredValidator,ReactiveFormsModule} from "@angular/forms";
import { Email } from '../models/Email.models'

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private dialog:MatDialog,
     private emailService:EmailService,
     private email:EmailComponent

    ) {}
    @Input() searchKey:string;

  matDialogRef:MatDialogRef<EmailComponent>

onCreate()//compose email
{
  this.emailService.initializeFormGroup();
  const dialogConfig= new MatDialogConfig();

  dialogConfig.disableClose= false;

  dialogConfig.autoFocus= true;
  /*dialogConfig.width= "50%";*/
/*  dialogConfig.position = {
    'top': '0',
    left: '0'
};*/
  this.dialog.open(NewEmailComponent,dialogConfig);
}

}
