import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  displayStyle: string= 'none';
  loginForm: boolean = false;
  errorMessage = '';
  successfullMessage = '';
  constructor(private authService: AuthService, private router: Router) { }
  options = [
    {key: 1, value:"Favorite Movie"},
    {key: 2, value:"Favorite Color"},
    {key: 3, value:"Favorite Food"},
    {key: 4, value:"Favorite Sport"},
    {key: 5, value:"Favorite animal"},
    {key: 6, value:"Your Nickname"},
    {key: 7, value:"Your first pet name"},
    {key: 8, value:"High school name"},
    {key: 9, value:"college name"}
  ]
  ngOnInit(): void {
  }
  closePopup(){
    this.successfullMessage = '';
    this.errorMessage = '';
    this.displayStyle = 'none';
  }

  onLoginClick(){
    this.displayStyle = 'block';
    this.loginForm = true;
  }

  onSignUpClick(){
    this.displayStyle = 'block';
    this.loginForm = false;
  }

  onLogin(form : NgForm){
    this.authService.login(form.value.email, form.value.password).subscribe((response) =>{
      this.closePopup();
      localStorage.setItem('currentuser', response.emailId);
      this.router.navigate(['tweetapp/','home']);
    }, error => {
      this.errorMessage = error;
    });
    form.reset();
  }

  onSignUp(form: NgForm){
    if(!form.valid){
      return;
    }
    const userDetail = new User(
      form.value.email, 
      form.value.dateOfBirth, 
      form.value.gender, 
      form.value.password, 
      form.value.confirmPassword, 
      form.value.firstName,
      form.value.lastName,
      +form.value.question,
      form.value.answer);
      this.authService.signUp(userDetail).subscribe((responseData) => {
        this.successfullMessage = 'Registration Successfull!';
        window.alert("Registered successfully!!!");
        this.router.navigate(['tweetapp/','home']);
        form.reset();
      },error => {
        this.errorMessage = error;
      });
  }

}
