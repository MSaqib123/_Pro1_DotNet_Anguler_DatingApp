import { User } from "./user";

export class UserParams{
    gender!:string;
    pageNumber = 1;
    pageSize = 5;    
    minAge = 18;
    maxAge = 100;
    orderBy = 'lastActive';

    constructor(user:User | null) {
        this.gender = user?.gender === "male" ? "male" : "female";
    }
    
}