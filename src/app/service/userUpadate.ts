export class UserUpdate{
    private id :any
    private username :any
    private password :any
    private email : any
    private role :any
    constructor(id ,username ,pass , email ,role ){
        this.id = id
        this.username = username
        this.password = pass
        this.email = email
        this.role = role
        
    }
}