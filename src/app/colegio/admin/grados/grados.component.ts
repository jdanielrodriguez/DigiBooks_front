import { Component, OnInit } from '@angular/core';
import { GradesService } from '../_services/grades.service';
import { NotificationsService } from 'angular2-notifications';

declare var $: any;

@Component({
  selector: 'app-grados',
  templateUrl: './grados.component.html',
  styleUrls: ['./grados.component.css']
})
export class GradosComponent implements OnInit {
  Table: any;
  selectedData: any;
  public rowsOnPage = 5;
  public search: any;

  public options = {
    position: ['bottom', 'right'],
    timeOut: 2000,
    lastOnBottom: false,
    animate: 'fromLeft',
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 200
  };
  constructor(
    private _service: NotificationsService,
    private mainService: GradesService
  ) { }

  ngOnInit() {

    this.cargarAll();
  }
  cargarAll() {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');
    this.mainService.getAll()
      .then(response => {
        this.Table = response;
        $('#editModal .close').click();
        $('#insertModal .close').click();
        $('#Loading').css('display', 'none');
      }).catch(error => {
        this.createError(error);
      });
  }
  cargarSingle(id: number) {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');
    this.mainService.getSingle(id)
      .then(response => {
        this.selectedData = response;
        $('#Loading').css('display', 'none');
      }).catch(error => {
        this.createError(error);
      });
  }
  update(formValue: any) {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');
    // console.log(data)
    this.mainService.update(formValue)
      .then(response => {
        this.cargarAll();
        this.create('Grado Actualizado exitosamente');
        $('#Loading').css('display', 'none');
      }).catch(error => {
        this.createError(error);
      });

  }
  delete(id: string) {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');
    this.mainService.delete(id)
      .then(response => {
        this.cargarAll();
        this.create('Grado Eliminado exitosamente');
        $('#Loading').css('display', 'none');
      }).catch(error => {
        this.createError(error);
      });

  }
  insert(formValue: any) {
    $('#Loading').css('display', 'block');
    $('#Loading').addClass('in');
    this.mainService.create(formValue)
      .then(response => {
        this.cargarAll();
        this.create('Grado Ingresado');
        $('#Loading').css('display', 'none');
        $('#insert-form')[0].reset();

      }).catch(error => {
        this.createError(error);
      });


  }

  create(success) {
    this._service.success('¡Éxito!', success);

  }
  createError(error) {
    this._service.error('¡Error!', error);

  }
}
