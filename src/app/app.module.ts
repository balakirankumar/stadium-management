import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ComponentModule } from './components/component.module';
import { AppRoutingModule } from './app.routing.module';
import { StadiumService } from './components/stadiums/stadium.service';
import { AuthService } from './authentication/service/Auth.Service';
import { AuthGuard } from './authentication/service/auth.guard.service';
import { AuthInterceptorService } from './authentication/auth.interceptor.service';
import { CommonService } from './components/shared/service/common.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ComponentModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StadiumService,
    AuthService,
    AuthGuard,
    CommonService,
    {
      provide:HTTP_INTERCEPTORS, 
      useClass:AuthInterceptorService,
      multi:true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
