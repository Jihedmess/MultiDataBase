export class DataSourceupdate {
    private id :any;
    private  url :string;
    private user :string;
    private password : string;
    private platform :string;

    constructor(id,url , user ,password,platform){
        this.id = id;
        this.url = url;
        this.user = user;
        this.password = password;
        this.platform = platform;
    }

   
}