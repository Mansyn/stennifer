import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhonePipe } from './phone.pipe'
import { ReversePipe } from './reverse.pipe'
import { TruncatePipe } from './truncate.pipe'
import { KeysPipe } from './keys.pipe'

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [PhonePipe, ReversePipe, TruncatePipe, KeysPipe],
    exports: [PhonePipe, ReversePipe, TruncatePipe, KeysPipe]
})
export class PipesModule { }
