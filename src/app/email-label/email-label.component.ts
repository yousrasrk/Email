import { Component, OnInit } from '@angular/core';
import {ActivatedRouteSnapshot,RouterStateSnapshot,Router} from '@angular/router';
import {Email} from '../models/Email.models'
import { EmailService } from '../services/email.service';
import { ActivatedRoute ,Params} from '@angular/router';
import { switchMap, debounceTime, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-email-label',
  templateUrl: './email-label.component.html',
  styleUrls: ['./email-label.component.css']
})
export class EmailLabelComponent implements OnInit {
emails:Email[];
folder:string="";
length:number=0;
  constructor(private route:ActivatedRoute,
    private emailService:EmailService,
    private router:Router) { }
//get email list based on label
  ngOnInit(): void {
 
    this.emailService.refreshemail.subscribe(()=>{
      this.getData()
    });
     this.getData();
    }


  Result1:Email[];
  res:Email[];
  
  getemails(Label:string,SubLabel:string,cb :(obj3 :Email[])=>any)
      { 
        let obj3=[]// emit emails  
        this.res=[];
  
        this.emailService.getEmailsData().subscribe(//get all emails
          data=>{
                  for(let i in data)
                  {
                    if(data[i].category != null)
                    {
                      for (var prop in data[i].category.dict) {
                        { 
                              if(prop==Label)
                              { 
                          
                                if(Label=="Product")
                                {
                                  
                                  if( data[i].category.dict.Product[0].Prediction==SubLabel)//compare to sublabel
                                  {
                                    this.res.push(data[i])
                                  }
                                }
                                else if
                                (Label=="Issue")
                                {
                                  if(data[i].category.dict.Issue[0].Prediction==SubLabel)
                                  {
                                  
                                    this.res.push(data[i])
                                  }
                                }
                              }
                          }
                       }          
                      obj3=this.res;
                      cb(obj3);//emit emails that contain yhe same sublabel
                    }
                  }
               })
        }


    getRes(category:string,label:string)
  {
    this.getemails(category,label,(obj3:Email[])=>
    {
      this.emails=obj3
      this.emails.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      this.emails.sort((a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime())
      return this.emails

    });
  }

    
  getData()
  {
    this.route.paramMap.subscribe(params => { 
      this.getRes( params.get('label'),params.get('subLabel') );
      this.folder=params.get('subLabel') 
    });

  }

}
