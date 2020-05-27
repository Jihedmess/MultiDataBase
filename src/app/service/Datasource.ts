export class DataSource {
    
    private  url :string;
    private user :string;
    private password : string;
    private name : string;
    private platform :string;

    constructor(url , user ,password,platform,name){
        this.url = url;
        this.user = user;
        this.password = password;
        this.platform = platform;
        this.name= name;
    }

   
}