export default {
  "name": "ตะกาฟุล 90/20",
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
        "value": "รับฮิบะห์เท่ากับจำนวนเงินหลักประกันตะกาฟุล หรือมูลค่าเวนคืนสัญญาตะกาฟุลตามจำนวนที่มากกว่า",
        "css": {
          "margin-top": " 22px",
          "margin-left": "155px",
          "font-size": "18px",
          "z-index": "2"
        }
      },{
        "type": "text",
        "value": " + เงินปันผลจ่ายเมื่อสัญญาสิ้นสุด (ถ้ามี)",
        "css": {
          "margin-top": " 42px",
          "margin-left": "155px",
          "font-size": "18px",
          "z-index": "2"
        }
      }, {
        "type": "text",
        "value": "วันครบรอบปี สัญญาตะกาฟุลที่",
        "class": "policy-year-text"
      }, {
        "type": "image",
        "value": "assets/img/projectform/graph/05/05_graph6.png",
        "class": "section2-graph"
      }]
    },
    "section3": {
      "css": {
        "height": "100px"
      },
      "data": [{
        "type": "image",
        "value": "assets/img/projectform/money_bag.png",
        "css": {
          "margin-left": "807px"
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
          "name": "ครบสัญญา รับฮิบะห์ พร้อมเงินปันผลจ่ายเมื่อสัญญาสิ้นสุด (ถ้ามี)*",
          "percentIncome": "{{rate_cashback}}%*",
          "income": "{{income1}}"
        }
      ]
    },
    {
      "type": "note",
      "items": [
        {
          "icon": "up",
          "color": "c-red",
          "message": "ครบระยะชำระเงินสมทบตะกาฟุล"
        },
        {
          "iconText": "*",
          "color": "c-blue",
          "message": "อัตราร้อยละของจำนวนเงินหลักประกันตะกาฟุล"
        }
      ]
    },
    {
      "type": "condition",
      "items": [
        "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือสัญญาตะกาฟุลจนครบกำหนดสัญญา",
        "การนำส่งเงินสมทบตะกาฟุล เป็นหน้าที่ของสมาชิกตะกาฟุล การที่ตัวแทนบริษัทฯ เก็บเงินสมทบตะกาฟุลเป็นการให้บริการเท่านั้นโดยท่านสามารถชำระเงินสมทบตะกาฟุลงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, เคาน์เตอร์ เซอร์วิส, ธนาคาร, ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากคู่มือเอกสิทธิ์",
        "เงินสมทบตะกาฟุลสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ ฉบับที่ 172)",
        "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารใบคำขอเป็นสมาชิกตะกาฟุล เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณาทำสัญญาตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในสัญญาตะกาฟุลที่ท่านซื้อไว้เท่านั้น\""
      ]
    }
  ],
  "calculate": (sum, prospect, utils) => {
    const rate_cashback : number = 110; // rate เงินคืนเมื่อครบสัญญา 110% ของทุนประกัน
    const per_rate_cashback : number = rate_cashback / 100;
    const val0 = utils.numFormat(Math.round( utils.formatInt(sum) * per_rate_cashback));

    return {
      rate_cashback : rate_cashback,
      data3_1: val0,
      income1: val0
    }
  }
}