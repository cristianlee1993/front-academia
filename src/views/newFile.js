import { mostrarAlerta, enviarSolicitud } from '../funciones';

export default (await import('vue')).defineComponent({
data() {
return {
nombre: null,
apellido: null,
foto: null,
url: 'http://academia-backend.test/api/v1/estudiantes',
cargando: false,
};
},

methods: {
registrar() {
event.preventDefault();
let miFoto = document.getElementById('fotoimg');
this.foto = miFoto.src;

if (this.nombre.trim() === '') {
mostrarAlerta('Ingrese un nombre', 'warning', 'nombre');
} else if (this.apellido.trim() === '') {
mostrarAlerta('Ingrese un nombre', 'warning', 'apellido');
} else {
let parametros = { nombre: this.nombre.trim(), apellido: this.apellido.trim(), foto: this.foto.trim() };
enviarSolicitud('POST', parametros, this.url, 'Estudiante Registrado correctamente');
}
},

previsualizarFoto(event) {
let reader = new FileReader();
reader.readAsDataURL(event.target.files[0]);
reader.onload = function () {
let miFoto = document.getElementById('fotoimg');
miFoto.src = reader.result;
this.foto = miFoto.src;
};
}
}
});
