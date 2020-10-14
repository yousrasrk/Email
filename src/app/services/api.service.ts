import { Injectable } from '@angular/core';
import { HttpClient ,HttpResponse,HttpErrorResponse } from '@angular/common/http';
import{Dictionary,ObjDictionary} from '../models/Dictionary.models';
import{Label} from '../models/Label.models';
import {Email} from '../models/Email.models';
import {  throwError } from 'rxjs';
import { switchMap, debounceTime, catchError } from 'rxjs/operators';
import{NavTreeComponent} from '../nav-tree/nav-tree.component';
import { EmailService } from '../services/email.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_CLASSIFICATION:string="http://109.135.0.135/cc_demo/classifyEmail";
  private classification:any;
  constructor(
    private _http:HttpClient,
    private NavTreeComponent:NavTreeComponent,
    private EmailService:EmailService

    ) { }


private handleError(error)//have to add Sentry
  {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
          // client-side 
          errorMessage = `Error: ${error.error.message}`;
      } else {
          // server-side 
          errorMessage = `Error Code: ${error.status}\n message: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
  }


addComplaint(content : string,cb :(obj :ObjDictionary)=>any)
  { 
      let obj :ObjDictionary= new ObjDictionary({})
      let  postData=[{
                       "Consumer complaint narrative": content
                    }];
      this._http.post<ObjDictionary>(this.API_CLASSIFICATION,postData)
      
       .toPromise()
       .then((res:ObjDictionary) =>
          {
            obj=new ObjDictionary(res);
            cb(obj)
          })
        .catch(error => this.handleError(error))
      
      }

  
 getClassification(Email:Email,cb :(obj1:Email)=>any){
         let obj1:Email;
       this.classification=this.addComplaint(Email.content,(obj:ObjDictionary)=>
       {  
          let Product:Label[]=[]
          Product.push(obj.dict["Product"][0])
          let Issue:Label[]=[];
          Issue.push(obj.dict["Issue"][0])

          let res=new ObjDictionary({});

          res.dict["Issue"]=Issue
          res.dict["Product"]=Product
          
       
          Email.category=res;
          obj1=Email
          
          this.NavTreeComponent.check(obj.dict["Product"][0].Prediction,"Product",1)
          this.NavTreeComponent.check(obj.dict["Issue"][0].Prediction,"Issue",2)
          cb(obj1);
         })

       }

}
