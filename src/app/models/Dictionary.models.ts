import{Label} from './Label.models';
//import{tax} from './tax.model';

export interface Dictionary{
  
 [key:string]:Label[];
}
export class ObjDictionary{
    public  dict: Dictionary;
    constructor(obj:any)
    {
        this.dict=obj as Dictionary;
    }
   public setDict(obj:any)
   {
       this.dict=obj as Dictionary;
   }
}