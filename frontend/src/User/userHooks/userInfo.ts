export interface User{
    username:string|undefined,
    email:string|undefined,
    first_name:string|undefined,
    last_name:string|undefined,
    is_physician:boolean|undefined,
  }
  
export interface UserUpdate {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}
  export interface Physician{
    username: string|undefined,
    email:string|undefined,
    first_name:string|undefined,
    last_name:string|undefined,
    experience:number|undefined,
    profession:string|undefined,
    
  }