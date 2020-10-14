import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Routes, RouterModule } from '@angular/router';
import { MatDialog, MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmailService } from '../services/email.service'
import{ FormBuilder,FormGroup,FormControl, RequiredValidator,ReactiveFormsModule} from "@angular/forms";
import { Email } from '../models/Email.models'
import{ComposeEmailComponent} from '../compose-email/compose-email.component'
import { ObjDictionary } from '../models/Dictionary.models';

interface navbar
{
  link:string,
  name:string,
  exact:boolean,
  icon:string
}

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
     map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private emailService:EmailService,
    private dialog:MatDialog, )
     {}

  //navbar 
  nav:navbar[]=[
       {
          link:'/folder/Inbox',
          name:'Inbox',
          exact:true,
          icon:'inbox_outline'
          
       },
       {
        link:'/folder/Sent',
        name:'Sent',
        exact:false,
        icon:'send_outline'
       },
       {
        link:'/folder/Draft',
        name:'Draft',
        exact:false,
        icon:'drafts'
       },
       {
        link:'/folder/Trash',
        name:'Trash',
        exact:false,
        icon:'delete_outline'
       },
     ];
   

     onCreate()//compose email
     {
       let id:number
       let category:ObjDictionary=new ObjDictionary({});
       
       let date = Date.now();
       let lastUpdate=Date.now()
       let email=new Email(id,"info@Mentis.io","","",date,lastUpdate,0,false,"",category,this.emailService.PickRandom(this.emailService.FirstName),this.emailService.PickRandom(this.emailService.LasttName),"",[],0)

       const dialogConfig= new MatDialogConfig();
       dialogConfig.disableClose= false;
       dialogConfig.autoFocus= true;
       this.dialog.open(ComposeEmailComponent ,{
        data: {
        email
        }
         });
        dialogConfig
         
     }
     

}
