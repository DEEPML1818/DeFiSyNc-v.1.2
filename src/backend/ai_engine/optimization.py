import requests

def get_liquidity_data():
    # Example for fetching liquidity pool data from Chainlink
    url = "https://chainlink-api/liquidity-pools"
    response = requests.get(url)
    
    if response.status_code == 200:
        return response.json()
    return []

def recommend_best_pool():
    pools = get_liquidity_data()
    best_pool = max(pools, key=lambda x: x['apy'])
    return best_pool

if __name__ == "__main__":
    best = recommend_best_pool()
    print(f"Recommended Pool: {best['name']} with APY: {best['apy']}%")
