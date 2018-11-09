import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatUsersComponent } from './creat-users.component';

describe('CreatUsersComponent', () => {
  let component: CreatUsersComponent;
  let fixture: ComponentFixture<CreatUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
