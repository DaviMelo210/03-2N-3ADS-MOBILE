import { Camera, CameraResultType } from '@capacitor/camera';
import { PokeAPIService } from '../services/poke-api.service';
import { PhotoService } from '../services/photo.service';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  areaBusca: any;
  pokemon: any;
  pokemonComparison: string = '';

  constructor(public photoService: PhotoService, public pokeAPIService: PokeAPIService, public sharedService: SharedService) {}

  ngOnInit() {
    this.areaBusca = this.sharedService.getAreaBusca();
    this.compararPokemon();
  }

  ionViewWillEnter() {
    this.buscarPokemonRival();
    this.getPokemonData();
  }

  compararPokemon() {
    if (this.pokemon && this.pokemonR) {
      if (parseInt(this.pokemonR.abilities) === parseInt(this.pokemon.abilities)) {
        this.pokemonComparison = `EMPATE`;
        this.pokemon.draw = this.pokemon.draw + 1;
      } else if (parseInt(this.pokemonR.abilities) > parseInt(this.pokemon.abilities)) {
        this.pokemonComparison = `GANHOU`;
        this.pokemon.loss = this.pokemon.loss + 1;
      } else {
        this.pokemonComparison = `PERDEU`;
        this.pokemon.win = this.pokemon.win + 1;
      }
      console.log(this.pokemon);
      console.log(this.pokemonR);
    } else {
      console.log('Nenhum Pokémon para comparar.');
    }

  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  getColor(result: string): string {
    switch (result) {
      case 'EMPATE':
        return 'yellow'; // Amarelo
      case 'PERDEU':
        return 'green'; // Verde
      case 'GANHOU':
        return 'red'; // Vermelho
      default:
        return 'black'; // Cor padrão (preto)
    }
  }

  pokemonR: any = {
    name: '',
    front_default: '',
    abilities: '',
    height: '',
    weight: ''
  }

  buscarPokemonRival() {
    this.pokeAPIService.getPokeAPIService()
      .subscribe((value) => {
        this.pokemonR.name = JSON.parse(JSON.stringify(value))['name'];
        this.pokemonR.front_default = JSON.parse(JSON.stringify(value))['sprites']['other']['dream_world']['front_default'];
        this.pokemonR.abilities = parseInt(JSON.parse(JSON.stringify(value))['abilities'].length);
        this.pokemonR.height = JSON.parse(JSON.stringify(value))['height'];
        this.pokemonR.weight = JSON.parse(JSON.stringify(value))['weight'];
        this.compararPokemon();
      });
  }

  getPokemonData() {
    // Recupere os dados do Pokémon do serviço compartilhado
    this.pokemon = this.sharedService.getPokemonData();
  }
}
