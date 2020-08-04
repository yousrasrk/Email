import { Injectable } from '@angular/core';
import {Email} from '../models/Email.models'
import { HttpClient,HttpResponse,HttpErrorResponse } from '@angular/common/http';
import { Observable, of, pipe, from } from 'rxjs';
import { switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpParams } from '@angular/common/http'; 
import {  throwError } from 'rxjs';
import {  retry } from 'rxjs/operators';
import { Validators } from '@angular/forms';
import{ FormBuilder,FormGroup,FormControl, RequiredValidator,ReactiveFormsModule} from "@angular/forms";
import{Dictionary,ObjDictionary} from '../models/Dictionary.models';
import { Label } from '../models/Label.models';

@Injectable(
{
    providedIn:'root'
})
export class EmailService


{

    
   
    //get Data from json
   EMAIL_API : string ='assets/db.json'

    constructor(private http: HttpClient,
        private fb:FormBuilder)
    {
        
    }
      emails=[ 
    {
    id:1,
    sender:"1@gmail.com",
    object:"about account 1",
    content:"I wrote to XXXX, asking them to stop calling. XXXX calls me every day. Each time, they use a different phone number",
    category:new ObjDictionary({}),
    files: ["moy.json","sum.ts","result.py"],
    folder:"",
    labelP:new Label("",0),
    labelI:new Label("",0)
   
},{
    id:2,
    sender:"2@gmail.com",
    object:"about account 2",
    content:"studies are expensive i have to work ",
    category:new ObjDictionary({}),
    folder:"",

    labelP:new Label("",0),
    labelI:new Label("",0),
   
},


{
    id:3,
    sender:"3@gmail.com",
    object:"object 3",
    content:"Mortage XXXXXXXXXX ",
    category:new ObjDictionary({}),
   
    labelP:new Label("",0),
    labelI:new Label("",0),
    folder:"",

    files: ["moy.json","sum.ts","result.py"],

          
}
  ,
  {
    id:4,
    sender:"4@gmail.com",
    object:"object 4",
    content:"some debt still not ...XXXXXXXXXX",
    category:new ObjDictionary({}),
   
    labelP:new Label("",0),
    labelI:new Label("",0),
    folder:"",

    files: ["moy.json","sum.ts","result.py"],
          
} 

,
  {
    id:5,
    sender:"5@gmail.com",
    object:"object 5",
    content:"some debt still not ...XXXXXXXXXX",
    category:new ObjDictionary({}),
   
    labelP:new Label("",0),
    labelI:new Label("",0),
    folder:"",

    files: ["moy.json","sum.ts","result.py"],
          
} ,
 {
    id:6,
    sender:"6@gmail.com",
    object:"object 6",
    content:"some debt still not ...student  XX didn't pay yet ",
    category:new ObjDictionary({}),
   
    labelP:new Label("",0),
    labelI:new Label("",0),
    folder:"",

    files: ["moy.json","sum.ts","result.py"],
          
} 
,
  {
    id:7,
    sender:"7@gmail.com",
    object:"object 7",
    content:"some debt still not ...XXXXXXXXXX",
    category:new ObjDictionary({}),
   
    labelP:new Label("",0),
    labelI:new Label("",0),
    folder:"",

    files: ["moy.json","sum.ts","result.py"],
          
}
]
private handeleError(err)//have to add Sentry
{
  if(err instanceof HttpErrorResponse)
  {
    //server
    return throwError(console.error())
    
  }
  else{
    //client
    return throwError(console.error())

  }
  return throwError(err);
}
post(Email:Email)
{

 let postDta=Email

    this.http.post<Email>('http://localhost:3000/emails/',postDta)
    .subscribe(data=>
    {
console.log(data),
err => console.error(err)

    })
    
   
}
update1(Email:Email )
{
  
 
   return  this.http.put<Email>('http://localhost:3000/emails/'+Email.id,Email)
   .subscribe(data =>
     
     {
         console.log("updaaate1")
         console.log(data),
         err => console.error(err)

     })
     
    
}
update2(Email:Email ,s:number)
{
 
  Email.filter.Starred=s;
 
 
   return  this.http.put<Email>('http://localhost:3000/emails/'+Email.id,Email)
   .subscribe(data =>
     
     {
         console.log("update star")
         console.log(data),
         err => console.error(err)

     })
     
    
}

update(Email:Email)
{
Email.folder="Trash"

  return  this.http.put<Email>('http://localhost:3000/emails/'+Email.id,Email)
  .subscribe(data =>
    
    {
        console.log("updaaate")
        console.log(data),
        err => console.error(err)

    })
    
   
}
delete(Email :Email)
{

return this.http.delete('http://localhost:3000/emails/'+Email.id)
  .subscribe(
    result => {
      console.log("deelete")
      console.log(result)}
      
      ,
    err => console.error(err)
  );
}
       
        /* getAPIData()
        {
            return this.http.get('/assets/db.json');
        }*/

        //get All
 getAPIData():Observable<Email[]>
        {
            return this.http.get<Email[]>(this.EMAIL_API);
        }

 getAPIData1():Observable<Email[]>
        {
            return this.http.get<Email[]>('http://localhost:3000/emails').pipe(catchError(this.handeleError))
        }

        //get one with id
           getOneEmail(id):Observable<Email>
        {
            return this.http.get<Email>('http://localhost:3000/emails/'+id).pipe(
                catchError(err => of(null))
            );
        }

Updatcategory(id:number,Email:Email)
{

  return  this.http.put<Email>('http://localhost:3000/emails/'+Email.id,Email)
  .subscribe(data =>
    
    {
        console.log("update ")
        console.log(data)
    })
    
}
        getOneEmail1(id:number,category:string,label:string):Observable<Email>
        {
          
            return this.http.get<Email>('http://localhost:3000/emails/'+id).pipe(
                catchError(err => of(null))
            );
        }
        //get Category 
        getCategory(category : string):Observable<Email[]>
        {
            return this.http.get<Email[]>('EMAIL_API?category=${category}')
        }

  
      getData():Observable<Email[]>
      {
          const url ='http://localhost:3000/emails';
          return this.http.get<Email[]>(url)
      }
      

      getCat():Observable<any>
      {
          const url ='http://localhost:3000/emails/?category=Label1';
          return this.http.get<any>(url)
      }


      filterCategory(category: string): Observable<Email[]> {
        
        let httpParams = new HttpParams()
                             .set('category', "Label1");
        console.log(httpParams.toString());
        
        return this.http.get<Email[]>(this.EMAIL_API, {
                    
                     params: httpParams, 
                     responseType: 'json'
             });
     } 

  
    /*  {path: 'emails/:category/:label',component:MailFolderComponent,children: [*/


     filterCategory2(category: string): Observable<any[]> {
        // category="Label1";
         const url='http://localhost:3000/emails/';
         let httpParams = new HttpParams()
                             .set('category', category);
        return this.http.get<any[]>('http://localhost:3000/emails',{params:httpParams})

            //return this.http.get<any[]>('http://localhost:3000/emails/?category=Label1')
}


 form: FormGroup = new FormGroup(
     {

         from :new FormControl(''),
         To:new FormControl('',Validators.required),
         object:new FormControl(''),
        
         Message:new FormControl(''),
         folder:new FormControl(''),


     }

 );
 initializeFormGroup()
 {
     this.form.setValue({
        
        from :'',
        To:'',
       object:'',
       
        
        Message:'',
        folder:'Draft'
      
     });
 }

 initializeFormGroup2(s1: string,s2:string,Email:Email)
 {
     this.form.setValue({
        
        from :s1,
        To:s2,
       object:Email.object,
       
        
        Message:Email.content,
        folder:'Draft'
      
     });
 }
 initializeFormGroup3(s1: string,s2:string)
 {
     this.form.setValue({
        
        from :s1,
        To:s2,
       object:'',
       
        
        Message:'',
        folder:'Draft'
      
     });
 }
 EmailList : Email[];/*
 _url='';
 enroll(email : Email)
 {
     {
        this.http.post<any>(this._url,email)

     }
 }*/

}
