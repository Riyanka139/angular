import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUserNames = ['Chris', 'max'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        this.forbidenNames.bind(this),
      ]),
      email: new FormControl(
        null,
        [Validators.required, Validators.email],
        this.forbiddenEmail
      ),
      gender: new FormControl('female'),
      hobbies: new FormArray([]),
    });

    // this.signupForm.valueChanges.subscribe((value) => console.log(value));
    // this.signupForm.statusChanges.subscribe((status) => console.log(status));

    // this.signupForm.setValue({
    //   username: 'Max',
    //   email: 'max@max.com',
    //   gender: 'male',
    //   hobbies: [],
    // });

    this.signupForm.patchValue({username: "Chris"})
  }

  onSubmit(): void {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControl() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  forbidenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return { forbidden: true };
    }
    return null;
  }

  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    return new Promise((resolve, reject) => {
      if (control.value === 'test@test.com') {
        resolve({ forbidden: true });
      } else {
        resolve(null);
      }
    });
  }
}
