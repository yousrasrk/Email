import { Component, OnInit,Output, EventEmitter  } from '@angular/core';
import { MatDialog, MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmailService } from '../services/email.service';
import { ActivatedRoute,Router ,Params} from '@angular/router';
import {Email} from '../models/Email.models';
import { switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient,HttpResponse,HttpRequest } from '@angular/common/http';
import {ApiService} from '../api.service'

import { Validators } from '@angular/forms';
import{ FormBuilder,FormGroup,FormControl, RequiredValidator,ReactiveFormsModule} from "@angular/forms";
import{Dictionary,ObjDictionary} from '../models/Dictionary.models';
import { Label } from '../models/Label.models';
import {AppComponent} from '../app.component'
import { Filter } from '../models/Filter.models';

@Component({
  selector: 'app-new-email',
  templateUrl: './new-email.component.html',
  styleUrls: ['./new-email.component.css']
})
export class NewEmailComponent implements OnInit {

  constructor(private emailService: EmailService,
    private formBuilder: FormBuilder,
    private matDialogRef:MatDialogRef<NewEmailComponent>,
    private AppComponent:AppComponent,
    private http:HttpClient,
    private apiservice:ApiService,
    private router: Router
    ) { }
 myForm: FormGroup;
 EmailForm: FormGroup;
 submitted = false;
 Email : Email;
 emailsubmit:Email[];
 category:any=
 

 {
   Product:

   [
    {
    Prediction: null,
    Probability: null
    }
    
   ],
   Issue:
   [
     {
    Prediction: null,
    Probability: null
    }
   ]
 }
  ngOnInit() {
 
  this.EmailForm=this.form

  }
  form: FormGroup = new FormGroup(
    {

        from :new FormControl(''),
        To:new FormControl('',Validators.required),
        object:new FormControl(''),
        Message:new FormControl(''),
        folder:new FormControl(''),
        files:new FormControl(''),
        category:new FormControl(''),
        firstName:new FormControl(''),
        lastName:new FormControl(''),
    }

);
initializeFormGroup()
{
    this.form.setValue({
       
       from :'me@gmail.com',
       To:'',
      object:'',
       Message:'',
       folder:'Draft',
       category:null,
       firstName:'',
       lastName:'',
       files:[ '']
     
    });
}
/*
selectedFile=null;
onFileSelected(event)
{
const file=<File>event.target.files[0];
this.EmailForm.get('files').setValue(file);
}
*/
//@Output() messageEvent = new EventEmitter<Email[]>();
 
// convenience getter for easy access to form fields
//  get f() { return this.EmailForm.controls; }

  onSubmit() {
this.submitted = true;
if (this.EmailForm.valid)
{      //insert
     let id:number
     let filter:Filter
     let cat:ObjDictionary=this.category
     /*category.dict.Product[0].Prediction=null
     category.dict.Product[0].Probability=null*/
     

    console.log(this.EmailForm.value)
    this.Email=new Email(id,"","","","",this.category,"","","")
    //this.Email=new Email(id,"","","")
    this.Email.sender="me@gmail.com";
    this.Email.object=this.EmailForm.value.object;
    this.Email.content=this.EmailForm.value.Message;
    this.Email.To=this.EmailForm.value.To;
    this.Email.folder='Sent';

    this.Email.firstName=""
    this.Email.lastName=""

    this.apiservice.classify(this.Email,(obj12:Email)=>
    {
       this.Email=obj12
       console.log("sending email");
       console.log(this.Email)
       this.emailService.post(this.Email);
     

    })
    

}

this.EmailForm.reset();

this.close();

}

onReset() {
  this.submitted = false;
  this.EmailForm.reset();
  this.initializeFormGroup();
}
close() {
  
  this.matDialogRef.close();
}
Action(s:string)
{
  if(this.EmailForm.value.object!=""
  && this.EmailForm.value.Message!=""
  && this.EmailForm.value.To!="")
  {
    this.close();
    this.EmailForm.reset();
  }
  else if(this.EmailForm.value.from!=""
  ||this.EmailForm.value.object!=""
  ||this.EmailForm.value.Message!=""
  ||this.EmailForm.value.To!="")
{
      //insert
      let id:number
      let filter:Filter
      let cat:ObjDictionary=this.category
     console.log(this.EmailForm.value)
     this.Email=new Email(id,"","","","",this.category,"","","")
     this.Email.sender=this.EmailForm.value.from;
     this.Email.object=this.EmailForm.value.object;
     this.Email.content=this.EmailForm.value.Message;
     this.Email.To=this.EmailForm.value.To;
     this.Email.folder=s;
 
     this.Email.firstName=""
     this.Email.lastName=""
 
     this.apiservice.classify(this.Email,(obj12:Email)=>
     {
        this.Email=obj12
        console.log(this.Email)
        this.emailService.post(this.Email);
      
 
     })
     this.close();
     this.EmailForm.reset();
 
 }
 this.close();
 this.EmailForm.reset();
 
  }
 



}
