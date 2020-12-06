import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FIXO'
})
export class FIXOPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value.length === 10) {
      return value.replace(/(\d{2})(\d{4})(\d{4})/g, '(\$1)\$2-\$3');
    }
    return 'error';
  }

}
