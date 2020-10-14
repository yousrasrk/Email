import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmailFolderComponent} from './email-folder/email-folder.component';
import {EmailFolderResolve} from  './email-folder/email-folder-resolve';
import {SingleEmailComponent} from './single-email/single-email.component';
import { SingleEmailResolve } from './single-email/single-email-resolve';
import { NotFoundComponent } from './not-found/not-found.component';
import { RelcassifyComponent } from './relcassify/relcassify.component'
import { EmailLabelComponent } from './email-label/email-label.component'

const routes: Routes = [
  {
    //folders
    path: 'folder/:name',component:EmailFolderComponent,
    children: [

    {path: 'emails/:id',component:SingleEmailComponent,
   resolve: { email: SingleEmailResolve  }
    }],
      
   resolve: { emails: EmailFolderResolve  }
  },
    
  
  { path: 'Reclassify',component:RelcassifyComponent,
  children: [

    {path: 'emails/:id',component:SingleEmailComponent,
   resolve: { email: SingleEmailResolve  }
    }],
  },
 
  {path: 'emails/:label/:subLabel',component:EmailLabelComponent,children: [

    {path: 'emails/:id',component:SingleEmailComponent,
    resolve: { email: SingleEmailResolve  }
    }],},
    
  //resolve: { emails: EmailFolderResolve  },
  

  { path: '',   redirectTo: 'folder/Inbox', pathMatch: 'full' },
 
  { path: '**',   component:NotFoundComponent },


  ]
@NgModule({
  imports: [RouterModule.forRoot(routes/*,{enableTracing:true}*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
