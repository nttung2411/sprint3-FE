import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FoodService} from '../../services/food.service';
import {Food} from '../../models/Food';
import {FoodDTO} from '../../models/FoodDTO';
import {Rate} from '../../models/Rate';
import {RateService} from '../../services/rate.service';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit {
  private foodDTO: FoodDTO;
  constructor(private activatedRoute: ActivatedRoute,
              private foodService: FoodService,
              private rateService: RateService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.foodService.getFoodById(paramMap.get('id')).subscribe(data => this.foodDTO = data);
    });
  }


  onRate($event: {newValue: number}) {
    const pointVote = $event.newValue;
    const rate: Rate = {
      point: pointVote,
      food: this.foodDTO.food
    };
    this.rateService.savePoint(rate).subscribe();
    window.location.reload();
  }
}
