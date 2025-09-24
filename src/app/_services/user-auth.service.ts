import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  // private ROLES_KEY = 'roles';
  // private TOKEN_KEY = 'jwtToken';

  constructor() { }

  public setRoles(roles: []){
      console.log("Roles being set in localStorage:", roles);
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): any[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  }

    // Accept either array or single object/string
  // public setRoles(roles: any) {
  //   if (!roles) {
  //     localStorage.removeItem(this.ROLES_KEY);
  //     return;
  //   }
  //   const arr = Array.isArray(roles) ? roles : [roles];
  //   localStorage.setItem(this.ROLES_KEY, JSON.stringify(arr));
  // }

  // public getRoles(): any[] {
  //   const roles = localStorage.getItem(this.ROLES_KEY);
  //   if (!roles) return [];
  //   try {
  //     const parsed = JSON.parse(roles);
  //     return Array.isArray(parsed) ? parsed : [parsed];
  //   } catch (e) {
  //     console.error('Failed to parse roles from localStorage', e);
  //     return [];
  //   }
  // }

  public setToken(jwtToken: string){
    localStorage.setItem('jwtToken', jwtToken);
  }

  //   public setToken(jwtToken: string) {
  //   if (jwtToken) {
  //     localStorage.setItem(this.TOKEN_KEY, jwtToken);
  //   } else {
  //     localStorage.removeItem(this.TOKEN_KEY);
  //   }
  // }

  public getToken(): string | null{
    return localStorage.getItem('jwtToken');
     //return localStorage.getItem(this.TOKEN_KEY);
  }

  public clear(){
   localStorage.clear();
    // localStorage.removeItem(this.TOKEN_KEY);
    // localStorage.removeItem(this.ROLES_KEY);
  }

  public isLoggedIn(){
    return this.getRoles() && this.getToken();
    //return !!this.getToken();
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

// Support multiple role shapes (roleName, name, authority, string like 'Admin' or 'ROLE_ADMIN')
  // private normalizeRoleStrings(): string[] {
  //   return this.getRoles().map(r => {
  //     if (!r) return '';
  //     if (typeof r === 'string') return r;
  //     if (r.roleName) return r.roleName;
  //     if (r.name) return r.name;
  //     if (r.authority) return r.authority;
  //     return JSON.stringify(r);
  //   });
  // }

  // public isAdmin(): boolean {
  //   const roleStrings = this.normalizeRoleStrings();
  //   return roleStrings.some(rs => rs === 'Admin' || rs === 'ROLE_ADMIN' || rs === 'admin' || rs.toUpperCase().includes('ADMIN'));
  // }

  // public isUser(): boolean {
  //   const roleStrings = this.normalizeRoleStrings();
  //   return roleStrings.some(rs => rs === 'User' || rs === 'ROLE_USER' || rs.toUpperCase().includes('USER'));
  // }

  // public hasRole(role: string): boolean {
  //   if(!role) return false;
  //   const roleStrings = this.normalizeRoleStrings();
  //   return roleStrings.some(rs => rs === role || rs === `ROLE_${role}` || rs.toUpperCase() === role.toUpperCase());
  // }
}
