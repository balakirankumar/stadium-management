import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { ErrorPageComponent } from "./components/error-page/error-page.component";
import { StadiumsComponent } from "./components/stadiums/stadiums.component";
import { ApprovalsComponent } from "./components/approvals/approvals.component";
import { BookingsComponent } from "./components/bookings/bookings.component";
import { HomeComponent } from "./components/home/home.component";
import { ManagersComponent } from "./components/managers/managers.component";
import { ViewStadiumComponent } from "./components/stadiums/view-stadium/view-stadium.component";
import { Authguard, LoginGuard } from "./authentication/service/auth.guard.service";
import { LoginComponent } from "./components/login/login.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { ViewMatchesComponent } from "./components/stadiums/view-matches/view-matches.component";
import { CreateStadiumComponent } from "./components/stadiums/create-stadium/create-stadium.component";
import { ScheduleMatchComponent } from "./components/schedule-match/schedule-match.component";
import { BookTicketsComponent } from "./components/book-tickets/book-tickets.component";
import { ViewMatchComponent } from "./components/stadiums/view-matches/view-match/view-match.component";



const appRoutes:Routes = [
    {
        path:"",
        redirectTo:'home',
        pathMatch:'full'
    },
    {
      path:"home",
      component:HomeComponent
    },
    {
        path:'stadiums',
        component:StadiumsComponent,
    },
    {
      path:'stadiums/create',
      component:CreateStadiumComponent,
      pathMatch:"full"
    },
    {
      path:'schedule/matches',
      component:ScheduleMatchComponent,
    },
    {
      path:'stadiums/:id',
      component:ViewStadiumComponent,
    },
    {
      path:'stadiums/:id/matches',
      component:ViewMatchesComponent,
    },
    {
      path:"approvals",
      component:ApprovalsComponent,
      canActivate:[Authguard]
    },
    {
      path:"managers",
      component:ManagersComponent,
      canActivate:[Authguard]
    },
    {
      path:"bookings",
      component:BookingsComponent
    },
    {
      path:"bookings/book/match/:id/tickets",
      component:BookTicketsComponent,
      canActivate:[LoginGuard]

    },
    {
      path:"stadium/:id/matches/:matchId",
      component:ViewMatchComponent
    },
    {
      path:"login",
      component:LoginComponent
    },
    {
      path:"signup",
      component:SignUpComponent
    },
    {
      path:"**",
      component:ErrorPageComponent,
      data:{
        'message':"Page you are trying to see is not present..."
      }
    }
    // {
    //     path:"recipes",
    //     loadChildren:() => import('./recipes/recipe.module').then(m => m.RecipeModule)
    // },
    // {
    //     path:"auth",
    //     loadChildren:()=> import("./auth/auth.module").then(m=>m.AuthModule)
    //     //component:AuthComponent
    // },
    // {
    //     path:"shopping-list",
    //     loadChildren:()=> import("./shopping-list/shopping-list.module").then(m=>m.ShoppingListModule)
    //     //component:AuthComponent
    // },
]

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules,initialNavigation:'enabledNonBlocking' })
    ],
    exports:[RouterModule]
})
export class AppRoutingModule {

}