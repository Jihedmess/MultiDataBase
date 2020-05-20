export class Request {
    
    private  url :string;
	private  Driver :string;
	private   user :string;
	private  password : string;

    constructor(url , user ,password,driver){
        this.url = url;
        this.user = user;
        this.password = password;
        this.Driver = driver;
    }

   
}