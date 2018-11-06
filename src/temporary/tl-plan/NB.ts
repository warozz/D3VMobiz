export default {
    "name": "เกษมบำเหน็จ (มีเงินปันผล)",
    "info": {
      "section1": null,
      "section2": {
        "css": {
          "height": "148px"
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
        },{
          "type": "text",
          "value": "หรือ เงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "15px",
            "margin-left": "475px",
            "font-size": "24px",
            "color": "#c41a1c",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปีกรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "assets/img/projectform/graph/02/02_graph9.png",
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
            "margin-top": "2px",
            "margin-left": "250px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "20px",
            "margin-left": "320px"
          }
        }, {
          "type": "text",
          "value": "{{data3_3}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "400px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "20px",
            "margin-left": "460px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "525px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "20px",
            "margin-left": "600px"
          }
        }, {
          "type": "text",
          "value": "{{data3_7}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "770px"
          }
        }, {
          "type": "text",
          "value": "{{data3_8}}",
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
            "name": "รับเงินคืน 2%*",
            "percentIncome": null,
            "income": null,
            "subItems": [
              {
                "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่ 2 ถึงอายุ 59 ปี รวม {{year1}} ครั้ง",
                "percentIncome": "{{percent1}}",
                "income": "{{income1}}"
              }
            ]
          },
          {
            "name": "ครบสัญญา รับเงินครบสัญญา พร้อมเงินปันผล (ถ้ามี)**",
            "percentIncome": "120%*",
            "income": "{{income2}}"
          },
          {
            "name": "รวมผลประโยชน์ตลอดสัญญา",
            "percentIncome": "{{percent2}}",
            "income": "{{income3}}"
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
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (กรณีเพศชาย อายุ 45-50 ปี และเพศหญิง อายุ 46-50 ปี) (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ],
    "calculate": (sum, prospect, utils, quatation) => {

      var fixage = quatation.age;
      var year = 60 - (utils.formatInt(fixage)+2);
      var year59 = Math.round(Math.round(utils.formatInt(sum)*0.02)*utils.formatInt(year));
      var Get110 = Math.round(utils.formatInt(sum)*1.2);
  
      const val0 = utils.numFormat(utils.formatInt(sum));											
      const val1 = utils.numFormat(Math.round(utils.formatInt(sum)*0.02));				
      const val2 = utils.numFormat(Math.round(utils.formatInt(sum)*1.2));
      const val3 = utils.formatInt(year);
      const val4 = Math.round(utils.formatInt(year)*2)+"%*";
      const val5 = utils.numFormat(Math.round(Math.round(utils.formatInt(sum)*0.02)*utils.formatInt(year)));
      const val6 = (Math.round(utils.formatInt(year)*2)+120)+"%*";
      const val7 = utils.numFormat(utils.formatInt(year59)+utils.formatInt(Get110));
  
      return {
        data2_1: val0,
        data3_1: val1,
        data3_2: val1,
        data3_3: val1,
        data3_4: val1,
        data3_5: val1,
        data3_6: val1,
        data3_7: val1,
        data3_8: val2,
        year1: val3,
        percent1: val4,
        percent2: val6,
        income1: val5,
        income2: val2,
        income3: val7
      }
    }
}