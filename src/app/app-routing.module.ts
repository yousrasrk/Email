import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainNavComponent} from './main-nav/main-nav.component';
import {EmailComponent} from './email/email.component';
import {SingleEmailComponent} from './single-email/single-email.component';
import {MailFolderComponent} from './mail-folder/mail-folder.component';
import {EmailDetailComponent} from './email-detail/email-detail.component';
import {NewEmailComponent} from './new-email/new-email.component';
import{SentDraftEmailComponent} from './sent-draft-email/sent-draft-email.component'
import {FolderResolverService} from './folder-resolver.service';
import { EmailService } from './services/email.service';
import { ActivatedRoute,Router ,Params} from '@angular/router';
import {Email} from './models/Email.models';
import { switchMap, debounceTime, catchError } from 'rxjs/operators';
import{DraftComponent} from './draft/draft.component'
import{TrashComponent} from './trash/trash.component'
import{SingleDraftComponent} from './single-draft/single-draft.component'
const routes: Routes = [
  
  {path: 'folder/:category',component:MailFolderComponent,
  },
  {path: 'emails/:category/:label',component:MailFolderComponent,children: [

    {path: 'folders/:id',component:SingleEmailComponent}]},
    
    { path: '',   redirectTo: 'Inbox', pathMatch: 'full' },

{path: 'Sent',component:SentDraftEmailComponent,children: [

  {path: 'emails/:id',component:SingleEmailComponent},
      ]},

{path: 'Draft',component:DraftComponent,children: [

{path: 'emails/:id',component:SingleDraftComponent}]},

{path: 'Trash',component:TrashComponent ,children: [

  {path: 'emails/:id',component:SingleEmailComponent},
      ]},  


{path: 'Inbox',component:EmailComponent,children: [

{path: 'emails/:id',component:SingleEmailComponent},
    ]},
  
   /* {path: 'Star',component:StarComponent,children: [

      {path: 'emails/:id',component:SingleEmailComponent},
      ]},

      {path: 'Important',component:TreeChecklistExampleComponent }*/

    /*  {path: 'Important',component:EmailComponent,children: [

        {path: 'emails/:id',component:SingleEmailComponent},
        ]},*/
];
//{path: 'emails/:id',component:SingleEmailComponent}
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
