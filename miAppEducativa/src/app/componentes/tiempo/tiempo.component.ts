import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TemperaturaService } from 'src/app/services/temperatura.service';
import { UtilService } from 'src/app/services/validations/util.service';

@Component({
  selector: 'app-tiempo',
  templateUrl: './tiempo.component.html',
  styleUrls: ['./tiempo.component.css']
})
export class TiempoComponent {

  formulario!: FormGroup;
  tiempo: any;
  name: any;
  temperatura: any;
  humedad:any;
  latitud:any;
  longitud: any;
  descripcion: any;
  showError: boolean = false;
  mensajeError: string = "";
  fecha = new Date();



  constructor(private fb: FormBuilder, private _util: UtilService,
              private _tiempo: TemperaturaService ){
    this.iniciaFormulario();
  }

  /**
   * metodo que inicia y crea un formulario
   */
  iniciaFormulario(){

    this.formulario = this.fb.group({
      ciudad: ['', [Validators.required, this._util.noSantiago, Validators.pattern('^[a-zA-Z ]*$')]],
      codigo: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]]
    })

  }

  consultar(){
    console.log("formulario: ", this.formulario);

    this._tiempo.getEstadoTiempo(this.formulario.get('ciudad')?.value, this.formulario.get('codigo')?.value)
          .subscribe( (respuesta: any) => {
            this.showError = false;
            this.tiempo = respuesta;
            this.name = this.tiempo.name;
            this.temperatura = this.tiempo.main.temp;
            this.humedad = this.tiempo.main.humidity;
            this.latitud = this.tiempo.coord.lat;
            this.longitud = this.tiempo.coord.lon;
            this.descripcion = this.tiempo.weather[0].description;
            console.log("respuesta: ", respuesta);
          },
          (error:any) =>{
            this.showError = true;
            this.mensajeError = "Error al consultar el estado del tiempo";
          })
  }

}
