export class Fonctionalite {
    
  
    private name :string;
    private desscription : string;
    private fileActivation :string;
    private filaDesactivation :string;
    private fileChek :string;
    private url :string;
    private file1_string :any
    private file2_string :any
    private file3_string :any

    constructor( name ,desscription,fileActivation,filaDesactivation,fileChek,url ,file1_string,file2_string,file3_string){
        
        this.name = name;
        this.desscription = desscription;
        this.fileActivation = fileActivation;
        this.filaDesactivation = filaDesactivation;
        this.fileChek = fileChek;
        this.url = url
        this.file1_string = file1_string
        this.file2_string = file2_string
        this.file3_string = file3_string
    }

   
}