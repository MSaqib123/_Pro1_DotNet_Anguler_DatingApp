import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'assetsUrl'
})
export class AssetsUrlPipe implements PipeTransform {

  transform(path: string): string {
    return environment.assetsBasePath + '/' + path;
  }

}
