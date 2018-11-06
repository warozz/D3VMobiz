import { SendEmailFileM } from "./send-email-file";

export class SendEmailM {

    subject : string;
    content : string;
    to : string[];
    cc : string[];
    from : string;
    senderName : string;
    filesSend : Array<SendEmailFileM>;
    replyto: string;

    // {
    //     "subject": "Sending Email Test",
    //     "content": "abcdefghijklmnopqrstuvwxyz ",
    //     "to": [
    //       "teerayut.kae@thailife.com"
    //     ],
    //     "cc": [
          
    //     ],
    //     "filesSend": [
    //       {
    //         "fileName": "khi3wan.pdf",
    //         "binaryOfFile": ""
    //       }
    //     ],
    //     "from": "itadmin@thailife.com",
    //     "senderName": "webmaster@thailife.com"
    //   }
}