import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainerService } from '../services/trainer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( private trainerService : TrainerService, private router : Router, private route :ActivatedRoute ) { }

  ngOnInit(): void {
    this.email.setValue("manon@gmail.com");
    this.password.setValue("password");
  }

  email = new UntypedFormControl('', [Validators.required, Validators.email]);
  password = new UntypedFormControl('', [Validators.required]);

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Veuillez entrer votre Adresse email';
    }

    return this.email.hasError('email') ? 'Erreur : Adresse mail' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Veuillez entrer votre mot de passe' : '';
  }

  connect() : void {
    if(this.email.valid && this.password.valid) {
      this.trainerService.login(this.email.value, this.password.value).subscribe(res => {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
        this.goBack();
      });
      
    }
    else {
      this.email.markAsTouched();
      this.password.markAsTouched();
    }
  }

  goBack() : void {
    let source = this.route.snapshot.paramMap.get("source") 
    if(source != null) this.router.navigate([source]);
    else this.router.navigate(['pokemon']);
  }


}
