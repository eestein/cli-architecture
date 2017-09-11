import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import { SweetAlertOptions } from 'sweetalert2'

/**
 * Manages alerts sent to the user
 */
@Injectable()
export class AlertService {
    /**
     * Displays a warning alert
     * @param {string} message Message displayed to the user
     * @param {string} [title] Title of the message
     */
    showAlert(message: string, title?: string): void {
        var opt: SweetAlertOptions = {};

        opt.type = 'warning';
        opt.text = message;
        opt.title = title || 'Warning';

        swal(opt);
    }

    /**
     * Displays an information alert
     * @param {string} message Message displayed to the user
     * @param {string} [title] Title of the message
     */
    showInfo(message: string, title?: string): void {
        var opt: SweetAlertOptions = {};

        opt.type = 'info';
        opt.text = message;
        opt.title = title || 'Information';

        swal(opt);
    }

    /**
     * Displays an error alert
     * @param {string} message Message displayed to the user
     * @param {string} [title] Title of the message
     */
    showError(message: string, title?: string): void {
        var opt: SweetAlertOptions = {};

        opt.type = 'error';
        opt.text = message;
        opt.title = title || 'Error';

        swal(opt);
    }

    /**
     * Displays a success alert
     * @param {string} message Message displayed to the user
     * @param {string} [title] Title of the message
     * @param {any} [callback] Callback function executed after the user's clicked on the button
     */
    showSuccess(message: string, title?: string, callback?: any): void {
        var opt: SweetAlertOptions = {};

        opt.type = 'success';
        opt.text = message;
        opt.title = title || 'Success';

        swal(opt).then(function () { callback(); }).catch(e => { });
    }

    /**
     * Displays a message requesting the user's confirmation
     * @param {string} message Message displayed to the user
     * @param {string} [title] Title of the message
     * @param {any} [callback] Callback function executed after the user's clicked on confirm
     */
    showConfirm(message: string, title?: string, callback?: any): void {
        var opt: SweetAlertOptions = {};

        opt.type = 'warning';
        opt.text = message;
        opt.title = title || 'Confirm';
        opt.showCancelButton = true;
        opt.cancelButtonText = 'Cancel';
        opt.confirmButtonText = 'Yes';
        opt.allowEscapeKey = false;
        opt.allowOutsideClick = false;

        swal(opt).then(function () { callback(); }).catch(e => { });
    }
}
