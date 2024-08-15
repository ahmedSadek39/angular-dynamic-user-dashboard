import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderService } from '@services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {

  loading$ = this.loaderService.loading$;
  constructor(private loaderService:LoaderService){}
}
