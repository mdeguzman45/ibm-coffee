import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoffeeDetailsComponent } from './coffee-details.component';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mockCoffee } from '@mock-datas/coffee.mock';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; 

export class MatDialogRefMock {
	close(value = '') { }
}

describe('CoffeeDetailsComponent', () => {
  let component: CoffeeDetailsComponent;
  let fixture: ComponentFixture<CoffeeDetailsComponent>;
  const mockDialogData = {
    item: mockCoffee
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoffeeDetailsComponent ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: mockDialogData
        },
        {
          provide: MatDialogRef,
          useClass: MatDialogRefMock
        },
        FormBuilder
      ],
      imports: [
        MatIconModule,
        MatDialogModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoffeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
