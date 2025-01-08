import {api} from "../lib/axios";

export const sendSms = async (phone: string, message: string) => {
    try {
        await api.post("https://www.telcosms.co.ao/api/v2/send_message", {
            message: {
                api_key_app: process.env.SMS_API_KEY,
                phone_number: phone,
                message_body: message,
            },
        });
        return true;
    } catch {
        return false;
    }
};
