export class User {
    username: any
	email: any
	password :any
    role: Array<any>
    

    constructor(username ,   email, password , role){
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}