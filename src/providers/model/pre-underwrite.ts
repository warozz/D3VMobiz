export class PreUWStatusM {

    /**
     * ถ้าผ่านเคส 2 ล้าน จะได้ค่าดังนี้ msgcode = Y, msg = TRUE
     * ถ้าไม่ผ่านเคส 2 ล้าน จะได้ค่าดังนี้ msgcode = Y, msg = ข้อความอื่น สาเหตุที่ไม่ได้
     */
    msg: string = ''; // TRUE อื่นๆ
    
    msgcode: string = ''; // Y, N
    
    isPlanforEAPP: string = ''; // TRUE FALSE


}