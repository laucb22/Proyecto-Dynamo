import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'datable',
    })
    export class MyDatablePipe implements PipeTransform {
        transform(
            value: any,
        ): string | null {
            if (value == "datable"){
                return 'yes'
            } else if (value == "not-datable"){
                return 'no'
            }
            return value 
        }
    }