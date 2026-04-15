import os, aiohttp
from dotenv import load_dotenv
load_dotenv()

class UPISettlement:
    """
    Bridge: Algorand ASA transfer → INR credit to nominee's UPI-linked bank.
    Uses Razorpay Payout API. Replace with any licensed payment aggregator.
    """
    BASE = "https://api.razorpay.com/v1/payouts"

    async def payout(self, upi_id: str, amount_paise: int, tx_ref: str):
        auth = aiohttp.BasicAuth(
            os.getenv("RAZORPAY_KEY_ID"),
            os.getenv("RAZORPAY_KEY_SECRET"),
        )
        payload = {
            "account_number": os.getenv("RAZORPAY_ACCOUNT_NUMBER"),
            "fund_account": {"account_type": "vpa",
                             "vpa": {"address": upi_id}},
            "amount":      amount_paise,
            "currency":    "INR",
            "mode":        "UPI",
            "purpose":     "payout",
            "reference_id": tx_ref,
        }
        async with aiohttp.ClientSession() as session:
            resp = await session.post(self.BASE, json=payload, auth=auth)
            return await resp.json()
