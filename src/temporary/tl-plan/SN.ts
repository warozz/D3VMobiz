export default {
  "name": "ก้าวแรก",
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
      },{
        "type": "text",
        "value": "{{data2_1}}",
        "css": {
          "margin-top": " 15px",
          "margin-left": "160px",
          "font-size": "24px",
          "color": "#c41a1c",
          "z-index": "2"
        }
      },{
        "type": "text",
        "value": "บาท",
        "css": {
          "margin-top": "16px",
          "margin-left": "360px",
          "font-size": "24px",
          "z-index": "2"
        }
      },{
        "type": "text",
        "value": "{{data2_2}}",
        "css": {
          "margin-top": " 15px",
          "margin-left": "410px",
          "font-size": "24px",
          "color": "#c41a1c",
          "z-index": "2"
        }
      },{
        "type": "text",
        "value": "บาท",
        "css": {
          "margin-top": "16px",
          "margin-left": "568px",
          "font-size": "24px",
          "z-index": "2"
        }
      },{
        "type": "text",
        "value": "หรือ เงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
        "css": {
          "margin-top": "15px",
          "margin-left": "603px",
          "font-size": "24px",
          "color": "#c41a1c",
          "z-index": "2"
        }
      }, {
        "type": "text",
        "value": "วันครบรอบปี กรมธรรม์ที่",
        "class": "policy-year-text"
      }, {
        "type": "image",
        "value": "assets/img/projectform/02_graph.png",
        "class": "section2-graph"
      }, {
        "type": "image",
        "value": "assets/img/projectform/02_pointer.png",
        "css": {
          "margin-top": "103px",
          "margin-left": "303px"
        }
      }, {
        "type": "image",
        "value": "assets/img/projectform/02_pointer.png",
        "css": {
          "margin-top": "103px",
          "margin-left": "447px"
        }
      }, {
        "type": "image",
        "value": "assets/img/projectform/02_pointer.png",
        "css": {
          "margin-top": "103px",
          "margin-left": "592px"
        }
      }, {
        "type": "image",
        "value": "assets/img/projectform/02_pointer.png",
        "css": {
          "margin-top": "103px",
          "margin-left": "736px"
        }
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
          "margin-top": "-40px",
          "margin-left": "865px"
        }
      }, {
        "type": "text",
        "value": "{{data3_1}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "9px",
          "margin-left": "280px"
        }
      }, {
        "type": "text",
        "value": "{{data3_2}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "9px",
          "margin-left": "425px"
        }
      }, {
        "type": "text",
        "value": "{{data3_3}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "9px",
          "margin-left": "570px"
        }
      }, {
        "type": "text",
        "value": "{{data3_4}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "9px",
          "margin-left": "710px"
        }
      }, {
        "type": "text",
        "value": "{{data3_5}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "9px",
          "margin-left": "855px",
          "color": "#c41a1c"
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
          "name": "รับเงินคืน 10%*",
          "percentIncome": null,
          "income": null,
          "subItems": [
            {
              "name": "ทุกวันครบรอบ 3 ปี กรมธรรม์ตั้งแต่วันครบรอบปีกรมธรรม์ที่ 3 - 15 รวม 5 ครั้ง ",
              "percentIncome": "50%*",
              "income": "{{income1}}"
            }
          ]
        },
        {
          "name": "ครบสัญญา รับเงินครบสัญญา",
          "percentIncome": "150%*",
          "income": "{{income2}}"
        },
        {
          "name": "รวมผลประโยชน์ตลอดสัญญา",
          "percentIncome": "200%*",
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
        "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น โดยท่านสามารถชำระเบี้ยประกันภัยงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, เคาน์เตอร์เซอร์วิส, ธนาคาร ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากคู่มือผู้เอาประกันภัย",
        "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
        "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
      ]
    }
  ],
  "calculate": (sum, prospect, utils, quatation) => {
    const val0 = utils.numFormat(utils.formatInt(sum));											
		const val1 = utils.numFormat(Math.round(utils.formatInt(sum)*1.5));	// 150% เมื่อครบสัญญา
		const val2 = utils.numFormat(Math.round(utils.formatInt(sum)*0.1)); // 10 % ที่คืน
		const val3 = utils.numFormat(Math.round(utils.formatInt(sum)*1.6)); // 150% เมื่อครบสัญญา + 10 % ที่คืน							
		const val4 = utils.numFormat(Math.round(utils.formatInt(sum)*0.5));	// (10% ที่คืน 5 ครััง = 50%)
		const val5 = utils.numFormat(Math.round(utils.formatInt(sum)*1.5)); 
		const val6 = utils.numFormat(Math.round(utils.formatInt(sum)*2)); // 150% เมื่อครบสัญญา + (10% ที่คืน 5 ครััง = 50%)
    
    return {
      data2_1: val0,
      data2_2: val1,
      data3_1: val2,
      data3_2: val2,
      data3_3: val2,
      data3_4: val2,
      data3_5: val3,
      income1: val4,
      income2: val5,
      income3: val6
    }
  }
}
