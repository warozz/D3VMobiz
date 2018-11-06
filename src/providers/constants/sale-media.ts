export const documents = [
  {id: 1, name: `การพิจารณารับประกัน (New Business)`},
  {id: 2, name: `กรณีประสงค์ซื้อ RSP ภายหลังจากการออกกรมธรรม์`},
  {id: 3, name: `การสับเปลี่ยนกองทุน/ถอนเงินบางส่วน/เวนคืนจากกรมธรรม์`},
  {id: 4, name: `เอกสารทั้งหมดเกี่ยวกับประกันชีวิตควบการลงทุน`}
];

export const forms = [
  {id: 1, parents: [1, 4], formName: `คำขอเอาประกันภัยยูนิต ลิงค์`, pdfPath: 'form1'},
  {id: 2, parents: [1, 2, 4], formName: `ใบคำร้องเกี่ยวกับเบี้ยประกันภัย สำหรับการประกันชีวิต แบบยูนิตลิงค์`, pdfPath: 'form2'},
  {id: 3, parents: [3, 4], formName: `ใบคำร้องขอดำเนินการ สำหรับการประกันชีวิต แบบยูนิตลิงค์`, pdfPath: 'form3'},
  {id: 4, parents: [1, 4], formName: `แบบแสดงข้อมูลผู้ถือหน่วยลงทุน (บุคคลธรรมดา)`, pdfPath: 'form4'},
  {id: 5, parents: [1, 4], formName: `แบบสอบถามเพื่อประเมินความเสี่ยง`, pdfPath: 'form5'},
  {id: 6, parents: [2, 4], formName: `ใบแถลงสุขภาพ กรณีซื้อ RSP ภายหลัง`, pdfPath: 'form6'},
  {id: 7, parents: [2, 3, 4], formName: `แบบฟอร์มรับทราบความเสี่ยง (กรณีเลือกกองทุนเกินกว่าความเสี่ยงที่ตนเองยอมรับได้)`, pdfPath: 'form7'},
  {id: 8, parents: [1, 4], formName: `แบบสอบถามเพื่อการวางแผนทางการเงินสำหรับ ยูนิตลิงค์ (เอกสารฉบับนี้ไม่ต้องนำส่งมายังสาขา/สนญ.)`, pdfPath: 'form8'}
];