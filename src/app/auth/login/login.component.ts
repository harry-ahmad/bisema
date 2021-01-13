import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router) { }

  loginForm = this.fb.group({
    email:['',[Validators.required]],
    password:['',[Validators.required]]
  });

  submit(){
    let user = this.loginForm.value;
    this.authService.login(user).subscribe((res)=>{
      localStorage.setItem("user",JSON.stringify(res));
      this.router.navigateByUrl("/catalog");
    })
  }

  ngOnInit(): void {
  }

}
