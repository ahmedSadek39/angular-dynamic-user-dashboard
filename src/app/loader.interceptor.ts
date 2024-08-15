// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject, Inject } from '@angular/core';
// import { LoaderService } from '@services/loader.service';
// import { catchError, finalize, tap, throwError } from 'rxjs';

// export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
//   const loaderService = inject(LoaderService);

//   loaderService.showLoaderLayer();
//   console.warn("Zxc")
//   return next(req).pipe(
//     catchError((err) => {
//       return throwError(() => new Error('Unauthorized Exception'));
//     }),
//     finalize(() => {
//       loaderService.hideLoaderLayer();
//     })
//   );
// };
