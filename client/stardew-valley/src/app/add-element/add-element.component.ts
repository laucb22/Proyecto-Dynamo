import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.css']
})
export class AddElementComponent {
  constructor(private api: ApiService, private toastr: ToastrService){}

  fileContent:string = "";

  // Llama a la función para añadir gatos y le manda los campos del formulario.
  onSubmit(value: any){
    // Pedimos confirmación al usuario
    if(window.confirm('Are sure you want to add this cat?')){
      this.api.insertNpc(value).subscribe(
        (response) => {
          // Mostramos el pop up
          this.showSuccess();
          // Refrescamos la página
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          console.log('API Response:', response);
        },
        (error) => {
          console.error('API Error:', error);
        }
      );
    }
  }

  // Llama a la función para añadir gatos y le manda el JSON.
  onSubmitFile(){
    if(this.fileContent){
      try {
        // Parseamos el contenido del archivo para que se envíe correctamente
        const catData = JSON.parse(this.fileContent);
        if(catData){
          // Pedimos confirmación al usuario
          if(window.confirm('Are sure you want to add this cat?')){
            this.api.insertNpc(catData).subscribe(
              (response) => {
                // Llamamos al pop up
                this.showSuccess();
                // Refrescamos la página
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
                console.log('API Response:', response);
              },
              (error) => {
                console.error('API Error:', error);
              }
            );
          }
        } else {
          console.error('Not valid JSON file.');
        }
      } catch (error) {
        console.error('Couldn\'t analyze the JSON file: ', error);
        console.error('Not valid JSON file.');
      }
    }
  }

  // Muestra el contenido del JSON seleccionado por el usuario
  fileUploaded(event: any) {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      console.log(fileReader.result);
      this.fileContent = fileReader.result as string;
    };
    fileReader.readAsText(file);
  }

  // Pop up para mostrar un mensaje al usuario informándole de que la acción se ha realizado.
  showSuccess() {
    this.toastr.success('Cat(s) added!');
  }
}
