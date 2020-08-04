import { Component, OnInit,Output, EventEmitter  } from '@angular/core';
import { MatDialog, MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmailService } from '../services/email.service';
import { ActivatedRoute,Router ,Params} from '@angular/router';
import {Email} from '../models/Email.models';
import { switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient,HttpResponse,HttpRequest } from '@angular/common/http';

import { Validators } from '@angular/forms';
import{ FormBuilder,FormGroup,FormControl, RequiredValidator,ReactiveFormsModule} from "@angular/forms";
import{Dictionary,ObjDictionary} from '../models/Dictionary.models';
import { Label } from '../models/Label.models';
import {AppComponent} from '../app.component'


@Component({
  selector: 'app-new-email2',
  templateUrl: './new-email2.component.html',
  styleUrls: ['./new-email2.component.css']
})
export class NewEmail2Component implements OnInit {

  constructor(
    private emailService: EmailService,
    private formBuilder: FormBuilder,
    private matDialogRef:MatDialogRef<NewEmail2Component>,
    private AppComponent:AppComponent,
    private http:HttpClient
  ) { }
  myForm: FormGroup;
  EmailForm: FormGroup;
   submitted = false;
   Email : Email;
  ngOnInit(): void {
    this.EmailForm=this.emailService.form
  }

  onSubmit() {
    /*const fd= new FormData();
    fd.append('sender',this.EmailForm.get('from').value)
    fd.append('object',this.EmailForm.get('object').value)
    fd.append('To',this.EmailForm.get('To').value)
    fd.append('folder','Sent')
    console.log("fd")
    console.log(fd)
   this.http.post<any>('http://localhost:3000/emails',fd)
   .subscribe(
     (res)=>{
       console.log(res)
     },
     (err)=>console.log(err)
   )*/
   
  e:Email;
  this.submitted = true;
  if (this.EmailForm.valid) {
         //insert
    let id:number
    console.log(this.EmailForm.value)
   this.Email=new Email(id,"","","")
   
   this.Email.sender=this.EmailForm.value.from;
   this.Email.object=this.EmailForm.value.object;
   this.Email.content=this.EmailForm.value.Message;
   this.Email.To=this.EmailForm.value.To;
   this.Email.folder='Sent';
   
   console.log("email send1");
   console.log(this.Email)
   this.emailService.post(this.Email);
   }
   this.EmailForm.reset();
   
   this.close();
   
   }

   getInfo(Email:Email[]):Email[]
   {
     return Email
   }

   emitEmails(Email:Email,cb:(obj8:Email)=>any)
   {
     let obj8;
     obj8=Email
     console.log(obj8);
     cb(obj8)
   }

   onReset() {
     this.submitted = false;
     this.EmailForm.reset();
     this.emailService.initializeFormGroup();
   }

   close() {
     
     this.matDialogRef.close();
   }

   Draft()
   {
     console.log(this.EmailForm.value)
     if(this.EmailForm.value.from!=""
     ||this.EmailForm.value.object!=""
     ||this.EmailForm.value.Message!=""
     ||this.EmailForm.value.To!=""
     )
     {
      let id:number
     this.Email=new Email(id,"","","")
      
      this.Email.sender=this.EmailForm.value.from;
      this.Email.object=this.EmailForm.value.object;
      this.Email.content=this.EmailForm.value.Message;
      this.Email.folder='Draft';
      this.Email.To=this.EmailForm.value.To;
      console.log("email send");
      console.log(this.Email);
      this.emailService.post(this.Email);
   
     }
    
   this.close();
   this.EmailForm.reset();
   
   }

   

}
