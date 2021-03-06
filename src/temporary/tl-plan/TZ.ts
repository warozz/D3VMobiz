export default {
  "name": "พี.เอ. โบรกเกน โบน แอดวานซ์ (ลูกกตัญญู)",
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
          "name": "การรักษาพยาบาลต่ออุบัติเหตุแต่ละครั้ง",
          "percentIncome": null,
          "income": "{{income2}}"
        },
        {
          "name": "การขับขี่ หรือโดยสารรถจักรยานยนต์",
          "percentIncome": null,
          "income": "{{income3}}"
        },
        {
          "name": "การถูกฆาตกรรม ถูกทำร้ายร่างกาย",
          "percentIncome": null,
          "income": "{{income4}}"
        },
        {
          "name": "ผลประโยชน์เพิ่มเติมกระดูกแตกหัก การไหม้ และน้ำร้อนลวก",
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
        "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริงแต่ไม่เกินปีละ 15,000 บาท(ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 162)",
        "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
      ]
    }
  ],
  "calculate": (sum, prospect, utils) => {
    //TODO: tfpan => แผน
    let fixpan = '1';
    let val0 = "";
    let val1 = "";
    let val2 = "";
    let val3 = "";
    let val4 = "";

    if (fixpan == "1")
		{
			val0 = utils.numFormat("100000");
			val1 = utils.numFormat("60000");
			val2 = utils.numFormat("50000");
			val3 = utils.numFormat("100000");
      val4 = utils.numFormat("60000");
		}
		if (fixpan == "2")
		{
			val0 = utils.numFormat("200000");
			val1 = utils.numFormat("80000");
			val2 = utils.numFormat("100000");
			val3 = utils.numFormat("200000");
      val4 = utils.numFormat("80000");
		}
		if (fixpan == "3")
		{
			val0 = utils.numFormat("300000");
			val1 = utils.numFormat("100000");
			val2 = utils.numFormat("150000");
			val3 = utils.numFormat("300000");
      val4 = utils.numFormat("100000");
		}	

    return {
      income1: val0,
      income2: val1,
      income3: val2,
      income4: val3,
      income5: val4
    }
  }
}