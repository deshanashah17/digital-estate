import os, aiohttp
from dotenv import load_dotenv
load_dotenv()

class DigiLockerClient:
    BASE = "https://digilocker.meripehchaan.gov.in/public/oauth2"

    async def check_death_certificate(self, aadhaar_hash: str) -> bool:
        async with aiohttp.ClientSession() as session:
            resp = await session.get(
                f"{self.BASE}/1/file/death-certificate",
                headers={"Authorization": f"Bearer {os.getenv('DIGILOCKER_TOKEN')}"},
                params={"aadhaar_hash": aadhaar_hash},
            )
            if resp.status == 200:
                return (await resp.json()).get("status") == "issued"
        return False

    async def push_claim_document(self, nominee_id: str, doc_base64: str):
        async with aiohttp.ClientSession() as session:
            await session.post(
                f"{self.BASE}/1/file/push",
                json={"user_id": nominee_id,
                      "document": doc_base64,
                      "doc_type": "inheritance_claim"},
                headers={"Authorization": f"Bearer {os.getenv('DIGILOCKER_TOKEN')}"},
            )
