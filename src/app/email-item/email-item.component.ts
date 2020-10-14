import { Component, OnInit,Input } from '@angular/core';
import {Email} from '../models/Email.models';
import { EmailService } from '../services/email.service';
import { ComposeEmailComponent } from '../compose-email/compose-email.component';
import { MatDialog, MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ObjDictionary } from '../models/Dictionary.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-item',
  templateUrl: './email-item.component.html',
  styleUrls: ['./email-item.component.css']
})
export class EmailItemComponent implements OnInit {
  @Input()email:Email;
  constructor(private EmailService:EmailService,
    private dialog:MatDialog) { 
    }

//unit email
  ngOnInit(): void {}
  
  getColor(number:number):string
  {
    return this.EmailService.getColor(number)
  }
  Seen(email:Email):string//if email is already opened 
  {
    if(!email.seen)
    return "#F0F8FF;"
  }
  onCreate()//draft case 
  {
    let email=this.email
   
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose= false;
    dialogConfig.autoFocus= true;
    this.dialog.open(ComposeEmailComponent ,{
     data: {
      email
     }
      });
     dialogConfig
      
  }
}
