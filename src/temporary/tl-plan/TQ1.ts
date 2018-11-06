export default {
  "name": "พี.เอ. โบรกเกน โบน",
  "info": null,
  "summary": [
    {
      "type": "item",
      "title": "ความคุ้มครอง",
      "items": [
        {
          "name": "การเสียชีวิต สูญเสียอวัยวะ สายตา หรือทุพพลภาพถาวรสิ้นเชิง (DD&TPD)",
          "percentIncome": null,
          "income": "{{income1}}"
        },
        {
          "name": "การรักษาพยาบาลต่ออุบัติเหตุแต่ละครั้ง(ME)",
          "percentIncome": null,
          "income": "{{income2}}"
        },
        {
          "name": "ขยายความคุ้มครอง การขับขี่หรือโดยสารรถจักรยานยนต์(MC)",
          "percentIncome": null,
          "income": "{{income3}}"
        },
        {
          "name": "ขยายความคุ้มครอง การถูกฆาตกรรมหรือถูกทำร้ายร่างกาย (MA)",
          "percentIncome": null,
          "income": "{{income4}}"
        },
        {
          "name": "ผลประโยชน์เพิ่มเติมกระดูกแตกหัก ไฟไหม้ น้ำร้อนลวก และการบาดเจ็บอวัยวะภายใน(BB)",
          "percentIncome": null,
          "income": "{{income5}}"
        }
      ]
    },
    {
      "type": "condition",
      "items": [
        "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนกดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
        "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น โดยท่านสามารถชำระเบี้ยประกันภัยงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, เคาน์เตอร์เซอร์วิส, ธนาคาร ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากคู่มือผู้เอาประกันภัย",
        "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
      ]
    }
  ],
  "calculate": (sum, prospect, utils, quatation) => {
    //TODO: tfpan => แผน
    let fixpan = quatation.package == undefined || quatation.package == null ? 1 : quatation.package;
    let fixocc = prospect.occupationType;

    // TODO: PREMIUMFINAL
    let PREMIUMFINAL = "1600";

    let val0 = fixpan;
    let TQ2 = "";
    let TQ3 = "";
    let TQ4 = "";
    let TQ5 = "";
    let TQ6 = "";

    if (fixocc == "1" || fixocc == "2")
		{
			if (fixpan == "1")
			{
				TQ2 = "500,000";
				TQ3 = "40,000";
				TQ4 = "250,000";
				TQ5 = "250,000";
				TQ6 = "50,000";
			}
			if (fixpan == "2")
			{
				TQ2 = "700,000";
				TQ3 = "50,000";
				TQ4 = "350,000";
				TQ5 = "350,000";
				TQ6 = "60,000";
			}
			if (fixpan == "3")
			{
				TQ2 = "1,000,000";
				TQ3 = "60,000";
				TQ4 = "500,000";
				TQ5 = "500,000";
				TQ6 = "70,000";
			}
		}

    return {
      income1: TQ2,
      income2: TQ3,
      income3: TQ4,
      income4: TQ5,
      income5: TQ6
    }

  }

}