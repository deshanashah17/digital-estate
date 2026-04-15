# 🏛️ Digital Estate Management Platform

> A blockchain-based solution for **secure, transparent, and automated digital asset distribution** after death, built on Algorand with Indian government integrations (DigiLocker, Aadhaar, UPI).

![Status](https://img.shields.io/badge/status-beta-yellow)
![License](https://img.shields.io/badge/license-MIT-green)
![Python](https://img.shields.io/badge/python-3.11+-blue)
![Node](https://img.shields.io/badge/node-18+-brightgreen)
![Algorand](https://img.shields.io/badge/algorand-testnet-blue)

## 🎯 Problem Statement

In India, digital asset succession is fragmented and error-prone:
- ❌ No standardized process for digital estate management
- ❌ Family members struggle to access crypto/digital assets post-mortem
- ❌ High risk of fraud due to lack of verification
- ❌ Time-consuming manual verification & settlement

**This platform automates the entire workflow** with:
- ✅ AI-powered death certificate detection (DigiLocker polling)
- ✅ On-chain smart contract for tamper-proof execution
- ✅ 30-day grievance window for legal challenges
- ✅ Automatic ALGO/ASA transfers to nominees
- ✅ Multi-language notifications (6 Indian languages)

---

## 🚀 Key Features

### 🔐 Smart Contracts (Algorand)
- **Approval Contract**: Manages estate state, death confirmation, and asset transfers
- **Clear State Contract**: Cleanup on close-out
- **Built with**: PyTeal (Python DSL for TEAL)

### 🛡️ Three Autonomous Agents
1. **Sentinel Agent** 👁️ - Monitors DigiLocker every hour for death certificates
2. **Estate Agent** ⚙️ - Executes transfers after grace period
3. **Nominee Agent** 📢 - Sends multi-language notifications (WhatsApp/SMS)

### 🔒 Security Features
- **AES-256 Encryption** for sensitive estate data
- **Zero-knowledge vault**: Backend never sees plaintext estate info
- **Aadhaar eKYC** integration for identity verification
- **Blockchain immutability** for all transfers

### 💳 Integration Stack
- **DigiLocker**: Death certificate verification
- **Aadhaar**: KYC & identity validation  
- **Razorpay Payouts**: UPI settlement & direct bank transfers
- **Twilio**: WhatsApp & SMS notifications
- **Algorand**: On-chain execution & settlement

### 🎨 Interactive Dashboard
- Real-time timeline visualization
- Estate status monitoring
- Grace period countdown
- Transaction hash tracking
- Dark/light theme support

---

## 📊 Project Structure

```
digital-estate/
├── agents/
│   ├── sentinel_agent.py       # Death detection monitoring
│   ├── estate_agent.py         # Transfer execution (FastAPI)
│   └── nominee_agent.py        # Notification service
├── contracts/
│   ├── estate_contract.py      # PyTeal smart contract
│   ├── estate_approval.teal    # Compiled TEAL
│   └── estate_clear.teal       # Clear state program
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── utils/              # Algorand utilities
│   │   ├── App.tsx             # Main dashboard
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── vault/
│   ├── asset_vault.py          # AES-256 encryption
│   └── __init__.py
├── integrations/
│   ├── digilocker.py           # Death cert API
│   ├── aadhaar_kyc.py          # eKYC validation
│   └── upi_settlement.py        # Razorpay integration
├── tests/
│   ├── test_contract.py
│   ├── test_sentinel.py
│   └── test_vault.py
├── write_app.py                # ⭐ UPDATED UI CODE - Use this for frontend generation
├── write_ui.py                 # ⭐ UPDATED COMPONENTS - React/TypeScript components
├── write_agent.py              # ⭐ UPDATED BACKEND - FastAPI agent services
├── config.py                   # Configuration
├── requirements.txt            # Python dependencies
└── README.md
```
> 🔹 **Backend Entry Point:** The main backend service runs from `agents/estate_agent.py` (FastAPI server).

### 📌 Important Notes on Code Generation

⭐ **The `write_*.py` files contain the UPDATED production-ready code:**
- `write_app.py` - Updated React App.tsx with all fixes and features
- `write_ui.py` - Updated React components and utilities
- `write_agent.py` - Updated FastAPI backend services

These are the authoritative versions used for deployment. Always refer to these when updating production code.

---

## ⚡ Quick Start

### Prerequisites
- **Python** 3.11+
- **Node.js** 18+
- **Git**

### 1️⃣ Clone & Setup

```bash
git clone https://github.com/yourusername/digital-estate.git
cd digital-estate

# Install Python dependencies
pip install -r requirements.txt

# Install frontend dependencies
cd frontend && npm install && cd ..

# Copy environment template
cp .env.example .env
```

### 2️⃣ Configure Environment

Edit `.env`:
```env
ALGOD_URL=https://testnet-api.algonode.cloud
VAULT_AES_KEY=<your-256-bit-hex-key>
ESTATE_AGENT_PRIVATE_KEY=<agent-private-key>
# See .env.example for all fields
```

Generate AES key:
```bash
python -c "import os; print(os.urandom(32).hex())"
```

### 3️⃣ Deploy Smart Contract

```bash
python contracts/estate_contract.py      # Compile
python contracts/deploy_contract.py      # Deploy to testnet
```

### 4️⃣ Run Services

**Terminal 1 - Backend (Estate Agent API)**
```bash
python -m uvicorn agents.estate_agent:app --host 0.0.0.0 --port 8001 --reload
```

**Terminal 2 - Frontend**
```bash
cd frontend && npm run dev
# Opens http://localhost:5173
```

### 5️⃣ Test the Flow

1. **Create Will**: Enter nominee address & ALGO amount
2. **Trigger Death**: Click "Simulate Death Event (Demo)"
3. **Watch Timeline**: Real-time countdown & transfer execution
4. **Verify**: Check transaction hash on-chain

---

## 🔌 API Endpoints

### Estate Agent API (Port 8001)

#### `GET /status`
Returns current estate state
```json
{
  "app_id": 758796378,
  "death_confirmed": 0,
  "executed": false,
  "nominee": "...",
  "amount": 1000000,
  "grievance_seconds": 30
}
```

#### `POST /create-will`
Create a new estate plan
```json
{
  "owner_address": "OWNER_ADDRESS",
  "nominee_address": "NOMINEE_ADDRESS",
  "amount_algo": 10.5
}
```

#### `POST /report-death`
Trigger death event (Sentinel Agent)
```json
{
  "owner_address": "OWNER_ADDRESS"
}
```

---

## 🏗️ Architecture

### Event Flow

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Estate Owner Creates Will                                │
│    - Sets nominee address & amount                           │
│    - Encrypts sensitive data in vault (AES-256)              │
└──────────────────┬──────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. Sentinel Agent Detects Death                             │
│    - Polls DigiLocker every hour                             │
│    - Finds death certificate for Aadhaar                     │
│    - Calls report_death() → smart contract                   │
└──────────────────┬──────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. Grace Period (30 Days)                                   │
│    - Estate locked for legal challenges                      │
│    - Nominees receive notifications                          │
│    - Timeline displays countdown                             │
└──────────────────┬──────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. Automatic Transfer Execution                             │
│    - Estate Agent calls execute_transfer()                   │
│    - Algorand inner transactions process ASAs               │
│    - Transaction recorded on-chain                           │
└──────────────────┬──────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. Nominee Receives Settlement                              │
│    - UPI transfer via Razorpay Payouts                      │
│    - Multi-language notification (SMS/WhatsApp)             │
│    - Transaction hash tracked in dashboard                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 Security Model

### Encryption
```python
# Estate data is AES-256-CBC encrypted locally
estate_plan = {
    "assets": [...],
    "nominees": {...},
    "executor_info": {...}
}
# Encrypted & stored in vault/
# Backend only receives encrypted blob - never plaintext
```

### On-Chain Safety
- Smart contract enforces 30-day grace period
- Only authorized agents can call methods
- All transfers are atomic
- Transaction immutability = fraud prevention

### Privacy by Design
- Aadhaar hashes (not full numbers) stored encrypted
- Nominee fund amounts encrypted until transfer time
- Backend/frontend never handle sensitive keys together

---

## 📝 Demo Walkthrough

### Scenario: Digital Asset Distribution After Death

1. **Setup Phase**
   - Owner registers 3 ALGO to nominee
   - Creates will through dashboard
   - Confirmation shows on-chain record

2. **Death Detection Phase**
   - Sentinel detects death certificate in DigiLocker
   - Smart contract records `death_confirmed = 1`
   - Timeline shows death event

3. **Grace Period Phase**
   - 30-second countdown (demo), actual = 30 days
   - Nominees notified via WhatsApp/SMS
   - Family can contest in this window

4. **Settlement Phase**
   - Countdown expires
   - Estate Agent triggers `execute_transfer()`
   - ALGO transferred to nominee wallet
   - Dashboard shows completed transaction

5. **Verification**
   - Click transaction hash
   - Opens Algorand Explorer
   - Confirms on-chain transfer

---

## 🚨 Current Limitations (Demo Mode)

⚠️ **DigiLocker Integration**: Currently simulated
- Real integration requires government API approval
- Demo uses manual death event trigger

⚠️ **Grace Period**: Set to 30 seconds for testing
- Production: 30 days

⚠️ **Testnet Only**: ALGO transfers use Algorand testnet
- Requires test ALGO from faucet

---

## 🌐 Deployment to Vercel/Render

### Frontend Deployment (Vercel)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Set root directory: `frontend/`
   - Leave other settings as default

3. **Configure Environment**
   - Add `VITE_API_URL` environment variable pointing to your backend
   - Example: `https://your-backend.render.com` (no trailing slash)

4. **Deploy**
   - Click "Deploy"
   - Vercel auto-redeploys on each push to `main`

### Backend Deployment (Render)

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Connect your GitHub repository

2. **Create New Web Service**
   - Select "Python" environment
   - Build command: `pip install -r requirements.txt`
   - Start command: `uvicorn agents.estate_agent:app --host 0.0.0.0 --port 8080`

3. **Set Environment Variables** (in Render dashboard)
   ```
   ALGOD_URL=https://testnet-api.algonode.cloud
   VAULT_AES_KEY=<your-key>
   ESTATE_AGENT_PRIVATE_KEY=<your-key>
   # ... (add all from .env)
   ```

4. **Enable Auto-Deploy**
   - Link GitHub repository
   - Enable auto-deploy on push

### Environment Variables for Production

**Frontend (.env.production in `frontend/`)**
```
VITE_API_URL=https://your-backend-render.onrender.com
```

**Backend (.env in root)**
```
ALGOD_URL=https://testnet-api.algonode.cloud
VAULT_AES_KEY=<production-key>
ESTATE_AGENT_PRIVATE_KEY=<production-key>
# Other integrations...
```

### Testing Production Build Locally

```bash
# Frontend
cd frontend
npm run build
preview build locally (npm run preview)

# Backend
python -m uvicorn agents.estate_agent:app --host 0.0.0.0 --port 8080
```

---

## 🛠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| `APP_ID not found` | Run `python contracts/deploy_contract.py` |
| `Connection refused :8001` | Start backend: `python -m uvicorn agents.estate_agent:app --port 8001` |
| `AES key error` | Generate new key: `python -c "import os; print(os.urandom(32).hex())"` |
| `Smart contract not deployed` | Verify `.app_id` file exists and check testnet connection |
| `Frontend blank page` | Check browser console for API errors, ensure backend is running |
| `CORS errors in production` | Ensure `VITE_API_URL` env var matches backend URL (no trailing slash) |
| `Static files 404 on Render` | Check build command runs `pip install -r requirements.txt` successfully |

---

## 📚 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Blockchain** | Algorand (PyTeal, AlgoSDK) |
| **Backend** | Python 3.11, FastAPI, asyncio |
| **Frontend** | React 18, TypeScript, Vite |
| **Encryption** | PyCryptodome (AES-256) |
| **APIs** | DigiLocker, Aadhaar, Razorpay, Twilio |
| **Testing** | Pytest, pytest-asyncio |
| **Styling** | Tailwind CSS, responsive design |

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add feature'`
4. Push: `git push origin feature/your-feature`
5. Open Pull Request

---

## 📖 Documentation

- **[Getting Started](./GETTING_STARTED.md)** - Detailed setup guide for new developers
- **Smart Contracts**: See `contracts/estate_contract.py` with inline comments
- **API Docs**: Full endpoints in Estate Agent code
- **Architecture**: See sections above

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) file

---

## 👤 Author

Built with ❤️ for India's digital future

**Feedback?** Open an [issue](https://github.com/yourusername/digital-estate/issues)

---

## 🙏 Acknowledgments

- Algorand Foundation - Smart contract platform
- Indian Government APIs - DigiLocker, Aadhaar, UPI
- Twilio - Notification services
- Razorpay - Settlement infrastructure

---

## 📞 Support

- 🐛 Found a bug? [Open an issue](https://github.com/yourusername/digital-estate/issues)
- 💬 Have questions? Start a [discussion](https://github.com/yourusername/digital-estate/discussions)
- ⭐ Like the project? Consider giving it a star!

---

**Last Updated**: April 15, 2026 | **Status**: Beta | **Testnet**: Live
