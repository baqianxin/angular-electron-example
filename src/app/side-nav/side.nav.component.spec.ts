import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SideNavComponent } from './side.nav.component';
import { TranslateModule } from '@ngx-translate/core';
import { ElectronService } from '../core/services';

describe('SideNavComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SideNavComponent],
      providers: [ElectronService],
      imports: [RouterTestingModule, TranslateModule.forRoot()]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(SideNavComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
