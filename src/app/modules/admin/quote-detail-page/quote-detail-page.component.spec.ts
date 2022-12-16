import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteDetailPageComponent } from './quote-detail-page.component';

describe('QuoteDetailPageComponent', () => {
  let component: QuoteDetailPageComponent;
  let fixture: ComponentFixture<QuoteDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteDetailPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
