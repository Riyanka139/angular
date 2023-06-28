import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";

export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const modifyReq = req.clone({
      headers: req.headers.append("Auth", "xyz"),
    });
    return next.handle(modifyReq);
  }
}
