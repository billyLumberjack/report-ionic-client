import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Topos_slides } from './topos_slides';
import { SharedReportsProvider } from '../../providers/shared/shared';

describe('Topos_slides', () => {
  let component: Topos_slides;
  let fixture: ComponentFixture<Topos_slides>;

  beforeEach(async () => {
    const sharedStub: Partial<SharedReportsProvider> = {
      toposImages: ['img1.jpg', 'img2.jpg', 'img3.jpg'],
      toposIndex: 1,
    };

    await TestBed.configureTestingModule({
      declarations: [Topos_slides],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: SharedReportsProvider, useValue: sharedStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(Topos_slides);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders swiper-container with keyboard navigation enabled', () => {
    const swiperEl: HTMLElement = fixture.nativeElement.querySelector('swiper-container');
    expect(swiperEl).toBeTruthy();
    expect(swiperEl.getAttribute('keyboard')).toBe('true');
  });

  it('slides to the initial index on ionViewDidEnter', fakeAsync(() => {
    const slideTo = jest.fn();
    component.swiperRef = { nativeElement: { swiper: { slideTo } } } as any;

    component.ionViewDidEnter();
    tick(0);

    expect(slideTo).toHaveBeenCalledWith(1, 0);
  }));
});
