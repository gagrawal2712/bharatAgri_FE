import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../auth-service.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private authService: AuthService, private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(res => {
        if (res['auth_token']) {
          localStorage.setItem('sessionID', res['auth_token'])
          this.router.navigate(['/dashboard'])
        }
      },
      error =>{
        this._snackBar.open(error.error, '', {  
          duration: 2000, 
          panelClass: 'snackbar-error',
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      })
    }
  }

}
