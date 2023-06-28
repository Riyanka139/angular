import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('f') signupForm: NgForm;
  defaultQue = 'teacher';
  answer = '';
  genders = ['male', 'female', 'other'];
  user = {
    username: '',
    email:'',
    gender:'',
    answer: '',
    secret: ''
  }
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signupForm.setValue({
    //   userData:{
    //     username: suggestedName,
    //     email: ''
    //   },
    //   gender: 'female',
    //   secret: "pet",
    //   answer: ''
    // })
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName,
      },
    });
  }

  // onSubmit(form: NgForm){
  //   console.log(form);

  // }

  onSubmit() {
    console.log(this.signupForm);
    this.user.username = this.signupForm.value.userData.username,
    this.user.email = this.signupForm.value.userData.email,
    this.user.gender = this.signupForm.value.gender,
    this.user.answer = this.signupForm.value.answer,
    this.user.secret = this.signupForm.value.secret;

    this.submitted=true;

    this.signupForm.reset();
  }
}
