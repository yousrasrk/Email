
export interface Label{
   

   Prediction: string,
     Probability:number
  
}
export class Label{
    constructor(
      public  Prediction: string,
      public  Probability:number
    ){
      

    }

    setLabel(a:Label,b:Label)
    {
        a.Prediction=b.Prediction;
        b.Probability=b.Probability;
    }
}

