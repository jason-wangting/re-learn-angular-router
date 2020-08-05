import { Component } from '@angular/core';
import { slideInAnimation } from './animations';
import { RouterOutlet, Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 're-learn-angular-router';
  constructor(private router: Router) {
    router.events.pipe(
      filter(e => e instanceof NavigationStart)
    ).subscribe(e => {
      // tslint:disable-next-line: no-string-literal
      console.log(e['url']);
    })
  }
  getAnimationData(outlet: RouterOutlet) {
    return outlet &&outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
