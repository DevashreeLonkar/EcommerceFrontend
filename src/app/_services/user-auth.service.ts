import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles: []){
      console.log("Roles being set in localStorage:", roles);
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): any[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  }

  public setToken(jwtToken: string){
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string | null{
    return localStorage.getItem('jwtToken');
     //return localStorage.getItem(this.TOKEN_KEY);
  }

  public clear(){
   localStorage.clear();
  }

  public isLoggedIn(){
    return this.getRoles() && this.getToken();
  }

  public isAdmin(){
    const roles: any[]= this.getRoles();
    return roles[0].roleName === 'Admin';
  }

   public isUser(){
    const roles: any[]= this.getRoles();
    return roles[0].roleName === 'User';
  }

  public hasRole(role: string): boolean {
  return this.getRoles().some(r => r?.roleName === role);
}

}
