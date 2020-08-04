import { Component, OnInit,Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Routes, RouterModule } from '@angular/router';
import { MatDialog, MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {NewEmailComponent} from '../new-email/new-email.component';
import { EmailComponent } from '../email/email.component';
import { EmailService } from '../services/email.service';
import { ActivatedRoute,Router ,Params} from '@angular/router';
import {Email} from '../models/Email.models';
import { switchMap, debounceTime, catchError } from 'rxjs/operators';
import { Validators } from '@angular/forms';
import{ FormBuilder,FormGroup,FormControl, RequiredValidator,ReactiveFormsModule} from "@angular/forms";
import{Dictionary,ObjDictionary} from '../models/Dictionary.models';
import { Label } from '../models/Label.models';
import {AppComponent} from '../app.component'
@Component({
  selector: 'app-single-draft',
  templateUrl: './single-draft.component.html',
  styleUrls: ['./single-draft.component.css']
})
export class SingleDraftComponent implements OnInit {

  constructor(
    private dialog:MatDialog,
    private emailService:EmailService,
    private formBuilder: FormBuilder,
   // private matDialogRef:MatDialogRef<SingleDraftComponent>,
   private route:ActivatedRoute,
   private router:Router,
    
  ) { }
  emails :any ;
  content:string="hi";
  category =new ObjDictionary({});
  @Input()object:string="about smth";
  files:string[]= ["smth1","smth2"];    
  @Input()sender:string;
  id:number= 1    
  @Input()email:Email
  id1: any;
  myForm: FormGroup;
 
   submitted = false;
   E:Email;
   email1:Email;
  matDialogRef1:MatDialogRef<EmailComponent>
  ngOnInit(): void {
this.get1()
  }
  get1()
  {

  this.route.params.pipe(
  switchMap((params: Params) => this.emailService.getOneEmail(+params['id']))
     
    )
    .subscribe((data:Email)=> 

      {
        
        this.email1 = data
        console.log("this.email11111111111111");
        console.log(data);
        this.initializeFormGroup(this.email1)
      });
    }

  get f() { return this.EmailForm.controls; }
  Email : Email;
  EmailForm: FormGroup = new FormGroup(
    {

        from :new FormControl(''),
        To:new FormControl('',Validators.required),
        object:new FormControl(''),
       
        Message:new FormControl(''),
        folder:new FormControl(''),


    }

);

initializeFormGroup(E:Email)
{
    this.EmailForm.setValue({
       
       from :E.sender,
       To:E.To,
      object:E.object,
      
       
       Message:E.content,
       folder:'Draft'
     
    });
}
  onSubmit(Email :Email) {
 
    e:Email;
    this.submitted = true;
    if (this.EmailForm.valid) {
      //insert
 console.log(this.EmailForm.value)
//this.Email=new Email(this.emailService.id,"","","")

Email.sender=this.EmailForm.value.from;
Email.object=this.EmailForm.value.object;
Email.content=this.EmailForm.value.Message;
Email.To=this.EmailForm.value.To;
Email.folder='Sent';

console.log("email sent for updaate ");
this.emailService.update(Email);





}
this.EmailForm.reset();

this.close(Email);
this.router.navigate(['/Draft']);

}
getInfo(Email:Email[]):Email[]
{
  return Email
}
emitEmails(Email:Email,cb:(obj8:Email)=>any)
{
  let obj8;
  obj8=Email
  console.log("OOOBBJJ4")
  console.log(obj8);
  cb(obj8)
}
onReset() {
  this.submitted = false;
  this.EmailForm.reset();
  this.emailService.initializeFormGroup();
}
close(Email : Email) {
  
  //this.matDialogRef.close();
}
Draft(Email:Email)
{
  console.log(this.EmailForm.value)
  if(this.EmailForm.value.from!=""
  ||this.EmailForm.value.object!=""
  ||this.EmailForm.value.Message!=""
  ||this.EmailForm.value.To!=""
  ||this.EmailForm.valid
  ||!this.EmailForm.valid
  )
  {
//this.Email=new Email(this.emailService.id,"","","")

Email.sender=this.EmailForm.value.from;
Email.object=this.EmailForm.value.object;
Email.content=this.EmailForm.value.Message;
Email.folder='Draft';
Email.To=this.EmailForm.value.To;
console.log("email draft for update");
//console.log(this.Email);
this.emailService.update(Email);
this.router.navigate(['/Draft']);

  }
 

this.EmailForm.reset();

}
delete(Email:Email)
{ console.log(this.EmailForm.value)
  if(this.EmailForm.value.from!=""
  ||this.EmailForm.value.object!=""
  ||this.EmailForm.value.Message!=""
  ||this.EmailForm.value.To!=""
  )
  {
//this.Email=new Email(this.emailService.id,"","","")

Email.sender=this.EmailForm.value.from;
Email.object=this.EmailForm.value.object;
Email.content=this.EmailForm.value.Message;
Email.folder='Trash';
Email.To=this.EmailForm.value.To;
console.log("email draft for update");
//console.log(this.Email);
this.emailService.update(Email);
this.router.navigate(['/Draft']);

}
}


/*onCreate(E1:Email)
  {
    this.initializeFormGroup(E1);
    const dialogConfig= new MatDialogConfig();
  
    dialogConfig.disableClose= false;
  
    dialogConfig.autoFocus= true;
    /*dialogConfig.width= "50%";*/
  /*  dialogConfig.position = {
      'top': '0',
      left: '0'
  };
    this.dialog.open(NewEmailComponent,dialogConfig);
  }*/
}
