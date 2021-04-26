import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [
  ]
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: '',
    apellido: '',
    email: ''
  }

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises()
        .subscribe(paises =>{
          console.log(paises)
        });
  }

  guardar( forma:NgForm ){
    if(forma.invalid){
      // acticamos los touched del formulario para
      // mostrar los errores de validación
      Object.values( forma.controls ).forEach( control =>{
        control.markAsTouched();
      });

      return;
    }
    console.log(forma.value)
  }
}
