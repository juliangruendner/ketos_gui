import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { AboutModule } from './about/about.module';
import { LoginModule } from './login/login.module';
import { EnvironmentsModule } from './environments/environments.module';
import { CrawlersModule } from './crawlers/crawlers.module';
import { EnvironmentsService } from './services/environments.service';
import { AuthInterceptor } from './core/authentication/auth.interceptor';
import { LoginService } from './services/login.service';
import { ImagesService } from './services/images.service';
import { MomentModule } from 'angular2-moment';
import { CrawlersService } from './services/crawlers.service';
import { MLModelsService } from './services/mlmodel.service';
import { FeaturesModule } from './features/features.module';
import { FeaturesService } from './services/features.service';
import { FeatureSetsModule } from './feature-sets/feature-sets.module';
import { FeatureSetsService } from './services/featuresets.service';
import { MlmodelsModule } from './mlmodels/mlmodels.module';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { AdminUserListModule } from './admin-user-list/admin-user-list.module';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule.forRoot(),
    CoreModule,
    SharedModule,
    HomeModule,
    AboutModule,
    LoginModule,
    EnvironmentsModule,
    CrawlersModule,
    MomentModule,
    FeaturesModule,
    FeatureSetsModule,
    MlmodelsModule,
    AdminUserListModule,

    //must be after other modules, otherwise path is not detected
    AppRoutingModule,
  ],
  declarations: [AppComponent],
  providers: [
    EnvironmentsService,
    CrawlersService,
    LoginService,
    ImagesService,
    MLModelsService,
    FeaturesService,
    FeatureSetsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule { }
