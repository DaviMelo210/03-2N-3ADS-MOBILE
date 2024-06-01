import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public capturedPokemons: any[] = []; // Array de todos os pokémons capturados

  public areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: ''
  };

  public pokemon: any = {
    name: '',
    front_default: '',
    abilities: '',
    height: '',
    weight: '',
    wins: 0,
    draws: 0,
    losses: 0
  };

  constructor() { }

  setAreaBusca(value: any) {
    this.areaBusca = value;
  }

  getAreaBusca() {
    return this.areaBusca;
  }

  setPokemonData(data: any) {
    this.pokemon = data;
    // Adiciona o novo Pokémon capturado ao array
    this.capturedPokemons.push(data);
  }

  getPokemonData() {
    return this.pokemon;
  }

  // Retorna a lista de todos os Pokémon capturados
  getCapturedPokemons() {
    return this.capturedPokemons;
  }  
}
