
export interface Filter{
   

    Starred: number,
    Important:number
   
 }
 export class Filter{
   
     constructor(
        public Starred: number,
    public Important:number
     ){
       
 
     }
 
     setFilter(a:Filter,b:Filter)
     {
         a.Starred=b.Starred;
         b.Important=b.Important;
     }
 }
 
 