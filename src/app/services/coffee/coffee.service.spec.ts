import { TestBed } from '@angular/core/testing';
import { CoffeeService } from './coffee.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { mockCoffees } from '@mock-datas/coffee.mock';
import { HttpClient } from '@angular/common/http';

describe('CoffeeService', () => {
  let service: CoffeeService;
  let httpController: HttpTestingController;
  let coffeeUrl = `${environment.coffeeApiURL}?size=${environment.coffeeSize}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CoffeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getCoffees and return an array of coffees', () => {
    service.getCoffees().subscribe(
      (coffees) => {
        expect(coffees).toEqual(mockCoffees);
      });

      const req = httpController.expectOne({
        method: 'GET',
        url: coffeeUrl,
      });
    
      req.flush(mockCoffees);
  });
});
