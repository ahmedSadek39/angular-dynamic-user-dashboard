# Angular Dynamic User Dashboard

## Project Overview

This Angular project demonstrates advanced features of Angular (7+) by creating a dynamic and interactive user dashboard. It includes server-side rendering (SSR) for improved SEO and performance, as well as image optimization techniques to enhance user experience.

## Technologies Used

- **Angular 17**: Front-end framework for building dynamic web applications.
- **PrimeNG**: UI component library for Angular.
- **RxJS**: Reactive programming library for handling asynchronous operations and observables.
- **Typescript**: Language for writing Angular applications.
- **SCSS**: CSS preprocessor used for styling the application.
- **SSR**: Server-side rendering (SSR) to improve SEO and performance.
- **Image Optimization**: Techniques for reducing image sizes and improving load times.
- **Cache**: Techniques for reducing http requests.

## Project Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repo/angular-user-dashboard.git
   cd angular-user-dashboard
1. **Install Dependencies**

   ```bash
   npm install
1. **Run the Application**

   ```bash
   ng serve
## Features

- User List: Displays a paginated list of users with optimized images.
- User Details: Provides detailed information about a selected user.
- Search Functionality: Allows searching users by ID.
- Caching: Avoids redundant HTTP requests by caching responses.
- Loading Indicator: Shows a loader while data is being fetched.

## Components

**UserListComponent**
- Displays a paginated list of users.
- Each user card is clickable and navigates to the user's detailed view.
**UserDetailsComponent**
- Displays detailed information about a selected user.
- Includes a back button to return to the user list.
**LoaderComponent**
- Shows a loading spinner when data is being fetched.
**HeaderComponent**
- Contains a search input field for searching users by ID.

### Services

**CacheService**
  - Manages caching of API responses to optimize performance.
**LoaderService**
- Controls the display of the loading spinner.
**ToastService**
- Provides notifications for success, error, and warning messages.
**UserService**
- Handles data retrieval from the API and manages caching and error handling.


### Configuration

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimations(),
    MessageService,
  ],
};
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@directives/*": ["src/app/directives/*"],
      "@components/*": ["src/app/components/*"],
      "@models/*": ["src/app/models/*"],
      "@services/*": ["src/app/services/*"],
    }
  }
}
```

**License**
    This project is licensed under the MIT License.