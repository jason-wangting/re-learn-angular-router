import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
const appRoutes: Routes = [
  // 在定义path时，不能使用 /crisis-center 或者 ./crisis-center(定义成如此形式时，全局的router path是怎么样子的？)
  // 但是在定义导航时，可以使用
  { path: 'crisis-center', component: CrisisListComponent },
  { path: 'heroes', component: HeroListComponent},
  // path的值不能是 /heroes 或者 ./heroes, 只能是 heroes, 但是像redirectTo，它是实际的导航，
  // 可以使用[heroes, /heroes, ./heroes]中的任意一个，因为这3个都是指向当前路径下的heroes，也就是  当前路径/heroes
  // 但是，一般来说，习惯上还是使用 /heroes, 即可以与path的 heroes区分开来，又可以少写字符。
  { path: '', redirectTo: 'heroes', pathMatch: 'full'},
  // 路由器会使用先到先得的策略来选择路由。 由于通配符路由是最不具体的那个，因此务必确保它是路由配置中的最后一个路由。
  { path: '**', component: PageNotFoundComponent}
];


@NgModule({
  declarations: [],
  imports: [
    // 在angular识别到有模块导入RouterModule后，会把路由定义添加到全局的路由定义中，
    // 其实此时路由定义中已经有了该模块的路由定义，那么为什么还需要export RouterModule呢，
    // 这是因为forRoot方法符合的路由模块只是为了注册路由，
    // RouterModule中还有一些指令比如routerLink, routeroutlet都是在RouterModule本身中
    // 这里export出来是为了app.module.ts引入appRoutingModule后就不需要再次导入routerModule。
    // 可以在appRouting中不export RouterModule,在appModule中单独import RouterModule(这里不需要使用forRoot方法)也是可以的
    RouterModule.forRoot(
      appRoutes,
      {
        // 路由debug使用，可以打印出路由跳转的生命周期事件
        enableTracing: true
      }
    ),
  ],
  exports: [
    // routerLink routerOutlet这些指令是直接存放在RouterModule中，而不是在静态方法forRoot()返回的模块中，
    RouterModule
  ]
})
export class AppRoutingModule { }
