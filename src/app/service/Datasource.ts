export class DataSource {

    private  url :string;
    private user :string;
    private password : string;
    private platform :string;

    constructor(url , user ,password,platform){
        this.url = url;
        this.user = user;
        this.password = password;
        this.platform = platform;
    }
}