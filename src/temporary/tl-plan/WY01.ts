export default {
  "name": "คุ้มธนกิจ 99(1) [99]/1",
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
          "margin-top": " 15px",
          "margin-left": "260px",
          "font-size": "24px",
          "color": "#c41a1c",
          "z-index": "2"
        }
      },{
        "type": "text",
        "value": "บาท",
        "css": {
          "margin-top": "16px",
          "margin-left": "435px",
          "font-size": "24px",
          "z-index": "2"
        }
      }, {
        "type": "text",
        "value": "วันครบรอบปี กรมธรรม์ที่",
        "class": "policy-year-text"
      }, {
        "type": "image",
        "value": "assets/img/projectform/graph/02/graph_WY01.png",
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
          "margin-top": "8px",
          "margin-left": "40px",
          "font-size": "22px",
          "width": "75px",
          "line-height": "13px"
        }
      },{
        "type": "image",
        "value": "assets/img/projectform/money_bag.png",
        "css": {
          "margin-top": "-40px",
          "margin-left": "920px"
        }
      }, {
        "type": "text",
        "value": "{{data3_1}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "2px",
          "margin-left": "265px"
        }
      }, {
        "type": "text",
        "value": "{{data3_2}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "20px",
          "margin-left": "340px"
        }
      }, {
        "type": "text",
        "value": "{{data3_3}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "2px",
          "margin-left": "420px"
        }
      }, {
        "type": "text",
        "value": "{{data3_4}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "2px",
          "margin-left": "815px"
        }
      }, {
        "type": "text",
        "value": "{{data3_5}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "20px",
          "margin-left": "895px"
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
          "name": "รับเงินคืน 1%*",
          "percentIncome": null,
          "income": null,
          "subItems": [
            {
              "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่ 2 ถึงอายุ 98 ปี รวม {{year1}} ครั้ง",
              "percentIncome": "{{percent1}}",
              "income": "{{income1}}"
            }
          ]
        },
        {
          "name": "ครบสัญญา รับเงินครบสัญญา",
          "percentIncome": "{{percent2}}",
          "income": "{{income2}}"
        },
        {
          "name": "รวมผลประโยชน์ตลอดสัญญา",
          "percentIncome": "{{percent3}}",
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
        }
      ]
    },
    {
      "type": "condition",
      "items": [
        "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้ เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
        "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น",
        "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
        "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน"
      ]
    }
  ],
  "calculate": (sum, prospect, utils) => {

    const year = 97 - (utils.formatInt(prospect.age));
    const year89 = Math.round(Math.round(utils.formatInt(sum)*0.01)*utils.formatInt(year));
    const Get110 = Math.round(utils.formatInt(sum)*1);

    const val0 = utils.numFormat(utils.formatInt(sum));
    const val1 = utils.numFormat(Math.round(utils.formatInt(sum) * 0.01));
    const val2 = utils.numFormat(Math.round(utils.formatInt(sum) * 1));
    const val3 = utils.formatInt(year);
    const val4 = utils.formatInt(year)+"%*";
    const val5 = (utils.formatInt(year) + 100) + "%*";
    const val6 = utils.numFormat(utils.formatInt(year89) + utils.formatInt(Get110));
    const val7 = utils.numFormat(Math.round(Math.round(utils.formatInt(sum)*0.01)*utils.formatInt(year)));

    return {
      data2_1: val0,
      data3_1: val1,
      data3_2: val1,
      data3_3: val1,
      data3_4: val1,
      data3_5: val2,
      year1: val3,
      percent1: val4,
      income1: val7,
      percent2: '100%*',
      income2: val2,
      percent3: val5,
      income3: val6,
    }
  }
}