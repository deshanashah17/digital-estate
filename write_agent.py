content = """import os, asyncio, base64
from algosdk.v2client import algod
from algosdk import transaction, account
from algosdk.atomic_transaction_composer import AtomicTransactionComposer, AccountTransactionSigner
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import uvicorn
load_dotenv()

ALGOD_URL  = os.getenv("ALGOD_URL", "https://testnet-api.algonode.cloud")
ALGOD_TOKEN = os.getenv("ALGOD_TOKEN", "")
APP_ID     = int(open(".app_id").read().strip())
GRIEVANCE  = int(os.getenv("GRIEVANCE_SECONDS", "30"))

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

class CreateWillRequest(BaseModel):
    owner_address: str
    nominee_address: str
    amount_algo: float

class DeathRequest(BaseModel):
    owner_address: str

class EstateAgent:
    def __init__(self):
        self.client  = algod.AlgodClient(ALGOD_TOKEN, ALGOD_URL)
        self.sk      = os.getenv("ESTATE_AGENT_PRIVATE_KEY")
        self.address = account.address_from_private_key(self.sk)
        self.signer  = AccountTransactionSigner(self.sk)

    def send_payment(self, nominee: str, amount_microalgo: int) -> str:
        sp  = self.client.suggested_params()
        txn = transaction.PaymentTxn(
            sender=self.address, sp=sp,
            receiver=nominee, amt=amount_microalgo,
        )
        signed = txn.sign(self.sk)
        tx_id  = self.client.send_transaction(signed)
        transaction.wait_for_confirmation(self.client, tx_id, 4)
        return tx_id

    def get_app_state(self) -> dict:
        info  = self.client.application_info(APP_ID)
        state = {}
        for kv in info["params"].get("global-state", []):
            key = base64.b64decode(kv["key"]).decode()
            val = kv["value"]
            state[key] = val["uint"] if val["type"] == 2 else base64.b64decode(val.get("bytes","")).decode(errors="replace")
        return state

agent = EstateAgent()
will_data = {}

@app.post("/create-will")
async def create_will(req: CreateWillRequest):
    amount_microalgo = int(req.amount_algo * 1_000_000)
    will_data["nominee"]  = req.nominee_address
    will_data["amount"]   = amount_microalgo
    will_data["owner"]    = req.owner_address
    will_data["executed"] = False
    print(f"[Estate] Will created for nominee {req.nominee_address} amount {amount_microalgo}")
    return {"status": "will_created", "tx_id": "local_" + req.owner_address[:8], "nominee": req.nominee_address, "amount_algo": req.amount_algo}

@app.post("/report-death")
async def report_death(req: DeathRequest):
    if not will_data:
        return {"error": "No will created yet. Create a will first."}
    print(f"[Estate] Death reported for {req.owner_address}")
    asyncio.create_task(auto_execute())
    return {"status": "death_reported", "tx_id": "death_" + req.owner_address[:8], "grievance_seconds": GRIEVANCE}

async def auto_execute():
    print(f"[Estate] Waiting {GRIEVANCE}s grievance window...")
    await asyncio.sleep(GRIEVANCE)
    if will_data and not will_data.get("executed"):
        try:
            tx_id = agent.send_payment(will_data["nominee"], will_data["amount"])
            will_data["executed"] = True
            will_data["tx_id"]    = tx_id
            print(f"[Estate] Will executed! Tx: {tx_id}")
        except Exception as e:
            print(f"[Estate] Execution error: {e}")

@app.get("/status")
async def get_status():
    return {
        "app_id": APP_ID,
        "death_confirmed": 1 if will_data.get("executed") else (1 if will_data.get("death_reported") else 0),
        "death_timestamp": 0,
        "grievance_seconds": GRIEVANCE,
        "nominee": will_data.get("nominee", ""),
        "amount": will_data.get("amount", 0),
        "executed": will_data.get("executed", False),
        "execution_tx": will_data.get("tx_id", ""),
    }

@app.get("/health")
async def health():
    return {"status": "ok", "app_id": APP_ID}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001, reload=True)
"""

with open("agents/estate_agent.py", "w") as f:
    f.write(content)
print("Done")