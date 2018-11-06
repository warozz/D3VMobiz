const tlplans = {
  "AC": {
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
            "width": "175px",
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
            "margin-top": "35px",
            "margin-left": "195px",
            "color": "#853807",
            "width": "500px",
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
            "width": "500px",
            "font-size": "25px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/04_graph.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "70px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/04_table_.png",
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
          "value": "{{data3_5}",
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
                "percentIncome": "120%*",
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
            "percentIncome": "520%*",
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
    ]
  },
  "AD": {
    "name": "บำนาญ 1 (มีเงินปันผล)",
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
        }, {
          "type": "text",
          "value": "{{data2_1}}",
          "css": {
            "margin-top": "9px",
            "margin-left": "230px",
            "color": "#c41a1c",
            "width": "175px",
            "font-size": "30px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "13px",
            "margin-left": "392px",
            "color": "#853807",
            "font-size": "24px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "หรือเงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "35px",
            "margin-left": "158px",
            "color": "#853807",
            "width": "500px",
            "font-size": "24px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "เงินค่าเวนคืนกรมธรรม์ +",
          "css": {
            "margin-top": "14px",
            "margin-left": "447px",
            "color": "#a01b16",
            "width": "500px",
            "font-size": "24px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "ค่ารักษาพยาบาลที่เหลือ (ถ้ามี)",
          "css": {
            "margin-top": "35px",
            "margin-left": "447px",
            "color": "#a01b16",
            "width": "500px",
            "font-size": "24px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "เงินค่าเวนคืนกรมธรรม์",
          "css": {
            "margin-top": "26px",
            "margin-left": "673px",
            "color": "#a01b16",
            "width": "500px",
            "font-size": "24px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/04/04_graph3.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "101px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/04_table2.png",
          "class": "section3-table"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/arrow1.png",
          "css": {
            "margin-top": "36px",
            "margin-left": "525px"
          }
        }, {
          "type": "image",
          "value": "/assets/img/projectform/arrow1.png",
          "css": {
            "margin-top": "66px",
            "margin-left": "525px"
          }
        }, {
          "type": "image",
          "value": "/assets/img/projectform/arrow1.png",
          "css": {
            "margin-top": "66px",
            "margin-left": "720px"
          }
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
          "value": "{{data3_1}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "5px",
            "margin-left": "415px"
          }
        }, {
          "type": "text",
          "value": "ค่ารักษาพยาบาล",
          "css": {
            "margin-top": "37px",
            "margin-left": "25px",
            "font-size": "22px",
            "width": "75px",
            "line-height": "13px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "37px",
            "margin-left": "415px"
          }
        }, {
          "type": "text",
          "value": "{{data3_3}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "37px",
            "margin-left": "635px"
          }
        }, {
          "type": "text",
          "value": "เงินบำนาญ",
          "css": {
            "margin-top": "68px",
            "margin-left": "37px",
            "font-size": "19px",
            "width": "42px",
            "text-align": "center",
            "line-height": "13px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "68px",
            "margin-left": "425px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "68px",
            "margin-left": "635px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "68px",
            "margin-left": "815px"
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
                "name": "รับเงินคืน 2%* ของทุนประกันคูณด้วยระยะเวลาชำระเบี้ยพร้อมเงินปันผล (ถ้ามี)**",
                "percentIncome": "118%*",
                "income": "{{income1}}"
              }
            ]
          },
          {
            "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่อายุ 60 - 70 ปี",
            "percentIncome": null,
            "income": null,
            "subItems": [
              {
                "name": "รับความคุ้มครองค่ารักษาพยาบาลปีละ 10%* รวม 10 ปี",
                "percentIncome": "100%*",
                "income": "{{income2}}"
              }
            ]
          },
          {
            "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่อายุ 60 - 99 ปี",
            "percentIncome": null,
            "income": null,
            "subItems": [
              {
                "name": "รับเงินคืน 10%* รวมสูงสุด 40 ครั้ง",
                "percentIncome": "400%*",
                "income": "{{income3}}"
              }
            ]
          },
          {
            "name": "รวมผลประโยชน์ตลอดสัญญา",
            "percentIncome": "618%*",
            "income": "{{income4}}"
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
          "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น โดยท่านสามารถชำระเบี้ยประกันภัยงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, เคาน์เตอร์เซอร์วิส, ธนาคาร ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากคู่มือผู้เอาประกันภัย",
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "AE": {
    "name": "เกษมบำนาญ 1 (มีเงินปันผล)",
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
            "width": "175px",
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
            "margin-top": "35px",
            "margin-left": "195px",
            "color": "#853807",
            "width": "500px",
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
            "width": "500px",
            "font-size": "25px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/04/04_graph2.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "70px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/04_table.png",
          "class": "section3-table"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/arrow1.png",
          "css": {
            "margin-top": "30px",
            "margin-left": "645px"
          }
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
          "value": "{{data3_5}",
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
                "name": "รับเงินคืน 2%* ของทุนประกันคูณด้วยระยะเวลาชำระเบี้ยพร้อมเงินปันผล (ถ้ามี)**",
                "percentIncome": "118%*",
                "income": "{{income1}}"
              }
            ]
          },
          {
            "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่อายุ 60 - 99 ปี\n",
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
            "percentIncome": "518%*",
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
          "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
          "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น โดยท่านสามารถชำระเบี้ยประกันภัยงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, เคาน์เตอร์เซอร์วิส, ธนาคาร" +
          " ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากคู่มือผู้เอาประกันภัย",
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "AF": {
    "name": "ธนอนันต์ 90/10",
    "info": {
      "section1": null,
      "section2": {
        "css": {
          "height": "131px"
        },
        "data": [{
          "type": "text",
          "value": "ความคุ้มครอง",
          "class": "protection-txt"
        }, {
          "type": "text",
          "value": "{{data2_1}}",
          "css": {
            "margin-top": "9px",
            "margin-left": "210px",
            "color": "#c41a1c",
            "width": "175px",
            "font-size": "30px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "13px",
            "margin-left": "374px",
            "color": "#853807",
            "font-size": "24px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "หรือเงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "37px",
            "margin-left": "155px",
            "color": "#853807",
            "width": "500px",
            "font-size": "23px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "เงินค่าเวนคืนกรมธรรม์",
          "css": {
            "margin-top": "23px",
            "margin-left": "560px",
            "color": "#a01b16",
            "width": "500px",
            "font-size": "25px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/2-03_graph.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/2-03_table.png",
          "class": "section3-table"
        }, {
          "type": "text",
          "value": "เงินคืน",
          "css": {
            "margin-top": "8px",
            "margin-left": "40px",
            "font-size": "22px",
            "width": "75px"
          }
        }, {
          "type": "text",
          "value": "{{data3_1}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "386px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "452px"
          }
        }, {
          "type": "text",
          "value": "{{data3_3}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "518px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "583px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "647px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "807px"
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
                "name": "รับเงินคืน",
                "percentIncome": "10%*",
                "income": "{{income1}}"
              },
              {
                "name": "รับเงินคืนเพิ่มขึ้นทุกปี ปีละ",
                "percentIncome": "0.5*% จนครบสัญญา",
                "income": null
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 60 ปี",
                "percentIncome": null,
                "income": "{{income2}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 61 ปี",
                "percentIncome": null,
                "income": "{{income3}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 62 ปี",
                "percentIncome": null,
                "income": "{{income4}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 63 ปี",
                "percentIncome": null,
                "income": "{{income5}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 64 ปี",
                "percentIncome": null,
                "income": "{{income6}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 65 ปี",
                "percentIncome": null,
                "income": "{{income7}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 66 ปี",
                "percentIncome": null,
                "income": "{{income8}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 67 ปี",
                "percentIncome": null,
                "income": "{{income9}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 68 ปี",
                "percentIncome": null,
                "income": "{{income10}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 69 ปี",
                "percentIncome": null,
                "income": "{{income11}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 70 ปี",
                "percentIncome": null,
                "income": "{{income12}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 71 ปี",
                "percentIncome": null,
                "income": "{{income13}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 72 ปี",
                "percentIncome": null,
                "income": "{{income14}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 73 ปี",
                "percentIncome": null,
                "income": "{{income15}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 74 ปี",
                "percentIncome": null,
                "income": "{{income16}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 75 ปี",
                "percentIncome": null,
                "income": "{{income17}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 76 ปี",
                "percentIncome": null,
                "income": "{{income18}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 77 ปี",
                "percentIncome": null,
                "income": "{{income19}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 78 ปี",
                "percentIncome": null,
                "income": "{{income20}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 79 ปี",
                "percentIncome": null,
                "income": "{{income21}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 80 ปี",
                "percentIncome": null,
                "income": "{{income22}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 81 ปี",
                "percentIncome": null,
                "income": "{{income23}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 82 ปี",
                "percentIncome": null,
                "income": "{{income24}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 83 ปี",
                "percentIncome": null,
                "income": "{{income25}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 84 ปี",
                "percentIncome": null,
                "income": "{{income26}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 85 ปี",
                "percentIncome": null,
                "income": "{{income27}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 86 ปี",
                "percentIncome": null,
                "income": "{{income28}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 87 ปี",
                "percentIncome": null,
                "income": "{{income29}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 88 ปี",
                "percentIncome": null,
                "income": "{{income30}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 89 ปี",
                "percentIncome": null,
                "income": "{{income31}}",
                "indentLevel": 2
              },
              {
                "name": "ปีกรมธรรม์ที่อายุครบ 90 ปี",
                "percentIncome": null,
                "income": "{{income32}}",
                "indentLevel": 2
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
          }
        ]
      },
      {
        "type": "condition",
        "items": [
          "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้ เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
          "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น โดยท่านสามารถชำระเบี้ยประกันภัยงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, เคาน์เตอร์เซอร์วิส, ธนาคาร ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากคู่มือผู้เอาประกันภัย",
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)\n",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "AG01": {
    "name": "ทรัพย์บำนาญ55 (90/1)",
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
        }, {
          "type": "text",
          "value": "{{data2_1}}",
          "css": {
            "margin-top": "18px",
            "margin-left": "155px",
            "width": "130px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "18px",
            "margin-left": "260px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "หรือเงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "18px",
            "margin-left": "290px",
            "color": "#853807",
            "width": "500px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "มูลค่าปัจจุบันของเงินบำนาญที่เหลืออยู่**",
          "css": {
            "margin-top": "20px",
            "margin-left": "510px",
            "width": "500px",
            "font-size": "18px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/02_graph16.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table.png",
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
            "margin-left": "486px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "552px"
          }
        }, {
          "type": "text",
          "value": "{{data3_3}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "618px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "683px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "747px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "865px"
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
            "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่อายุ 55 ปี ถึงอายุ 90 ปี",
            "percentIncome": null,
            "income": null,
            "subItems": [
              {
                "name": "รับเงินบำนาญ ปีละ",
                "percentIncome": "10%*",
                "income": "{{income1}}",
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 36 ปี",
                "percentIncome": "360%*",
                "income": "{{income2}}",
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 15 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 15 ปี"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{income1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 55 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
          }
        ]
      },
      {
        "type": "condition",
        "items": [
          "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้ เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
          "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น",
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "เบี้ยประกันชีวิตแบบบำนาญสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริงเพิ่มขึ้นอีกไม่เกินปีละ 200,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 194)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ " +
          "ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "AG05": {
    "name": "ทรัพย์บำนาญ55 (90/5)",
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
        }, {
          "type": "text",
          "value": "{{data2_1}}",
          "css": {
            "margin-top": "18px",
            "margin-left": "155px",
            "width": "130px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "18px",
            "margin-left": "260px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "หรือเงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "18px",
            "margin-left": "290px",
            "color": "#853807",
            "width": "500px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "มูลค่าปัจจุบันของเงินบำนาญที่เหลืออยู่**",
          "css": {
            "margin-top": "20px",
            "margin-left": "510px",
            "width": "500px",
            "font-size": "18px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/02_graph17.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table.png",
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
            "margin-left": "486px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "552px"
          }
        }, {
          "type": "text",
          "value": "{{data3_3}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "618px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "683px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "747px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "865px"
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
            "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่อายุ 55 ปี ถึงอายุ 90 ปี",
            "percentIncome": null,
            "income": null,
            "subItems": [
              {
                "name": "รับเงินบำนาญ ปีละ",
                "percentIncome": "10%*",
                "income": "{{income1}}",
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 36 ปี",
                "percentIncome": "360%*",
                "income": "{{income2}}",
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 15 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับ มูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 15 ปี\n"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{income1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 55 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
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
    ]
  },
  "AG10": {
    "name": "ทรัพย์บำนาญ55 (90/10)",
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
        }, {
          "type": "text",
          "value": "{{data2_1}}",
          "css": {
            "margin-top": "18px",
            "margin-left": "155px",
            "width": "130px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "18px",
            "margin-left": "260px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "หรือเงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "18px",
            "margin-left": "290px",
            "color": "#853807",
            "width": "500px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "มูลค่าปัจจุบันของเงินบำนาญที่เหลืออยู่**",
          "css": {
            "margin-top": "20px",
            "margin-left": "510px",
            "width": "500px",
            "font-size": "18px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/02_graph18.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table.png",
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
            "margin-left": "486px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "552px"
          }
        }, {
          "type": "text",
          "value": "{{data3_3}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "618px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "683px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "747px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "865px"
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
            "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่อายุ 55 ปี ถึงอายุ 90 ปี",
            "percentIncome": null,
            "income": null,
            "subItems": [
              {
                "name": "รับเงินบำนาญ ปีละ",
                "percentIncome": "10%*",
                "income": "{{income1}}",
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 36 ปี",
                "percentIncome": "360%*",
                "income": "{{income2}}",
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 15 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 15 ปี"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{income1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 55 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี "
          }
        ]
      },
      {
        "type": "condition",
        "items": [
          "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้ เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
          "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น โดยท่านสามารถชำระเบี้ยประกันภัยงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, เคาน์เตอร์เซอร์วิส, " +
          "ธนาคาร ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากคู่มือผู้เอาประกันภัย",
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "เบี้ยประกันชีวิตแบบบำนาญสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริงเพิ่มขึ้นอีกไม่เกินปีละ 200,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 194)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ" +
          " ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "AG15": {
    "name": "ทรัพย์บำนาญ55 (90/15)",
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
        }, {
          "type": "text",
          "value": "{{data2_1}}",
          "css": {
            "margin-top": "18px",
            "margin-left": "155px",
            "width": "130px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "18px",
            "margin-left": "260px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "หรือเงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "18px",
            "margin-left": "290px",
            "color": "#853807",
            "width": "500px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "มูลค่าปัจจุบันของเงินบำนาญที่เหลืออยู่**",
          "css": {
            "margin-top": "20px",
            "margin-left": "510px",
            "width": "500px",
            "font-size": "18px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/02_graph19.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table.png",
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
            "margin-left": "486px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "552px"
          }
        }, {
          "type": "text",
          "value": "{{data3_3}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "618px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "683px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "747px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "865px"
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
            "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่อายุ 55 ปี ถึงอายุ 90 ปี",
            "percentIncome": null,
            "income": null,
            "subItems": [
              {
                "name": "รับเงินบำนาญ ปีละ",
                "percentIncome": "10%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 36 ปี",
                "percentIncome": "360%*",
                "income": "{{income2}}"
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 15 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 15 ปี"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{include1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 55 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
          }
        ]
      },
      {
        "type": "condition",
        "items": [
          "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้ เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
          "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น โดยท่านสามารถชำระเบี้ยประกันภัยงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, เคาน์เตอร์เซอร์วิส, " +
          "ธนาคาร ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากคู่มือผู้เอาประกันภัย",
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "เบี้ยประกันชีวิตแบบบำนาญสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริงเพิ่มขึ้นอีกไม่เกินปีละ 200,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 194)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน\"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "AG50": {
    "name": "ทรัพย์บำนาญ55 (90/50)",
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
        }, {
          "type": "text",
          "value": "{{data2_1}}",
          "css": {
            "margin-top": "18px",
            "margin-left": "155px",
            "width": "130px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "18px",
            "margin-left": "260px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "หรือเงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "18px",
            "margin-left": "290px",
            "color": "#853807",
            "width": "500px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "มูลค่าปัจจุบันของเงินบำนาญที่เหลืออยู่**",
          "css": {
            "margin-top": "20px",
            "margin-left": "510px",
            "width": "500px",
            "font-size": "18px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/02_graph20.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table.png",
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
            "margin-left": "486px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "552px"
          }
        }, {
          "type": "text",
          "value": "{{data3_3}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "618px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "683px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "747px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "865px"
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
            "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่อายุ 55 ปี ถึงอายุ 90 ปี",
            "percentIncome": null,
            "income": null, // For map caculate object in key "income1"
            "subItems": [
              {
                "name": "รับเงินบำนาญ ปีละ",
                "percentIncome": "10%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 36 ปี",
                "percentIncome": "360%*",
                "income": "{{income2}}"
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
            "iconText": "*",
            "color": "c-blue",
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 15 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 15 ปี"
          },
          {
            "iconText": "*",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ 0 บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 55 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
          }
        ]
      },
      {
        "type": "condition",
        "items": [
          "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้ เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
          "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น โดยท่านสามารถชำระเบี้ยประกันภัยงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, เคาน์เตอร์เซอร์วิส, " +
          "ธนาคาร ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากคู่มือผู้เอาประกันภัย",
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "เบี้ยประกันชีวิตแบบบำนาญสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริงเพิ่มขึ้นอีกไม่เกินปีละ 200,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 194)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ " +
          "ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "AG55": {
    "name": "ทรัพย์บำนาญ55 (90/55)",
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
        }, {
          "type": "text",
          "value": "{{data2_1}}",
          "css": {
            "margin-top": "18px",
            "margin-left": "155px",
            "width": "130px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "18px",
            "margin-left": "260px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "หรือเงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "18px",
            "margin-left": "290px",
            "color": "#853807",
            "width": "500px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "มูลค่าปัจจุบันของเงินบำนาญที่เหลืออยู่**",
          "css": {
            "margin-top": "20px",
            "margin-left": "510px",
            "width": "500px",
            "font-size": "18px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/02_graph21.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table.png",
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
            "margin-left": "486px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "552px"
          }
        }, {
          "type": "text",
          "value": "{{data3_3}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "618px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "683px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "747px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "865px"
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
            "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่อายุ 55 ปี ถึงอายุ 90 ปี",
            "percentIncome": null,
            "income": null,
            "subItems": [
              {
                "name": "รับเงินบำนาญ ปีละ",
                "percentIncome": "10%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 36 ปี ",
                "percentIncome": "360%*",
                "income": "{{income2}}"
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
            "message": "อัตราร้อยละของจำนวนเงินเอาประกันภัย "
          },
          {
            "iconText": "**",
            "color": "c-blue",
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 15 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 15 ปี "
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป " +
              "และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\" "
          }
        ]
      },
      {
        "type": "condition",
        "items": [
          "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้ เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
          "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น โดยท่านสามารถชำระเบี้ยประกันภัยงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, เคาน์เตอร์เซอร์วิส, " +
          "ธนาคาร ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากคู่มือผู้เอาประกันภัย",
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "เบี้ยประกันชีวิตแบบบำนาญสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริงเพิ่มขึ้นอีกไม่เกินปีละ 200,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 194)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ " +
          "ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "AH01": {
    "name": "ทรัพย์บำนาญ60 (90/1)",
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
        }, {
          "type": "text",
          "value": "{{data2_1}}",
          "css": {
            "margin-top": "18px",
            "margin-left": "155px",
            "width": "130px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "18px",
            "margin-left": "260px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "หรือเงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "18px",
            "margin-left": "290px",
            "color": "#853807",
            "width": "500px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "มูลค่าปัจจุบันของเงินบำนาญที่เหลืออยู่**",
          "css": {
            "margin-top": "20px",
            "margin-left": "510px",
            "width": "500px",
            "font-size": "18px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/02_graph22.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table2.png",
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
            "margin-left": "486px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "552px"
          }
        }, {
          "type": "text",
          "value": "{{data3_3}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "618px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "683px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "747px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "865px"
          }
        }]
      }
    }, "summary": [
      {
        "type": "item",
        "title": "สรุปผลประโยชน์ตลอดสัญญา",
        "items": [
          {
            "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่อายุ 60 ปี ถึงอายุ 90 ปี",
            "percentIncome": null,
            "income": null,
            "subItems": [
              {
                "name": "รับเงินบำนาญ ปีละ",
                "percentIncome": "10%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 31 ปี",
                "percentIncome": "310%*",
                "income": "{{income2}}"
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
            "message": "อัตราร้อยละของจำนวนเงินเอาประกันภัย "
          },
          {
            "iconText": "**",
            "color": "c-blue",
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 15 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับ มูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 15 ปี "
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{income1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 60 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
          }
        ]
      },
      {
        "type": "condition",
        "items": [
          "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
          "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น",
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "เบี้ยประกันชีวิตแบบบำนาญสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริงเพิ่มขึ้นอีกไม่เกินปีละ 200,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 194)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ" +
          " ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "AH05": {
    "name": "ทรัพย์บำนาญ60 (90/5)",
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
        }, {
          "type": "text",
          "value": "{{data2_1}}",
          "css": {
            "margin-top": "18px",
            "margin-left": "155px",
            "width": "130px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "18px",
            "margin-left": "260px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "หรือเงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "18px",
            "margin-left": "290px",
            "color": "#853807",
            "width": "500px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "มูลค่าปัจจุบันของเงินบำนาญที่เหลืออยู่**",
          "css": {
            "margin-top": "20px",
            "margin-left": "510px",
            "width": "500px",
            "font-size": "18px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/02_graph23.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table2.png",
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
            "margin-left": "486px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "552px"
          }
        }, {
          "type": "text",
          "value": "{{data3_3}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "618px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "683px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "747px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "865px"
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
            "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่อายุ 60 ปี ถึงอายุ 90 ปี",
            "percentIncome": null,
            "income": null,
            "subItems": [
              {
                "name": "รับเงินบำนาญ ปีละ",
                "percentIncome": "10%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 31 ปี",
                "percentIncome": "310%*",
                "income": "{{income2}}"
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 15 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับ มูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 15 ปี"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{income1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 60 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
          }
        ]
      },
      {
        "type": "condition",
        "items": [
          "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
          "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น โดยท่านสามารถชำระเบี้ยประกันภัยงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, เคาน์เตอร์เซอร์วิส, ธนาคาร ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากคู่มือผู้เอาประกันภัย",
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "เบี้ยประกันชีวิตแบบบำนาญสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริงเพิ่มขึ้นอีกไม่เกินปีละ 200,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 194)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "AH10": {
    "name": "ทรัพย์บำนาญ60 (90/10)",
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
        }, {
          "type": "text",
          "value": "{{data2_1}}",
          "css": {
            "margin-top": "18px",
            "margin-left": "155px",
            "width": "130px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "18px",
            "margin-left": "260px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "หรือเงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "18px",
            "margin-left": "290px",
            "color": "#853807",
            "width": "500px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "มูลค่าปัจจุบันของเงินบำนาญที่เหลืออยู่**",
          "css": {
            "margin-top": "20px",
            "margin-left": "510px",
            "width": "500px",
            "font-size": "18px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/02_graph24.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table2.png",
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
            "margin-left": "486px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "552px"
          }
        }, {
          "type": "text",
          "value": "{{data3_3}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "618px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "683px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "747px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "865px"
          }
        }]
      }
    }, "summary": [
      {
        "type": "item",
        "title": "สรุปผลประโยชน์ตลอดสัญญา",
        "items": [
          {
            "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่อายุ 60 ปี ถึงอายุ 90 ปี",
            "percentIncome": null,
            "income": null,
            "subItems": [
              {
                "name": "รับเงินบำนาญ ปีละ",
                "percentIncome": "10%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 31 ปี",
                "percentIncome": "310%*",
                "income": "{{income2}}"
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 15 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 15 ปี"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{income1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 60 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
          }
        ]
      },
      {
        "type": "condition",
        "items": [
          "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
          "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น โดยท่านสามารถชำระเบี้ยประกันภัยงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, เคาน์เตอร์เซอร์วิส, ธนาคาร ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากคู่มือผู้เอาประกันภัย",
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "เบี้ยประกันชีวิตแบบบำนาญสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริงเพิ่มขึ้นอีกไม่เกินปีละ 200,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 194)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "AH15": {
    "name": "ทรัพย์บำนาญ60 (90/15)",
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
        }, {
          "type": "text",
          "value": "{{data2_1}}",
          "css": {
            "margin-top": "18px",
            "margin-left": "155px",
            "width": "130px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "18px",
            "margin-left": "260px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "หรือเงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "18px",
            "margin-left": "290px",
            "color": "#853807",
            "width": "500px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "มูลค่าปัจจุบันของเงินบำนาญที่เหลืออยู่**",
          "css": {
            "margin-top": "20px",
            "margin-left": "510px",
            "width": "500px",
            "font-size": "18px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/02_graph25.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table2.png",
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
            "margin-left": "486px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "552px"
          }
        }, {
          "type": "text",
          "value": "{{data3_3}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "618px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "683px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "747px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "865px"
          }
        }]
      }
    },"summary": [
      {
        "type": "item",
        "title": "สรุปผลประโยชน์ตลอดสัญญา",
        "items": [
          {
            "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่อายุ 60 ปี ถึงอายุ 90 ปี",
            "percentIncome": null,
            "income": null,
            "subItems": [
              {
                "name": "รับเงินบำนาญ ปีละ",
                "percentIncome": "10%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 31 ปี",
                "percentIncome": "310%*",
                "income": "{{income2}}"
              },
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
            "message": "อัตราร้อยละของจำนวนเงินเอาประกันภัย "
          },
          {
            "iconText": "**",
            "color": "c-blue",
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 15 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 15 ปี"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{income1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 60 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
          }
        ]
      },
      {
        "type": "condition",
        "items": [
          "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
          "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น โดยท่านสามารถชำระเบี้ยประกันภัยงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, เคาน์เตอร์เซอร์วิส, ธนาคาร ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากคู่มือผู้เอาประกันภัย",
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "เบี้ยประกันชีวิตแบบบำนาญสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริงเพิ่มขึ้นอีกไม่เกินปีละ 200,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 194)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "AH50": {
    "name": "ทรัพย์บำนาญ60 (90/50)",
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
        }, {
          "type": "text",
          "value": "{{data2_1}}",
          "css": {
            "margin-top": "18px",
            "margin-left": "155px",
            "width": "130px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "18px",
            "margin-left": "260px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "หรือเงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "18px",
            "margin-left": "290px",
            "color": "#853807",
            "width": "500px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "มูลค่าปัจจุบันของเงินบำนาญที่เหลืออยู่**",
          "css": {
            "margin-top": "20px",
            "margin-left": "510px",
            "width": "500px",
            "font-size": "18px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/02_graph26.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table2.png",
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
            "margin-left": "486px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "552px"
          }
        }, {
          "type": "text",
          "value": "{{data3_3}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "618px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "683px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "747px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "865px"
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
            "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่อายุ 60 ปี ถึงอายุ 90 ปี",
            "percentIncome": null,
            "income": null,
            "subItems": [
              {
                "name": "รับเงินบำนาญ ปีละ",
                "percentIncome": "10%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 31 ปี",
                "percentIncome": "310%*",
                "income": "{{income1}}"
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 15 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 15 ปี"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{income1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 60 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
          }
        ]
      },
      {
        "type": "condition",
        "items": [
          "หัวข้อ 1",
          "หัวข้อ 2",
          "หัวข้อ 3",
          "หัวข้อ 4"
        ]
      },
      {
        "type": "condition",
        "items": [
          "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
          "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น โดยท่านสามารถชำระเบี้ยประกันภัยงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, เคาน์เตอร์เซอร์วิส, ธนาคาร ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากคู่มือผู้เอาประกันภัย",
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "เบี้ยประกันชีวิตแบบบำนาญสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริงเพิ่มขึ้นอีกไม่เกินปีละ 200,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 194)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "AH55": {
    "name": "ทรัพย์บำนาญ60 (90/55)",
    "info": {
      "section1": null,
      "section2": {
        "css": {
          "height": "134px"
        },
        "data": [{
          "type": "text",
          "value": "ความคุ้มครอง",
          "css": {
            "margin-top": "15px",
            "margin-left": "5px",
            "width": "175px",
            "font-size": "25px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "{{data2_1}}",
          "css": {
            "margin-top": "18px",
            "margin-left": "155px",
            "width": "130px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "18px",
            "margin-left": "260px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "หรือเงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "18px",
            "margin-left": "290px",
            "color": "#853807",
            "width": "500px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "มูลค่าปัจจุบันของเงินบำนาญที่เหลืออยู่**",
          "css": {
            "margin-top": "20px",
            "margin-left": "510px",
            "width": "500px",
            "font-size": "18px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/02_graph27.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table2.png",
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
            "margin-left": "486px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "552px"
          }
        }, {
          "type": "text",
          "value": "{{data3_3}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "618px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "683px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "747px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "865px"
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
            "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่อายุ 60 ปี ถึงอายุ 90 ปี",
            "percentIncome": null,
            "income": null,
            "subItems": [
              {
                "name": "รับเงินบำนาญ ปีละ",
                "percentIncome": "10%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 31 ปี",
                "percentIncome": "310%*",
                "income": "{{income2}}"
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
                "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 15 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 15 ปี"
              },
              {
                "iconText": "***",
                "color": "c-blue",
                "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ 0 บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 60 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
              }
            ]
          }
        ]
      },
      {
        "type": "condition",
        "items": [
          "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
          "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น โดยท่านสามารถชำระเบี้ยประกันภัยงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, เคาน์เตอร์เซอร์วิส, ธนาคาร ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากคู่มือผู้เอาประกันภัย",
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "เบี้ยประกันชีวิตแบบบำนาญสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริงเพิ่มขึ้นอีกไม่เกินปีละ 200,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 194)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "AH60": {
    "name": "ทรัพย์บำนาญ60 (90/60)",
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
        }, {
          "type": "text",
          "value": "{{data2_1}}",
          "css": {
            "margin-top": "18px",
            "margin-left": "155px",
            "width": "130px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "18px",
            "margin-left": "260px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "หรือเงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "18px",
            "margin-left": "290px",
            "color": "#853807",
            "width": "500px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "มูลค่าปัจจุบันของเงินบำนาญที่เหลืออยู่**",
          "css": {
            "margin-top": "20px",
            "margin-left": "510px",
            "width": "500px",
            "font-size": "18px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/02_graph28.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table2.png",
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
            "margin-left": "486px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "552px"
          }
        }, {
          "type": "text",
          "value": "{{data3_3}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "618px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "683px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "747px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "865px"
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
            "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่อายุ 60 ปี ถึงอายุ 90 ปี",
            "percentIncome": null,
            "income": null,
            "subItems": [
              {
                "name": "รับเงินบำนาญ ปีละ",
                "percentIncome": "10%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 31 ปี",
                "percentIncome": "310%*",
                "income": "{{income2}}"
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 15 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 15 ปี"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ 0 บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 60 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
          }
        ]
      },
      {
        "type": "condition",
        "items": [
          "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
          "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น โดยท่านสามารถชำระเบี้ยประกันภัยงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, เคาน์เตอร์เซอร์วิส, ธนาคาร ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากคู่มือผู้เอาประกันภัย",
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "เบี้ยประกันชีวิตแบบบำนาญสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริงเพิ่มขึ้นอีกไม่เกินปีละ 200,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 194)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "AI01": {
    "name": "ทรัพย์บำนาญ65 (90/1)",
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
        }, {
          "type": "text",
          "value": "{{data2_1}}",
          "css": {
            "margin-top": "18px",
            "margin-left": "155px",
            "width": "130px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "18px",
            "margin-left": "260px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "หรือเงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "18px",
            "margin-left": "290px",
            "color": "#853807",
            "width": "500px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "มูลค่าปัจจุบันของเงินบำนาญที่เหลืออยู่**",
          "css": {
            "margin-top": "20px",
            "margin-left": "503px",
            "width": "500px",
            "font-size": "18px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/02_graph29.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table2.png",
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
            "margin-left": "486px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "552px"
          }
        }, {
          "type": "text",
          "value": "{{data3_3}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "618px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "683px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "747px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "865px"
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
                "percentIncome": "10%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 26 ปี",
                "percentIncome": "260%*",
                "income": "{{income2}}"
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 15 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 15 ปี"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{income1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 65 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
          }
        ]
      },
      {
        "type": "condition",
        "items": [
          "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
          "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น",
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "เบี้ยประกันชีวิตแบบบำนาญสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริงเพิ่มขึ้นอีกไม่เกินปีละ 200,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 194)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "AI05": {
    "name": "ทรัพย์บำนาญ65 (90/5)",
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
        }, {
          "type": "text",
          "value": "{{data2_1}}",
          "css": {
            "margin-top": "18px",
            "margin-left": "155px",
            "width": "130px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "18px",
            "margin-left": "260px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "หรือเงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "18px",
            "margin-left": "290px",
            "color": "#853807",
            "width": "500px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "มูลค่าปัจจุบันของเงินบำนาญที่เหลืออยู่**",
          "css": {
            "margin-top": "20px",
            "margin-left": "503px",
            "width": "500px",
            "font-size": "18px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/02_graph30.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table2.png",
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
            "margin-left": "486px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "552px"
          }
        }, {
          "type": "text",
          "value": "{{data3_3}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "618px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "683px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "747px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "865px"
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
                "percentIncome": "10%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 26 ปี",
                "percentIncome": "260%*",
                "income": "{{income2}}"
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 15 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 15 ปี\n"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{income1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 65 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
          }
        ]
      },
      {
        "type": "condition",
        "items": [
          "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
          "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น โดยท่านสามารถชำระเบี้ยประกันภัยงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, เคาน์เตอร์เซอร์วิส, ธนาคาร ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากคู่มือผู้เอาประกันภัย",
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "เบี้ยประกันชีวิตแบบบำนาญสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริงเพิ่มขึ้นอีกไม่เกินปีละ 200,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 194)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "AI10": {
    "name": "ทรัพย์บำนาญ65 (90/10)",
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
        }, {
          "type": "text",
          "value": "{{data2_1}}",
          "css": {
            "margin-top": "18px",
            "margin-left": "155px",
            "width": "130px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "18px",
            "margin-left": "260px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "หรือเงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "18px",
            "margin-left": "290px",
            "color": "#853807",
            "width": "500px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "มูลค่าปัจจุบันของเงินบำนาญที่เหลืออยู่**",
          "css": {
            "margin-top": "20px",
            "margin-left": "503px",
            "width": "500px",
            "font-size": "18px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/02_graph31.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table2.png",
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
            "margin-left": "486px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "552px"
          }
        }, {
          "type": "text",
          "value": "{{data3_3}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "618px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "683px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "747px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "865px"
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
                "percentIncome": "10%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 26 ปี",
                "percentIncome": "260%*",
                "income": "{{income2}}"
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 15 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 15 ปี"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{income1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 65 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
          }
        ]
      },
      {
        "type": "condition",
        "items": [
          "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
          "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น โดยท่านสามารถชำระเบี้ยประกันภัยงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, เคาน์เตอร์เซอร์วิส, ธนาคาร ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากคู่มือผู้เอาประกันภัย",
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "เบี้ยประกันชีวิตแบบบำนาญสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริงเพิ่มขึ้นอีกไม่เกินปีละ 200,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 194)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "AI15": {
    "name": "ทรัพย์บำนาญ65 (90/15)",
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
        }, {
          "type": "text",
          "value": "{{data2_1}}",
          "css": {
            "margin-top": "18px",
            "margin-left": "155px",
            "width": "130px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "18px",
            "margin-left": "260px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "หรือเงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "18px",
            "margin-left": "290px",
            "color": "#853807",
            "width": "500px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "มูลค่าปัจจุบันของเงินบำนาญที่เหลืออยู่**",
          "css": {
            "margin-top": "20px",
            "margin-left": "503px",
            "width": "500px",
            "font-size": "18px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/02_graph32.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table2.png",
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
            "margin-left": "486px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "552px"
          }
        }, {
          "type": "text",
          "value": "{{data3_3}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "618px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "683px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "747px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "865px"
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
                "percentIncome": "10%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 26 ปี",
                "percentIncome": "260%*",
                "income": "{{income2}}"
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 15 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 15 ปี\n"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{include1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 65 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
          }
        ]
      },
      {
        "type": "condition",
        "items": [
          "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
          "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น โดยท่านสามารถชำระเบี้ยประกันภัยงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, เคาน์เตอร์เซอร์วิส, ธนาคาร ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากคู่มือผู้เอาประกันภัย",
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "เบี้ยประกันชีวิตแบบบำนาญสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริงเพิ่มขึ้นอีกไม่เกินปีละ 200,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 194)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "AI50": {
    "name": "ทรัพย์บำนาญ65 (90/50)",
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
        }, {
          "type": "text",
          "value": "{{data2_1}}",
          "css": {
            "margin-top": "18px",
            "margin-left": "155px",
            "width": "130px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "18px",
            "margin-left": "260px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "หรือเงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "18px",
            "margin-left": "290px",
            "color": "#853807",
            "width": "500px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "มูลค่าปัจจุบันของเงินบำนาญที่เหลืออยู่**",
          "css": {
            "margin-top": "20px",
            "margin-left": "503px",
            "width": "500px",
            "font-size": "18px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/02_graph33.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table2.png",
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
            "margin-left": "486px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "552px"
          }
        }, {
          "type": "text",
          "value": "{{data3_3}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "618px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "683px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "747px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "865px"
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
                "percentIncome": "10%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 26 ปี",
                "percentIncome": "260%*",
                "income": "{{income2}}"
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 15 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 15 ปี\n"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{include1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 65 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
          }
        ]
      },
      {
        "type": "condition",
        "items": [
          "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
          "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น โดยท่านสามารถชำระเบี้ยประกันภัยงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, เคาน์เตอร์เซอร์วิส, ธนาคาร ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากคู่มือผู้เอาประกันภัย",
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "เบี้ยประกันชีวิตแบบบำนาญสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริงเพิ่มขึ้นอีกไม่เกินปีละ 200,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 194)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "AI55": {
    "name": "ทรัพย์บำนาญ65 (90/55)",
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
        }, {
          "type": "text",
          "value": "{{data2_1}}",
          "css": {
            "margin-top": "18px",
            "margin-left": "155px",
            "width": "130px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "18px",
            "margin-left": "260px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "หรือเงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "18px",
            "margin-left": "290px",
            "color": "#853807",
            "width": "500px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "มูลค่าปัจจุบันของเงินบำนาญที่เหลืออยู่**",
          "css": {
            "margin-top": "20px",
            "margin-left": "503px",
            "width": "500px",
            "font-size": "18px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/02_graph34.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table2.png",
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
            "margin-left": "486px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "552px"
          }
        }, {
          "type": "text",
          "value": "{{data3_3}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "618px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "683px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "747px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "865px"
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
                "percentIncome": "10%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 26 ปี",
                "percentIncome": "260%*",
                "income": "{{income2}}"
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 15 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 15 ปี\n"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{include1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 65 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
          }
        ]
      },
      {
        "type": "condition",
        "items": [
          "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
          "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น โดยท่านสามารถชำระเบี้ยประกันภัยงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, เคาน์เตอร์เซอร์วิส, ธนาคาร ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากคู่มือผู้เอาประกันภัย",
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "เบี้ยประกันชีวิตแบบบำนาญสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริงเพิ่มขึ้นอีกไม่เกินปีละ 200,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 194)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "AI60": {
    "name": "ทรัพย์บำนาญ65 (90/60)",
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
        }, {
          "type": "text",
          "value": "{{data2_1}}",
          "css": {
            "margin-top": "18px",
            "margin-left": "155px",
            "width": "130px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "18px",
            "margin-left": "260px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "หรือเงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "18px",
            "margin-left": "290px",
            "color": "#853807",
            "width": "500px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "มูลค่าปัจจุบันของเงินบำนาญที่เหลืออยู่**",
          "css": {
            "margin-top": "20px",
            "margin-left": "501px",
            "width": "500px",
            "font-size": "18px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/02_graph35.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table2.png",
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
            "margin-left": "486px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "552px"
          }
        }, {
          "type": "text",
          "value": "{{data3_3}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "618px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "683px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "747px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "865px"
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
                "percentIncome": "10%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 26 ปี",
                "percentIncome": "260%*",
                "income": "{{income2}}"
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 15 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 15 ปี\n"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{include1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 65 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
          }
        ]
      },
      {
        "type": "condition",
        "items": [
          "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
          "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น โดยท่านสามารถชำระเบี้ยประกันภัยงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, เคาน์เตอร์เซอร์วิส, ธนาคาร ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากคู่มือผู้เอาประกันภัย",
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "เบี้ยประกันชีวิตแบบบำนาญสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริงเพิ่มขึ้นอีกไม่เกินปีละ 200,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 194)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "AI65": {
    "name": "ทรัพย์บำนาญ65 (90/65)",
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
        }, {
          "type": "text",
          "value": "{{data2_1}}",
          "css": {
            "margin-top": "18px",
            "margin-left": "155px",
            "width": "130px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "18px",
            "margin-left": "260px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "หรือเงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "18px",
            "margin-left": "290px",
            "color": "#853807",
            "width": "500px",
            "font-size": "20px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "มูลค่าปัจจุบันของเงินบำนาญที่เหลืออยู่**",
          "css": {
            "margin-top": "20px",
            "margin-left": "501px",
            "width": "500px",
            "font-size": "18px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/02_graph36.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table2.png",
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
            "margin-left": "486px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "552px"
          }
        }, {
          "type": "text",
          "value": "{{data3_3}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "618px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "683px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "747px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "17px",
            "margin-left": "865px"
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
                "percentIncome": "10%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 26 ปี",
                "percentIncome": "260%*",
                "income": "{{income2}}"
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 15 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 15 ปี\n"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{include1}} บาท  ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 65 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
          }
        ]
      },
      {
        "type": "condition",
        "items": [
          "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
          "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น โดยท่านสามารถชำระเบี้ยประกันภัยงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, เคาน์เตอร์เซอร์วิส, ธนาคาร ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากคู่มือผู้เอาประกันภัย",
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "เบี้ยประกันชีวิตแบบบำนาญสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริงเพิ่มขึ้นอีกไม่เกินปีละ 200,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 194)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "AJ": {
    "name": "ทรัพย์บำนาญ1 (90/1)",
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
          "value": "มูลค่าปัจจุบันของเงินบำนาญที่เหลืออยู่**",
          "css": {
            "margin-top": "20px",
            "margin-left": "210px",
            "width": "500px",
            "font-size": "18px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/02_graph62.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table2.png",
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
            "margin-left": "180px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "20px",
            "margin-left": "250px"
          }
        }, {
          "type": "text",
          "value": "{{data3_3}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "320px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "20px",
            "margin-left": "480px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "720px"
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
            "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่ 1 ถึงอายุ 90 ปี",
            "percentIncome": null,
            "income": null,
            "subItems": [
              {
                "name": "รับเงินบำนาญ ปีละ",
                "percentIncome": "10%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 90 ปี",
                "percentIncome": "900%*",
                "income": "{{income2}}"
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 15 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 15 ปี\n"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{include1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ 1 ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
          }
        ]
      },
      {
        "type": "condition",
        "items": [
          "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
          "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น",
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "เบี้ยประกันชีวิตแบบบำนาญสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริงเพิ่มขึ้นอีกไม่เกินปีละ 200,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 194)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "AK": {
    "name": "เกษมบำนาญ 2",
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
            "margin-top": " 8px",
            "margin-left": "150px",
            "font-size": "22px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "8px",
            "margin-left": "255px",
            "font-size": "20px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "หรือ เงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "8px",
            "margin-left": "290px",
            "font-size": "20px",
            "width": "500px",
            "z-index": "2",
            "color": "#c41a1c"
          }
        },{
          "type": "text",
          "value": "หรือ เบี้ยประกันภัยที่ชำระมาแล้วทั้งหมด (จำนวนที่มากกว่า)",
          "css": {
            "margin-top": "28px",
            "margin-left": "165px",
            "font-size": "20px",
            "width": "500px",
            "z-index": "2",
            "color": "#c41a1c"
          }
        },{
          "type": "text",
          "value": "มูลค่าปัจจุบันของเงินบำนาญที่เหลืออยู่**",
          "css": {
            "margin-top": "21px",
            "margin-left": "565px",
            "font-size": "15px",
            "width": "500px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/02_graph61.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table2.png",
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
            "margin-left": "500px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "20px",
            "margin-left": "550px"
          }
        }, {
          "type": "text",
          "value": "{{data3_3}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "620px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "20px",
            "margin-left": "700px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "770px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "20px",
            "margin-left": "860px"
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
            "name": "คั้งแต่วันครบรอบปีกรมธรรม์ที่อายุ 60 ปี ถึงอายุ 90 ปี",
            "percentIncome": null,
            "income": null,
            "subItems": [
              {
                "name": "รับเงินบำนาญ ปีละ",
                "percentIncome": "12%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 31 ปี",
                "percentIncome": "372%*",
                "income": "{{income2}}"
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 15 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 15 ปี\n"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{include1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 60 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
          }
        ]
      },
      {
        "type": "condition",
        "items": [
          "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
          "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น โดยท่านสามารถชำระเบี้ยประกันภัยงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, เคาน์เตอร์เซอร์วิส, ธนาคาร ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากคู่มือผู้เอาประกันภัย",
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "เบี้ยประกันชีวิตแบบบำนาญสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริงเพิ่มขึ้นอีกไม่เกินปีละ 200,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 194)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "AL55": {
    "name": "ทรัพย์บำนาญ55(1) (90/55)",
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
            "margin-top": " 8px",
            "margin-left": "150px",
            "font-size": "22px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "8px",
            "margin-left": "255px",
            "font-size": "20px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "หรือ เงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "8px",
            "margin-left": "290px",
            "font-size": "20px",
            "width": "500px",
            "z-index": "2",
            "color": "#c41a1c"
          }
        },{
          "type": "text",
          "value": "หรือ เบี้ยประกันภัยที่ชำระมาแล้วทั้งหมด (จำนวนที่มากกว่า)",
          "css": {
            "margin-top": "28px",
            "margin-left": "165px",
            "font-size": "20px",
            "width": "500px",
            "z-index": "2",
            "color": "#c41a1c"
          }
        },{
          "type": "text",
          "value": "มูลค่าปัจจุบันของเงินบำนาญที่เหลืออยู่**",
          "css": {
            "margin-top": "21px",
            "margin-left": "527px",
            "font-size": "15px",
            "width": "500px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/02_graph74.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table2.png",
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
            "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่อายุ 55 ปี ถึงอายุ 90 ปี",
            "percentIncome": null,
            "income": null,
            "subItems": [
              {
                "name": "รับเงินบำนาญ ปีละ",
                "percentIncome": "15%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 36 ปี",
                "percentIncome": "540%*",
                "income": "{{income2}}"
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 20 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 20 ปี"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{income1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 55 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
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
    ]
  },
  "AM01": {
    "name": "ทรัพย์บำนาญ60(1) (90/1)",
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
            "margin-top": " 8px",
            "margin-left": "150px",
            "font-size": "22px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "8px",
            "margin-left": "255px",
            "font-size": "20px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "หรือ เงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "8px",
            "margin-left": "290px",
            "font-size": "20px",
            "width": "500px",
            "z-index": "2",
            "color": "#c41a1c"
          }
        },{
          "type": "text",
          "value": "หรือ เบี้ยประกันภัยที่ชำระมาแล้วทั้งหมด (จำนวนที่มากกว่า)",
          "css": {
            "margin-top": "28px",
            "margin-left": "165px",
            "font-size": "20px",
            "width": "500px",
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
            "width": "500px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/graph_AM01.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table2.png",
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
            "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่อายุ 60 ปี ถึงอายุ 90 ปี",
            "percentIncome": null,
            "income": null,
            "subItems": [
              {
                "name": "รับเงินบำนาญ ปีละ",
                "percentIncome": "15%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 31 ปี",
                "percentIncome": "465%*",
                "income": "{{income2}}"
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 20 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 20 ปี"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{income1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 60 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
          }
        ]
      },
      {
        "type": "condition",
        "items": [
          "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้ เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
          "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น",
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "เบี้ยประกันชีวิตแบบบำนาญสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริงเพิ่มขึ้นอีกไม่เกินปีละ 200,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 194)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "AM05": {
    "name": "ทรัพย์บำนาญ60(1) (90/5)",
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
            "margin-top": " 8px",
            "margin-left": "150px",
            "font-size": "22px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "8px",
            "margin-left": "255px",
            "font-size": "20px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "หรือ เงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "8px",
            "margin-left": "290px",
            "font-size": "20px",
            "width": "500px",
            "z-index": "2",
            "color": "#c41a1c"
          }
        },{
          "type": "text",
          "value": "หรือ เบี้ยประกันภัยที่ชำระมาแล้วทั้งหมด (จำนวนที่มากกว่า)",
          "css": {
            "margin-top": "28px",
            "margin-left": "165px",
            "font-size": "20px",
            "width": "500px",
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
            "width": "500px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/graph_AM05.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table2.png",
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
            "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่อายุ 60 ปี ถึงอายุ 90 ปี",
            "percentIncome": null,
            "income": null,
            "subItems": [
              {
                "name": "รับเงินบำนาญ ปีละ",
                "percentIncome": "15%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 31 ปี",
                "percentIncome": "465%*",
                "income": "{{income2}}"
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 20 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 20 ปี"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{income1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 60 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
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
    ]
  },
  "AM10": {
    "name": "ทรัพย์บำนาญ60(1) (90/10)",
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
            "margin-top": " 8px",
            "margin-left": "150px",
            "font-size": "22px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "8px",
            "margin-left": "255px",
            "font-size": "20px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "หรือ เงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "8px",
            "margin-left": "290px",
            "font-size": "20px",
            "width": "500px",
            "z-index": "2",
            "color": "#c41a1c"
          }
        },{
          "type": "text",
          "value": "หรือ เบี้ยประกันภัยที่ชำระมาแล้วทั้งหมด (จำนวนที่มากกว่า)",
          "css": {
            "margin-top": "28px",
            "margin-left": "165px",
            "font-size": "20px",
            "width": "500px",
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
            "width": "500px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/graph_AM10.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table2.png",
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
            "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่อายุ 60 ปี ถึงอายุ 90 ปี",
            "percentIncome": null,
            "income": null,
            "subItems": [
              {
                "name": "รับเงินบำนาญ ปีละ",
                "percentIncome": "15%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 31 ปี",
                "percentIncome": "465%*",
                "income": "{{income2}}"
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 20 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 20 ปี"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{income1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 60 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
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
    ]
  },
  "AM15": {
    "name": "ทรัพย์บำนาญ60(1) (90/15)",
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
            "margin-top": " 8px",
            "margin-left": "150px",
            "font-size": "22px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "8px",
            "margin-left": "255px",
            "font-size": "20px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "หรือ เงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "8px",
            "margin-left": "290px",
            "font-size": "20px",
            "width": "500px",
            "z-index": "2",
            "color": "#c41a1c"
          }
        },{
          "type": "text",
          "value": "หรือ เบี้ยประกันภัยที่ชำระมาแล้วทั้งหมด (จำนวนที่มากกว่า)",
          "css": {
            "margin-top": "28px",
            "margin-left": "165px",
            "font-size": "20px",
            "width": "500px",
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
            "width": "500px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/graph_AM15.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table2.png",
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
            "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่อายุ 60 ปี ถึงอายุ 90 ปี",
            "percentIncome": null,
            "income": null,
            "subItems": [
              {
                "name": "รับเงินบำนาญ ปีละ",
                "percentIncome": "15%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 31 ปี",
                "percentIncome": "465%*",
                "income": "{{income2}}"
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 20 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 20 ปี"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{income1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 60 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
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
    ]
  },
  "AM50": {
    "name": "ทรัพย์บำนาญ60(1) (90/50)",
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
            "margin-top": " 8px",
            "margin-left": "150px",
            "font-size": "22px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "8px",
            "margin-left": "255px",
            "font-size": "20px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "หรือ เงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "8px",
            "margin-left": "290px",
            "font-size": "20px",
            "width": "500px",
            "z-index": "2",
            "color": "#c41a1c"
          }
        },{
          "type": "text",
          "value": "หรือ เบี้ยประกันภัยที่ชำระมาแล้วทั้งหมด (จำนวนที่มากกว่า)",
          "css": {
            "margin-top": "28px",
            "margin-left": "165px",
            "font-size": "20px",
            "width": "500px",
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
            "width": "500px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/graph_AM50.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table2.png",
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
            "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่อายุ 60 ปี ถึงอายุ 90 ปี",
            "percentIncome": null,
            "income": null,
            "subItems": [
              {
                "name": "รับเงินบำนาญ ปีละ",
                "percentIncome": "15%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 31 ปี",
                "percentIncome": "465%*",
                "income": "{{income2}}"
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 20 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 20 ปี"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{income1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 60 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
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
    ]
  },
  "AM55": {
    "name": "ทรัพย์บำนาญ60(1) (90/50)",
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
            "margin-top": " 8px",
            "margin-left": "150px",
            "font-size": "22px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "8px",
            "margin-left": "255px",
            "font-size": "20px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "หรือ เงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "8px",
            "margin-left": "290px",
            "font-size": "20px",
            "width": "500px",
            "z-index": "2",
            "color": "#c41a1c"
          }
        },{
          "type": "text",
          "value": "หรือ เบี้ยประกันภัยที่ชำระมาแล้วทั้งหมด (จำนวนที่มากกว่า)",
          "css": {
            "margin-top": "28px",
            "margin-left": "165px",
            "font-size": "20px",
            "width": "500px",
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
            "width": "500px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/graph_AM50.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table2.png",
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
            "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่อายุ 60 ปี ถึงอายุ 90 ปี",
            "percentIncome": null,
            "income": null,
            "subItems": [
              {
                "name": "รับเงินบำนาญ ปีละ",
                "percentIncome": "15%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 31 ปี",
                "percentIncome": "465%*",
                "income": "{{income2}}"
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 20 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 20 ปี"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{income1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 60 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
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
    ]
  },
  "AM60": {
    "name": "ทรัพย์บำนาญ60(1) (90/60)",
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
            "margin-top": " 8px",
            "margin-left": "150px",
            "font-size": "22px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "8px",
            "margin-left": "255px",
            "font-size": "20px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "หรือ เงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "8px",
            "margin-left": "290px",
            "font-size": "20px",
            "width": "500px",
            "z-index": "2",
            "color": "#c41a1c"
          }
        },{
          "type": "text",
          "value": "หรือ เบี้ยประกันภัยที่ชำระมาแล้วทั้งหมด (จำนวนที่มากกว่า)",
          "css": {
            "margin-top": "28px",
            "margin-left": "165px",
            "font-size": "20px",
            "width": "500px",
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
            "width": "500px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/graph_AM60.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table2.png",
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
            "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่อายุ 60 ปี ถึงอายุ 90 ปี",
            "percentIncome": null,
            "income": null,
            "subItems": [
              {
                "name": "รับเงินบำนาญ ปีละ",
                "percentIncome": "15%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 31 ปี",
                "percentIncome": "465%*",
                "income": "{{income2}}"
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 20 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 20 ปี"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{income1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 60 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
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
    ]
  },
  "AN65": {
    "name": "ทรัพย์บำนาญ65(1) (90/65)",
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
            "margin-top": " 8px",
            "margin-left": "150px",
            "font-size": "22px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "8px",
            "margin-left": "255px",
            "font-size": "20px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "หรือ เงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "margin-top": "8px",
            "margin-left": "290px",
            "font-size": "20px",
            "width": "500px",
            "z-index": "2",
            "color": "#c41a1c"
          }
        },{
          "type": "text",
          "value": "หรือ เบี้ยประกันภัยที่ชำระมาแล้วทั้งหมด (จำนวนที่มากกว่า)",
          "css": {
            "margin-top": "28px",
            "margin-left": "165px",
            "font-size": "20px",
            "width": "500px",
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
            "width": "500px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/02_graph73.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table2.png",
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 20 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 20 ปี"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{income1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 65 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
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
    ]
  },
  "AP55": {
    "name": "ทรัพย์บำนาญG 55",
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
            "width": "500px",
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
            "width": "500px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/graph_AP55.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table.png",
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
            "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่อายุ 55 ปี ถึงอายุ 90 ปี",
            "percentIncome": null,
            "income": null,
            "subItems": [
              {
                "name": "รับเงินบำนาญ ปีละ",
                "percentIncome": "15%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 36 ปี",
                "percentIncome": "540%*",
                "income": "{{income2}}"
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 15 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 15 ปี"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{income1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 55 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
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
    ]
  },
  "AQ60": {
    "name": "ทรัพย์บำนาญG 60",
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
            "width": "500px",
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
            "width": "500px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/graph_AQ60.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table.png",
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
            "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่อายุ 60 ปี ถึงอายุ 90 ปี",
            "percentIncome": null,
            "income": null,
            "subItems": [
              {
                "name": "รับเงินบำนาญ ปีละ",
                "percentIncome": "15%*",
                "income": "{{income1}}"
              },
              {
                "name": "รวมรับเงินบำนาญรายปีตลอดสัญญาสูงสุด 31 ปี",
                "percentIncome": "465%*",
                "income": "{{income2}}"
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 15 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 15 ปี"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{income1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 60 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
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
    ]
  },
  "AR65": {
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
            "width": "500px",
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
            "width": "500px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/02/graph_AR65.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "40px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table.png",
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
            "message": "หากผู้เอาประกันภัยเสียชีวิตโดยที่ยังได้รับเงินบำนาญไม่ครบ 15 ปี บริษัทฯ จะจ่ายเงินบำนาญที่เหลืออยู่ในครั้งเดียวให้ โดยมูลค่าจะเท่ากับมูลค่าปัจจุบันของจำนวนเงินบำนาญที่ยังไม่ได้จ่ายจนครบ 15 ปี"
          },
          {
            "iconText": "***",
            "color": "c-blue",
            "message": "ผู้เอาประกันภัยสามารถเลือกรับเงินบำนาญเป็นรายปี ปีละ {{income1}} บาท ตั้งแต่วันครบรอบปีกรมธรรม์ที่ผู้เอาประกันภัยอายุครบ 65 ปี ไปจนถึงวันครบรอบปีกรมธรรม์ที่อายุครบ 90 ปี"
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
    ]
  },
  "EE": {
    "name": "กรมธรรม์พิเศษเพื่อคนพิการ 10/5 [มีเงินปันผล]",
    "info": {
      "section1": null,
      "section2": {
        "css": {
          "height": "130px"
        },
        "data": [{
          "type": "text",
          "value": "ความคุ้มครอง",
          "class": "protection-txt"
        },{
          "type": "text",
          "value": "กรณีเสียชีวิตจากอุบัติเหตุ จ่ายเพิ่มอีก 200%*",
          "css": {
            "margin-top": "12px",
            "margin-left": "305px",
            "font-size": "24px",
            "color": "#c41a1c",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "{{data2_1}}",
          "css": {
            "margin-top": " 36px",
            "margin-left": "416px",
            "font-size": "24px",
            "color": "#c41a1c",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "36px",
            "margin-left": "601px",
            "font-size": "24px",
            "width": "500px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/03/03_graph2.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "100px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/money_bag.png",
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
            "name": "ครบสัญญารับเงินครบสัญญา พร้อมเงินปันผล (ถ้ามี)**",
            "percentIncome": "100%*",
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
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "EF": {
    "name": "กรมธรรม์พิเศษเพื่อคนพิการ 15/7 [มีเงินปันผล]",
    "info": {
      "section1": null,
      "section2": {
        "css": {
          "height": "130px"
        },
        "data": [{
          "type": "text",
          "value": "ความคุ้มครอง",
          "class": "protection-txt"
        },{
          "type": "text",
          "value": "กรณีเสียชีวิตจากอุบัติเหตุ จ่ายเพิ่มอีก 200%*",
          "css": {
            "margin-top": "12px",
            "margin-left": "305px",
            "font-size": "24px",
            "color": "#c41a1c",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "{{data2_1}}",
          "css": {
            "margin-top": " 36px",
            "margin-left": "416px",
            "font-size": "24px",
            "color": "#c41a1c",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "36px",
            "margin-left": "601px",
            "font-size": "24px",
            "width": "500px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/03/03_graph4.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "100px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/money_bag.png",
          "css": {
            "margin-left": "770px"
          }
        }, {
          "type": "text",
          "value": "{{data3_1}}",
          "class": "money-bag-data",
          "css": {
            "margin-left": "747px"
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
            "percentIncome": "100%*",
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
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "EG": {
    "name": "กรมธรรม์พิเศษเพื่อคนพิการ 20/10 [มีเงินปันผล]",
    "info": {
      "section1": null,
      "section2": {
        "css": {
          "height": "130px"
        },
        "data": [{
          "type": "text",
          "value": "ความคุ้มครอง",
          "class": "protection-txt"
        },{
          "type": "text",
          "value": "กรณีเสียชีวิตจากอุบัติเหตุ จ่ายเพิ่มอีก 200%*",
          "css": {
            "margin-top": "12px",
            "margin-left": "305px",
            "font-size": "24px",
            "color": "#c41a1c",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "{{data2_1}}",
          "css": {
            "margin-top": " 36px",
            "margin-left": "416px",
            "font-size": "24px",
            "color": "#c41a1c",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "36px",
            "margin-left": "601px",
            "font-size": "24px",
            "width": "500px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/03/03_graph6.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "100px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/money_bag.png",
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
            "name": "ครบสัญญารับเงินครบสัญญา พร้อมเงินปันผล (ถ้ามี)**",
            "percentIncome": "100%*",
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
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "EJ": {
    "name": "ทรัพย์ปันผล 10/10 (มีเงินปันผล)",
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
            "width": "500px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "หรือ เงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "width": "500px",
            "margin-top": "15px",
            "margin-left": "475px",
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
          "value": "/assets/img/projectform/graph/02/02_graph37.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "50px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table.png",
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
          "value": "/assets/img/projectform/money_bag.png",
          "css": {
            "margin-top": "-40px",
            "margin-left": "865px"
          }
        }, {
          "type": "text",
          "value": "{{data3_1}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "244px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "20px",
            "margin-left": "322px"
          }
        }, {
          "type": "text",
          "value": "{{data3_3}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "395px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "20px",
            "margin-left": "470px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "551px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "20px",
            "margin-left": "630px"
          }
        }, {
          "type": "text",
          "value": "{{data3_7}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "704px"
          }
        }, {
          "type": "text",
          "value": "{{data3_8}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "20px",
            "margin-left": "777px"
          }
        }, {
          "type": "text",
          "value": "{{data3_9}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "845px"
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
                "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่ 2-9 รวม 8 ครั้ง",
                "percentIncome": "16%*",
                "income": "{{income1}}"
              }
            ]
          },
          {
            "name": "ครบสัญญารับเงินครบสัญญา พร้อมเงินปันผล (ถ้ามี)**",
            "percentIncome": "110%*",
            "income": "{{income2}}"
          },
          {
            "name": "รวมผลประโยชน์ตลอดสัญญา",
            "percentIncome": "126%*",
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
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "EK": {
    "name": "ทรัพย์ปันผล 15/15 (มีเงินปันผล)",
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
            "width": "500px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "หรือ เงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "width": "500px",
            "margin-top": "15px",
            "margin-left": "475px",
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
          "value": "/assets/img/projectform/graph/02/02_graph38.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "50px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table.png",
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
          "value": "/assets/img/projectform/money_bag.png",
          "css": {
            "margin-top": "-40px",
            "margin-left": "865px"
          }
        }, {
          "type": "text",
          "value": "{{data3_1}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "244px"
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
            "margin-left": "394px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "20px",
            "margin-left": "467px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "541px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "20px",
            "margin-left": "617px"
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
            "margin-left": "845px"
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
                "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่ 2-14 รวม 13 ครั้ง",
                "percentIncome": "26%*",
                "income": "{{income1}}"
              }
            ]
          },
          {
            "name": "ครบสัญญารับเงินครบสัญญา พร้อมเงินปันผล (ถ้ามี)**",
            "percentIncome": "110%*",
            "income": "{{income2}}"
          },
          {
            "name": "รวมผลประโยชน์ตลอดสัญญา",
            "percentIncome": "136%*",
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
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (กรณีเพศชาย อายุ 45-70 ปี และเพศหญิง อายุ 53-70 ปี)(ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "EL": {
    "name": "ทรัพย์ปันผล 20/20 (มีเงินปันผล)",
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
            "width": "500px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "หรือ เงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "width": "500px",
            "margin-top": "15px",
            "margin-left": "475px",
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
          "value": "/assets/img/projectform/graph/02/02_graph39.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "50px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table.png",
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
          "value": "/assets/img/projectform/money_bag.png",
          "css": {
            "margin-top": "-40px",
            "margin-left": "865px"
          }
        }, {
          "type": "text",
          "value": "{{data3_1}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "244px"
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
            "margin-left": "394px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "20px",
            "margin-left": "467px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "541px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "20px",
            "margin-left": "617px"
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
            "margin-left": "845px"
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
                "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่ 2-19 รวม 18 ครั้ง",
                "percentIncome": "36%*",
                "income": "{{income1}}"
              }
            ]
          },
          {
            "name": "ครบสัญญารับเงินครบสัญญา พร้อมเงินปันผล (ถ้ามี)**",
            "percentIncome": "110%*",
            "income": "{{income2}}"
          },
          {
            "name": "รวมผลประโยชน์ตลอดสัญญา",
            "percentIncome": "146%*",
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
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท (ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172) เฉพาะกรณีเพศชาย อายุ 61-70 ปี และเพศหญิง อายุ 66-70 ปี เท่านั้น ",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "EM": {
    "name": "ทรัพย์เกษียณ (มีเงินปันผล)",
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
            "width": "500px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "หรือ เงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "width": "500px",
            "margin-top": "15px",
            "margin-left": "475px",
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
          "value": "/assets/img/projectform/graph/02/02_graph9.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "50px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table.png",
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
          "value": "/assets/img/projectform/money_bag.png",
          "css": {
            "margin-top": "-40px",
            "margin-left": "865px"
          }
        }, {
          "type": "text",
          "value": "{{data3_1}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "244px"
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
            "margin-left": "394px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "20px",
            "margin-left": "467px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "541px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "20px",
            "margin-left": "617px"
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
            "margin-left": "845px"
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
                "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่ 2-59 รวม 58 ครั้ง",
                "percentIncome": "36%*",
                "income": "{{income1}}"
              }
            ]
          },
          {
            "name": "ครบสัญญารับเงินครบสัญญา พร้อมเงินปันผล (ถ้ามี)**",
            "percentIncome": "110%*",
            "income": "{{income2}}"
          },
          {
            "name": "รวมผลประโยชน์ตลอดสัญญา",
            "percentIncome": "226%*",
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
          "เบี้ยประกันชีวิตสามารถนำไปหักค่าลดหย่อนภาษีเงินได้บุคคลธรรมดาตามกฎหมายตามจำนวนที่จ่ายจริง แต่ไม่่เกินปีละ 100,000 บาท กรณีเพศชาย อายุ 45-50 ปี และเพศหญิง อายุ 46-50 ปีเท่านั้น(ตามประกาศอธิบดีกรมสรรพากรเกี่ยวกับภาษีเงินได้ฉบับที่ 172)",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน \"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "EN": {
	"name": "ธนทรัพย์ 10/10 [มีเงินปันผล]",
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
            "margin-left": "260px",
            "font-size": "24px",
            "color": "#c41a1c",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "25px",
            "margin-left": "435px",
            "font-size": "24px",
            "width": "500px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "หรือ เงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "width": "500px",
            "margin-top": "24px",
            "margin-left": "475px",
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
          "value": "/assets/img/projectform/graph/01/01_graph47.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "100px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/money_bag.png",
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
            "name": "ครบสัญญารับเงินครบสัญญา พร้อมเงินปันผล (ถ้ามี)**",
            "percentIncome": "105%*",
            "income": "{{income1}}"
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
    ]
  },
  "EN01": {
    "name": "เกษมปันผล 10/10",
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
            "margin-left": "260px",
            "font-size": "24px",
            "color": "#c41a1c",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "25px",
            "margin-left": "435px",
            "font-size": "24px",
            "width": "500px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "หรือ เงินค่าเวนคืนกรมธรรม์ที่มากกว่า",
          "css": {
            "width": "500px",
            "margin-top": "24px",
            "margin-left": "475px",
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
          "value": "/assets/img/projectform/graph/01/01_graph54.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "50px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table.png",
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
          "value": "/assets/img/projectform/money_bag.png",
          "css": {
            "margin-top": "-30px",
            "margin-left": "823px"
          }
        }, {
          "type": "text",
          "value": "{{data3_1}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "190px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "20px",
            "margin-left": "260px"
          }
        }, {
          "type": "text",
          "value": "{{data3_3}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "330px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "20px",
            "margin-left": "400px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "470px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "20px",
            "margin-left": "540px"
          }
        }, {
          "type": "text",
          "value": "{{data3_7}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "608px"
          }
        }, {
          "type": "text",
          "value": "{{data3_8}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "20px",
            "margin-left": "678px"
          }
        }, {
          "type": "text",
          "value": "{{data3_9}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "748px"
          }
        }, {
          "type": "text",
          "value": "{{data3_10}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "20px",
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
            "name": "รับเงินคืน 1%*",
            "percentIncome": null,
            "income": null,
            "subItems": [
              {
                "name": "ตั้งแต่วันครบรอบปีกรมธรรม์ที่ 1-10 รวม 10 ครั้ง",
                "percentIncome": "10%*",
                "income": "{{income1}}"
              }
            ]
          },
          {
            "name": "ครบสัญญารับเงินครบสัญญา",
            "percentIncome": "120%*",
            "income": "{{income2}}"
          },
          {
            "name": "รวมผลประโยชน์ตลอดสัญญา",
            "percentIncome": "130%*",
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
    ]
  },
  "EN02": {
    "name": "ธนทวี3 5/2",
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
            "margin-left": "145px",
            "font-size": "24px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "40px",
            "margin-left": "170px",
            "font-size": "20px",
            "width": "500px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "{{data2_2}}",
          "css": {
            "margin-top": " 23px",
            "margin-left": "440px",
            "font-size": "22px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": "23px",
            "margin-left": "560px",
            "font-size": "22px",
            "width": "500px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี กรมธรรม์ที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/03/03_graph11.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "50px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table.png",
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
          "value": "/assets/img/projectform/money_bag.png",
          "css": {
            "margin-top": "-30px",
            "margin-left": "823px"
          }
        }, {
          "type": "text",
          "value": "{{data3_1}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "10px",
            "margin-left": "205px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "10px",
            "margin-left": "355px"
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
            "margin-left": "800px"
          }
        }]
      }
    },
    "summary": null
  },
  "EN03": {},
  "EN04": {},
  "EN05": {},
  "EN06": {},
  "EN07": {},
  "EN08": {
    "name": "ตะกาฟุล 20/20",
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
          "value": "/assets/img/projectform/graph/05/05_graph5.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "100px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/money_bag.png",
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
    "summary": null
  },
  "EN09": {
    "name": "ตะกาฟุล 10/5",
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
            "margin-top": " 42px",
            "margin-left": "135px",
            "font-size": "18px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": " 55px",
            "margin-left": "170px",
            "font-size": "18px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "{{data2_2}}",
          "css": {
            "margin-top": " 42px",
            "margin-left": "220px",
            "font-size": "18px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": " 55px",
            "margin-left": "245px",
            "font-size": "18px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "{{data2_3}}",
          "css": {
            "margin-top": " 30px",
            "margin-left": "290px",
            "font-size": "18px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": " 55px",
            "margin-left": "310px",
            "font-size": "18px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "{{data2_4}}",
          "css": {
            "margin-top": " 20px",
            "margin-left": "355px",
            "font-size": "18px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": " 55px",
            "margin-left": "380px",
            "font-size": "18px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "{{data2_5}}",
          "css": {
            "margin-top": " 20px",
            "margin-left": "580px",
            "font-size": "18px",
            "z-index": "2"
          }
        },{
          "type": "text",
          "value": "บาท",
          "css": {
            "margin-top": " 55px",
            "margin-left": "600px",
            "font-size": "18px",
            "z-index": "2"
          }
        }, {
          "type": "text",
          "value": "วันครบรอบปี สัญญาตะกาฟุลที่",
          "class": "policy-year-text"
        }, {
          "type": "image",
          "value": "/assets/img/projectform/graph/05/05_graph4.png",
          "class": "section2-graph"
        }]
      },
      "section3": {
        "css": {
          "height": "50px"
        },
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/02_table.png",
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
          "value": "/assets/img/projectform/money_bag.png",
          "css": {
            "margin-top": "-30px",
            "margin-left": "823px"
          }
        }, {
          "type": "text",
          "value": "{{data3_1}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "190px"
          }
        }, {
          "type": "text",
          "value": "{{data3_2}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "20px",
            "margin-left": "260px"
          }
        }, {
          "type": "text",
          "value": "{{data3_3}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "330px"
          }
        }, {
          "type": "text",
          "value": "{{data3_4}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "20px",
            "margin-left": "400px"
          }
        }, {
          "type": "text",
          "value": "{{data3_5}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "470px"
          }
        }, {
          "type": "text",
          "value": "{{data3_6}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "20px",
            "margin-left": "540px"
          }
        }, {
          "type": "text",
          "value": "{{data3_7}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "608px"
          }
        }, {
          "type": "text",
          "value": "{{data3_8}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "20px",
            "margin-left": "678px"
          }
        }, {
          "type": "text",
          "value": "{{data3_9}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "2px",
            "margin-left": "748px"
          }
        }, {
          "type": "text",
          "value": "{{data3_10}}",
          "class": "section3-table-data",
          "css": {
            "margin-top": "20px",
            "margin-left": "810px"
          }
        }]
      }
    },
    "summary": null
  },
  "EN10": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EN11": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EN12": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EN13": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EN14": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EN15": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EN16": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EN17": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EN18": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EN19": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EN20": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EN21": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EN22": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EN23": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EN24": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EN25": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EN26": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EN27": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EN28": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EN29": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EN30": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EN31": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EN32": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EN33": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EN34": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EN35": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EN36": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EN37": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EN38": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EP": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EQ": {
    "name": "",
    "info": null,
    "summary": null
  },
  "ER": {
    "name": "",
    "info": null,
    "summary": null
  },
  "ES": {
    "name": "",
    "info": null,
    "summary": null
  },
  "ET": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EU": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EV": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EW": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EX": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EY": {
    "name": "",
    "info": null,
    "summary": null
  },
  "EZ": {
    "name": "",
    "info": null,
    "summary": null
  },
  "FA05": {
    "name": "",
    "info": {
      "section1": null,
      "section2": null,
      "section3": {
        "type": 4,
        "data": [{
          "type": "image",
          "value": "/assets/img/projectform/money_bag.png",
          "css": {
            "position": "absolute",
            "left": "823px",
            "top": "123px"
          }
        },
        {
          "type": "text",
          "value": "`${test}`",
          "css": {
            "position": "absolute",
            "left": "770px",
            "top": "158px",
            "color": "#c41a1c",
            "font-size": "36px"
          }
        }
        ]
      }
    },
    "summary": null
  },
  "FA10": {
    "name": "",
    "info": null,
    "summary": null
  },
  "FA15": {
    "name": "",
    "info": null,
    "summary": null
  },
  "FB05": {
    "name": "",
    "info": null,
    "summary": null
  },
  "FB10": {
    "name": "",
    "info": null,
    "summary": null
  },
  "FB15": {
    "name": "",
    "info": null,
    "summary": null
  },
  "FB18": {
    "name": "",
    "info": null,
    "summary": null
  },
  "FC05": {
    "name": "",
    "info": null,
    "summary": null
  },
  "FC10": {
    "name": "",
    "info": null,
    "summary": null
  },
  "FC15": {
    "name": "",
    "info": null,
    "summary": null
  },
  "FC20": {
    "name": "",
    "info": null,
    "summary": null
  },
  "FD05": {
    "name": "",
    "info": null,
    "summary": null
  },
  "FD10": {
    "name": "",
    "info": null,
    "summary": null
  },
  "FD15": {
    "name": "",
    "info": null,
    "summary": null
  },
  "FD20": {
    "name": "",
    "info": null,
    "summary": null
  },
  "FD22": {
    "name": "",
    "info": null,
    "summary": null
  },
  "FE05": {
    "name": "",
    "info": null,
    "summary": null
  },
  "FE10": {
    "name": "",
    "info": null,
    "summary": null
  },
  "FE15": {
    "name": "",
    "info": null,
    "summary": null
  },
  "FE20": {
    "name": "",
    "info": null,
    "summary": null
  },
  "FE25": {
    "name": "",
    "info": null,
    "summary": null
  },
  "MC": {
    "name": "",
    "info": null,
    "summary": null
  },
  "MD": {
    "name": "",
    "info": null,
    "summary": null
  },
  "ME": {
    "name": "",
    "info": null,
    "summary": null
  },
  "MF": {
    "name": "",
    "info": null,
    "summary": null
  },
  "MG": {
    "name": "",
    "info": null,
    "summary": null
  },
  "MH": {
    "name": "",
    "info": null,
    "summary": null
  },
  "NA": {
    "name": "",
    "info": null,
    "summary": null
  },



  // GOAL



  "NB": {
    "name": "",
    "info": null,
    "summary": null
  },
  "NC01": {
    "name": "",
    "info": null,
    "summary": null
  },
  "ND01": {
    "name": "",
    "info": null,
    "summary": null
  },
  "NE": {
    "name": "",
    "info": null,
    "summary": null
  },
  "NF": {
    "name": "",
    "info": null,
    "summary": null
  },
  "NG": {
    "name": "",
    "info": null,
    "summary": null
  },
  "NH": {
    "name": "",
    "info": null,
    "summary": null
  },
  "NJ": {
    "name": "",
    "info": null,
    "summary": null
  },
  "NL": {
    "name": "",
    "info": null,
    "summary": null
  },
  "NM": {
    "name": "",
    "info": null,
    "summary": null
  },
  "NQ": {
    "name": "",
    "info": null,
    "summary": null
  },
  "NX05": {
    "name": "",
    "info": null,
    "summary": null
  },
  "NX10": {
    "name": "",
    "info": null,
    "summary": null
  },
  "NX15": {
    "name": "",
    "info": null,
    "summary": null
  },
  "PG": {
    "name": "",
    "info": null,
    "summary": null
  },
  "PH": {
    "name": "",
    "info": null,
    "summary": null
  },
  "PJ": {
    "name": "",
    "info": null,
    "summary": null
  },
  "PK": {
    "name": "",
    "info": null,
    "summary": null
  },
  "PL": {
    "name": "",
    "info": null,
    "summary": null
  },
  "PM": {
    "name": "",
    "info": null,
    "summary": null
  },
  "SE": {
    "name": "",
    "info": null,
    "summary": null
  },
  "SF": {
    "name": "",
    "info": null,
    "summary": null
  },
  "SG": {
    "name": "",
    "info": null,
    "summary": null
  },
  "SH": {
    "name": "",
    "info": null,
    "summary": null
  },
  "SK": {
    "name": "",
    "info": null,
    "summary": null
  },
  "SL": {
    "name": "",
    "info": null,
    "summary": null
  },
  "SM": {
    "name": "",
    "info": null,
    "summary": null
  },
  "SN": {
    "name": "",
    "info": null,
    "summary": null
  },
  "SP": {
    "name": "",
    "info": null,
    "summary": null
  },
  "SQ": {
    "name": "",
    "info": null,
    "summary": null
  },
  "TE01": {
    "name": "",
    "info": null,
    "summary": null
  },
  "TE12": {
    "name": "",
    "info": null,
    "summary": null
  },
  "TE02": {
    "name": "",
    "info": null,
    "summary": null
  },
  "TE13": {
    "name": "",
    "info": null,
    "summary": null
  },
  "TE03": {
    "name": "",
    "info": null,
    "summary": null
  },
  "TE04": {
    "name": "",
    "info": null,
    "summary": null
  },
  "TE05": {
    "name": "",
    "info": null,
    "summary": null
  },
  "TE17": {
    "name": "",
    "info": null,
    "summary": null
  },
  "TE14": {
    "name": "",
    "info": null,
    "summary": null
  },
  "TE07": {
    "name": "",
    "info": null,
    "summary": null
  },
  "TE08": {
    "name": "",
    "info": null,
    "summary": null
  },
  "TE1": {
    "name": "",
    "info": null,
    "summary": null
  },
  "TF1": {
    "name": "",
    "info": null,
    "summary": null
  },
  "TG1": {
    "name": "",
    "info": null,
    "summary": null
  },
  "TH1": {
    "name": "",
    "info": null,
    "summary": null
  },
  "TE2": {
    "name": "",
    "info": null,
    "summary": null
  },
  "TF2": {
    "name": "",
    "info": null,
    "summary": null
  },
  "TG2": {
    "name": "",
    "info": null,
    "summary": null
  },
  "TH2": {
    "name": "",
    "info": null,
    "summary": null
  },
  "TJ": {
    "name": "",
    "info": null,
    "summary": null
  },
  "TK": {
    "name": "",
    "info": null,
    "summary": null
  },
  "TL": {
    "name": "",
    "info": null,
    "summary": null
  },
  "TM": {
    "name": "",
    "info": null,
    "summary": null
  },
  "TN": {
    "name": "",
    "info": null,
    "summary": null
  },
  "TP1": {
    "name": "คุ้มทรัพย์ (ลูกกตัญญู)",
    "info": {
      "section1": {
        "coverage": "{{coverage}}",
        "pay": "{{pay}}",
        "perDay": "{{perDay}}"
      }
    },
    "summary": null
  },
  "TQ": {
    "name": "",
    "info": null,
    "summary": null
  },
  "TR2": {
    "name": "คุ้มทรัพย์ คุ้มครองโรคร้ายแรง",
    "info": {
      "section1": {
        "coverage": "{{coverage}}",
        "pay": "{{pay}}",
        "perDay": "{{perDay}}"
      },
      "section2": null,
      "section3": null
    },
    "summary": [
      {
        "type": "item",
        "title": "ผลประโยชน์และความคุ้มครอง",
        "items": [
          {
            "name": "เงินชดเชยค่ารักษาพยาบาลในฐานะผู้ป่วยใน (วันละ)",
            "subItems": [
              {
                "name": "1. เจ็บป่วยหรืออุบัตติเหตุ (สูงสุด 1,250 วัน)(รพ.)",
                "percentIncome": null,
                "income": 0
              },
              {
                "name": "2. จากโรคร้ายแรง* (รพ. 1,250 วัน + สร.1,750) วัน",
                "percentIncome": null,
                "income": 0
              }
            ]
          },
          {
            "name": "ความคุ้มครอง",
            "subItems": [
              {
                "name": "3. เจ็บป่วยจากโรคร้ายแรง* (รพ.)",
                "percentIncome": null,
                "income": 0
              },
              {
                "name": "4. เสียชีวิตจากโรคร้ายแรงกรณีใดกรณีหนึ่ง",
                "percentIncome": null,
                "income": null
              },
              {
                "name": "4.1 มะเร็งถุงลมปอดโป่งพอง ตับแข็ง กล้ามเนื้อเสื่อมการแข็งตัวของเนื้อเยื่อโดยทั่วไป โปลิโอ",
                "percentIncome": null,
                "income": 0,
                "indentLevel": 2
              },
              {
                "name": "4.2 กล้ามเนื้อหัวใจตายเฉียบพลัน อัลไซเมอร์ อัมพาตจากโรคเส้นเลือดในสมอง พาร์กินสัน",
                "percentIncome": null,
                "income": 0,
                "indentLevel": 2
              },
              {
                "name": "4.3 โรคเอดส์",
                "percentIncome": null,
                "income": 0,
                "indentLevel": 2
              },
              {
                "name": "5. เสียชีวิตนอกเหนือจากข้อ 4",
                "percentIncome": null,
                "income": 0
              }
            ]
          }
        ]
      },
      {
        "type": "table",
        "titles": ['*โรคร้ายแรงที่ให้ความคุ้มครอง', 'รพ.', 'สร.'],
        "rows": [
          [
            {
              "type": "title",
              "message": "โรคมะเร็ง"
            },
            {
              "type": "checkbox",
              "message": true
            },
            {
              "type": "checkbox",
              "message": true
            }
          ],
          [
            {
              "type": "title",
              "message": "โรคถุงลมโป่งพอง"
            },
            {
              "type": "checkbox",
              "message": true
            },
            {
              "type": "checkbox",
              "message": true
            }
          ],
          [
            {
              "type": "title",
              "message": "โรคตับแข็ง"
            },
            {
              "type": "checkbox",
              "message": true
            },
            {
              "type": "checkbox",
              "message": true
            }
          ],
          [
            {
              "type": "title",
              "message": "กล้ามเนื้อเสื่อม"
            },
            {
              "type": "checkbox",
              "message": true
            },
            {
              "type": "checkbox",
              "message": true
            }
          ],
          [
            {
              "type": "title",
              "message": "การแข็งตัวของเนื้อเยื่อทั่วไป"
            },
            {
              "type": "checkbox",
              "message": true
            },
            {
              "type": "checkbox",
              "message": true
            }
          ],
          [
            {
              "type": "title",
              "message": "โรคโปลิโอ"
            },
            {
              "type": "checkbox",
              "message": true
            },
            {
              "type": "checkbox",
              "message": true
            }
          ],
          [
            {
              "type": "title",
              "message": "โรคเอดส์"
            },
            {
              "type": "checkbox",
              "message": true
            },
            {
              "type": "checkbox",
              "message": false
            }
          ],
          [
            {
              "type": "title",
              "message": "กล้ามเนื้อหัวใจตายเฉียบพลัน"
            },
            {
              "type": "checkbox",
              "message": false
            },
            {
              "type": "checkbox",
              "message": true
            }
          ],
          [
            {
              "type": "title",
              "message": "โรคอัลไซเมอร์"
            },
            {
              "type": "checkbox",
              "message": false
            },
            {
              "type": "checkbox",
              "message": true
            }
          ],
          [
            {
              "type": "title",
              "message": "อัมพาตจากโรคเส้นเลือดสมอง"
            },
            {
              "type": "checkbox",
              "message": false
            },
            {
              "type": "checkbox",
              "message": true
            }
          ],
          [
            {
              "type": "title",
              "message": "โรคระบบประสาทพาร์กินสัน"
            },
            {
              "type": "checkbox",
              "message": false
            },
            {
              "type": "checkbox",
              "message": true
            }
          ]
        ]
      },
      {
        "type": "condition",
        "items": [
          "เพื่อสิทธิประโยชน์สูงสุดของท่าน ควรถือกรมธรรม์จนครบกำหนกดสัญญา และผลประโยชน์ที่ได้รับจากกรมธรรม์ประกันชีวิตจะไม่มีการหักภาษีใดๆทั้งสิ้น และเป็นเงินปลอดหนี้เจ้าหนี้ไม่มีสิทธิ์ยึดได้ ยกเว้นเท่าจำนวนเบี้ยประกันภัยที่จ่ายไปเท่านั้น",
          "การนำส่งเบี้ยประกันภัยเป็นหน้าที่ของผู้เอาประกันภัย การที่ตัวแทนประกันชีวิตเก็บเบี้ยประกันภัยเป็นการให้บริการเท่านั้น โดยท่านสามารถชำระเบี้ยประกันภัยงวดต่อไปผ่านช่องทางต่างๆ เช่น สาขา, ที่ทำการไปรษณีย์, " +
          "เคาท์เตอร์เซอร์วิส, ธนาคาร ฯลฯ หรือศึกษาข้อมูลเพิ่มเติมได้จากผู้เอาประกันภัย",
          "ควรศึกษาข้อมูลก่อนการตัดสินใจ อีกทั้งต้องแถลงข้อมูลตามความเป็นจริงในเอกสารขอเอาประกันภัย เพื่อผลประโยชน์สูงสุดของท่าน" +
          "\"เอกสารนี้เป็นเพียงการสรุปผลประโยชน์โดยสังเขป และขอสงวนสิทธิ์ในการพิจารณารับประกันตามหลักเกณฑ์ของบริษัทฯ ทั้งนี้เงื่อนไขและความคุ้มครองอย่างสมบูรณ์จะถูกระบุอยู่ในกรมธรรม์ที่ท่านซื้อไว้เท่านั้น\""
        ]
      }
    ]
  },
  "TS1": {
    "name": "คุ้มทรัพย์ คุ้มครองอุบัติเหตุ",
    "info": {
      "section1": {
        "coverage": "{{coverage}}",
        "pay": "{{pay}}",
        "perDay": "{{perDay}}"
      }
    },
    "summary": null
  },
  "TU1": {
    "name": "คุ้มทรัพย์ คุ้มครองรายได้",
    "info": {
      "section1": {
        "coverage": "{{coverage}}",
        "pay": "{{pay}}",
        "perDay": "{{perDay}}"
      }
    },
    "summary": null
  },
  "TW1": {
    "name": "คุ้มทรัพย์ (คุ้มครองค่ารักษาพยาบาลรายวัน)",
    "info": {
      "section1": {
        "coverage": "{{coverage}}",
        "pay": "{{pay}}",
        "perDay": "{{perDay}}"
      }
    },
    "summary": null
  },
  "TX1": {
    "name": "",
    "info": null,
    "summary": null
  },
  "TY": {
    "name": "",
    "info": null,
    "summary": null
  },
  "TZ": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WD": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WE": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WF": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WG": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WH": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WJ": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WK": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WL": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WM": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WN": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WN2": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WP": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WQ": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WR": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WS": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WT": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WU": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WX01": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WV05": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WX10": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WV20": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WX60": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WV99": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WY01": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WY05": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WY10": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WY20": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WY60": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WY99": {
    "name": "",
    "info": null,
    "summary": null
  },
  "WZ": {
    "name": "",
    "info": null,
    "summary": null
  },
  "YB": {
    "name": "",
    "info": null,
    "summary": null
  },
  "YC": {
    "name": "",
    "info": null,
    "summary": null
  },
  "YH": {
    "name": "",
    "info": null,
    "summary": null
  },
  "YD": {
    "name": "",
    "info": null,
    "summary": null
  },
  "YE": {
    "name": "",
    "info": null,
    "summary": null
  },
  "YF": {
    "name": "",
    "info": null,
    "summary": null
  },
  "ZE": {
    "name": "",
    "info": null,
    "summary": null
  },
  "ZF": {
    "name": "",
    "info": null,
    "summary": null
  },
  "ZG": {
    "name": "",
    "info": null,
    "summary": null
  },
  "ZH": {
    "name": "",
    "info": null,
    "summary": null
  },
  "ZJ": {
    "name": "",
    "info": null,
    "summary": null
  },
  "ZK": {
    "name": "",
    "info": null,
    "summary": null
  },
  "ZM": {
    "name": "",
    "info": null,
    "summary": null
  },
  "ZS": {
    "name": "",
    "info": null,
    "summary": null
  },
  "ZT": {
    "name": "",
    "info": null,
    "summary": null
  },
  "ZV": {
    "name": "",
    "info": null,
    "summary": null
  },
  "ZW": {
    "name": "",
    "info": null,
    "summary": null
  },
  "ZX": {
    "name": "",
    "info": null,
    "summary": null
  },
  "ZY": {}
};

export default tlplans
