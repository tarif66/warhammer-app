import { Injectable } from '@angular/core';
import { Model } from './model';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {
  url = 'http://localhost:3000/models';

  constructor() { }

  async getAllModels() : Promise<Model[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getModelsById(id: Number): Promise<Model | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  submitApplication(degats: string) {
    console.log(degats);

  }
}
