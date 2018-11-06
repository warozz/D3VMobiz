export class UniversalLifePdfModel {

	/**
	 * ประเภท	UWA,UEA,UZA
	 */
	pcode: string;
	preName: string;  //ชื่อผู้เอาประกัน
	firstName: string; 
	lastName: string; 
	age: string;

	/**
	 * รายปี รายเดือน
	 */
	mode: string;
	sex: string;

	/**
	 * เบี้ยประกัน
	 */
	premiumMaster: string;

	/**
	 * จำนวนเอาประกัน
	 */
	lifeSum: string;

	/**
	 * type topup ทุกปี ทุกเดือน	1,Y,N
	 */
	tppay: string; 

	/**
	 * TOPUP_PREMIUM
	 */
	special: string;
	refNo: string;
	pNameBy: string;
	fNameBy: string;
	lNameBy: string;
	branchName: string;
	tel: string;
	idCard: string;

	/**
	 * A=ไม่มี Rider	A,B
	 */
	aorb: string;
	riderList: any

	/**
	 * 2 = request RefId
	 */
	flag: string;

	quotationStatus: string;
	quotationno: string;
	customerid: string;
}


// EXAMPLE
// {
	// "flag":"2",
    // "quotationStatus":"R",
    // "quotationno":"00770198WN20180502104942",
	// "customerid":"2858f53f-469a-407e-a687-604b6d3dd64e",
// 	"pcode": "UWA",
// 	"preName": "นาย",
// 	"firstName": "ธีรยุทธ",
// 	"lastName": "แก้วนุ้ย",
// 	"age": "0",
// 	"mode": "2",
// 	"sex": "M",
// 	"premiumMaster": "50000",
// 	"lifeSum": "65000",
// 	"tppay": "1",
// 	"special": "1000",
// 	"refNo": "",
// 	"pNameBy": "Mr.",
// 	"fNameBy": "Test",
// 	"lNameBy": "Report",
// 	"branchName": "home",
// 	"tel": "09999999",
// 	"idCard": "1800000000001",
// 	"aorb": "B",
// 	"riderList":[{"riderName":"ac01",
// 	"riderDetail":"10000",
// 	"riderPremium":"1000"}]
//   }