import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule, Http, XHRBackend, ConnectionBackend, RequestOptions } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './shell/header/header.component';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { I18nService } from './i18n.service';
import { MenuComponent } from './menu/menu.component';
import { UsernamePipe } from '../pipes/username.pipe';



@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    TranslateModule,
    NgbModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    ShellComponent,
    MenuComponent,
    UsernamePipe
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
    I18nService,
  ],
  exports: [
    UsernamePipe
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }

}
