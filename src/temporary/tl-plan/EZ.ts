export default {
  "name": "ธนทวี 15/10 (มีเงินปันผล)",
  "info": {
    "section1": null,
    "section2": {
      "css": {
        "height": "134px"
      },
      "data": [{
        "type": "text",
        "value": "ความคุ้มครอง",
        "class": "protection-txt"
      },{
        "type": "text",
        "value": "{{data2_1}}",
        "css": {
          "margin-top": " 23px",
          "margin-left": "220px",
          "font-size": "24px",
          "z-index": "2"
        }
      },{
        "type": "text",
        "value": "บาท",
        "css": {
          "margin-top": "23px",
          "margin-left": "345px",
          "font-size": "24px",

          "z-index": "2"
        }
      },{
        "type": "text",
        "value": "{{data2_2}}",
        "css": {
          "margin-top": " 23px",
          "margin-left": "450px",
          "font-size": "24px",
          "z-index": "2"
        }
      },{
        "type": "text",
        "value": "บาท",
        "css": {
          "margin-top": "23px",
          "margin-left": "570px",
          "font-size": "24px",
          "z-index": "2"
        }
      },{
        "type": "text",
        "value": "{{data2_3}}",
        "css": {
          "margin-top": " 23px",
          "margin-left": "700px",
          "font-size": "24px",
          "z-index": "2"
        }
      },{
        "type": "text",
        "value": "บาท",
        "css": {
          "margin-top": "23px",
          "margin-left": "815px",
          "font-size": "24px",
          "z-index": "2"
        }
      }, {
        "type": "text",
        "value": "วันครบรอบปี กรมธรรม์ที่",
        "class": "policy-year-text"
      }, {
        "type": "image",
        "value": "assets/img/projectform/graph/02/02_graph48.png",
        "class": "section2-graph"
      }]
    },
    "section3": {
      "css": {
        "height": "50px"
      },
      "data": [{
        "type": "image",
        "value": "assets/img/projectform/02_table.png",
        "class": "section3-table"
      }, {
        "type": "text",
        "value": "เงินคืน",
        "css": {
          "margin-top": "14px",
          "margin-left": "40px",
          "font-size": "22px",
          "width": "75px",
          "line-height": "13px"
        }
      },{
        "type": "image",
        "value": "assets/img/projectform/money_bag.png",
        "css": {
          "margin-top": "-30px",
          "margin-left": "870px"
        }
      }, {
        "type": "text",
        "value": "{{data3_1}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "13px",
          "margin-left": "185px"
        }
      }, {
        "type": "text",
        "value": "{{data3_2}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "2px",
          "margin-left": "375px"
        }
      }, {
        "type": "text",
        "value": "{{data3_3}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "20px",
          "margin-left": "430px"
        }
      }, {
        "type": "text",
        "value": "{{data3_4}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "2px",
          "margin-left": "615px"
        }
      }, {
        "type": "text",
        "value": "{{data3_5}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "20px",
          "margin-left": "670px"
        }
      }, {
        "type": "text",
        "value": "{{data3_6}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "13px",
          "margin-left": "855px"
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
          "name": "รับเงินคืน ตั้งแต่วันครบรอบปีกรมธรรม์ที่",
          "percentIncome": null,
          "income": null,
          "subItems": [
            {
              "name": "1-5 ปีละ 4%* รวม 5 ครั้ง",
              "percentIncome": "20%*",
              "income": "{{income1}}"
            },
            {
              "name": "6-10 ปีละ 5%* รวม 5 ครั้ง",
              "percentIncome": "25%*",
              "income": "{{income2}}"
            },
            {
              "name": "11-15 ปีละ 6%* รวม 5 ครั้ง",
              "percentIncome": "30%*",
              "income": "{{income3}}"
            }
          ]
        },
        {
          "name": "ครบสัญญา รับเงินครบสัญญา พร้อมเงินปันผล (ถ้ามี)**",
          "percentIncome": "125%*",
          "income": "{{income4}}"
        },
        {
          "name": "รวมผลประโยชน์ตลอดสัญญา",
          "percentIncome": "200%*",
          "income": "{{income5}}"
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
          "message": "บริษัทฯ จะแจ้งอัตราการจ่ายเงินปันผล(ถ้ามี)ให้ทราบล่วงหน้าก่อนวันครบกำหนดสัญญา"
        }
      ]
    },
    {
      "type": "condition",
      "items": [
        "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้ เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
        "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น โดยท่านสามารถชำระเบี้ยประกันภัยงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, เคาน์เตอร์เซอร์วิส, ธนาคาร ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากคู่มือผู้เอาประกันภัย",
        "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
      ]
    }
  ],
  "calculate": (sum, prospect, utils) => {
    const val0 = utils.numFormat(utils.formatInt(sum));												// nfEZ[0].setText(mPP.nfSum.getText());
    const val1 = utils.numFormat(Math.round(utils.formatInt(sum)*1.10));								// nfEZ[1].setText(M.multiply(mPP.nfSum.getText(),"1.10",0));
    const val2 = utils.numFormat(Math.round(utils.formatInt(sum)*1.25));								// nfEZ[2].setText(M.multiply(mPP.nfSum.getText(),"1.25",0));
    const val3 = utils.numFormat(Math.round(utils.formatInt(sum)*0.04));
    const val4 = utils.numFormat(Math.round(utils.formatInt(sum)*0.05));
    const val5 = utils.numFormat(Math.round(utils.formatInt(sum)*0.2));
    const val6 = utils.numFormat(Math.round(utils.formatInt(sum)*0.25));
    const val7 = utils.numFormat(Math.round(utils.formatInt(sum)*0.3));
    const val8 = utils.numFormat(Math.round(utils.formatInt(sum)*1.25));
    const val9 = utils.numFormat(Math.round(utils.formatInt(sum)*2.00));
    const val10 = utils.numFormat(Math.round(utils.formatInt(sum)*0.06));
    const val11 = utils.numFormat(Math.round(utils.formatInt(sum)*1.31));

    return {
      data2_1: val0,
      data2_2: val1,
      data2_3: val2,
      data3_1: val3,
      data3_2: val3,
      data3_3: val4,
      data3_4: val4,
      data3_5: val10,
      data3_6: val11,
      income1: val5,
      income2: val6,
      income3: val7,
      income4: val8,
      income5: val9
    };
  }
}
