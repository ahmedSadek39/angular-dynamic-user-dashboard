import { NgOptimizedImage } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserDetailsResponse } from '@models/app.model';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent {
  userId!: number;
  userDetails!: User;
  inProgress: boolean = false;
  msg: 'No Data Found' | 'Some Error Occurred' = 'No Data Found';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getUserId();
  }

  goBack(){
    this.router.navigate(['/users']);
  }

  private fetchUserDetails(): void {
    this.inProgress = true;
    this.userDetails = {} as User;
    this.userService.getUsersById(this.userId).subscribe(
      (res: UserDetailsResponse) => {
        this.userDetails = res.data;
        if (Object.keys(res.data).length == 0) this.msg = 'No Data Found';
      },
      (error: HttpErrorResponse) => {
        this.msg = 'Some Error Occurred';
      },
      () => {
        this.inProgress = false;
      }
    );
  }

  private getUserId(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.fetchUserDetails();
    });
  }
}
