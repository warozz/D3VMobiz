export default {
  "name": "ทรัพย์บำนาญG 65",
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
        "value": "จ่าย 105% ของเบี้ยประกันภัยที่ชำระมาแล้วทั้งหมด",
        "css": {
          "margin-top": "5px",
          "margin-left": "160px",
          "font-size": "20px",
          "color": "#c41a1c",
          "z-index": "2"
        }
      },{
        "type": "text",
        "value": "{{data2_1}}",
        "css": {
          "margin-top": " 20px",
          "margin-left": "160px",
          "font-size": "22px",
          "z-index": "2"
        }
      },{
        "type": "text",
        "value": "หรือ เงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
        "css": {
          "margin-top": "35px",
          "margin-left": "160px",
          "font-size": "20px",

          "z-index": "2",
          "color": "#c41a1c"
        }
      },{
        "type": "text",
        "value": "มูลค่าปัจจุบันของเงินบำนาญที่เหลืออยู่**",
        "css": {
          "margin-top": "21px",
          "margin-left": "516px",
          "font-size": "18px",

          "z-index": "2"
        }
      }, {
        "type": "text",
        "value": "วันครบรอบปี กรมธรรม์ที่",
        "class": "policy-year-text"
      }, {
        "type": "image",
        "value": "assets/img/projectform/graph/02/graph_AR65.png",
        "class": "section2-graph"
      }]
    },
    "section3": {
      "css": {
        "height": "40px"
      },
      "data": [{
        "type": "image",
        "value": "assets/img/projectform/02_table.png",
        "class": "section3-table"
      }, {
        "type": "text",
        "value": "เงินบำนาญ***",
        "css": {
          "margin-top": "8px",
          "margin-left": "40px",
          "font-size": "22px",
          "width": "75px",
          "line-height": "13px"
        }
      }, {
        "type": "text",
        "value": "{{data3_1}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "2px",
          "margin-left": "460px"
        }
      }, {
        "type": "text",
        "value": "{{data3_2}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "20px",
          "margin-left": "530px"
        }
      }, {
        "type": "text",
        "value": "{{data3_3}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "2px",
          "margin-left": "600px"
        }
      }, {
        "type": "text",
        "value": "{{data3_4}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "20px",
          "margin-left": "670px"
        }
      }, {
        "type": "text",
        "value": "{{data3_5}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "2px",
          "margin-left": "740px"
        }
      }, {
        "type": "text",
        "value": "{{data3_6}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "20px",
          "margin-left": "850px"
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
          "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่อายุ 65 ปี ถึงอายุ 90 ปี",
          "percentIncome": null,
          "income": null,
          "subItems": [
            {
              "name": "รับเงินบำนาญ ปีละ",
              "percentIncome": "15%*",
              "income": "{{income1}}"
            },
            {
              "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 26 ปี",
              "percentIncome": "390%*",
              "income": "{{income2}}"
            }
          ]
        },
        {
          name: "หรือ",
          percentIncome: null,
          income: null,
          isHidden: "{{lessThan5000}}",
          subItems: [
            {
              name: "รับเงินบำนาญ เดือนละ",
              percentIncome: "1.26%*",
              income: "{{income3}}"
            },
            {
              name: "รวมรับเงินบำนาญรายเดือนตลอดสัญญาสูงสุด 312 งวด",
              percentIncome: "393.12%*",
              income: "{{income4}}"
            }
          ]
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
          "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 15 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 15 ปี {{extendMessage1}}"
        },
        {
          "iconText": "***",
          "color": "c-blue",
          "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{income1}} บาท {{extendMessage2}} ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 65 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
        }
      ]
    },
    {
      "type": "condition",
      "items": [
        "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้ เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
        "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น โดยท่านสามารถชำระเบี้ยประกันภัยงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, เคาน์เตอร์เซอร์วิส, ธนาคาร ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากคู่มือผู้เอาประกันภัย",
        "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
        "เบี้ยประกันชีวิตแบบบำนาญสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริงเพิ่มขึ้นอีกไม่เกินปีละ 200,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 194)",
        "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
      ]
    }
  ],
  "calculate": (sum, prospect, utils, quatation) => {
    const modeint = [12,1,2,0,4];

    const fixpayyear = quatation.payYear;
    const premiumFinal = quatation.premium;

    const val0 = Math.round( utils.formatInt( premiumFinal ) * 1.05 );
    const val1 = Math.round( utils.formatInt( sum ) * 0.15 );
    const val2 = Math.round( utils.formatInt( sum ) * 3.9 );
    const val3 = Math.round( utils.formatInt( sum ) * 0.0126 );
    const val4 = Math.round( utils.formatInt( sum ) * 3.9312 );
    const val5 = Math.round( utils.formatInt( premiumFinal ) * 1.05 * fixpayyear * modeint[quatation.mode]);

    let moreThan5000 = val3>5000;
    let extendMessage1 = "";
    let extendMessage2 = "";
    if (moreThan5000) {
      extendMessage1 = "ทั้งนี้ กรณีรับเงินบำนาญเป็นรายเดือน หากผู้เอาประกันเสียชีวิตระหว่างปี กรมธรรม์โดยที่ยังรับเงินบำนาญไม่ครบ 12 งวดในปีกรมธรรม์นั้น บริษัทฯ จะจ่ายเงินบำนาญรายเดือนส่วนที่เหลืออยู่ของปีกรมธรรม์นั้นใน ครั้งเดียวให้แก่ผู้รับผลประโยชน์ด้วย";
      extendMessage2 = `หรือเลือกรับเงินบำนาญเป็นรายเดือน 12 งวดต่อปีกรมธรรม์ โดยจ่ายงวดละ ${utils.numFormat(val3)} บาท`;
    }

    return {
      data2_1: `${utils.numFormat(val0)} - ${utils.numFormat(val5)} บาท`,
      data3_1: utils.numFormat(val1),
      data3_2: utils.numFormat(val1),
      data3_3: utils.numFormat(val1),
      data3_4: utils.numFormat(val1),
      data3_5: utils.numFormat(val1),
      data3_6: utils.numFormat(val1),
      income1: utils.numFormat(val1),
      income2: utils.numFormat(val2),
      income3: utils.numFormat(val3),
      income4: utils.numFormat(val4),
      lessThan5000: !moreThan5000,
      extendMessage1: extendMessage1,
      extendMessage2: extendMessage2
    }
  }
}
