import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

class Mail {
  constructor() {
    if (!Mail.instance) {
      Mail.instance = this;
      this.initialize();
    }
    return Mail.instance;
  }

  initialize() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      port: process.env.MAILER_PORT,
      secure: false,
      ignoreTLS: true
    });
  }

  send(to, subject, text, html) {
    let mailOptions = {
      from: "admin <admin@express-island.com>",
      to,
      subject,
      text,
      html
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
    });
  }
}

const instance = new Mail();
Object.freeze(instance);

export default instance;
