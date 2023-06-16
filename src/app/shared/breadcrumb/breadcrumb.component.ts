import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles: ['.breadcrumb-item { font-size: 1.2rem !important; } .active { color: #8d448b}'] 
})
export class BreadcrumbComponent implements OnInit {

  constructor(private router : Router) { }

  public href: string = "";

  @Input() countryName: String = "a";

  addOrUpdateName: String = "b";
  
  ngOnInit(): void {
    let url = this.router.url;
    
    if(url=='/auth/register') {
      this.href = 'Registro'
    }else if(url=='/login') {
      this.href = 'Login'
    }else if(url=='/ranking') {
      this.href = 'Ranking de jugador@s'
    }else if(url == '/game') {
      this.href = 'Jugar'
    }else if(url=='/about') {
      this.href = 'Sobre mí'
    }else if(url.includes('/user/update/')) {
      this.href = 'Editar datos de usuari@'
    }
    if(url == '/question') {
      this.href = 'Listado de preguntas'
    }else if(url.includes('/question/')) {
      this.href = 'Listado de preguntas'
    }
    if(url == '/question/add') {
      this.addOrUpdateName = 'Añadir pregunta'
    }else if(url.includes('/question/update')) {
      this.addOrUpdateName = 'Editar pregunta'
    }
    if(url == '/category') {
      this.href = 'Listado de categorías'
    }else if(url.includes('/category/')) {
      this.href = 'Listado de categorías'
    }
    if(url == '/category/add') {
      this.addOrUpdateName = 'Añadir categoría'
    }else if(url.includes('/category/update')) {
      this.addOrUpdateName = 'Editar categoría'
    }
    if(url == '/woman') {
      this.href = 'Listado de mujeres'
    }
    if(url.includes('/woman/')) {
      this.href = 'Listado de mujeres'
    }
    if(url == '/woman/add') {
      this.addOrUpdateName = 'Añadir mujer'
    }else if(url.includes('/woman/update')) {
      this.addOrUpdateName = 'Editar mujer'
    }
    if(url=='/country') {
      this.href = 'Situación de las mujeres en el mundo'
    }else if(url.includes('/country/')) {
      this.href = 'Situación de las mujeres en el mundo'
    }
    if(url.includes('/country/list')) {
      this.href = 'Listado de países'
    }
    if(url == '/country/list/add') {
      this.addOrUpdateName = 'Añadir país'
    }else if(url.includes('/country/list/update')) {
      this.addOrUpdateName = 'Editar país'
    }
    
    if(url == '/user') {
      this.href = 'Listado de usuari@s'
    }
    if(url == '/game/list') {
      this.href = 'Listado de partidas'
    }
    if(this.href=='') {
      this.href = 'Error'
    }
  }
  
  /**
   * Método que devuelve a la última página visitada en la aplicación
   */
  goBack() {
    window.history.back();
  }
}
