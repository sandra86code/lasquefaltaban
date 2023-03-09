import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles: ['.breadcrumb-item { font-size: 1.2rem !important; }'] 
})
export class BreadcrumbComponent implements OnInit {

  constructor(private router : Router) { }

  public href: string = "";

  @Input() countryName: String = "a";
  
  ngOnInit(): void {
    let url = this.router.url;
    if(url=='/auth/register') {
      this.href = 'Registro'
    }else if(url=='/auth/login') {
      this.href = 'Login'
    }else if(url=='/play') {
      this.href = 'Jugar'
    }else if(url=='/faqs') {
      this.href = 'FAQS'
    }else if(url=='/about') {
      this.href = 'Sobre nosotros'
    }else if(url=='/country') {
      this.href = 'Situación de las mujeres en el mundo'
    }else if(url.includes('/country/')) {
      this.href = 'Situación de las mujeres en el mundo'
    }else if(url.includes('/user/update/')) {
      this.href = 'Editar datos de usuario'
    }else {
      this.href = 'Error'
    }
  }
  
}
