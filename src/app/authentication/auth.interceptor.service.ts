import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs";


export class AuthInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log("Request is going");
        const modifiedRequest = req.clone({
            headers: req.headers.append("Authorization", "Bearer kiranKumar")
        });
        return next.handle(modifiedRequest).pipe(tap(event => {
            console.log(event);
            if(event.type === HttpEventType.Response){
                console.log("Response arrived, body data: ",event.body)
            }
        }));
    }
}