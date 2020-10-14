import { Component, OnInit,Output, EventEmitter,Inject  } from '@angular/core';
import {MatDialogModule, MatDialog  , MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmailService } from '../services/email.service';
import { ActivatedRoute,Router ,Params} from '@angular/router';
import {Email} from '../models/Email.models';
import { switchMap, debounceTime, catchError, timestamp } from 'rxjs/operators';
import { HttpClient,HttpResponse,HttpRequest } from '@angular/common/http';
import {ApiService} from '../services/api.service'
import { Validators } from '@angular/forms';
import{ FormBuilder,FormGroup,FormControl, RequiredValidator,ReactiveFormsModule} from "@angular/forms";
import{Dictionary,ObjDictionary} from '../models/Dictionary.models';
import { Label } from '../models/Label.models';
import {AppComponent} from '../app.component'
import { Filter } from '../models/Filter.models';
import { ToastService } from '../services/toast.service';
import * as _ from 'lodash';
import {ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import{EmailFolderComponent} from'../email-folder/email-folder.component';
import{NavTreeComponent} from'../nav-tree/nav-tree.component'
import { SingleEmailComponent } from '../single-email/single-email.component';

@Component({
  selector: 'app-compose-email',
  templateUrl: './compose-email.component.html',
  styleUrls: ['./compose-email.component.css']
})
export class ComposeEmailComponent  {

  constructor(
    private route:ActivatedRoute,

    private EmailService:EmailService,
    private ApiService:ApiService,
    private _formBuilder: FormBuilder,
    private _router:Router,
    private ToastService:ToastService,
    public matDialogRef:MatDialogRef<ComposeEmailComponent>,
    public EmailFolderComponent:EmailFolderComponent,
    public NavTreeComponent:NavTreeComponent,
    private navTreeComponent:NavTreeComponent,
    @Inject(MAT_DIALOG_DATA) public data: any ) { }
    
    //declaration
    myForm: FormGroup;
      EmailForm: FormGroup;
      submitted = false;
      Email : Email;
      emailsubmit:Email[];
      category:ObjDictionary=new ObjDictionary({});
      from: string;
      To: string
      object:string
      message:string

  ngOnInit() {
 
  
  this.EmailForm=this._formBuilder.group({
    
    from:    [ this.data.email.sender],
    To:      [ this.data.email.To],
    object:  [ this.data.email.object ],
    Message: [ this.data.email.content ],
  });
  
}

 

//if draft get color of label
getColor(number:number):string
{
  return this.EmailService.getColor(number)
}

onReset() {//reset form
  this.submitted = false;
  this.EmailForm.reset();
  //this.initializeFormGroup();
  this.category=new ObjDictionary({})
}
close() {//close form
  
  this.matDialogRef.close();

}
Action(folder:string)//Draft or delete
{//if nothing is written n need to save email
  if(this.EmailForm.value.object==""
  && this.EmailForm.value.Message==""
  && this.EmailForm.value.To=="")
  {
    this.close();
    this.EmailForm.reset();
  }
  else if(
    this.EmailForm.value.object!=""
  ||this.EmailForm.value.Message!=""
  ||this.EmailForm.value.To!="")
{
      //insert

      if(this.data!=null)
      {
        this.Email=this.data.email
        this.Email.lastUpdate=Date.now()
        this.Email.seen=false;


      }
      else
      {
        let id:number
        let category:ObjDictionary=new ObjDictionary({});
        let date = Date.now();
        this.Email.seen=false;

        let lastUpdate=date
        this.Email=new Email(id,"info@mentis.io","","",date,lastUpdate,0,false,"",category,this.EmailService.PickRandom(this.EmailService.FirstName),this.EmailService.PickRandom(this.EmailService.LasttName),"",[],0)
      }
      this.Email.sender=this.EmailForm.value.from;
      this.Email.object=this.EmailForm.value.object;
      this.Email.content=this.EmailForm.value.Message;
      this.Email.To=this.EmailForm.value.To;
      this.Email.folder=folder;
      this.ApiService.getClassification(this.Email,(obj1:Email)=>
        {
          this.Email=obj1
           if(this.data.email.id!=undefined)
          
          {
            this.Email.lastUpdate=Date.now()
            this.Email.seen=false;

            this.EmailService.update(this.Email)
          //  window.location.reload();
            this.ToastService.openSnackBar(`email has been saved as ${folder}`,"close")

          }
          else
          {
            this.EmailService.post(this.Email)
          this.ToastService.openSnackBar(`email has been saved as ${folder}`,"close")
          }
        })
      this.close();
      this.EmailForm.reset();
 }
}
onSubmit() {//sent

  this.submitted = true;
  if (this.EmailForm.valid)
  {      //case if email was draft
       
      if(this.data!=null)
      {
        this.Email=this.data.email
        this.Email.seen=false;
        this.Email.lastUpdate=Date.now()
        
      }
      else
      {
        //create new email
        let id:number
        let date = Date.now();
        let category:ObjDictionary=new ObjDictionary({});
        let lastUpdate=date
        this.Email=new Email(id,"info@mentis.io","","",date,lastUpdate,0,false,"",category,this.EmailService.PickRandom(this.EmailService.FirstName),this.EmailService.PickRandom(this.EmailService.LasttName),"",[],0)

      }
      this.Email.sender=this.EmailForm.value.from;
      this.Email.object=this.EmailForm.value.object;
      this.Email.content=this.EmailForm.value.Message;
      this.Email.To=this.EmailForm.value.To;
      this.Email.folder='Sent';
      this.Email.seen=false;
      this.ApiService.getClassification(this.Email,(obj1:Email)=>
        {
          this.Email=obj1
          this.Email.seen=false;
          
          if(this.data.email.id!=undefined)//email is draft =>apdate
          {
       
            this.Email.lastUpdate=Date.now()
            this.Email.seen=false;
            this.EmailService.update(this.Email)
            this.ToastService.openSnackBar("email sent","close")
 
          }
          else
      {
        
        this.EmailService.post(this.Email)
         this.EmailService.Email=this.Email
        this.ToastService.openSnackBar("email sent","close")

        

      } 

      
        })
  //

         
  }


  this.EmailForm.reset();
  this.close();
}


}
