<template>
  <div class="row">
    <div class="col-lg-8 offset-lg-2">
      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>FOTO</th>
              <th>Nombre</th>
              <th>APELLIDO</th>
              <th>REGISTRO</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="table-group-divider" id="contenido">
            <tr v-if="this.cargando">
              <td colspan="6">
                <h3>Cargando..</h3>
              </td>
            </tr>
            <tr v-else v-for="est, i in this.estudiantes" :key="est.id">
              <td v-text="(i + 1)"></td>
              <td v-text="est.id"></td>
              <td>
                <img v-if="est.foto" style="width: 150px !important;" :src="est.foto" class="img-thumbnail" alt="">
                <img v-else height="30" src="https://cdn4.iconfinder.com/data/icons/sphere-1-4-icon-theme/128/folder-user.png" class="img-thumbnail" alt="">
              </td>
              <td v-text="est.nombre"></td>
              <td v-text="est.apellido"></td>
              <td v-text="est.created_at"></td>
              <td style="text-align: center;">
                <router-link class="btn btn-info" :to="{ path: 'view/' + est.id }">
                  <i class="fa-solid fa-eye"></i>
                </router-link>
                &nbsp;
                <router-link class="btn btn-info" :to="{ path: 'edit/' + est.id }">
                  <i class="fa-solid fa-edit"></i>
                </router-link>
                &nbsp;
                <button class="btn btn-danger" v-on:click="eliminar(est.id, est.nombre)">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { confirmar } from '../funciones'

export default {
  data() {
    return {
      estudiantes: null,
      cargando: false,

    }
  },

  mounted() {
    this.getEstudiantes();
  },

  methods: {
    getEstudiantes() {
      this.cargando = true;
      axios.get('http://academia-backend.test/api/v1/estudiantes').then(
        res => {
          this.estudiantes = res.data;
          this.cargando = false;
        }
      );
    },
    eliminar(id, nombre) {
      confirmar('http://academia-backend.test/api/v1/estudiantes/', id, 'Eliminar registro', 'Realmente desea eliminar a ' + nombre + '?')
      this.cargando = false;
    }
  }
}
</script>
