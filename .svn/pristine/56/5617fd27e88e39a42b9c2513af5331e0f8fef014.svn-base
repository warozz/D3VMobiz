export default {
  "name": "พี.เอ. รีฟันด์",
  "info": null,
  "summary": [
    {
      "type": "item",
      "title": "ความคุ้มครอง",
      "items": [
        {
          "name": "การเสียชีวิต สูญเสียอวัยวะ สายตา หรือทุพพลภาพถาวรสิ้นเชิง",
          "percentIncome": null,
          "income": "{{income1}}"
        },
        {
          "name": "การขับขี่ หรือ โดยสารรถจักรยานยนต์",
          "percentIncome": null,
          "income": "{{income2}}"
        },
        {
          "name": "การถูกฆาตกรรม ลอบทำร้าย",
          "percentIncome": null,
          "income": "{{income3}}"
        },
        {
          "name": "ค่าชดเชยการเข้ารักษาในโรงพยาบาล (กรณีคนไข้ใน) วันละ",
          "percentIncome": null,
          "income": "{{income4}}"
        },
        {
          "name": "การนัดหยุดงาน การจลาจล การที่ประชาชนก่อความวุ่นวายถึงขนาดลุกฮือต่อต้านรัฐบาล",
          "percentIncome": null,
          "income": "{{income5}}"
        },
        {
          "name": "การก่อการร้าย",
          "percentIncome": null,
          "income": "{{income6}}"
        },
        {
          "name": "การรักษาพยาบาล",
          "percentIncome": null,
          "income": "{{income7}}"
        }
      ]
    },
    {
      "type": "note",
      "items": [
        {
          "iconText": "หมายเหตุ",
          "iconCss": "size-medium",
          "color": "c-blue",
          "message": "กรณีต่อสัญญากรมธรรม์นี้ ติดต่อกัน 3 ปี โดยไม่มีการเรียกร้องสินไหมทดแทน ตลอดระยะเวลาดังกล่าว จะได้รับเบี้ยประกันภัยในปีสุดท้ายคืน"
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
    let fixpan = quatation.package;
    let val0 = "";
    let val1 = "";
    let val2 = "";
    let val3 = "";
    let val4 = "";
    let val5 = "";
    let val6 = "";

    if (fixpan == "1")
		{
			val0 = utils.numFormat("500000");
			val1 = utils.numFormat("250000");
			val2 = utils.numFormat("500000");
			val3 = utils.numFormat("1000");
      val4 = utils.numFormat("500000");
      val5 = utils.numFormat("500000");
      val6 = utils.numFormat("50000");
		}
		if (fixpan == "2")
		{
			val0 = utils.numFormat("700000");
			val1 = utils.numFormat("350000");
			val2 = utils.numFormat("700000");
			val3 = utils.numFormat("1000");
      val4 = utils.numFormat("700000");
      val5 = utils.numFormat("700000");
      val6 = utils.numFormat("70000");
		}
		if (fixpan == "3")
		{
			val0 = utils.numFormat("1000000");
			val1 = utils.numFormat("500000");
			val2 = utils.numFormat("1000000");
			val3 = utils.numFormat("1000");
      val4 = utils.numFormat("1000000");
      val5 = utils.numFormat("1000000");
      val6 = utils.numFormat("100000");
		}	

    return {
      income1: val0,
      income2: val1,
      income3: val2,
      income4: val3,
      income5: val4,
      income6: val5,
      income7: val6
    }
  }
}