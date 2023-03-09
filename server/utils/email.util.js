const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const pug = require("pug");
const { join } = require("path");
const { htmlToText } = require("html-to-text");

dotenv.config({ path: "./config.env" });

class Email {
  constructor() {}

  //Conect to mail service
  newTransport() {
    if (process.env.NODE_ENV === "production") {
      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: "apikey",
          pass: process.env.SENDGRID_API_KEY,
        },
      });
    } else {
      return nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASSWORD,
        },
      });
    }
  }

  // Send the actual mail
  async send(mailData, emailName, subject) {
    const html = pug.renderFile(
      join(__dirname, "..", "views", "emails", `${emailName}.pug`),
      {
        name: mailData.username,
        dataPurchased: mailData.emailData,
      }
    );

    await this.newTransport().sendMail({
      from: process.env.MAIL_FROM,
      to: mailData.email,
      subject,
      html,
      text: htmlToText(html),
    });
  }

  sendWelcome(data) {
    this.send(data, "welcome", "Bienvenido a Academlo Store");
  }

  sendPurchased(data) {
    this.send(data, "purchased", "Compra realizada");
  }
}

module.exports = { Email };
