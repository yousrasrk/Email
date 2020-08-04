import { Component, OnInit,Input } from '@angular/core';
import { EmailService } from '../services/email.service';
import { ActivatedRoute,Router ,Params} from '@angular/router';
import {Email} from '../models/Email.models';
import { switchMap, debounceTime, catchError } from 'rxjs/operators';
import {ApiService} from '../api.service'
import { Dictionary,ObjDictionary } from '../models/Dictionary.models';
import {Label} from '../models/Label.models'
import {  throwError } from 'rxjs';
import { EmailComponent } from '../email/email.component';

import { MatDialog, MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {NewEmailComponent} from '../new-email/new-email.component';
import {NewEmail2Component} from '../new-email2/new-email2.component';

import{ FormBuilder,FormGroup,FormControl, RequiredValidator,ReactiveFormsModule} from "@angular/forms";
@Component({
  selector: 'app-single-email',
  templateUrl: './single-email.component.html',
  styleUrls: ['./single-email.component.css']
})
export class SingleEmailComponent implements OnInit {
 emails :any ;
content:string="hi";
category =new ObjDictionary({});
@Input()object:string="about smth";
files:string[]= ["smth1","smth2"];    
@Input()sender:string;
id:number= 1    
@Input()email:Email;
star:number=0;
id1: any;
  constructor(
    private emailService : EmailService,
    private route:ActivatedRoute,
    private router:Router,
    private apiservice :ApiService,
    private dialog:MatDialog,

  ) { }
  matDialogRef:MatDialogRef<EmailComponent>

   email1:Email;
   U :ObjDictionary=new ObjDictionary({});
   me:ObjDictionary=new ObjDictionary({});
   obj4:any
   onCreate1(Email :Email  )
{let s1:string; let s2:string;
  s2=Email.sender;
  s1=Email.To
  this.emailService.initializeFormGroup3(s1,s2);
  const dialogConfig= new MatDialogConfig();

  dialogConfig.disableClose= false;

  dialogConfig.autoFocus= true;
  /*dialogConfig.width= "50%";*/
/*  dialogConfig.position = {
    'top': '0',
    left: '0'
};*/
  this.dialog.open(NewEmail2Component,dialogConfig);
}
onCreate2(Email :Email )
{let s1:string; let s2:string;
  s2="";
  s1=Email.To
  this.emailService.initializeFormGroup2(s1,s2,Email);
  const dialogConfig= new MatDialogConfig();

  dialogConfig.disableClose= false;

  dialogConfig.autoFocus= true;
  /*dialogConfig.width= "50%";*/
/*  dialogConfig.position = {
    'top': '0',
    left: '0'
};*/
  this.dialog.open(NewEmail2Component,dialogConfig);
}
delete(Email:Email)
{
  Email.folder="Trash"
  this.emailService.update(Email)
}
SendTo(Email : Email,s:string){
  Email.folder=s
  console.log("update folder")
  console.log("Email")
  this.emailService.update1(Email)
}


SendToLabel(Email : Email,s:string)
{
  Email.category.dict['Product'][0].Prediction=s;
  this.emailService.update1(Email)

}
/*starred( Email:Email ,s:number)
{
let n=s;
 if(n==1)
 {
   n=0;
  
  this.emailService.update2(Email ,n)
 }
 
else if(n==0)
 {
  n=1;
  
  this.emailService.update2(Email ,n)
 }
 
}*/
getColor(n:number):string
{
 if(n==1)
 {
   return "#DAA520";
 }
 if(n==0)
 {
   return "black";
 }
}
  ngOnInit(): void {

   
   this.getOne();
  /* this.id1=this.route.snapshot.params['id'];
    console.log(this.id1);*/
    
   
  }
  getOne()
  {
    
    
    let obj4 :Email;

  this.route.params.pipe(
  switchMap((params: Params) => this.emailService.getOneEmail(+params['id']))
     
    )
    .subscribe((data:Email)=> 

      {
        
        this.email1 = data
        console.log("this.email11111111111111");
        console.log(data);
        
      }  
      
      );
  }
  
detail :Email;
s:string[]=[];
showme:boolean=false;
hideme:boolean=true;
value:string="Show Details";
  showDetail()
  {
    this.route.params.pipe(
      switchMap((params: Params) => this.emailService.getOneEmail(+params['id']))
     
    )
    .subscribe((data:Email)=> 

      {
        
       this.detail = data
       this.s.push(this.detail.sender);
       this.s.push(this.detail.To);

       this.showme=!this.showme;
       this.hideme=!this.hideme;
       if(this.showme)
       {
        this.value="Hide Details"
       }
       if(this.hideme)
       {
         this.value="Show Details"
       }
      });
 
    
  }
  
    //this.emailService.getAPIData().subscribe(data => this.emails=data['emails'] );


 /*  this.route.params.pipe(
      switchMap((params: Params) => this.emailService.getOneEmail(+params['id']))
    )
    .subscribe(data => this.email1 = data);
  console.log(this.email1);
  }*7
  
  /*getData()
  {
    this.emailService.getOneEmail(this.email).subscribe(res=>
     {
       console.log(res);
     } )
  }*/

  getOneEmail(id)
  {
    this.emailService.getOneEmail(id).subscribe((data)=>{
      console.log(data);
      this.email =data;
        })
  }
   
  /*
   this.route.params.pipe(
      switchMap((params: Params) => this.emailService.getOneEmail(+params['id']))
     
    )
    .subscribe((data:Email)=> 

      {
        
        this.email1 = data
        console.log("this.email11111111111111");
        console.log(data);

        //api 




  let E: Email[]=[]
        let c:Label[]
        let d:Label;
        this.apiservice.addComplaint1(   this.email1.content,(obj:ObjDictionary)=>
        { this.U=obj
          //   console.log(this.U.dict["Product"])
         // console.log(this.U.dict.Product[0].Prediction)
     let Y=new ObjDictionary({})
     
     Y=obj;
     
    
        let c:Label[]
         let g: Label[]
         let f: Label[]
         let e: Label[]
         let  keysApi:string[]
    
         console.log("obbbjjjj11111111111111")
         console.log(obj)
              c=  this.U.dict["Product"]
               console.log("c")
               console.log(c)

               // calcul max product
               let MaxP:Label
             MaxP=c[0];
             let resP :Label[]=[];
            
             for(var item1 in c)
             {
               if(c[item1].Probability > MaxP.Probability)
               {
                 MaxP=c[item1];
               }
             }
             console.log("Mas")
             console.log(MaxP);
             resP.push(MaxP);
             console.log("res;")
             console.log(resP);
             this.U.dict["Product"]=resP;
             console.log("this.U.dict[Product]111111")
             console.log( this.U.dict["Product"])



             //Issue 
             e=  this.U.dict["Issue"]
             console.log("e")
             console.log(e)
             let MaxI:Label
             MaxI=e[0];
             let resI :Label[]=[];
            
             for(var item2 in e)
             {
               if(e[item2].Probability > MaxI.Probability)
               {
                 MaxI=e[item2];
               }
             }
            console.log("Mas")
             console.log(MaxI);
             resI.push(MaxI);
             console.log("resI;")
             console.log(resI);
             this.U.dict["Issue"]=resI;
             console.log(" this.U.dict[Issue] 111111")
             console.log( this.U.dict["Issue"])
             console.log( "reeeeeeeeees111111")
             console.log(this.U)
        console.log("emaaaaaaaail item111111")
     //   this.emails[item].category.dict=this.U.dict
        console.log(  this.U.dict)
        console.log("emaaaaaaaail item Prooooooood 111111")
        this.email1.category=this.U
       console.log(this.email1)
       console.log("proooooooooooooood item Prooooooood 111111")
       this.email1.labelP=this.U.dict["Product"][0]
       console.log( this.email1.labelP)
      //  console.log(  this.emails[item].category.dict["Product"][0].Prediction)
        // this.emails[item].labelP= this.emails[item].category.dict["Product"][0]
        console.log("emaaaaaaaaaaaaaaail111111")
       console.log(this.email1)
       console.log("emaaaaaaaaaaaaaaail reeess 111111")
     console.log(this.email1)


        }
        );

      
      }  
      
      );
*/
}
