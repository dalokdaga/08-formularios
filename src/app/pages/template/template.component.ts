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
    nombre: 'Daniel',
    apellido: 'Garcia',
    email: 'gffg@gjj.com',
    pais:'COL',
    genero: 'M'
  }

  paises: any[] = [];
  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises()
        .subscribe(paises =>{
          this.paises = paises;

          this.paises.unshift({
            name: '[Seleccione Pais]',
            codigo: ''
          });

          //console.log(paises);
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
