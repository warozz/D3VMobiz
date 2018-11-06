import { QrcodeModalComponent } from './qrcode-modal/qrcode-modal';
import { CalculateAgeDirective } from './../directives/utility/calculate-age/calculate-age';
import {PopupAppSubmitComponent} from './utility/popup-app-submit/popup-app-submit';
import { ULifeSaleoffer_10_10Component } from './universal-life/u-life-saleoffer-10-10/u-life-saleoffer-10-10';
import { ULifeSaleoffer_10_1Component } from './universal-life/u-life-saleoffer-10-1/u-life-saleoffer-10-1';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from './../pipes/pipes.module';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { HeaderComponent } from './layout/header/header';
import { FooterComponent } from './layout/footer/footer';
import { SignalComponent } from './layout/signal/signal';
import { DirectivesModule } from './../directives/directives.module';
import { PopupComponent } from './utility/popup/popup';
import { PopupNewUpdateComponent } from './utility/popup-new-update/popup-new-update';
import { CalculatorComponent, Calculator } from './utility/calculator/calculator';
import { TitlePageComponent } from './layout/title-page/title-page';
import { QuatationFormComponent } from './form/quatation-form/quatation-form';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './form/search/search';
import { ProvinceComponent } from './form/province/province';
import { RegionComponent } from './form/region/region';
import { HospitalTableComponent } from './table/hospital-table/hospital-table';
import { ProspectAddComponent } from './form/prospect-add/prospect-add';
import { ProspectSearchComponent } from './form/prospect-search/prospect-search';
import { MemberViewDataComponent } from './utility/member-view-data/member-view-data';
import { PrefixNameComponent } from './form/prefix-name/prefix-name';
import { SexComponent } from './form/sex/sex';
import { OccupationTypeComponent } from './form/occupation-type/occupation-type';
import { StepsComponent } from './utility/steps/steps';
import { StepComponent } from './utility/steps/step/step';
import { TabsComponent } from './utility/tabs/tabs';
import { TabComponent } from './utility/tabs/tab/tab';
import { RiderComponent } from './form/rider/rider';
import { DropdownComponent } from './utility/dropdown/dropdown';
import { DropdownOptionComponent } from './utility/dropdown/dropdown-option/dropdown-option';
import { SettingTableComponent } from './table/setting-table/setting-table';
import { AddressComponent } from './address/address';
import { SettingComponent } from './layout/setting/setting';
import { AutocompleteComponent } from './utility/autocomplete/autocomplete';
import { MyDatePickerModule } from 'mydatepicker';
import { Ng2AutoCompleteModule } from "ng2-auto-complete";
import { IncrementerComponent } from './utility/incrementer/incrementer';
import { CollapseGroupComponent } from './utility/collapse-group/collapse-group';
import { CollapseComponent } from './utility/collapse-group/collapse/collapse';
import { SelectOptionComponent } from './utility/select-option/select-option';
import { SignatureComponent } from './utility/signature/signature';
import { SignaturePadModule } from 'angular2-signaturepad';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ChartsModule } from 'ng2-charts';
import { DoughnutChartComponent } from './utility/doughnut-chart/doughnut-chart';
import { BarChartComponent } from './utility/bar-chart/bar-chart';
import { GoogleMapComponent } from './google-map/google-map';
import { TaxcalculatorComponent } from './utility/taxcalculator/taxcalculator';
import { SendEmailComponent } from './form/send-email/send-email';
import { ConditionSignatureComponent } from './utility/condition-signature/condition-signature';
import { QuatationSignatureFormComponent } from './form/quatation-signature-form/quatation-signature-form';
import { PopupPlanDetailComponent } from './utility/popup-plan-detail/popup-plan-detail';
import { QuatationPlanInfoComponent } from './quatation-plan/quatation-plan-info/quatation-plan-info';
import { QuatationPlanSummaryComponent } from './quatation-plan/quatation-plan-summary/quatation-plan-summary';
import { PopupOccupationComponent } from './utility/popup-occupation/popup-occupation';
import { PopupPlanRuleInternationalComponent } from './utility/popup-plan-rule-international/popup-plan-rule-international';
import { PopupSynchronizeComponent } from './utility/popup-synchronize/popup-synchronize';
import { ProgressBarComponent } from './utility/progress-bar/progress-bar';
import { PopupUnexpectedComponent } from './utility/popup-unexpected/popup-unexpected';
import { PopupTableComponent } from './utility/popup-table/popup-table';
import { CalendarComponent } from './utility/calendar/calendar';
import { QuatationAnnotationComponent } from './form/quatation-annotation/quatation-annotation';
import { PopupRiderComponent } from './utility/popup-rider/popup-rider';
import { AppFormComponent } from './app-form/app-form';
import { DataTableComponent } from './utility/data-table/data-table';
import { PopupFatcaComponent } from './utility/popup-fatca/popup-fatca';
import { FullnameComponent } from './utility/fullname/fullname';

import { PopupExampleBenefitComponent } from './utility/popup-example-benefit'

import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  } from '@angular/material';

import { CdkTableModule } from '@angular/cdk/table';
import { AppDetailModalComponent } from './app-detail-modal/app-detail-modal';
import { BasicVerifyAppModalComponent } from './basic-verify-app-modal/basic-verify-app-modal';
import { PopupProspectAddComponent } from './utility/popup-prospect-add/popup-prospect-add';
import { AttachFileEAppModalComponent } from './attach-file-e-app-modal/attach-file-e-app-modal';
import { AttachFileViewModalComponent } from './attach-file-view-modal/attach-file-view-modal';
import { UnitLinkPlanComponent } from './form/unit-link-plan/unit-link-plan';
import { PieChartComponent } from './utility/pie-chart/pie-chart';
import { Rider2Component } from './form/rider2/rider2';
import { WarningModalComponent } from './utility/warning-modal/warning-modal';
import { BtsummaryTableComponent } from './table/btsummary-table/btsummary-table';
import { TableApplicationComponent } from './table-application/table-application';
import { PopupLostConnectionComponent } from './utility/popup-lost-connection/popup-lost-connection';
import { CircleGraphComponent } from './utility/circle-graph/circle-graph';
import { PopupResetDataComponent } from './utility/popup-reset-data/popup-reset-data';
import { AllocationModalComponent } from './utility/popup-allocation/allocation-modal';
import { PopoverCalendarComponent } from './popover-calendar/popover-calendar';
import { PopoverComponent } from './popover/popover';
import { CalendarAgeComponent } from './utility/calendar-age/calendar-age';
import { AppInfoComponent } from './form/app-info/app-info';
import { PopupCalendarComponent } from './utility/popup-calendar/popup-calendar';
import { RiskprofileComponent } from './form/riskprofile/riskprofile';
import { AllocationComponent } from './form/allocation/allocation';
import { PopupAppUlinkComponent } from './utility/popup-app-ulink/popup-app-ulink';
import { AttachPhotoUlinkEAppComponent } from './utility/attach-photo-ulink-e-app/attach-photo-ulink-e-app';
import { SignatureUlinkEAppPage } from '../pages/app-form-e-app/signature-ulink-e-app/signature-ulink-e-app';
import { SignatureUlinkInvestmentInfoPage } from '../pages/app-form-e-app/signature-ulink-investment-info/signature-ulink-investment-info';
import { SignatureUlinkLifepremiumPage } from '../pages/app-form-e-app/signature-ulink-lifepremium/signature-ulink-lifepremium';
import { SignatureUlinkAcceptriskPage } from '../pages/app-form-e-app/signature-ulink-acceptrisk/signature-ulink-acceptrisk';



@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        SignalComponent,
        PopupComponent,
        PopupNewUpdateComponent,
        CalculatorComponent,
        Calculator,
        TitlePageComponent,
        SearchComponent,
        QuatationFormComponent,
        ProvinceComponent,
        RegionComponent,
        HospitalTableComponent,
        ProspectAddComponent,
        ProspectSearchComponent,
        MemberViewDataComponent,
        PrefixNameComponent,
        SexComponent,
        OccupationTypeComponent,
        StepsComponent,
        StepComponent,
        TabsComponent,
        TabComponent,
        RiderComponent,
        DropdownComponent,
        DropdownOptionComponent,
        SettingTableComponent,
        AddressComponent,
        SettingComponent,
        AutocompleteComponent,
        IncrementerComponent,
        CollapseGroupComponent,
        CollapseComponent,
        SelectOptionComponent,
        SignatureComponent,
        DoughnutChartComponent,
        BarChartComponent,
        GoogleMapComponent,
        TaxcalculatorComponent,
        PopupPlanDetailComponent,
        PopupProspectAddComponent,
        SendEmailComponent,
        ConditionSignatureComponent,
        QuatationSignatureFormComponent,
        QuatationPlanInfoComponent,
        QuatationPlanSummaryComponent,
        PopupOccupationComponent,
        PopupPlanRuleInternationalComponent,
        PopupSynchronizeComponent,
        ProgressBarComponent,
        PopupUnexpectedComponent,
        PopupTableComponent,
        CalendarComponent,
        QuatationAnnotationComponent,
        PopupRiderComponent,
        AppFormComponent,
        DataTableComponent,
        PopupFatcaComponent,
        AppDetailModalComponent,
        BasicVerifyAppModalComponent,
        AttachFileEAppModalComponent,
        AttachFileViewModalComponent,
        PopupRiderComponent,
        UnitLinkPlanComponent,
        PieChartComponent,
        Rider2Component,
        WarningModalComponent,
        BtsummaryTableComponent,
        ULifeSaleoffer_10_1Component,
        ULifeSaleoffer_10_10Component,
        DataTableComponent,
        TableApplicationComponent,
        PopupLostConnectionComponent,
        CircleGraphComponent,
        PopupResetDataComponent,
        PopupLostConnectionComponent,
        AllocationModalComponent,
        PopupAppSubmitComponent,
        PopoverCalendarComponent,
        FullnameComponent,
        PopoverComponent,
        CalendarAgeComponent,
        PopupExampleBenefitComponent,
        AppInfoComponent,
        PopupCalendarComponent,
        RiskprofileComponent,
        AllocationComponent,
        PopupAppUlinkComponent,
        AttachPhotoUlinkEAppComponent,
        QrcodeModalComponent,
        SignatureUlinkEAppPage,
        SignatureUlinkInvestmentInfoPage,
        SignatureUlinkLifepremiumPage,
        SignatureUlinkAcceptriskPage
    ],
    imports: [
        CommonModule,
        DirectivesModule,
        PipesModule,
        FormsModule,
        IonicModule,
        MyDatePickerModule,
        Ng2AutoCompleteModule,
        SignaturePadModule,
        ChartsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        CdkTableModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SignalComponent,
        PopupComponent,
        PopupNewUpdateComponent,
        CalculatorComponent,
        Calculator,
        TitlePageComponent,
        SearchComponent,
        QuatationFormComponent,
        ProvinceComponent,
        RegionComponent,
        HospitalTableComponent,
        ProspectAddComponent,
        ProspectSearchComponent,
        MemberViewDataComponent,
        ProspectSearchComponent,
        PrefixNameComponent,
        SexComponent,
        OccupationTypeComponent,
        StepsComponent,
        StepComponent,
        TabsComponent,
        TabComponent,
        RiderComponent,
        DropdownComponent,
        DropdownOptionComponent,
        SettingTableComponent,
        AddressComponent,
        SettingComponent,
        AutocompleteComponent,
        IncrementerComponent,
        CollapseGroupComponent,
        CollapseComponent,
        SelectOptionComponent,
        AttachFileEAppModalComponent,
        AttachFileViewModalComponent,
        SignatureComponent,
        DoughnutChartComponent,
        BarChartComponent,
        GoogleMapComponent,
        TaxcalculatorComponent,
        PopupPlanDetailComponent,
        PopupProspectAddComponent,
        SendEmailComponent,
        ConditionSignatureComponent,
        QuatationSignatureFormComponent,
        QuatationPlanInfoComponent,
        QuatationPlanSummaryComponent,
        PopupOccupationComponent,
        PopupPlanRuleInternationalComponent,
        PopupSynchronizeComponent,
        ProgressBarComponent,
        PopupUnexpectedComponent,
        PopupTableComponent,
        CalendarComponent,
        QuatationAnnotationComponent,
        PopupRiderComponent,
        AppFormComponent,
        DataTableComponent,
        CdkTableModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        PopupFatcaComponent,
        AppDetailModalComponent,
        BasicVerifyAppModalComponent,
        PopupRiderComponent,
        UnitLinkPlanComponent,
        PieChartComponent,
        Rider2Component,
        WarningModalComponent,
        BtsummaryTableComponent,
        ULifeSaleoffer_10_1Component,
        ULifeSaleoffer_10_10Component,
        DataTableComponent,
        TableApplicationComponent,
        PopupLostConnectionComponent,
        CircleGraphComponent,
        PopupResetDataComponent,
        PopupLostConnectionComponent,
        AllocationModalComponent,
        PopupAppSubmitComponent,
        PopoverCalendarComponent,
        FullnameComponent,
        PopoverComponent,
        CalendarAgeComponent,
        PopupExampleBenefitComponent,
        AppInfoComponent,
        PopupCalendarComponent,
        RiskprofileComponent,
        AllocationComponent,
        PopupAppUlinkComponent,
        AttachPhotoUlinkEAppComponent,
        QrcodeModalComponent
    ],
    entryComponents: [
        PopupComponent,
        PopupNewUpdateComponent,
        CalculatorComponent,
        MemberViewDataComponent,
        SignatureComponent,
        GoogleMapComponent,
        MemberViewDataComponent,
        TaxcalculatorComponent,
        PopupPlanDetailComponent,
        AttachFileEAppModalComponent,
        AttachFileViewModalComponent,
        PopupProspectAddComponent,
        SendEmailComponent,
        ConditionSignatureComponent,
        QuatationSignatureFormComponent,
        PopupOccupationComponent,
        PopupPlanRuleInternationalComponent,
        PopupSynchronizeComponent,
        PopupUnexpectedComponent,
        PopupTableComponent,
        CalendarComponent,
        QuatationAnnotationComponent,
        PopupRiderComponent,
        PopupFatcaComponent,
        AppDetailModalComponent,
        BasicVerifyAppModalComponent,
        WarningModalComponent,
        ULifeSaleoffer_10_1Component,
        ULifeSaleoffer_10_10Component,
        TableApplicationComponent,
        PopupLostConnectionComponent,
        PopupResetDataComponent,
        PopupLostConnectionComponent,
        AllocationModalComponent,
        PopupAppSubmitComponent,
        FullnameComponent,
        PopoverComponent,
        PopupExampleBenefitComponent,
        PopupCalendarComponent,
        PopupAppUlinkComponent,
        AttachPhotoUlinkEAppComponent,
        QrcodeModalComponent,
        SignatureUlinkEAppPage,
        SignatureUlinkInvestmentInfoPage,
        SignatureUlinkLifepremiumPage,
        SignatureUlinkAcceptriskPage
        
        
        
    ],
    providers: [
        ScreenOrientation,
        CalculateAgeDirective
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class ComponentsModule { }