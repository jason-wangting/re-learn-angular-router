import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { HeroesModule } from './heroes/heroes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrisisCenterModule }      from './crisis-center/crisis-center.module';
import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { FormsModule } from '@angular/forms';
import { AdminModule }             from './admin/admin.module';
@NgModule({
  declarations: [
    AppComponent,

    PageNotFoundComponent,

    ComposeMessageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    // 在模块带有路由时，模块的导入顺序就非常重要了，
    // 因为angular默认从上到下加载模块，遇到使用了routerModule的forChild方法时就会把定义的路由加到全局的路由上，
    // 这样，写在后面的优先级更低，如果把AppRoutingModule放在前面加载，会造成**还有 '' 匹配符匹配大多数路由，这不是我们想要的。
    HeroesModule,
    CrisisCenterModule,
    AdminModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
