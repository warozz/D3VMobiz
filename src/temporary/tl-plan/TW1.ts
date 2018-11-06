export default {
    "name": "คุ้มทรัพย์ (คุ้มครองค่ารักษาพยาบาลรายวัน)",
    "info": {
      "section1": {
        "coverage": "{{coverage}}",
        "pay": "{{pay}}",
        "perDay": "{{perDay}}"
      }
    },
    "summary": [
      {
        "type": "item",
        "title": "ผลประโยชน์และความคุ้มครอง",
        "items": [
          {
            "name": "กรณีเสียชีวิตทุกกรณี",
            "percentIncome": null,
            "income": "{{income1}}"
          },
          {
            "name": "การจ่ายเงินชดเชยค่ารักษาพยาบาลรายวัน (วันละ)",
            "percentIncome": null,
            "income": null,
            "subItems": [
              {
                "name": "กรณีรักษาตัวเป็นผู้ป่วยในโรงพยาบาล (สูงสุด 365 วัน)",
                "percentIncome": null,
                "income": "{{income2}}"
              },
              {
                "name": "กรณีได้รับการรักษาในห้องผู้ป่วยหนัก (ไอ.ซี.ยู) (สูงสุด 7 วัน)",
                "percentIncome": null,
                "income": "{{income3}}"
              }
            ]
          }
        ]
      },
      {
        "type": "condition",
        "items": [
          "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้ เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
          "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น ",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ],
    "calculate": (sum, prospect, utils) => {
      //TODO: tfpan => แผน
      let fixpan = '1';
      
      //TODO: PREMIUMFINAL ?
      let PREMIUMFINAL = '1600';

      let DD = "";
      let MC = "";
      let MA = "";

      if (fixpan == "1")
      {
        DD = utils.numFormat("60000");
        MC = utils.numFormat("600");
        MA = utils.numFormat("1200");
      }
      if (fixpan == "2")
      {
        DD = utils.numFormat("80000");
        MC = utils.numFormat("800");
        MA = utils.numFormat("1600");
      }
      if (fixpan == "3")
      {
        DD = utils.numFormat("100000");
        MC = utils.numFormat("1000");
        MA = utils.numFormat("2000");
      }	
      
      const val0 = utils.numFormat(sum);
      const val1 = utils.numFormat(Math.ceil(utils.formatInt(PREMIUMFINAL) / 365));
      const val2 = utils.numFormat(PREMIUMFINAL);
      const val3 = DD;
      const val4 = MC;
      const val5 = MA;
      
      console.log("val3",val3);
      console.log("val5",val5);
  
      return {
        coverage: val0,
        pay: val2,
        perDay: val1,
        income1: val3,
        income2: val4,
        income3: val5
      }
    }
}