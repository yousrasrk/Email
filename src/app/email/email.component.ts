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
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
   emails : Email[];
   email : Email [];
   email1: any;
   emails2 : Email [];
   res:Email[];
   numbers=[];
  constructor(private emailService :  EmailService,
    private route:ActivatedRoute,
    private router:Router,
    private apiservice :ApiService
    ) { 
     /* for(let i=0; i<3;i++)
      {
        this.numbers.push(i);
      }*/
  }
  E:Email[];
  U :ObjDictionary=new ObjDictionary({});
  me:ObjDictionary=new ObjDictionary({});

  ngOnInit() {
  
this.emails
this.get1()

}
/*get()
{
  this.emailService.getAPIData1().subscribe(data => 

    {
      let e:Email[]
      e=data
      console.log("mentis")
      console.log(e[0].category.dict.Issue[0].Prediction)
    })
}*/
get1()
      {
        this.apiservice. classify1(((obj2:Email[])=>
        {
          this.emails=obj2
        }));
      }
     
}

