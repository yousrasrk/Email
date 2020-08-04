import { Component, OnInit } from '@angular/core';
import { EmailService } from '../services/email.service';
import { ActivatedRoute,Router ,Params} from '@angular/router';
import {Email} from '../models/Email.models';
import { Observable } from 'rxjs';
import { switchMap, debounceTime, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-mail-folder',
  templateUrl: './mail-folder.component.html',
  styleUrls: ['./mail-folder.component.css']
})
export class MailFolderComponent implements OnInit {
// data: Observable<{emails : Email[]}>
emails : Email[];
email : Email [];
email1: any;
obj3:Email[];
  constructor(
    private emailService : EmailService,
    private route:ActivatedRoute,
    private router:Router,
    private apiservice:ApiService
  ) { }
categoryParam:string;
labelParam:string;
  ngOnInit(): void {
  /*  this.route.params.pipe(
      switchMap((params: Params) => this.emailService.filterCategory2(params['category']))
    )
    .subscribe(data => this.emails = data);
  console.log(this.email1);*/

this.route.paramMap.subscribe(params => { 
    this.categoryParam = params.get('category'); 
   // console.log(  this.categoryParam)
     this.labelParam=params.get('label'); 
     //console.log(this.labelParam)
     this.get1(this.categoryParam,this.labelParam);

});
 

  
  
   // this.data =this.route.data;
 /* this.route.params.pipe(
    switchMap((params: Params) => this.emailService.getCategory(params['category']))
  )
  .subscribe(data => this.emails = data['emails']);
console.log(this.emails);*/
//this.filterCategory('Label1')

  }
   
  get1(category:string,label:string)
  {
    this.apiservice.get1(category,label,(obj3:Email[])=>
    {
      
   
      this.emails=obj3
     // console.log( obj3)
      
      return this.emails

    });
  }



 /* getCategory(category)
  {
    this.emailService.getCategory(category).subscribe((data)=>{
      console.log(data);
      this.emails =data;
        })
  }*/
  filterCategory(category: string) {
	  this.emailService.filterCategory(category)
       .subscribe(data => this.emails = data['emails']);
       console.log(this.emails);
   }   
   getCat() {
	  this.emailService.getCat()
       .subscribe(data => this.emails = data);
       console.log(this.emails);
   } 
   
//   get1(category:string,label:string,cb :(obj3 :Email[])=>any)

  
 
}
