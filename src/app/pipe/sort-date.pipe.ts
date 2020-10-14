import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortDate'
})
export class SortDatePipe implements PipeTransform {

  transform(value: string): string {

    if(value.length>=25)
    {
     
  var res = value.slice(0, 25);
  res=res+"..."
  value=res;
  console.log("value"+value)
      return value;
    }

 return value;
  }
}


