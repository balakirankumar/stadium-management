import { Component } from '@angular/core';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent {

  isLoading = true;

  toggleLoading() {
    this.isLoading = !this.isLoading;
  }

}
