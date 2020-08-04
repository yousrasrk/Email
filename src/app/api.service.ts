import { Injectable } from '@angular/core';
import {Email} from './models/Email.models'
import { HttpClient,HttpResponse,HttpRequest } from '@angular/common/http';
import { Observable, of, pipe, from } from 'rxjs';
import { switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpParams } from '@angular/common/http'; 
import {  throwError } from 'rxjs';
import {  retry } from 'rxjs/operators';
import { Validators } from '@angular/forms';
import{FormGroup,FormControl, RequiredValidator} from "@angular/forms"
import{Label} from './models/Label.models';
import{Taxonomy} from './models/Taxonomy.models';
import{EmailApi} from './models/EmailApi.models';
import{Dictionary,ObjDictionary} from './models/Dictionary.models';
import{EmailService} from './services/email.service'
import{Taxonomy1} from './models/Taxonomy1.models';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { analyzeAndValidateNgModules, ConstantPool } from '@angular/compiler';
//import {HTTP_PROVIDERS, Http, BaseRequestOptions, RequestOptions} from '@angular/http';
import{NavTreeComponent} from './nav-tree/nav-tree.component'
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url="http://109.135.0.135/cc_demo/classifyEmail";
  
  constructor(
    public http:HttpClient,
    public emailService:EmailService,
    public tree:NavTreeComponent
    
   
    )
  { }
  M:ObjDictionary;
  filterCategory2(category: string): Observable<any[]> {
    // category="Label1";
     const url='http://localhost:3000/emails/';
     let httpParams = new HttpParams()
                         .set('category', category);
    return this.http.get<any[]>('http://localhost:3000/emails',{params:httpParams})
  }
  public Keys(A:ObjDictionary): string[] {
    var keySet: string[] = [];

    for (var prop in A.dict) {
        if (A.dict.hasOwnProperty(prop)) {
            keySet.push(prop);

        }
       
    }

    return keySet;
}
  //post complaint ==> api
  addComplaint1(Data : string,cb :(obj :ObjDictionary)=>any)
  { 
  let obj :ObjDictionary= new ObjDictionary({})
   let  postData=[{
      "Consumer complaint narrative": Data
    }];
         this.http.post<ObjDictionary>(this.url,postData)
      
         .toPromise()
       .then((data:ObjDictionary) =>
        {
          
          obj=new ObjDictionary(data);
          cb(obj)
        }
       );}


       
    
  classify(Email:Email,cb :(obj12:Email)=>any)
  {
    let obj12:Email;
    this.addComplaint1(Email.content,(obj:ObjDictionary)=>
    { 
      this.M=obj
      
                  
      let c:Label
      let e: Label
                
                //get Product
            
      c=  this.M.dict["Product"][0]
                
      this.tree.check(c.Prediction,"Product",1)//check if prediction exist in tree 
      let resP :Label[]=[];   
      resP.push(c); 
      this.M.dict["Product"]=resP;

                    //Issue
       e=this.M.dict["Issue"][0]
      this.tree.check(e.Prediction,"Issue",1)//check if prediction exist in tree
      let resI :Label[]=[];
      resI.push(e);
      this.M.dict["Issue"]=resI;
       Email.category=this.M
        obj12=Email;
        cb(obj12)
    })
  }
  Result:Email[];




  //get classification from api for all 
classify1(cb :(obj2 :Email[])=>any)
{  let obj2=[];

  //get emails
  this.emailService.getAPIData1().subscribe(data => 
    {
      this.Result=data;
      console.log(data)
      let E: Email[]=[]
      let c:Label[]
      let d:Label;
      this.M=new ObjDictionary({});
      for(let item in this.Result)
      
      {
       if(this.Result[item].category.dict["Product"][0].Prediction==null)
        {
          this.addComplaint1(this.Result[item].content,(obj:ObjDictionary)=>
                { 
                  this.M=obj
                  let Y=new ObjDictionary({})
                   Y=obj;
                   let c:Label
                   let e: Label
                  let  keysApi:string[]
                //get Product
            
                    c=  this.M.dict["Product"][0]
                
                    this.tree.check(c.Prediction,"Product",1)//check if prediction exist in tree 
                    let resP :Label[]=[];   
                    resP.push(c); 
                    this.M.dict["Product"]=resP;

                    //Issue
                    e=this.M.dict["Issue"][0]
                    this.tree.check(e.Prediction,"Issue",1)//check if prediction exist in tree
                    let resI :Label[]=[];
                    resI.push(e);
                   this.M.dict["Issue"]=resI;
                   this.Result[item].category=this.M
                   this.Result[item].labelP=this.M.dict["Product"][0]
                   this.emailService.Updatcategory( this.Result[item].id, this.Result[item])//addclassification
                  
                   obj2=this.Result;
                   cb(obj2)

                }) ;
          
         
          

     }
     else{
      obj2=this.Result;
      cb(obj2)
     }
    }
  }
  )}
  
  Result1:Email[];
  Result2:Email[];
  
  get1(category:string,label:string,cb :(obj3 :Email[])=>any)
      { let obj3=[]
        this.Result1=[];
        this.Result2=[];
  
        this.emailService.getAPIData1().subscribe(
          data=>{
            this.Result1=data
            console.log(data)
            for(let i in this.Result1)
            {
              for (var prop in this.Result1[i].category.dict) {
              
              
                    { 
                      if(prop==category)
                      { 
                      console.log("result obj2")
                      console.log(prop);
                       if(category=="Product")
                       {
                        if( this.Result1[i].category.dict.Product[0].Prediction==label)
                        {
                         
                          this.Result2.push(this.Result1[i])
                         
                        }
                      }
                      else if
                      (category=="Issue")
                       {
                        if( this.Result1[i].category.dict.Issue[0].Prediction==label)
                        {
                         
                          this.Result2.push(this.Result1[i])
                        }
                      }
                      }
      
                }
               }          
            obj3=this.Result2;
                   cb(obj3);
            
          }
        
      })
    }





}
  

