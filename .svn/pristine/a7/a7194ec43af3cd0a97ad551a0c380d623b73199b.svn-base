export default {
  "name": "คุ้มทวี 10 เท่า 15/15 (มีเงินปันผล)",
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
          "margin-top": " 24px",
          "margin-left": "350px",
          "font-size": "24px",
          "color": "#c41a1c",
          "z-index": "2"
        }
      },{
        "type": "text",
        "value": "บาท",
        "css": {
          "margin-top": "25px",
          "margin-left": "550px",
          "font-size": "24px",
          "z-index": "2"
        }
      }, {
        "type": "text",
        "value": "วันครบรอบปี กรมธรรม์ที่",
        "class": "policy-year-text"
      }, {
        "type": "image",
        "value": "assets/img/projectform/graph/01/01_graph9.png",
        "class": "section2-graph"
      }]
    },
    "section3": {
      "css": {
        "height": "75px"
      },
      "data": [{
        "type": "image",
        "value": "assets/img/projectform/money_bag.png",
        "css": {
          "margin-left": "823px"
        }
      }, {
        "type": "text",
        "value": "{{data3_1}}",
        "class": "money-bag-data",
        "css": {
          "margin-left": "777px"
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
          "name": "ครบสัญญา รับเงินครบสัญญา พร้อมเงินปันผล (ถ้ามี)**",
          "percentIncome": "110%*",
          "income": "{{income1}}"
        },
        {
          "name": "รวมผลประโยชน์ตลอดสัญญา",
          "percentIncome": "110%*",
          "income": "{{income2}}"
        }
      ]
    },
    {
      "type": "note",
      "items": [
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
        "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
        "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
      ]
    }
  ],
  "calculate": (sum, prospect, utils, quatation) => {
    const val0 = utils.numFormat(utils.formatInt( sum )  * 10);											
		const val1 = utils.numFormat(Math.round( utils.formatInt( sum )  * 1.1 ));				
		const val2 = utils.numFormat(Math.round( utils.formatInt( sum )  * 10  ));
		const val3 = utils.numFormat(Math.round( utils.formatInt( sum )  * 1.1 ));								
		const val4 = utils.numFormat(Math.round( utils.formatInt( sum )  * 1.1 ));								
    
    return {
      data2_1: val0,
      data3_1: val1,
      income1: val3,
      income2: val4
    }
  }
}
