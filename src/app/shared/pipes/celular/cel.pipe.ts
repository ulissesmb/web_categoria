import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'CEL'
})
export class CELPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (value.length === 11) {
      return value.replace(/(\d{2})(\d{5})(\d{4})/g, '(\$1) \$2-\$3');
    }
    return 'error';
  }

}
