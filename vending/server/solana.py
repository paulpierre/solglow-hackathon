import subprocess
from flask import Flask
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)

DEFAULT_WALLET = '7jCEbftT1yejHpMTzUDssU5ytJ6hLSHsXCA96TwhpN7C'
TOKEN_LIST = [
    ('Super Solana Cart', 'A9kqPvg2FxTL5t1Th72hvviodt2LyTzjQHKKfUtKmCqv'), #1
    ('Starfox: Degen Academy', '6Ti9XSNpiTMpsbVfDLVeL4xaYFhNLc4HXT99EDmnUYpd'), #2
    ('Gradius: Solana\'s Revenge','GfaoD25UdnKGadT6xq9cdv6rSSMFA2bxoSAqFPCoTaLq'), #3
    ('Shadow Run', '7UYaE6vhu6F3QEKVUg37qos3NbJQqkYyGxV8zXHTSKgv'), #4
    ('Space Invaders', 'oVkAzvXBzrntHKpvum6kNDyzLfqBWaRAu1hTpfeRptU'), #5
    ('Contra III', 'XhKzZ58UokfQvPa8VTSXadVKcWuuzbS7egYuYMjgDye'), #6
    ('F-Zero', '4v5iS7demX7W3WhthddzUtM7u42v921g1mGXvbjYqXqv'), #7
    ('Super Metroid', 'wc6RRTr1RpvpDiybHFUSoUQGpNrcVoVSmgQwZCYgCpq'), #8
    ('Battletoads & Double Dragon: The Ultimate Team', '6LTwXnjR5wobbe7q9ciVN8wcXBHbEv2YEFUUiwkBaKHz'), #9
    ('Darius Twin', '3qsxdM82aaZJC7DrATYyLMFh9wPJCeuXgZbyqMQHxLvN'), #10
]

def send_token(wallet_address=DEFAULT_WALLET):
    count_success = 0
    count_fail = 0
    for title, token_address in TOKEN_LIST:
        print(f'sending 1 token of "{title}" to {wallet_address}')  
        cmd_transfer = f'spl-token transfer {token_address} 1 {wallet_address} --allow-unfunded-recipient --fund-recipient'
        res = subprocess.getoutput(cmd_transfer)
        print(res)

        if 'Transfer 1 tokens' in res:
            print(f'Successfully sent a token!')
            count_success +=1
            continue

        elif 'Error' in res:
            print(f'There was an error sending tokens!')
            count_fail +=1
            continue
        else:
            print(f'Unknown error: {res}')
            count_fail +=1
    
    return f'Transferred {count_success}/{count_success+count_fail} total tokens'

@app.route("/")
def home():
    print('##HOME')
    return f'<html><head><title>SolGlow by Conductive Research</title><meta http-equiv="refresh" content="0; URL=https://solglow.zeronft.com" /></head><body style="text-align:center;background-color:yellow;"><h1>Sup Dawg? You came to the wrong place</h1><br/><img src="https://solglow.zeronft.com/dogg.png"></body></html>'

@cross_origin 
@app.route('/send-token/<wallet_address>')
def issue_token(wallet_address):
    if len(wallet_address) < 40:
        return f'{wallet_address} is an invalid wallet address!'
    r = send_token(wallet_address=wallet_address)
    return f'{r}'

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=False)