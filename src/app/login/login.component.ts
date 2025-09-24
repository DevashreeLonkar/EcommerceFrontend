import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router 
  ) {}

  ngOnInit(): void {
  }

  login(loginForm: NgForm){
   this.userService.login(loginForm.value).subscribe(
    (response: any) =>{
      this.userAuthService.setRoles(response.user.role);
      this.userAuthService.setToken(response.jwtToken);

      const role= response.user.role[0].roleName;
      if(role === 'Admin'){
        this.router.navigate(['/admin']);
      } else{
        this.router.navigate(['/user']);
      }

    },
    (error) =>{
      console.log(error);
    }
   );
  }

//   login(loginForm: NgForm) {
//   this.userService.login(loginForm.value).subscribe(
//     (response: any) => {
//       // Try to extract roles from several possible locations
//       const roles = response?.user?.role || response?.user?.roles || response?.roles || [];
//       // Save roles and token using robust setter
//       this.userAuthService.setRoles(roles);
//       this.userAuthService.setToken(response?.jwtToken || response?.token);

//       if (this.userAuthService.isAdmin()) {
//         this.router.navigate(['/admin']);
//       } else if (this.userAuthService.isUser()) {
//         this.router.navigate(['/user']);
//       } else {
//         this.router.navigate(['/home']);
//       }
//     },
//     error => {
//       console.log(error);
//     }
//   );
// }

  registerUser(){
    this.router.navigate(['/register']);
  }
 }
