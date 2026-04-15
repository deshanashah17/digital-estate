import os, aiohttp
from dotenv import load_dotenv
load_dotenv()

class AadhaarKYC:
    BASE = "https://api.aadhaarkyc.io/api/v1"

    async def verify_aadhaar(self, aadhaar_number: str) -> dict:
        async with aiohttp.ClientSession() as session:
            resp = await session.post(
                f"{self.BASE}/aadhaar-validation/aadhaar-validation/",
                headers={"Authorization": f"Bearer {os.getenv('AADHAAR_API_KEY')}"},
                json={"id_number": aadhaar_number},
            )
            return await resp.json()

    def hash_aadhaar(self, aadhaar_number: str) -> str:
        import hashlib
        return hashlib.sha256(aadhaar_number.encode()).hexdigest()
