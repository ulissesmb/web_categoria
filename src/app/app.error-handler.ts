import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import { NotificationService } from "./shared/message/notification.service";


@Injectable()
export class AplicationErrorHandler extends ErrorHandler {
    
    constructor(private ns: NotificationService, private injector: Injector, private zone: NgZone) {
        super()
    }
    
    handleError(errorResponse: HttpErrorResponse | any) {
        if (errorResponse instanceof HttpErrorResponse) {
            const message = errorResponse.error.message
            // tem que usar o zone para poder enviar o notify.
            this.zone.run(() => {
                switch (errorResponse.status) {
                    case 401:
                        this.ns.notify(message || 'Não autorizado');
                        break;
                    case 403:
                        this.ns.notify(message || 'Não autorizado');
                        break;
                    case 404:
                            this.ns.notify(message || 'Recurso não encontrado. Verifique o console.');
                        break;
                }
            })
        }
        
        super.handleError(errorResponse)
    } 
}