<template>
  <div class="row mt-3"></div>
  <div class="col-md-6 offset-md-3">
    <div class="card">
      <div class="card-header bg-dark text-white text-center">
        Registrar estudiantes
      </div>
      <div class="card-body">
        <form v-on:submit="registrar">
          <div class="d-grid col-6 mx-auto mb-3">
            <img v-if="this.foto" height="50" :src="this.foto" id="fotoimg" class="img-thumbnail" alt="">
            <img v-else height="50"
              src="https://cdn4.iconfinder.com/data/icons/sphere-1-4-icon-theme/280/folder-user.png" id="fotoimg"
              class="img-thumbnail" alt="">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
            <input type="text" v-model="nombre" id="nombre" placeholder="Ingrese su nombre" required maxlength="60"
              class="form-control">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
            <input type="text" v-model="apellido" id="apellido" placeholder="Ingrese su apellido" required maxlength="60"
              class="form-control">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text"><i class="fa-solid fa-image"></i></span>
            <input v-on:change="previsualizarFoto" type="file" accept="image/png, image/jpeg" class="form-control">
          </div>
          <div class="d-grid col-6 mx-auto mb-3">
            <button class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i>Registrar</button>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>
  
<script>

import { mostrarAlerta, enviarSolicitud } from '../funciones'

export default {
  data() {
    return {
      nombre: null,
      apellido: null,
      foto: null,
      url: 'http://academia-backend.test/api/v1/estudiantes',
      cargando: false,
    }
  },

  methods: {
    registrar(event) {
      event.preventDefault();
      let miFoto = document.getElementById('fotoimg');
      this.foto = miFoto.src;

      if (this.nombre.trim() === '') {
        mostrarAlerta('Ingrese un nombre', 'warning', 'nombre');
      } else if (this.apellido.trim() === '') {
        mostrarAlerta('Ingrese un nombre', 'warning', 'apellido');
      }else{
        let parametros = {nombre:this.nombre.trim(),apellido:this.apellido.trim(),foto:this.foto.trim()}
        enviarSolicitud('POST',parametros,this.url,'Estudiante registrado correctamente')
      }
    },

    previsualizarFoto(event) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function () {
        let miFoto = document.getElementById('fotoimg');
        miFoto.src = reader.result;
        this.foto = miFoto.src;
      }
    }
  }
}
</script>