export default {
  "name": "ธนทวี7 5/3",
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
          "margin-top": " 30px",
          "margin-left": "135px",
          "font-size": "18px",
          "z-index": "2"
        }
      },{
        "type": "text",
        "value": "บาท",
        "css": {
          "margin-top": "30px",
          "margin-left": "210px",
          "font-size": "18px",

          "z-index": "2"
        }
      },{
        "type": "text",
        "value": "หรือเงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
        "css": {

          "margin-top": "50px",
          "margin-left": "135px",
          "font-size": "12px",
          "z-index": "2"
        }
      },{
        "type": "text",
        "value": "{{data2_2}}",
        "css": {
          "margin-top": " 10px",
          "margin-left": "250px",
          "font-size": "18px",
          "z-index": "2"
        }
      },{
        "type": "text",
        "value": "บาท",
        "css": {
          "margin-top": "10px",
          "margin-left": "330px",
          "font-size": "18px",

          "z-index": "2"
        }
      },{
        "type": "text",
        "value": "หรือเงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
        "css": {

          "margin-top": "30px",
          "margin-left": "240px",
          "font-size": "12px",
          "z-index": "2"
        }
      },{
        "type": "text",
        "value": "{{data2_3}}",
        "css": {
          "margin-top": " 20px",
          "margin-left": "490px",
          "font-size": "18px",
          "z-index": "2"
        }
      },{
        "type": "text",
        "value": "บาท",
        "css": {
          "margin-top": "20px",
          "margin-left": "610px",
          "font-size": "18px",

          "z-index": "2"
        }
      },{
        "type": "text",
        "value": "หรือเงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
        "css": {

          "margin-top": "40px",
          "margin-left": "450px",
          "font-size": "14px",
          "z-index": "2"
        }
      }, {
        "type": "text",
        "value": "วันครบรอบปี กรมธรรม์ที่",
        "class": "policy-year-text"
      }, {
        "type": "image",
        "value": "assets/img/projectform/graph/03/03_graph12.png",
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
          "margin-left": "808px"
        }
      }, {
        "type": "text",
        "value": "{{data3_1}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "10px",
          "margin-left": "200px"
        }
      }, {
        "type": "text",
        "value": "{{data3_2}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "10px",
          "margin-left": "350px"
        }
      }, {
        "type": "text",
        "value": "{{data3_3}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "10px",
          "margin-left": "500px"
        }
      }, {
        "type": "text",
        "value": "{{data3_4}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "10px",
          "margin-left": "650px"
        }
      }, {
        "type": "text",
        "value": "{{data3_5}}",
        "class": "section3-table-data",
        "css": {
          "margin-top": "10px",
          "margin-left": "790px"
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
          "name": "รับเงินคืน",
          "percentIncome": null,
          "income": null,
          "subItems": [
            {
              "name": "3% ตั้งแต่วันครบรอบปีกรมธรรม์ที่ 1-4 รวม 4 ครั้ง",
              "percentIncome": "12%*",
              "income": "{{income1}}"
            },
            {
              "name": "14% วันครบรอบปีกรมธรรม์ที่ 5 รวม 1 ครั้ง",
              "percentIncome": "14%*",
              "income": "{{income2}}"
            }
          ]
        },
        {
          "name": "ครบสัญญา รับเงินครบสัญญา",
          "percentIncome": "300%*",
          "income": "{{income3}}",
        },
        {
          "name": "รวมผลประโยชน์ตลอดสัญญา",
          "percentIncome": "326%*",
          "income": "{{income4}}",
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
        "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
      ]
    }
  ],
  "calculate": (sum, prospect, utils) => {
    const val0 = utils.numFormat(utils.formatInt(sum));
    const val1 = utils.numFormat(Math.round(utils.formatInt(sum)*0.03));
    const val2 = utils.numFormat(Math.round(utils.formatInt(sum)*2));
    const val3 = utils.numFormat(Math.round(utils.formatInt(sum)*3));
    const val4 = utils.numFormat(Math.round(utils.formatInt(sum)*3.14));
    const val5 = utils.numFormat(Math.round(utils.formatInt(sum)*0.12));
    const val6 = utils.numFormat(Math.round(utils.formatInt(sum)*3.26));
    const val7 = utils.numFormat(Math.round(utils.formatInt(sum)*0.14));

    return {
      data2_1: val0,
      data2_2: val2,
      data2_3: val3,
      data3_1: val1,
      data3_2: val1,
      data3_3: val1,
      data3_4: val1,
      data3_5: val4,
      income1: val5,
      income2: val7,
      income3: val3,
      income4: val6
    };
  }
}

