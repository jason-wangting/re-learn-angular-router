// TODO: Feature Componetized like CrisisCenter
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HeroService }  from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  selectedId: number;

  constructor(
    private service: HeroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.heroes$ = this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        // 这里在路由定义是heroes,并没有定义参数id，这里的参数id是可选参数，取不到是undefined
        this.selectedId = +params.get('id');
        return this.service.getHeroes();
      })
    );
  }
  public onHeroClick(id) {
    // 写成这样参数是必选参数，是参与路由匹配的，在定义路由是必须明确定义，比如hero/:id，
    // 在浏览器的表现形式是http://localhost:4200/hero/id
    this.router.navigate(['/hero', id]);
    // 写成{}的形式是可选参数，是不参与路由匹配的，在路由定义是不需要明确定义，
    // 在浏览器中的表现形式是http://localhost:4200/hero/id;id=13;foo=foo;
    this.router.navigate(['/hero', id, {id, foo: 'foo'}]);
    // 通常，对于必传的值（比如用于区分两个路由路径的）使用必备参数；当这个值是可选的、复杂的或多值的时，使用可选参数。
    // 和必要参数一样，路由器也支持通过可选参数导航。 在你定义完必要参数之后，再通过一个独立的对象来定义可选参数。
  }
}
