import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { UserDetailsResponse } from '@models/app.model';
import { UserService } from '@services/user.service';
import { debounceTime, distinctUntilChanged, filter, map, take } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  searchControl: FormControl = new FormControl();
  inUsersPage = false;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.setInUsersPage();
  }

  trackSearch() {
    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.userService.setUserId(value);
      });
  }

  private setInUsersPage() {
    this.router.events.subscribe((value) => {
      if (value instanceof NavigationEnd) {
        this.inUsersPage = this.router.url.toString() === '/users';
        if (this.inUsersPage) {
          this.trackSearch();
        }
      }
    });
  }
}
