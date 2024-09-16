import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelComponent } from '../model/model.component';
import { Model } from '../model';
import { ModelsService } from '../models.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ModelComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by army" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-model *ngFor="let model of filteredModelList" [model]="model">
      </app-model>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  modelList: Model[] = [];
  modelsService: ModelsService = inject(ModelsService);
  filteredModelList: Model[] = [];

  constructor() {
    this.modelsService.getAllModels().then((modelList: Model[]) => {
      this.modelList = modelList;
      this.filteredModelList = modelList;
    });
  }  

  filterResults(text: string) {
    if (!text) this.filteredModelList = this.modelList;

    this.filteredModelList = this.modelList.filter(
      model => model?.city.toLowerCase().includes(text.toLowerCase())
    );

  }
}
