export default {
  "name": "เกษมบำนาญ (มีเงินปันผล)",
  "info": {
    "section1": null,
    "section2": {
      "css": {
        "height": "140px"
      },
      "data": [{
        "type": "text",
        "value": "ความคุ้มครอง",
        "class": "protection-txt"
      }, {
        "type": "text",
        "value": "{{data2_1}}",
        "css": {
          "margin-top": "11px",
          "margin-left": "275px",
          "color": "#c41a1c",
          "font-size": "30px",
          "z-index": "2"
        }
      }, {
        "type": "text",
        "value": "บาท",
        "css": {
          "margin-top": "13px",
          "margin-left": "450px",
          "color": "#853807",
          "font-size": "25px",
          "z-index": "2"
        }
      }, {
        "type": "text",
        "value": "หรือเงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
        "css": {
          "width": "260px",
          "margin-top": "35px",
          "margin-left": "195px",
          "color": "#853807",
          "font-size": "25px",
          "z-index": "2"
        }
      }, {
        "type": "text",
        "value": "เงินค่าเวนคืนกรมธรรม์",
        "css": {
          "margin-top": "23px",
          "margin-left": "610px",
          "color": "#a01b16",
          "font-size": "25px",
          "z-index": "2"
        }
      }, {
        "type": "text",
        "value": "วันครบรอบปี กรมธรรม์ที่",
        "class": "policy-year-text"
      }, {
        "type": "image",
        "value": "assets/img/projectform/04_graph.png",
        "class": "section2-graph"
      }]
    },
    "section3": {
      "css": {
        "height": "70px"
      },
      "data": [{
        "type": "image",
        "value": "assets/img/projectform/04_table_.png",
        "class": "section3-table"
      }, {
        "type": "text",
        "value": "เงินคืน",
        "css": {
          "margin-top": "5px",
          "margin-left": "37px",
          "font-size": "22px",
          "width": "75px"
        }
      }, {
        "type": "text",
        "value": "เงินบำนาญ",
        "css": {
          "margin-top": "35px",
          "margin-left": "37px",
          "font-size": "19px",
          "width": "42px",
          "text-align": "center",
          "line-height": "13px"
        }
      }, {
        "type": "text",
        "value": "{{data3_1}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "5px",
          "margin-left": "500px"
        }
      }, {
        "type": "text",
        "value": "{{data3_2}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "30px",
          "margin-left": "515px"
        }
      }, {
        "type": "text",
        "value": "{{data3_3}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "45px",
          "margin-left": "585px"
        }
      }, {
        "type": "text",
        "value": "{{data3_4}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "30px",
          "margin-left": "740px"
        }
      }, {
        "type": "text",
        "value": "{{data3_5}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "45px",
          "margin-left": "810px"
        }
      }]
    }
  },
  "summary": [
    {
      "type": "item",
      "title": "สรุปผลประโยชน์ตลอดสัญญา",
      "items": [
        {
          "name": "วันครบรอบปีกรมธรรม์ที่อายุ 60 ปี",
          "percentIncome": null,
          "income": null,
          "subItems": [
            {
              "name": "รับเงินคืน 2%* ของทุนประกันคูณด้วยระยะเวลาชำระเบี้ย พร้อมเงินปันผล (ถ้ามี)**",
              "percentIncome": "{{percent1}}%*",
              "income": "{{income1}}"
            }
          ]
        },
        {
          "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่อายุ 60 - 99 ปี",
          "percentIncome": null,
          "income": null,
          "subItems": [
            {
              "name": "รับเงินคืนปีละ 10%* รวมสูงสุด 40 ครั้ง",
              "percentIncome": "400%*",
              "income": "{{income2}}"
            }
          ]
        },
        {
          "name": "รวมผลประโยชน์ตลอดสัญญา",
          "percentIncome": "{{percent2}}%*",
          "income": "{{income3}}"
        }
      ]
    },
    {
      "type": "note",
      "items": [
        {
          "icon": "up",
          "color": "c-red",
          "message": "ครบระยะชำระเบี้ยประกันภัย"
        },
        {
          "iconText": "*",
          "color": "c-blue",
          "message": "อัตราร้อยละของจำนวนเงินเอาประกันภัย"
        },
        {
          "iconText": "**",
          "color": "c-blue",
          "message": "บริษัทฯ จะแจ้งอัตราการจ่ายเงินปันผล(ถ้ามี)ให้ทราบล่วงหน้าก่อนวันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัย มีอายุ 60 ปี"
        }
      ]
    },
    {
      "type": "condition",
      "items": [
        "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้ เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
        "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น โดยท่านสามารถชำระเบี้ยประกันภัยงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, เคาน์เตอร์เซอร์วิส, " +
        "ธนาคาร ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากคู่มือผู้เอาประกันภัย",
        "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (กรณีเพศชาย/หญิง อายุ 47-50 ปี) (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
        "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ " +
        "ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
      ]
    }
  ],
  "calculate": (sum, prospect, utils) => {
    const val0 = utils.numFormat(utils.formatInt(sum));							// nfSumAC.setText(mPP.SUM);
    const val1 = utils.numFormat(Math.round(Math.round(utils.formatInt(sum) * 0.02) * (60 - utils.formatInt(prospect.age))));// nfGetAC60.setText(M.multiply(M.multiply(mPP.SUM,"0.02",0),M.subnum("60",mPP.AGE),0));
    const val2 = utils.numFormat(Math.round(utils.formatInt(sum) * 0.1));			// nfGetAC10.setText(M.multiply(mPP.SUM,"0.1",0));
    const val3 = utils.numFormat(Math.round(Math.round(utils.formatInt(sum) * 0.02) * (60 - utils.formatInt(prospect.age))));// nfGetAC60.setText(M.multiply(M.multiply(mPP.SUM,"0.02",0),M.subnum("60",mPP.AGE),0));
    const val4 = utils.numFormat(Math.round(Math.round(utils.formatInt(sum) * 0.1) * 40));// nfGetAC.setText(M.multiply(M.multiply(mPP.SUM,"0.1",0),"40",0));
    const val5 = utils.numFormat(Math.round(Math.round(utils.formatInt(sum) * 0.1) * 40) + Math.round(Math.round(utils.formatInt(sum) * 0.02) * (60 - utils.formatInt(prospect.age))));// nfGetAC460Re.setText(M.addnum(nfGetAC.getText(),nfGetAC60.getText()));
    const val6 = utils.numFormat((60 - utils.formatInt(prospect.age)) * 2);
    const val7 = utils.numFormat(400 + ((60 - utils.formatInt(prospect.age)) * 2));

    return {
      data2_1: val0,
      data3_1: val1,
      data3_2: val2,
      data3_3: val2,
      data3_4: val2,
      data3_5: val2,
      income1: val3,
      income2: val4,
      income3: val5,
      percent1: val6,
      percent2: val7,
    }
  }
}
