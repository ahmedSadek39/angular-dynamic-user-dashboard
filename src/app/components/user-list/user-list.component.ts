import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { UserService } from '@services/user.service';
import { Router } from '@angular/router';
import { User, UserResponse } from '@models/app.model';
import { LoaderComponent } from '@components/loader/loader.component';
import { NgOptimizedImage } from '@angular/common';
import { HighlightUserDirective } from '@directives/highlight-user.directive';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CardModule, PaginatorModule, LoaderComponent, HighlightUserDirective, NgOptimizedImage],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  users: User[] = [];
  filterdUsers: User[] = [];
  filterdUserId: number | null = null;
  totalUsers = 0;
  currentPage = 0;
  nRows: number = 0;
  nPages: number = 0;
  inProgress: boolean = false;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers(this.currentPage);
    this.trackUserId();
  }

  onPageChange(event: any): void {
    this.currentPage = event.page;
    this.loadUsers(this.currentPage + 1);
  }

  loadUsers(page: number): void {
    this.inProgress = true;
    this.userService.getUsers(page).subscribe(
      (data: UserResponse) => {
        this.users = data.data;
        this.totalUsers = data.total;
        this.nRows = data.per_page;
        this.nPages = data.total_pages;

        if (this.filterdUserId == null) {
          this.filterdUsers = data.data;
        } else {
          this.filterdUsersByUserId(this.filterdUserId);
        }
      },
      () => {},
      () => (this.inProgress = false)
    );
  }

  trackUserId() {
    this.userService.getUserId$.subscribe((userId: number | null) => {
      this.filterdUserId = userId;
      if (typeof this.filterdUserId === 'number') {
        this.filterdUsersByUserId(this.filterdUserId);
      } else {
        this.filterdUsers = this.users;
      }
    });
  }

  private filterdUsersByUserId(userId: number | null) {
    if (userId != null) {
      this.filterdUsers = this.users.filter((user) => user.id === userId);
    }
  }

  goToUserDetails(id: number) {
    this.router.navigate(['/user', id]);
  }
}
