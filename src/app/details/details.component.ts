import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ModelsService } from '../models.service';
import { Model } from '../model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
          <li>Units available: {{model?.availableUnits}}</li>
          <li>Does this location have wifi: {{model?.wifi}}</li>
          <li>Does this location have laundry: {{model?.laundry}}</li>
        </ul>
      </section>

      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First name</label>
          <input id="first-name" type="text" formControlName="firstName">  

          <label for="last-name">Last name</label>
          <input id="last-name" type="text" formControlName="lastName">  

          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email">
          
          <button type="submit" class="primary">Apply now</button>
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
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor() {
    const modelId = Number(this.route.snapshot.params['id']);
    this.modelsService.getModelsById(modelId).then(model => {
      this.model = model;
    });
  }

  submitApplication() {
    this.modelsService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    )
  }
}
