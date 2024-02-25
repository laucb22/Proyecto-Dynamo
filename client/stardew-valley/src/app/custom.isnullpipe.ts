import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'isNull',
    })
    export class MyIsNullPipe implements PipeTransform {
        transform(
            value: any,
        ): string | null {
            if (value == null){
                return '-'
            }
            return value 
        }
    }