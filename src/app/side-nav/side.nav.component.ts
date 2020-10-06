import { Component } from '@angular/core';
import { ElectronService } from '../core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../../environments/environment';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side.nav.component.html',
  styleUrls: ['./side.nav.component.scss'
]
})
export class SideNavComponent {
  constructor(
    public electronService: ElectronService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('zh-CN');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }
}