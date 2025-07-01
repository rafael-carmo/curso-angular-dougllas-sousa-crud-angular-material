import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarExclusaoDialogComponent } from './confirmar-exclusao-dialog.component';

describe('ConfirmarExclusaoDialogComponent', () => {
  let component: ConfirmarExclusaoDialogComponent;
  let fixture: ComponentFixture<ConfirmarExclusaoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmarExclusaoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarExclusaoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
