import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from "@nestjs/common";
import { CreateMailServiceDto } from "./dto/create-mail-service.dto";
import { UpdateMailServiceDto } from "./dto/update-mail-service.dto";
import { createTransport } from "nodemailer";
import * as path from "path";
import * as handlebars from "handlebars";
import * as fs from "fs";

@Injectable()
export class MailServiceService {
  private readonly transport;
  constructor() {
    this.transport = createTransport({
      host: "mail.autobazar.pk",
      port: 26,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  async sendMail({ to, subject, template, html }: CreateMailServiceDto) {
    try {
      if (
        !fs.existsSync(
          path.join(__dirname, `../../src/views/emails/${template}.hbs`)
        )
      ) {
        throw new Error("Template not found");
      }
      const templates = fs.readFileSync(
        path.join(__dirname, `../../src/views/emails/${template}.hbs`),
        "utf8"
      );
      // Compile the template with Handlebars
      // const compiledTemplate = handlebars.compile(templates);

      // Render the email body with data (if necessary)
      // const renderedBody = compiledTemplate(context);

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: html,
      };

      const result = await this.transport.sendMail(mailOptions);
      if (!result) {
        throw new RequestTimeoutException("Request Failed");
      }
      return { from: process.env.EMAIL_USER, to, message: "Email Sent" };
    } catch (error) {
      console.log("error", error);
      throw new NotFoundException(error.message, error.code);
    }
  }

  async sendMailAsTemplate({ to, subject, template, html,mail_data }: any) {
    try {
      if (
        !fs.existsSync(
          path.join(__dirname, `../../src/views/emails/${template}.hbs`)
        )
      ) {
        throw new Error("Template not found");
      }
      const templates = fs.readFileSync(
        path.join(__dirname, `../../src/views/emails/${template}.hbs`),
        "utf8"
      );
      let template2 = handlebars.compile(templates);
      let htmlToSend = template2(mail_data);
      
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: htmlToSend,
      };

      const result = await this.transport.sendMail(mailOptions);
      if (!result) {
        throw new RequestTimeoutException("Request Failed");
      }
      return { from: process.env.EMAIL_USER, to, message: "Email Sent" };
    } catch (error) {
      console.log("error", error);
      throw new NotFoundException(error.message, error.code);
    }
  }

  create(createMailServiceDto: CreateMailServiceDto) {
    return "This action adds a new mailService";
  }

  findAll() {
    return `This action returns all mailService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mailService`;
  }

  update(id: number, updateMailServiceDto: UpdateMailServiceDto) {
    return `This action updates a #${id} mailService`;
  }

  remove(id: number) {
    return `This action removes a #${id} mailService`;
  }
}
