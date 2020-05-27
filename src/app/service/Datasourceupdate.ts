export class DataSourceupdate {
    private id :any;
    private  url :string;
    private user :string;
    private password : string;
    private platform :string;
    private name :string;


    constructor(id,url , user ,password,platform,name){
        this.id = id;
        this.url = url;
        this.user = user;
        this.password = password;
        this.platform = platform;
        this.name = name
    }

   
}