![SolGlow Solana Hackathon by Conductive Research](https://github.com/paulpierre/solglow-hackathon/blob/master/readme/git_hero_1.png?raw=true)


## SolGlow - A Solana game arcade using SPL token NFTs

- - -

# Introduction

Sup Dawg?

Conductive Research here and we're innovating ways blockchains like Solana and NFT's can be used with games.

We won [first prize](https://www.theblockbeats.com/en/flash/34946) at the Dora Hacks hackathon [with Zero NFT](https://dora.zeronft.com/) that allows you to turn any cryptopunk in your Metamask wallet into a video game character.

NFTs are going to be a killer solution for interoperable game content, but what if we took this idea a step further and NFTs gave you access to games? Imagine if your Steam library was a collection of NFTs instead of game licenses. This would open a world of possibilities like truly limited-edition digital games and allow gamers to resell digital games they purchased in an open marketplace.

We built Solglow for the Star Atlas Arcade to show a glimpse of the future. 

# How it works

Solglow reads a Phantom wallet and looks for NFTs we minted on the Solana network. Each NFT gives you access to a different game in our virtual arcade. 

![SolGlow Solana Hackathon by Conductive Research](https://github.com/paulpierre/solglow-hackathon/blob/master/readme/git_hero_2.png?raw=true)

Along with classics like Shadowrun, we made limited-edition games with memes inside them that you can only play on Solglow. We can’t wait to see players drive through Super Solana Cart and blast through Starfox: Degen Academy

![SolGlow Solana Hackathon by Conductive Research](https://github.com/paulpierre/solglow-hackathon/blob/master/readme/git_hero_3.png?raw=true)

# How to play

* First download the Phantom Solana wallet for Chrome/Brave: [https://phantom.app/](https://phantom.app/)
* Use the invite code "COIN"
* Go to the settings and select "Change Network"

![SolGlow Solana Hackathon by Conductive Research](https://github.com/paulpierre/solglow-hackathon/blob/master/readme/instructions_1.png?raw=true)

* Select "DEVNET"

![SolGlow Solana Hackathon by Conductive Research](https://github.com/paulpierre/solglow-hackathon/blob/master/readme/instructions_2.png?raw=true)

* Now get some NFTs, go to the SolGlow Vending machine here: [https://solglow.zeronft.com/vending/](https://solglow.zeronft.com/vending/)

![SolGlow Solana Hackathon by Conductive Research](https://github.com/paulpierre/solglow-hackathon/blob/master/readme/git_hero_4.png?raw=true)

* Enter your wallet and submit. Your broke ass got No SOL? No sweat, we got you baby!

# How to run locally


### Front-end
Running the code locally is simple, on MacOS/Linux run:

`python -m SimpleHTTPServer 8000`

and it should spawn a local webserver. You can view the game by visiting `http://localhost:8000`

### Back-end

You will need to have [Docker Desktop](https://www.docker.com/products/docker-desktop) installed

* [Generate your keypair file](https://spl.solana.com/token) and place it in the directory `vending/server/solana.json`
* Build the `Dockerfile` image by running `docker build -t solglow .` in the directory `/vending/server`
* Run docker `docker run -d -p 8000:8000 solglow`
* Now you can access the back-end Flask API at `http://localhost:8000`

### Running on production

This part it slightly more involved. You will want to install Ngnix so that it can behave as a proxy for your Docker container and the internet.

* First install ngnix `sudo apt-get install ngnix`
* Create a config file `nano /etc/nginx/sites-available/solglow`
* Save the following config
```
server {
    listen 80;
    server_name solglow.mydomain.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
* Next enable this configuration `sudo ln -s /etc/nginx/sites-available/solglow /etc/nginx/sites-enabled/solglow`
* And reload the config on that bad boy `sudo service nginx configtest`
* And restart your web server `sudo service nginx restart`
* Now your api should be available at `solglow.mydomain.com`
* NOTE: You'll need to setup your CNAME/A RECORD in your DNS settings

## Deriving json keypair

If you have already generated your wallet and have the private and public key but want to generate the json file spl-token program requires you can easily do that by taking your private key, decoding it from base58 and converting the resulting binary to ascii codes. The public key will be the first 32 byte array values. The entire private key must be in JSON format

* Import Base58 Python: https://pypi.org/project/base58
* Decode your secret key: `secret_key_binary = base58.b58decode(WALLET_SECRET_KEY)`
* Public key JSON: `public_key_byte_byte_array = [int(c) for c in secret_key_binary][:32]`
* Private key JSON: `private_key_byte_array = [int(c) for c in secret_key_binary]`

# Technical

This game was built with:
* Front-end: VueJS
* Web3: SolanaWeb3
* Vending machine: python + docker + spl-token-cli hackery because the docs suck


# Credits

* Code / Design: @paulpierre / paul@conductiveresearch dot com
* Arcade code: spencer@conductiveresearch dot com
* UI / Design: eric@conductiveresearch dot com


### MIT License
- - -

Copyright (c) 2021 Conductive Research Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in allcopies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
