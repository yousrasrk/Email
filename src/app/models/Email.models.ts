import {Dictionary,ObjDictionary} from'./Dictionary.models';
import {Label} from './Label.models'
import {Filter} from './Filter.models'
    import { from } from 'rxjs';
export class Email{
    constructor(
        public id:number,
      
        public sender:string,
        public object:string,
        public content:string,
        public To? : string,
        public category?:ObjDictionary,
        public firstName?:string,
        public lastName?:string,
        public folder?:string,
        public files?: string[],
         public filter?:Filter,
        //public category:string,
       // public percent:number,
       public Important?:number,
       public Starred?:number,

     
        public labelP?:Label,
        public labelI?:Label,
       
       
        
    ){}
    
   
}