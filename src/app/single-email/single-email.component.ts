import { Component, OnInit ,Injectable} from '@angular/core';
import {Email} from '../models/Email.models';
import { switchMap, debounceTime, catchError } from 'rxjs/operators';
import { ActivatedRoute,Router ,Params} from '@angular/router';
import { EmailService } from '../services/email.service';
import{LabelsService} from '../services/labels.service';
import {NavTreeComponent} from '../nav-tree/nav-tree.component'
import { ComposeEmailComponent } from '../compose-email/compose-email.component';
import { MatDialog, MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from '../services/toast.service';
import { ObjDictionary } from '../models/Dictionary.models';

export class Node {
  children: Node[];
  name:string;
  notif:number
}
@Component({
  selector: 'app-single-email',
  templateUrl: './single-email.component.html',
  styleUrls: ['./single-email.component.css']
})
@Injectable()

export class SingleEmailComponent implements OnInit {
  email:Email
  detail :Email;
  Showdetail:string[]=[];
  showme:boolean=false;
  hideme:boolean=true;
  value:string="Show Details";
  Folder:string[]=['Inbox','Sent','Draft','Trash']
  constructor(
    private EmailService : EmailService,
    private route:ActivatedRoute,
    private navTreeComponent:NavTreeComponent,
    private LabelsService:LabelsService,
    private ComposeEmailComponent:ComposeEmailComponent,
    private dialog:MatDialog, 
    private ToastService:ToastService,
    public _router: Router,
  ) { 
  }


  ngOnInit(): void {
          //get email
      
           this.getData();    
           
  }
  getData()
{
  this.route.data.subscribe((data: { email: Email }) => {
    this.email = data.email;
    this.getSubLabelP()
    this.getSubLabelI()
    this.email.seen=true;
   if(this.email.notif>0)
{

    this.navTreeComponent.getNode(1).subscribe(data1=>
      {
        if(data1.notif>0)//if notif >0 when opened notif -=1 
        {
         if(data1.children.find(FileNode => FileNode.name==this.email.category.dict["Product"][0].Prediction)
         && data1.children.find(FileNode => FileNode.notif > 0))
           {
            this.navTreeComponent.updateNotif1(1,1,this.email.category.dict["Product"][0].Prediction)
            this.email.notif-=1;

           }
        }
      })
      this.navTreeComponent.getNode(2).subscribe(data1=>
        {
          if(data1.notif>0)
          {
            //this.navTreeComponent.updatParentNotif(1,-1)
           if(data1.children.find(FileNode => FileNode.name==this.email.category.dict["Issue"][0].Prediction)
           && data1.children.find(FileNode => FileNode.notif > 0))
             {
              this.navTreeComponent.updateNotif1(2,1,this.email.category.dict["Issue"][0].Prediction)
              this.email.notif-=1;

             }
            

          }
        })
      this.EmailService.update(this.email)
    }
    else
    {
      this.EmailService.update(this.email)
    }
    });
 
}
getColor(number:number):string
{
  return this.EmailService.getColor(number)
}
SendTo(Email : Email,folder1:string,folder:string){//change folder
  
let oldFolder:string =folder1
  Email.folder=folder
  Email.lastUpdate=Date.now()
  Email.seen=false;

  this.EmailService.update(Email)

 /*this._router.navigate(['../../'], { relativeTo: this.route })
 .then(() => {
    window.location.reload();
  });*/
this.ToastService.openSnackBar("folder updated","close")

}


  showDetail()
  {
       this.route.data.subscribe((data: { email: Email }) => {
       this.detail = data.email;
       this.Showdetail.push(this.detail.sender);
       this.Showdetail.push(this.detail.To);
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


  NodeP:Node
  childP:Node[]
  getSubLabelP()
  {
    this.LabelsService.getNode(1).subscribe((data:Node)=>
    {
     this.NodeP=data
     this.childP=data.children as Node[]
    
    });

  }
  NodeI:Node
  childI:Node[]
  getSubLabelI()
  {
    this.LabelsService.getNode(2).subscribe((data:Node)=>
    {
     this.NodeI=data
     this.childI=data.children as Node[]
    
    })

  }

  SendToLabel(Email:Email,id:number,subLabel:string)//update label
  {
    
    if(id==1)
    {
      Email.category.dict["Product"][0].Prediction=subLabel
      Email.category.dict["Product"][0].Probability=null

      Email.seen=true
      Email.lastUpdate=Date.now()
      Email.seen=false;
      Email.notif+=1;
      this.EmailService.update(Email)
      this.navTreeComponent.updateNotif(1,1,subLabel)
    //  this._router.navigateByUrl(`emails/Product/${subLabel}`);
    //  location.reload(); 
   /* this._router.navigate(['../../'], { relativeTo: this.route })
    .then(() => {
    window.location.reload();
  });*/
    }
    else if(id==2)
    {
      Email.category.dict["Issue"][0].Prediction=subLabel
      Email.category.dict["Issue"][0].Probability=null

      Email.seen=true
      Email.lastUpdate=Date.now()
      Email.notif+=1;

      this.EmailService.update(Email)

     
     /* this.navTreeComponent.updateNotif(2,1,subLabel)
      this._router.navigate(['../../'], { relativeTo: this.route })
      .then(() => {
      window.location.reload();
    });*/

    }
    this.ToastService.openSnackBar("label updated","close")

}

  delete(Email:Email)
  {
    Email.lastUpdate=Date.now()
    Email.seen=false;
    
    Email.folder="Trash"
    this.EmailService.update(Email)
    this._router.navigate(['../../'], { relativeTo: this.route })
    .then(() => {
  //  window.location.reload();
  });
  }

  reply(email:Email)
  {
    
    this.route.data.subscribe((data: { email: Email }) => {
      let id:number
      let category:ObjDictionary=new ObjDictionary({});
         
      let date = Date.now();
      let lastUpdate=Date.now()
      //  console.log("email"+email)
    let email=new Email(id,"info@mentis.io","","",date,lastUpdate,0,false,data.email.sender,category,data.email.firstName,data.email.lastName,"")
  const dialogConfig= new MatDialogConfig();
  dialogConfig.disableClose= false;
  dialogConfig.autoFocus= true;
  this.dialog.open(ComposeEmailComponent ,{
   data: {
    email
   }
    });
  dialogConfig
    });
    
  }
  forward(email:Email)
  {
    this.route.data.subscribe((data: { email: Email }) => {
    let id:number
    let category:ObjDictionary=new ObjDictionary({});
       
    let date = Date.now();
    let lastUpdate=Date.now()

  let email=new Email(id,"info@mentis.io",data.email.object,data.email.content,date,lastUpdate,0,false,"",category,this.EmailService.PickRandom(this.EmailService.FirstName),this.EmailService.PickRandom(this.EmailService.LasttName),"")
  const dialogConfig= new MatDialogConfig();
  dialogConfig.disableClose= false;
  dialogConfig.autoFocus= true;
  this.dialog.open(ComposeEmailComponent ,{
   data: {
   
    email
   }
    });
  dialogConfig
  });
}


  Filter( Email:Email ,s:number)//send for reclassification
{
 let n=s;
 if(n==1)
 {
   n=0;
   Email.filter=n

  this.EmailService.update(Email)
  this.ToastService.openSnackBar("email sent to API","close")

 }
 
else if(n==0)
 {
  
  n=1;
  Email.filter=n;
  Email.category=null

  this.EmailService.update(Email)
  this.ToastService.openSnackBar("folder updated","close")

 }
 
}
getColorIcon(n:number):string
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

}
