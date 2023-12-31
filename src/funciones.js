import Swal from 'sweetalert2';
import axios from 'axios';

export function mostrarAlerta(titulo, icono, foco = '') {
    if (foco!='') {
        document.getElementById(foco).focus();
    }

    Swal.fire({
        title: titulo,
        icon: icono,
        customClass: { confirmButton: 'btn btn-primary', popup: 'animated zoonIn' },
        buttonsStyling: false,
    });
}

export function confirmar(urlConSlash, id,titulo, mensaje,icono=null) {

    let url = urlConSlash + id;

    const swalWithBootstrapButton = Swal.mixin({
        customClass: { confirmButton: 'btn btn-success me-3', cancelButton: 'btn btn-danger' }
    });

    swalWithBootstrapButton.fire({
        title: titulo,
        text: mensaje,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '<i class="fa-solid fa-check"></i> Si, eliminar',
        cancelButtonText: '<i class="fa-solid fa-check"></i> Cancelar'
    }).then((res) => {
        if (res.isDismissed) {
            enviarSolicitud('DELETE', { id:id },url,'Eliminado con éxito');
        } else {
            mostrarAlerta('Operacion cancelada', 'info');
        }
    });

    Swal.fire({
        title: titulo,
        icon: icono,
        customClass: { confirmButton: 'btn btn-primary', popup: 'animated zoonIn' },
        buttonsStyling: false,
    });
}
export function enviarSolicitud(metodo,parametros,url,mensaje) {
    axios({ method:metodo, url:url, data:parametros }).then(function (res) {
        let estado = res.status;
        if (estado == 200 || estado==201) {
            mostrarAlerta(mensaje, 'success');
            window.setTimeout(function () {
                window.location.href = '/'
            }, 1500);
        } else {
            mostrarAlerta('No se pudo recuperar la respuesta', 'error');
        }
    }).catch(function (error) {
        mostrarAlerta('Error de servidor', 'error');
    });
}
