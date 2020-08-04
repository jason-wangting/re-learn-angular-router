import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { HeroService }  from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero$: Observable<Hero>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: HeroService
  ) {}


  ngOnInit() {
    // 这里使用observable的原因是在组件存在的生命周期里，route的参数可能发生变化
    // 比如在application页面，可以切换application，这时，只是改变路由的参数application id的值，angular为了性能考虑
    // 默认情况下是复用之前的组件，只是修改了参数，这时组件不会被重新加载，ngOnint也不会被调用，所以要想取得这些路由参数，使用observable订阅比较合适
    this.hero$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getHero(params.get('id')))
    );
  }

  gotoHeroes(hero: Hero) {
    let heroId = hero ? hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/superheroes', { id: heroId, foo: 'foo' }]);
  }
}
