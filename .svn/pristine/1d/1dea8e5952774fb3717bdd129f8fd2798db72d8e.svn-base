export default {
    "name": "คุ้มทรัพย์ 5/5 [ไม่มีเงินปันผล]",
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
            "margin-left": "340px",
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
          "value": "assets/img/projectform/graph/01/01_graph3.png",
          "class": "section2-graph"
        }]
      },
      "section3": null
    },
    "summary": [
      {
        "type": "item",
        "title": "สรุปผลประโยชน์ตลอดสัญญา",
        "items": [
          {
            "name": "คุ้มครองชีวิตตลอดสัญญา",
            "percentIncome": null,
            "income": "{{income1}}"
          },
          {
            "name": "ชำระเบี้ยประกันภัย",
            "income": null,
            "subItems": [
              {
                "name": "ปีละ",
                "percentIncome": null,
                "income": "{{income2}}"
              },
              {
                "name": "รวม 5 ปี",
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
          "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น โดยท่านสามารถชำระเบี้ยประกันภัยงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, เคาน์เตอร์เซอร์วิส, ธนาคาร ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากคู่มือผู้เอาประกันภัย",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ],
    "calculate": (sum, prospect, utils, quatation) => {
      const val0 = utils.numFormat(sum);
      const val1 = utils.numFormat(quatation.premiumFooter);
      const val2 = utils.numFormat(quatation.premiumFooter*5);
      return {
        data2_1: val0,
        income1: val0,
        income2: val1,
        income3: val2
      }
    }
}
