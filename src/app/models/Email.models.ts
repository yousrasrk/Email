import {Dictionary,ObjDictionary} from'./Dictionary.models';
import {Label} from './Label.models'
import {Filter} from './Filter.models'
import {file} from './file.model'

    import { from } from 'rxjs';
export class Email{
    constructor(
        public id:number,
      
        public sender:string,
        public object:string,
        public content:string,
        public notif?:number,
        public date?:number,
        public lastUpdate?:number,
        public seen?:boolean,
        public To? : string,
        public category?:ObjDictionary,
        public firstName?:string,
        public lastName?:string,
        public folder?:string,
        public files?: string[],
        public filter?:number,
        public Important?:number,
        public Starred?:number,

     
     
       

        
       
        
    ){}
    
   
}