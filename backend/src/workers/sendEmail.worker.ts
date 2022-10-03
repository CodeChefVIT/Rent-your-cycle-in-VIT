import nodemailer from "nodemailer";
import * as logger from "../config/logger";
import dotenv from "dotenv";
dotenv.config();


const NAMESPACE = 'SEND EMAIL WORKER';
/**
 * Send Email to the user
 * @param  {string} email
 * @param  {string} subject
 * @param  {string} text
 */
export const sendEmail = async (email: string, subject: string, text: string) => {
    logger.info(NAMESPACE, 'Email sending request')
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.GMAIL_ID,
          pass: process.env.GMAIL_PASSWORD
        }
      })
  
      if (process.env.NODE_ENV !== 'test') {
        logger.info(NAMESPACE, 'Sending email')
        await transporter.sendMail({
          from: 'Rent a Cycle <no-reply@codechefvit.com>',
          to: email,
          subject,
          text
        })
        logger.info(NAMESPACE, 'Email sent')
      }
      return true
    } catch (error) {
      logger.error(NAMESPACE, 'Error sending email', error)
      return false;
    }
}
  