import {UniversalLifePage} from '../universal-life/universal-life';
import { QuatationSaleofferPage } from './../quatation/quatation-saleoffer/quatation-saleoffer';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvestmentPage } from './investment';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';
import { QuatationAllocationPage } from '../quatation/quatation-allocation/quatation-allocation';
import { QuatationRiskprofilePage } from '../quatation/quatation-riskprofile/quatation-riskprofile';
import { UlinkBenefitPage } from './ulink-benefit/ulink-benefit';
import { UlinkChildPage } from './ulink-child/ulink-child';
import { UlinkPaymentPage } from './ulink-payment/ulink-payment';
import { UlinkReturnPage } from './ulink-return/ulink-return';
import { UlinkRiderPage } from './ulink-rider/ulink-rider';
import { UlinkSumPage } from './ulink-sum/ulink-sum';
import { UlinkWithdrawPage } from './ulink-withdraw/ulink-withdraw';
import { InvestmentBenefitPage } from './investment-benefit/investment-benefit';

@NgModule({
  declarations: [
    InvestmentPage,
    //QuatationBenefitPage,
    QuatationAllocationPage,
    QuatationSaleofferPage,
    QuatationRiskprofilePage,
    UniversalLifePage,
    //UniversalLifeSaleofferPage

    InvestmentBenefitPage,
    UlinkBenefitPage,
    UlinkChildPage,
    UlinkPaymentPage,
    UlinkReturnPage,
    UlinkRiderPage,
    UlinkSumPage,
    UlinkWithdrawPage
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    IonicPageModule.forChild(InvestmentPage),
  ],
  entryComponents: [
    //QuatationBenefitPage,
    QuatationAllocationPage,
    QuatationSaleofferPage,
    QuatationRiskprofilePage,
    UniversalLifePage,
    //UniversalLifeSaleofferPage

    InvestmentBenefitPage,
    UlinkBenefitPage,
    UlinkChildPage,
    UlinkPaymentPage,
    UlinkReturnPage,
    UlinkRiderPage,
    UlinkSumPage,
    UlinkWithdrawPage
  ]
})
export class InvestmentPageModule {}
