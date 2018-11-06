import { Component, Input } from '@angular/core';

@Component({
    selector: 'bar-chart',
    templateUrl: './bar-chart.html'
})
export class BarChartComponent {
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        legend: {
            onClick: (e) => e.stopPropagation()
        }
    };
    // public barChartLabels: string[] = ['พ.ย. 2558', 'ธ.ค. 2558', 'ม.ค. 2559', 'ก.พ. 2559', 'มี.ค. 2559', 'เม.ย. 2559', 'พ.ค. 2559', 'มิ.ย. 2559', 'ก.ค. 2559', 'ส.ค. 2559', 'ก.ย. 2559', 'ต.ค. 2559'];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    /* public barChartData: any[] = [
        { data: [38, 13, 25, 30, 30, 43, 43, 43, 30, 30, 43, 43], label: 'ใบเสนอขาย' },
        { data: [0, 30, 36, 38, 50, 48, 45, 45, 36, 36, 45, 50], label: 'ใบคำขอ' }
    ];*/

    //  public barChartColor = [{ backgroundColor:['#6FC2FE','#3581C2']}];
    /*public barChartColor = [{ backgroundColor: ['#6FC2FE', '#6FC2FE', '#6FC2FE', '#6FC2FE', '#6FC2FE', '#6FC2FE', '#6FC2FE', '#6FC2FE', '#6FC2FE', '#6FC2FE', '#6FC2FE', '#6FC2FE'] },
    { backgroundColor: ['#3581C2', '#3581C2', '#3581C2', '#3581C2', '#3581C2', '#3581C2', '#3581C2', '#3581C2', '#3581C2', '#3581C2', '#3581C2', '#3581C2'] }];
    */
    @Input() public label: string[];
    @Input() public data: any[];
    @Input() public color: any[];


    // events
    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

    public randomize(): void {
        // Only Change 3 values
        let data = [
            Math.round(Math.random() * 100),
            59,
            80,
            (Math.random() * 100),
            56,
            (Math.random() * 100),
            40];
        let clone = JSON.parse(JSON.stringify(this.data));
        clone[0].data = data;
        this.data = clone;
        /**
         * (My guess), for Angular to recognize the change in the dataset
         * it has to change the dataset variable directly,
         * so one way around it, is to clone the data, change it and then
         * assign it;
         */
    }
}