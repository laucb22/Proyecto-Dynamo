import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'preAchievement',
    })
    export class MyPreAchievementPipe implements PipeTransform {
        transform(
            value: any,
        ): string | null {
            if (value == -1){
                return '-'
            }
            return value 
        }
    }