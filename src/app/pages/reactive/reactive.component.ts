import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styles: [
  ]
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder) {
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }
  get apellidoNoValido(){
    return this.forma.get('apellido').invalid && this.forma.get('nombre').touched
  }
  get correoNoValido(){
    return this.forma.get('correo').invalid && this.forma.get('nombre').touched
  }
  get distritoNoValido(){
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched
  }

  get ciudadNoValido(){
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched
  }

  crearFormulario(){
    this.forma = this.fb.group({
      nombre  : ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      correo  : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],  
      direccion:this.fb.group({
        distrito:['', [Validators.required, Validators.minLength(3)]],
        ciudad  :['', [Validators.required, Validators.minLength(3)]],
      })
    });
  }

  guardar( ){
    if(this.forma.invalid){
      // activamos los touched del formulario para
      // mostrar los errores de validación
      Object.values( this.forma.controls ).forEach( control =>{
        console.log(control)
        control.markAsTouched();
      });

      return;
    }
   console.log(this.forma.value)
  }
}
