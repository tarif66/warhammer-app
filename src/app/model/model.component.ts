import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Model } from '../model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-model',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="listing">
      <img class="listing-photo" [src]="model.photo" alt="Exterior photo of {{model.name}}">
      <h2 class="listing-heading">{{model.name}}</h2>
      <p class="listing-location">{{model.city}}, {{model.state}}</p>
      <a [routerLink]="['/details', model.id]">Learn More</a>
    </section>
  `,
  styleUrls: ['./model.component.css']
})
export class ModelComponent {
  @Input() model!:Model;

}
