
export class ConstantConfig {

    /*
	 * 01 = กำลังดำเนินการ
	 * 02 = รอชำระเงิน 
	 * 03 = ชำระเงินสำเร็จ
	 * 04 = ส่งใบคำขอสำเร็จ
	 * 05 = ยกเลิก
	 * 06 = รอเอกสาร/ลายเซ็น
	 * 07 = e-app หมดอายุ
	 * 08 = ส่งข้อมูลไปยังสาขา
	 * 09 = รอส่งใบคำขอ
	 */

	public static appstatusDisabled: Array<string> = ["03", "04", "05", "07", "08", "09"];

	/**
	 * สถานะที่ทำการส่งไปสาขาแล้ว
	 */
	public static appstatusSubmitDone: Array<string> = ["04", "08"];
	
	public static SALE_INFO_KEY: string = 'saleInformation';

	public static relationFamilyGroup: Array<string> = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];

	public static NB_APP_WARNING_TIMEOUT: string = 'ขออภัยในความไม่สะดวก ระบบไม่สามารถใช้งานได้ในขณะนี้ กรุณาติดต่อเจ้าหน้าที่ ส่วนสนับสนุนกิจกรรมและฝึกอบรมดิจิทัล เบอร์ 02-247-0247 ต่อ 1935-1936';

	public static NB_APP_WARNING_N: string = 'กรุณาติดต่อเจ้าหน้าที่ ส่วนสนับสนุนกิจกรรมและฝึกอบรมดิจิทัล เบอร์ 02-247-0247 ต่อ 1935-1936';
 
}