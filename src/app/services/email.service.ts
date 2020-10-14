import { Injectable } from '@angular/core';
import {Email} from '../models/Email.models'
import { HttpClient,HttpResponse,HttpErrorResponse } from '@angular/common/http';
import{Dictionary,ObjDictionary} from '../models/Dictionary.models';
import{Label} from '../models/Label.models';
import {  throwError } from 'rxjs';
import { Observable,Subject, of, pipe, from } from 'rxjs';
import { HttpHeaders, HttpParams ,HttpEvent,HttpEventType} from '@angular/common/http'; 
import {catchError, tap, map} from 'rxjs/operators';
import fetch from 'node-fetch';
import "isomorphic-fetch"
import { forkJoin } from 'rxjs';

export class FileNode {
  children: FileNode[];
  name:string;
  notif:number
}

export class Node {
  children: Node[];
  name:string;
  notif:number
}
@Injectable(
{
    providedIn:'root'
})

export class EmailService
{

  readonly API_EMAIL:string="http://localhost:3000/emails";

   Emails:Email[];
   Email:Email;
   show:boolean=false;
   public refreshemail=new Subject<void>();
   constructor(private _http:HttpClient,



    ) {  }

         
        /**randome names */
  FirstName:string[]=[
   "Jade","	Lea","	Adam","	Gabriel","Arthur",
   "Eva","Agathe","Antoine"
   ]
  LasttName:string[]=[
    "Davis","Smith","Waston","Ray","Grant",
    "Henry","Washington","Simmons"
    ]

   //picking random firstNames and LastNames 
  PickRandom(array:string[]):string {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle
    while (0 !== currentIndex) {
  
      // Pick an element 
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array[0];
  }
  
 

          /* handeling error*/
   private handleError(error)
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

                 
                /*get emails*/
     
      getEmails():Promise<Email[]>
      {
      return this._http.get(this.API_EMAIL)

      .toPromise()
      .then(
        (res:Response)=>res.json())
       }
     getEmailsData():Observable<Email[]>
     {
         return this._http.get<Email[]>(this.API_EMAIL)
        .pipe(catchError(this.handleError))
     }
                       /*get one email by id*/
    
      getEmail(id:number):Observable<Email> | null
      {
         return this._http.get<Email>(`${this.API_EMAIL}/${id}`) || undefined
        /* .pipe(
          tap(data => console.log('All: ' + JSON.stringify(data))),
          catchError(this.handleError)
      );*/
      }

              
             /*get Emails based on category */
 
    getCategory(category:string): Observable<Email[]> {
     
      return this._http.get<Email[]>(`${this.API_EMAIL}?category.dict.Product=${category}`)
      .pipe(
      
        catchError(this.handleError))
     }

    


              /*get Emails based on folder */

      getFolder(folder:string): Observable<Email[]> 
      {
        let httpParams = new HttpParams()
        .set('folder', folder);
        return this._http.get<Email[]>(this.API_EMAIL,{params:httpParams})
        .pipe(
         //tap(data => console.log('All: ' + JSON.stringify(data))),
          catchError(this.handleError)
      );

      }

              /*get Emails based on Filter ()if email is reclassify */

              getFilter(): Observable<Email[]> 
              {
                
                return this._http.get<Email[]>('http://localhost:3000/emails/?filter=1')
                .pipe(
                 tap(data => console.log('All: ' + JSON.stringify(data))),
                  catchError(this.handleError)
              );
        
              }
          
emails:Email[]
  
      
            /*update Email*/
   update(Email:Email )
   {
     return  this._http.put<Email>(`${this.API_EMAIL}/${Email.id}`,Email)
     .pipe(
      tap(()=>{
         this.refreshemail.next();

      }
      )) 
      .subscribe(data =>
        {
          console.log(data)},
        error => this.handleError(error))
   }


              /*delete Email*/
    delete(Email :Email)
    {
        return this._http.delete(`${this.API_EMAIL}/${Email.id}`)
        .subscribe(
          result => {
            console.log(result)},
            error => this.handleError(error)
        );
    }

              /*post email*/ 
      post(Email:Email)
      {             console.log("post "+Email)

        return this._http.post(this.API_EMAIL+'/', Email)
    
          .pipe(
            tap(()=>{
               this.refreshemail.next();

            }
            ))  
             .subscribe(data=>
              {
                console.log(data),
                err => console.error(err)
          
              })
      }

             /*upload files*/ 
      
             public upload(formData) {

              return this._http.post<any>("https://file.io/", formData, {  
                  reportProgress: true,  
                  observe: 'events'  
                });  
            }
          

            /* color of Probability*/ 
            getColor(number:number):string
            {
              
          
              if(number*100>=60)
              {
                return "green"
              }
              else if((number*100<60) && (number *100>40))
              {
                return "red"
              }
              
              else if (number *100<=40)
              {
                return "Coral"
              }
              
          }          
                  
      

    
              

              
}
