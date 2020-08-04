import { Component, OnInit } from '@angular/core';
import { EmailService } from '../services/email.service';
import {Email} from '../models/Email.models';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { ActivatedRoute,Router ,Params} from '@angular/router';
import { switchMap, debounceTime, catchError } from 'rxjs/operators';
import {ApiService} from '../api.service'
import { ObjDictionary } from '../models/Dictionary.models';
import {Label} from '../models/Label.models'

@Component({
  selector: 'app-sent-draft-email',
  templateUrl: './sent-draft-email.component.html',
  styleUrls: ['./sent-draft-email.component.css']
})
export class SentDraftEmailComponent implements OnInit {

  constructor(private emailService:EmailService,
  ) { }
emails:Email[];

  ngOnInit(): void {
 //this.emails=this.AppComponent.Emails
 /*this.NewEmailComponent.emitEmails((obj8:Email)=>
 {
   let a:Email=obj8;
   console.log("obj88888888")
   console.log(a)
 } );*/
 console.log("hello")
 //this.emailService.post();
 let e:Email[]=[]
 this.emailService.getAPIData1().subscribe((data:Email[])=>
 {
   
   console.log("send draft1")
   console.log(data)

   for(let item in data)
   {
     if(data[item].folder=='Sent')
     {
      e.push(data[item])
     }
   }
   this.emails=e
   console.log("send draft2")
   console.log(this.emails)

   
 } );
  }

get()
{

}
}

