import { Component } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  capturedPokemons: any[] = [];
  
  constructor(private sharedService: SharedService) {
    this.getCapturedPokemons();
  }
  
  getCapturedPokemons() {
    // Recupera a lista de todos os Pokémon capturados
    this.capturedPokemons = this.sharedService.getCapturedPokemons();
  }
}
