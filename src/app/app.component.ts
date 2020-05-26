import { Component } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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

  handle(event: any): void {
    console.log(event)
  }

  navHeader(event: any): void {
    const fs = require('fs')
    const root = fs.readdirSync('/')
    // 这会打印出磁盘根级别的所有文件
    // 同时包含'/'和'C:\'。
    console.log(root)
    //这样写在渲染进程中时行得通的，但是在主进程中是'未定义'
    const { remote } = require('electron')
    const { BrowserWindow,screen } = remote
    console.log(event,screen.getPrimaryDisplay().workAreaSize.width)
    require('electron').webFrame.setZoomFactor(1)
  }
}
