import requests

def get_liquidity_data():
    # Replace with real Chainlink API endpoint
    url = "https://chainlink-api/liquidity-pools"
    response = requests.get(url)
    
    if response.status_code == 200:
        return response.json()
    else:
        return []

def recommend_best_pool():
    pools = get_liquidity_data()
    if pools:
        best_pool = max(pools, key=lambda x: x['apy'])
        return best_pool
    else:
        return None
