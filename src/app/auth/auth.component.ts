import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponse, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error = null;
  @ViewChild(PlaceHolderDirective) alerHost: PlaceHolderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver:ComponentFactoryResolver
  ) {}

  switchLoginMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.isLoading = true;
    let authObs: Observable<AuthResponse>;

    if (this.isLoginMode) {
      authObs = this.authService.login(form.value.email, form.value.password);
    } else {
      authObs = this.authService.signup(form.value.email, form.value.password);
    }

    authObs.subscribe({
      next: (responseData) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        console.log(err);
        this.error = err;
        this.showErrorMsg(err);
        this.isLoading = false;
      },
    });

    // authSub.unsubscribe();

    form.reset();
  }

  private showErrorMsg(message: string) {
    const cmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
  //  const cmpFactory = this.viewContainerRef.createComponent(AlertComponent);
    const hostViewRef = this.alerHost.viewContainerRef;
    hostViewRef.clear();

    hostViewRef.createComponent(cmpFactory);
  }
}
