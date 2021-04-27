import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styles: [
  ]
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder,
              private validadores: ValidadoresService) {
    this.crearFormulario();
    this.cargarData();
  }

  ngOnInit(): void {
    
  }
  

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
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
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched
  }

  crearFormulario(){
    this.forma = this.fb.group({
      nombre  : ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3), this.validadores.noHerrera]],
      correo  : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],  
      direccion:this.fb.group({
        distrito:['', [Validators.required, Validators.minLength(3)]],
        ciudad  :['', [Validators.required, Validators.minLength(3)]],
      }),      
      pasatiempos: this.fb.array([])
    });
  }
  cargarData(){
    //this.forma.setValue({      
      this.forma.reset({      
        nombre: "Daniel",
        apellido: "Garcia",
        correo: "dalokdaga@gmail.com",
        direccion: {
          distrito: "villa rica",
          ciudad: "boca del rio"
        },
    });
    // cargamos informacion al arreglo pasatiempos
    ['comer','dormir'].forEach( valor => this.pasatiempos.push(this.fb.control(valor)));

  }

  agregarPasaTiempo(){
    this.pasatiempos.push(this.fb.control(''))
  }
  borrarPasaTiempo(i:number){
    this.pasatiempos.removeAt(i);
  }

  guardar( ){   
    console.log(this.forma.value)    
    // checamos si es invalido
    if(this.forma.invalid){
      // activamos los touched del formulario para
      // mostrar los errores de validación
      Object.values( this.forma.controls ).forEach( control =>{
        console.log('entro')
        console.log(control)
        if (control instanceof FormGroup){
          Object.values( control.controls ).forEach( control => control.markAsTouched())
        }else{
          control.markAsTouched();        
        }        
      });   
           
    }
    
    //this.forma.reset({
      
   // });
   
  }
}
