import { Resend } from "resend";
import env from "../config/environments.js";

export const resend = new Resend(env.resend.api_key);
