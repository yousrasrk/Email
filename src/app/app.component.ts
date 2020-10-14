import { Component } from '@angular/core';

import { ChangeDetectorRef ,AfterContentChecked} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( changeDetectorRef: ChangeDetectorRef,
     )
  {
    
}
  title = 'emailBox';
  ngOnInit()
  {}

}




