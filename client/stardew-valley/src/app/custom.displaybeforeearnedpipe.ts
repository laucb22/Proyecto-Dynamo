import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'displayBeforeEarned',
    })
    export class MyDisplayBeforeEarnedPipe implements PipeTransform {
        transform(
            value: any,
        ): string | null {
            if (value == true || value == 'true'){
                return 'yes'
            } else if (value == false || value == 'false'){
                return 'no'
            }
            return value 
        }
    }