export class Fonctionalite {
    
  
    private name :string;
    private desscription : string;
    private fileActivation :string;
    private filaDesactivation :string;
    private fileChek :string;
    private url :string;

    constructor( name ,desscription,fileActivation,filaDesactivation,fileChek,url){
        
        this.name = name;
        this.desscription = desscription;
        this.fileActivation = fileActivation;
        this.filaDesactivation = filaDesactivation;
        this.fileChek = fileChek;
        this.url = url
    }

   
}