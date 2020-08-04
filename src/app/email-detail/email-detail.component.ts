import { Component, OnInit,Input } from '@angular/core';
import { EmailService } from '../services/email.service';
import { ActivatedRoute,Router ,Params} from '@angular/router';
import {Email} from '../models/Email.models';
import { switchMap, debounceTime, catchError } from 'rxjs/operators';
import {ApiService} from '../api.service'
import { Dictionary,ObjDictionary } from '../models/Dictionary.models';
import {Label} from '../models/Label.models'
import {  throwError } from 'rxjs';
@Component({
  selector: 'app-email-detail',
  templateUrl: './email-detail.component.html',
  styleUrls: ['./email-detail.component.css']
})
export class EmailDetailComponent implements OnInit {

 
    constructor(
      private emailService : EmailService,
      private route:ActivatedRoute,
      private router:Router,
      private apiservice :ApiService
    ) { }
     email1:Email;
     U :ObjDictionary=new ObjDictionary({});
     me:ObjDictionary=new ObjDictionary({});
     obj4:any

     @Input()id:number;
     @Input()sender:string;
     @Input()content:string;
     @Input()object:string;
     @Input()folder:string;
     @Input()To:string;
     @Input()category:ObjDictionary;

     @Input()SelectedItem:string[];
     

     
     @Input()firstName:string;
     @Input()lastName:string;

  //@Input()filter:Filter;

  @Input()email:Email;
     emails:Email[];
  ngOnInit(): void {
  //  this.getOne();
    /* this.id1=this.route.snapshot.params['id'];
      console.log(this.id1);*/
     
    }
   
    
    getId(event,id)
    {
      if(event.target.checked)
      {
         console.log(id+'checked');
         this.SelectedItem.push(id);
         
      }
      else{
        console.log(id+'inchecked');
        this.SelectedItem=this.SelectedItem.filter(m=>m!=id)
      }
      console.log("hol")
      console.log(this.SelectedItem)
    }

    getOne()
    {
      
      
      
  
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
  
       console.log("ggggggggggggggggggggggg")
   /* obj1=this.email1;
    cb(obj1);*/
   
          }
          );
  
        
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

}
