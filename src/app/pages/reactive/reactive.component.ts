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
    this.creaarListeners();
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
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }
  get correoNoValido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }
  get usuarioNoValido(){
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched
  }

  get distritoNoValido(){
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched
  }

  get ciudadNoValido(){
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched
  }

  get pass1NoValido(){
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched
  }

  get pass2NoValido(){
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;
    return (pass1 === pass2 ) ? false : true;
  }

  crearFormulario(){
    this.forma = this.fb.group({
      nombre  : ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3), this.validadores.noHerrera]],
      correo  : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],  
      usuario : ['', , this.validadores.existeUsuario],
      pass1   : ['',Validators.required],
      pass2   : ['',Validators.required],
      direccion:this.fb.group({
        distrito:['', [Validators.required, Validators.minLength(3)]],
        ciudad  :['', [Validators.required, Validators.minLength(3)]],
      }),      
      pasatiempos: this.fb.array([])
    },{
      validators: this.validadores.passwordsIguales('pass1','pass2')
    });
  }

  creaarListeners(){
    // this.forma.valueChanges.subscribe( valor=> {
    //   console.log(valor)
    // });
    // this.forma.statusChanges.subscribe(status=> console.log({status}));
    this.forma.get('nombre').valueChanges.subscribe(console.log)
  }

  cargarData(){
    //this.forma.setValue({      
      this.forma.reset({      
        nombre: "Daniel",
        apellido: "Garcia",
        correo: "dalokdaga@gmail.com",
        pass1: '123456',
        pass2: '123456',
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
