export class ActivateDesactivite {
     url :String;
	 username :String;
	 password :String;
	 driver :String;
     name :String;
     file :String;

    constructor(url,username,password,driver,name,file){
        this.url = url
        this.username = username
        this.password = password
        this.driver = driver
        this.name = name
        this.file =file

    }
}