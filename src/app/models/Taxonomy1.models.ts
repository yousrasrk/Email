import{Label} from './Label.models';
import{tax} from './tax.model';

export class Taxonomy1 {
  
  public items: { [index: string]: Label[]} = {};
 
  public count: number = 0;
  constructor(){
     
  }
 
  public ContainsKey(key: string): boolean {
      return this.items.hasOwnProperty(key);
  }

  public Count(): number {
      return this.count;
  }

  public Add(key: string, value: Label[]) {
      if(!this.items.hasOwnProperty(key))
           this.count++;

      this.items[key] = value;
  }
/*
  public Remove(key: string): T {
      var val = this.items[key];
      delete this.items[key];
      this.count--;
      return val;
  }*/

  public Item(key: string): Label[] {
      return this.items[key];
  }

  public Keys(): string[] {
      var keySet: string[] = [];

      for (var prop in this.items) {
          if (this.items.hasOwnProperty(prop)) {
              keySet.push(prop);
          }
      }

      return keySet;
  }

 /* public Values(): Label[] {
      var values: Label[] = [];

      for (var prop in this.items) {
          if (this.items.hasOwnProperty(prop)) {
              values.push(this.items[prop]);
          }
      }

      return values;
  }    */
}