import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ModelsService } from '../models.service';
import { Model } from '../model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <article>
      <img class="listing-photo" [src]="model?.photo">
      <section  class="listing-description">
        <h2 class="listing-heading">{{model?.name}}</h2>
        <p class="listing-description">{{model?.city}}, {{model?.state}}</p>
      </section>

      <section class="listing-feature">
        <h2 class="listing-reading">About this model</h2>
        <ul>
          <li>Wounds: {{model?.life}}</li>
          <li *ngIf="remainingLife !== undefined">Remaining wounds: {{remainingLife}}</li>
        </ul>
      </section>

      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" >
          <label for="dégats">Dégats</label>
          <input id="dégats" type="text" formControlName="degats">            
          <button type="submit" class="primary" (click)="showRemainingLife()">Hit</button>
          <a [routerLink]="['']">Back</a>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  modelsService = inject(ModelsService);
  model: Model | undefined;
  remainingLife: number | undefined;

  applyForm = new FormGroup({
    degats: new FormControl(''),
  });

  constructor() {
    const modelId = Number(this.route.snapshot.params['id']);
    this.modelsService.getModelsById(modelId).then(model => {
      this.model = model;
    });
  }


  showRemainingLife() {
    const degatsStr = this.applyForm.get('degats')?.value ?? '';
    const degats = parseInt(degatsStr);

    if (!isNaN(degats) && degats >=0) {
      if (this.remainingLife !== undefined) {
        this.remainingLife -= degats;
      }else if(this.model?.life !== undefined) {
        this.remainingLife = this.model.life - degats;
      }
      console.log('Remaining life:', this.remainingLife);
      }
    else {
      console.log('Invalid degats inputs:');
    }
  }  

  calculateRemainingLife(hit:string): number | undefined {
    const pvs = parseInt(hit);
    const DEGATS = parseInt(this.applyForm.get('degats')?.value ?? '');

    if(this.model?.life !== undefined && !isNaN(DEGATS)) {
      return this.model.life - DEGATS;
    }
    return undefined;
  }  
}
