export class Fonctionalite {
    
    private  id :any;
    private name :string;
    private desscription : string;
    private fileActivation :string;
    private filaDesactivation :string;
    private fileChek :string;

    constructor(id , name ,desscription,fileActivation,filaDesactivation,fileChek){
        this.id = id;
        this.name = name;
        this.desscription = desscription;
        this.fileActivation = fileActivation;
        this.filaDesactivation = filaDesactivation;
        this.fileChek = fileChek;
    }

   
}