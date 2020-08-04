import { Component, OnInit,Output, EventEmitter  } from '@angular/core'
import { EmailService } from '../services/email.service';
import {Email} from '../models/Email.models';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { ActivatedRoute,Router ,Params} from '@angular/router';
import { switchMap, debounceTime, catchError } from 'rxjs/operators';
import {ApiService} from '../api.service'
import { ObjDictionary } from '../models/Dictionary.models';
import {Label} from '../models/Label.models'
import { MatDialog, MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import{ FormBuilder,FormGroup,FormControl, RequiredValidator,ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})
export class DraftComponent implements OnInit {

  constructor(private emailService:EmailService,
    ) { }
  emails:Email[];

  
  selectedItems:string[];
  task:boolean=false
    ngOnInit(): void {
   //this.emails=this.AppComponent.Emails
   /*this.NewEmailComponent.emitEmails((obj8:Email)=>
   {
     let a:Email=obj8;
     console.log("obj88888888")
     console.log(a)
   } );*/
   console.log("hello2")
   //this.emailService.post();
   let e:Email[]=[]

   this.emailService.getAPIData1().subscribe((data:Email[])=>
   {
     
     console.log("draft2")
     console.log(data)
  
     for(let item in data)
     {
       if(data[item].folder=='Draft')
       {
        e.push(data[item])
       }
     }
     this.emails=e
     console.log(" draft2")
     console.log(this.emails)
  
     
   } );
   this.selectedItems=new Array<string>();
    }
  
  get()
  {
  
  }
  }