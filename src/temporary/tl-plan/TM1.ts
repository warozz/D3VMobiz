export default {
  "name": "พี.เอ. ฮอสพิทอลแคร์",
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
          "name": "ขยายความคุ้มครองการขับขี่ หรือโดยสารรถจักรยานยนต์ (MC)",
          "percentIncome": null,
          "income": "{{income3}}"
        },
        {
          "name": "ขยายความคุ้มครองการถูกฆาตกรรม หรือถูกทำร้ายร่างกาย (MA)",
          "percentIncome": null,
          "income": "{{income4}}"
        },
        {
          "name": "ค่าชดเชยรายได้ระหว่างการเข้ารักษาตัวในโรงพยาบาล(HB) วันละ",
          "percentIncome": null,
          "income": "{{income5}}"
        },
        {
          "name": "ค่าปลงศพ (คุ้มครองการเสียชีวิตจากการบาดเจ็บหรือเจ็บป่วย)(FE)",
          "percentIncome": null,
          "income": "{{income6}}"
        }
      ]
    },
    {
      "type": "condition",
      "items": [
        "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
        "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น โดยท่านสามารถชำระเบี้ยประกันภัยงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, เคาน์เตอร์เซอร์วิส, ธนาคาร ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากคู่มือผู้เอาประกันภัย",
        "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
      ]
    }
  ],
  "calculate": (sum, prospect, utils, quatation) => {
    //TODO: tfpan => แผน
    let fixpan = quatation.package == undefined || quatation.package == null ? 1 : quatation.package;

    let fixocc = prospect.occupationType;

    let val0 = "";
    let val1 = "";
    let val2 = "";
    let val3 = "";
    let val4 = "";
    let val5 = "";

    if (fixocc == "1" || fixocc == "2") {
      if (fixpan == "1") {
        val0 = utils.numFormat("400000");
        val1 = utils.numFormat("");
        val2 = utils.numFormat("200000");
        val3 = utils.numFormat("400000");
        val4 = utils.numFormat("600");
        val5 = utils.numFormat("10000");
      }
      if (fixpan == "2") {
        val0 = utils.numFormat("600000");
        val1 = utils.numFormat("");
        val2 = utils.numFormat("300000");
        val3 = utils.numFormat("600000");
        val4 = utils.numFormat("1000");
        val5 = utils.numFormat("10000");
      }
      if (fixpan == "3") {
        val0 = utils.numFormat("800000");
        val1 = utils.numFormat("60000");
        val2 = utils.numFormat("400000");
        val3 = utils.numFormat("800000");
        val4 = utils.numFormat("2000");
        val5 = utils.numFormat("10000");
      }
      if (fixpan == "4") {
        val0 = utils.numFormat("1000000");
        val1 = utils.numFormat("80000");
        val2 = utils.numFormat("500000");
        val3 = utils.numFormat("1000000");
        val4 = utils.numFormat("2000");
        val5 = utils.numFormat("10000");
      }
      if (fixpan == "5") {
        val0 = utils.numFormat("1200000");
        val1 = utils.numFormat("100000");
        val2 = utils.numFormat("600000");
        val3 = utils.numFormat("1200000");
        val4 = utils.numFormat("2000");
        val5 = utils.numFormat("10000");
      }
    }

    return {
      income1: val0,
      income2: val1,
      income3: val2,
      income4: val3,
      income5: val4,
      income6: val5
    }
  }
}