import { NgModule } from '@angular/core';
import { AlertDirective } from './extends/alert/alert';
import { LoadingDirective } from './extends/loading/loading';
import { PermissionDirective } from './utility/permission/permission';
import { LogDirective } from './utility/log/log';
import { NumberOnlyDirective } from './form-filter/number-only/number-only';
import { CharacterOnlyDirective } from './form-filter/character-only/character-only';
import { CalculateAgeDirective } from './utility/calculate-age/calculate-age';
import { NumberCharacterOnlyDirective } from './form-filter/number-character-only/number-character-only';
import { FullnamePopupDirective } from './utility/fullname-popup/fullname-popup';
import { CalculatorDirective } from './utility/calculator/calculator';
import { CalendarDirective } from './utility/calendar/calendar';
@NgModule({
    declarations: [
        AlertDirective,
        LoadingDirective,
        PermissionDirective,
        LogDirective,
        NumberOnlyDirective,
        CharacterOnlyDirective,
        CalculateAgeDirective,
        NumberCharacterOnlyDirective,
        FullnamePopupDirective,
        CalculatorDirective,
        CalendarDirective
    ],
    imports: [],
    exports: [
        AlertDirective,
        LoadingDirective,
        PermissionDirective,
        LogDirective,
        NumberOnlyDirective,
        CharacterOnlyDirective,
        CalculateAgeDirective,
        NumberCharacterOnlyDirective,
        FullnamePopupDirective,
        CalculatorDirective,
        CalendarDirective
    ],
    providers: [
        AlertDirective,
        LoadingDirective,
    ]
})
export class DirectivesModule {}
