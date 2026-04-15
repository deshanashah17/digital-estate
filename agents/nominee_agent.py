"""
Nominee Agent - Send notifications in multiple Indian languages via WhatsApp/SMS
NOTE: No Anthropic SDK. Messages are built from local language templates only.
"""
import os
from twilio.rest import Client as TwilioClient
from dotenv import load_dotenv
load_dotenv()

TEMPLATES = {
    "hi": (
        "नमस्ते {name},\n"
        "आपको सूचित किया जाता है कि {asset} आपके DigiLocker खाते में "
        "स्थानांतरित किया गया है।\nलेनदेन ID: {tx_id}\n"
        "अपने DigiLocker ऐप को खोलें और 'Issued Documents' में देखें।"
    ),
    "en": (
        "Hello {name},\n"
        "You have inherited {asset}. It has been transferred to your DigiLocker.\n"
        "Transaction ID: {tx_id}\n"
        "Open DigiLocker → Issued Documents to access your claim."
    ),
    "ta": (
        "வணக்கம் {name},\n"
        "{asset} உங்கள் DigiLocker கணக்கில் மாற்றப்பட்டது.\n"
        "பரிவர்த்தனை ID: {tx_id}\n"
        "DigiLocker → Issued Documents திறக்கவும்."
    ),
    "te": (
        "నమస్కారం {name},\n"
        "{asset} మీ DigiLocker కి బదిలీ చేయబడింది.\n"
        "లావాదేవీ ID: {tx_id}\n"
        "DigiLocker → Issued Documents తెరవండి."
    ),
    "mr": (
        "नमस्कार {name},\n"
        "{asset} तुमच्या DigiLocker मध्ये हस्तांतरित केले आहे.\n"
        "व्यवहार ID: {tx_id}\n"
        "DigiLocker → Issued Documents उघडा."
    ),
    "bn": (
        "নমস্কার {name},\n"
        "{asset} আপনার DigiLocker-এ স্থানান্তরিত হয়েছে।\n"
        "লেনদেন ID: {tx_id}\n"
        "DigiLocker → Issued Documents খুলুন।"
    ),
}

class NomineeAgent:
    def __init__(self):
        self.twilio = TwilioClient(
            os.getenv("TWILIO_ACCOUNT_SID"),
            os.getenv("TWILIO_AUTH_TOKEN"),
        )
        self.from_number = os.getenv("TWILIO_WHATSAPP_FROM")

    def compose_message(self, nominee: dict, tx_id: str) -> str:
        lang     = nominee.get("preferred_language", "en")
        template = TEMPLATES.get(lang, TEMPLATES["en"])
        return template.format(
            name=nominee["name"],
            asset=nominee["asset_description"],
            tx_id=tx_id,
        )

    def send_whatsapp(self, phone: str, message: str):
        self.twilio.messages.create(
            from_=self.from_number,
            to=f"whatsapp:{phone}",
            body=message,
        )

    def send_sms(self, phone: str, message: str):
        self.twilio.messages.create(
            from_=os.getenv("TWILIO_SMS_FROM"),
            to=phone,
            body=message,
        )

    def notify_all(self, plan: list[dict], tx_ids: list[str]):
        for i, item in enumerate(plan):
            nominee = item["nominee"]
            msg     = self.compose_message(nominee, tx_ids[i])
            channel = nominee.get("channel", "whatsapp")
            if channel == "whatsapp":
                self.send_whatsapp(nominee["phone"], msg)
            else:
                self.send_sms(nominee["phone"], msg)
            print(f"[Nominee Agent] Notified {nominee['name']} via {channel}")
