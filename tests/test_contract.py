"""Test contract files are properly formatted"""

def test_approval_teal_exists():
    """Verify approval contract file exists and has content"""
    with open("contracts/estate_approval.teal") as f:
        content = f.read()
    assert "#pragma version 8" in content
    assert "register_agents" in content
    assert len(content) > 500

def test_clear_teal_exists():
    """Verify clear program file exists"""
    with open("contracts/estate_clear.teal") as f:
        content = f.read()
    assert "#pragma version 8" in content
