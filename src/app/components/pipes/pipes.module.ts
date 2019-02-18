import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhonePipe } from './phone.pipe'
import { ReversePipe } from './reverse.pipe'
import { TruncatePipe } from './truncate.pipe'

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [PhonePipe, ReversePipe, TruncatePipe],
    exports: [PhonePipe, ReversePipe, TruncatePipe]
})
export class PipesModule { }
