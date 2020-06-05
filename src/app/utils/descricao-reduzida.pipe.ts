import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'descricaoReduzida',
})
export class DescricaoReduzida implements PipeTransform {
  transform(text: string, truncarEm: number, iniciarEm: number = 0): string {
    if (text.length > truncarEm) {
      return text.substr(iniciarEm, truncarEm) + '...';
    }

    return text;
  }
}
