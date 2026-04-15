import asyncio, os
import aiohttp
from algosdk.v2client import algod
from algosdk import transaction, account
from algosdk.atomic_transaction_composer import (
    AtomicTransactionComposer, AccountTransactionSigner
)
from dotenv import load_dotenv
load_dotenv()

ALGOD_URL   = os.getenv("ALGOD_URL", "https://testnet-api.algonode.cloud")
ALGOD_TOKEN = os.getenv("ALGOD_TOKEN", "")
APP_ID      = int(open(".app_id").read().strip())

class SentinelAgent:
    def __init__(self):
        self.client  = algod.AlgodClient(ALGOD_TOKEN, ALGOD_URL)
        self.sk      = os.getenv("SENTINEL_PRIVATE_KEY")
        self.address = account.address_from_private_key(self.sk)
        self.signer  = AccountTransactionSigner(self.sk)

    async def poll_digilocker(self, aadhaar_hash: str) -> bool:
        async with aiohttp.ClientSession() as session:
            try:
                resp = await session.get(
                    "https://digilocker.meripehchaan.gov.in/public/oauth2/1/file/death-certificate",
                    headers={"Authorization": f"Bearer {os.getenv('DIGILOCKER_TOKEN')}"},
                    params={"aadhaar_hash": aadhaar_hash},
                    timeout=aiohttp.ClientTimeout(total=10),
                )
                if resp.status == 200:
                    data = await resp.json()
                    return data.get("status") == "issued"
            except Exception as e:
                print(f"[Sentinel] Poll error: {e}")
        return False

    def report_death_on_chain(self, aadhaar_hash: str) -> str:
        sp  = self.client.suggested_params()
        atc = AtomicTransactionComposer()
        atc.add_method_call(
            app_id=APP_ID,
            method=transaction.ABIMethod.from_signature("report_death(byte[])void"),
            sender=self.address, sp=sp, signer=self.signer,
            method_args=[bytes.fromhex(aadhaar_hash)],
        )
        result = atc.execute(self.client, 4)
        return result.tx_ids[0]

    async def notify_estate_agent(self, aadhaar_hash: str, tx_id: str):
        async with aiohttp.ClientSession() as session:
            await session.post(
                "http://localhost:8001/trigger",
                json={"event": "death_confirmed",
                      "tx_id": tx_id,
                      "aadhaar_hash": aadhaar_hash},
            )

    async def run(self, aadhaar_hash: str):
        print("[Sentinel] Monitoring started...")
        while True:
            if await self.poll_digilocker(aadhaar_hash):
                print("[Sentinel] Death confirmed.")
                tx_id = self.report_death_on_chain(aadhaar_hash)
                await self.notify_estate_agent(aadhaar_hash, tx_id)
                break
            await asyncio.sleep(3600)

if __name__ == "__main__":
    asyncio.run(SentinelAgent().run("YOUR_AADHAAR_HASH_HERE"))
