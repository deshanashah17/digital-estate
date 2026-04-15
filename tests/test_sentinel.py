import pytest
from unittest.mock import AsyncMock, patch, MagicMock

@pytest.mark.asyncio
async def test_poll_returns_false_on_error():
    """Test that poll_digilocker returns False on network errors"""
    from agents.sentinel_agent import SentinelAgent
    
    agent = SentinelAgent.__new__(SentinelAgent)
    agent.client = MagicMock()
    
    with patch("aiohttp.ClientSession.get", side_effect=Exception("timeout")):
        result = await agent.poll_digilocker("deadbeef")
    assert result is False
