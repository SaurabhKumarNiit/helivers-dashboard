import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unique',
  pure: false,
})
export class UniquePipe implements PipeTransform {
  transform(value: any[], property: string): any[] {
    if (!Array.isArray(value) || value.length === 0 || !property) {
      return value;
    }

    const uniqueValues = Array.from(new Set(value.map((item: any) => item[property])));
    return uniqueValues;
  }
}
