/**
 * 
 *    _____/\\\\\\\\\\\__________________/\\\\\\________/\\\\\\\\\\\\__/\\\\\\____________________________________        
 *     ___/\\\/////////\\\_______________\////\\\______/\\\//////////__\////\\\____________________________________       
 *      __\//\\\______\///___________________\/\\\_____/\\\________________\/\\\____________________________________      
 *       ___\////\\\_____________/\\\\\_______\/\\\____\/\\\____/\\\\\\\____\/\\\________/\\\\\_____/\\____/\\___/\\_     
 *        ______\////\\\________/\\\///\\\_____\/\\\____\/\\\___\/////\\\____\/\\\______/\\\///\\\__\/\\\__/\\\\_/\\\_    
 *         _________\////\\\____/\\\__\//\\\____\/\\\____\/\\\_______\/\\\____\/\\\_____/\\\__\//\\\_\//\\\/\\\\\/\\\__   
 *          __/\\\______\//\\\__\//\\\__/\\\_____\/\\\____\/\\\_______\/\\\____\/\\\____\//\\\__/\\\___\//\\\\\/\\\\\___  
 *           _\///\\\\\\\\\\\/____\///\\\\\/____/\\\\\\\\\_\//\\\\\\\\\\\\/___/\\\\\\\\\__\///\\\\\/_____\//\\\\//\\\____ 
 *            ___\///////////________\/////_____\/////////___\////////////____\/////////_____\/////________\///__\///_____
 * 
 *       Sup Dawg? Welcome to the SolGlow front-end source code.
 *       
 *       Solglow is the first NFT-based arcade for the Solana blockchain by Conductive Research
 * 
 *       Follow us at @conductivegroup
 * 
 *       Credits:
 *       --------
 *       code: paul@conductiveresearch.com
 *       arcade code: spencer@conductiveresearch.com
 *       design: eric@conductiveresearch.com
 *      
 * 
 *  To run locally:
 *  -------------------------------
 *  python -m SimpleHTTPServer 8000
 *  -------------------------------
 * 
 *  You can view this live at https://solglow.zeronft.com
 *  For devnet NFTs visit https://solglow.zeronft.com/vending
 */


/** =====================
 *  Global vars/constants
 *  ===================== */

var sentToken = "", solana
const localStorage = window.localStorage
const playNowButton = document.getElementById('walletPrompt') // the white play button on upper right hand


/** ====================
 *  Wait for DOM to load
 *  ==================== */

document.addEventListener("DOMContentLoaded", function () {

  solana = window.solana

  console.log('main solana:')
  console.log(solana)


  // declare our app instance for Vue
  var app = new Vue({
    /** ========================
     *  Attach Vue instance here
     *  ======================== */
    el: '#app',

    /** ===================
     *  Global vars for app
     *  =================== */
    data: {
      networkIcon: 'https://phantom.app/img/logo_large.png',
      solana: solana,
      solanaWeb3: solanaWeb3,
      solanaConnection: null,
      sizeClass: 'size-desktop',

      isHardCodedWallet: false, // this is the checkbox, we hardcode to load NFTs if user has none
      userEmailAddress: null, // email address

      //whether we are currently loading, display loading screen, if false hide it
      isLoadingAssets: false,

      //should we be showing the Unity game screen
      isShowGame: false,

      //should we be showing the NFT gallery
      isShowAssets: true,

      //class name for that console bar at the bottom
      consoleClass: null,
      userEmail: null,

      //the ethereum network in use
      network: null,

      //avatar of the user
      userAvatar: null,

      //default console text
      consoleText: 'Welcome to Zero NFT and awesome NFT game',

      //default wallet prompt
      walletPrompt: 'Select Wallet',

      //ETH wallet address
      walletAddress: 'Please click connect to launch Metamask 👉',

      //whether assets have been loaded or not, this is the array
      walletAssets: false,

      //element ID of the button to select wallet
      btnConnectWallet: '#select-wallet',

      //wallet balance in ETH
      walletBalance: false,

      //DOM reference to Unity instance
      gameInstance: null,

      //header of the modal
      modalHeader: 'Select a Network',
      btnTxtAuthPhantom: 'Connect to Solana',
      btnTxtAuthMetaMask: 'Connect to Ethereum',
      btnTxtAuthGoogle: 'Authenticate with Google',
      btnTxtAuthEmail: 'Open Wallet',

      //list of all the users wallets
      userWallets: [],

      // All the game assets
      romAssets: {
        'A9kqPvg2FxTL5t1Th72hvviodt2LyTzjQHKKfUtKmCqv': {
          title: 'Super Solana Cart',
          rom_url: 'https://gateway.pinata.cloud/ipfs/QmdG6nFayFNTtoJtZQf8WCDb2wVyUUMDtPhYCjHmpD3njo?filename=Super%20Solana%20Kart.smc',
          system: 'snes',
          img_url: [
            'https://www.mobygames.com/images/covers/l/24155-super-mario-kart-snes-front-cover.jpg',
            'https://www.mobygames.com/images/covers/l/68920-super-mario-kart-snes-back-cover.jpg'
          ],
          style: [
            'background-size: 200px 130px;background-image:url("https://www.mobygames.com/images/covers/l/24155-super-mario-kart-snes-front-cover.jpg");',
            'background-size: 200px 130px;background-image:url("https://www.mobygames.com/images/covers/l/68920-super-mario-kart-snes-back-cover.jpg");'
          ],
          token_id: 'A9kqPvg2FxTL5t1Th72hvviodt2LyTzjQHKKfUtKmCqv',
        },
        '6Ti9XSNpiTMpsbVfDLVeL4xaYFhNLc4HXT99EDmnUYpd': {
          title: 'Starfox: Degen Academy',
          rom_url: 'https://gateway.pinata.cloud/ipfs/QmcEBbgcXkxHbpgNrWFawbVVQKbNquz4GngQYEJ676kJhu?filename=STARFOX_memes_dog.SFC',
          system: 'snes',
          img_url: [
            'https://commondatastorage.googleapis.com/images.pricecharting.com/AMIfv96mKjNTuxjSwnpVJqvMNs7ZaIyA0vREwgPb7Gazqbq7T-NsRgSdSHdbJ1PNh4jeE_RMFtP6NqFnrXaXG0rKUBfmnzzrxcoD70iARkRYQBksY5zElZZr-yhwU5TiF-hNH3IrJ9pdQcLBVe3zWQd99XAF-EQvaA/240.jpg',
            'https://commondatastorage.googleapis.com/images.pricecharting.com/AMIfv9404_wqodSAPUDP5b8_IjcMTOIjMXPrweV-Oumq__t6zhq3_FxyQlnn4TIIDGnIY-9VTqBAwlKm0RZcAA9W1BHnEDd_y2XtFedss1nng0sxFlBLuNt2EqDIC_hNSfVnNiypvbr1dQg-SCXfvchcNvJ87eeepw/240.jpg'
          ],
          style: [
            'background-size: 200px 130px;background-image:url("https://commondatastorage.googleapis.com/images.pricecharting.com/AMIfv96mKjNTuxjSwnpVJqvMNs7ZaIyA0vREwgPb7Gazqbq7T-NsRgSdSHdbJ1PNh4jeE_RMFtP6NqFnrXaXG0rKUBfmnzzrxcoD70iARkRYQBksY5zElZZr-yhwU5TiF-hNH3IrJ9pdQcLBVe3zWQd99XAF-EQvaA/240.jpg");',
            'background-size: 200px 130px;background-image:url("https://commondatastorage.googleapis.com/images.pricecharting.com/AMIfv9404_wqodSAPUDP5b8_IjcMTOIjMXPrweV-Oumq__t6zhq3_FxyQlnn4TIIDGnIY-9VTqBAwlKm0RZcAA9W1BHnEDd_y2XtFedss1nng0sxFlBLuNt2EqDIC_hNSfVnNiypvbr1dQg-SCXfvchcNvJ87eeepw/240.jpg");'
          ],
          token_id: '6Ti9XSNpiTMpsbVfDLVeL4xaYFhNLc4HXT99EDmnUYpd',
        },

        'GfaoD25UdnKGadT6xq9cdv6rSSMFA2bxoSAqFPCoTaLq': {
          title: 'Gradius: Solana\'s Revenge',
          rom_url: 'https://gateway.pinata.cloud/ipfs/QmZukknKHMRUv6tEcxfP36Vd2xKWGdLkAbEYU3xWCuFGm3?filename=Gradius%20III.smc',
          system: 'nes',
          img_url: [
            'https://www.mobygames.com/images/covers/l/33282-gradius-iii-snes-front-cover.jpg',
            'https://gamefaqs.gamespot.com/a/box/5/4/7/42547_back.jp'
          ],
          style: [
            'background-size: 200px 130px;background-image:url("https://www.mobygames.com/images/covers/l/33282-gradius-iii-snes-front-cover.jpg");',
            'background-size: 200px 130px;background-image:url("https://gamefaqs.gamespot.com/a/box/5/4/7/42547_back.jpg");'
          ],
          token_id: 'GfaoD25UdnKGadT6xq9cdv6rSSMFA2bxoSAqFPCoTaLq',
        },

        '7UYaE6vhu6F3QEKVUg37qos3NbJQqkYyGxV8zXHTSKgv': {
          title: 'Shadow Run',
          rom_url: 'https://gateway.pinata.cloud/ipfs/QmUJrsoJuSqdn7zmDd6yC6a1r1aFJ5A5CqaXKrvqUYFn1o?filename=Shadowrun.smc',
          system: 'snes',
          img_url: [
            'https://www.mobygames.com/images/covers/l/629712-shadowrun-snes-front-cover.jpg',
            'https://www.mobygames.com/images/covers/l/629713-shadowrun-snes-back-cover.jpg'
          ],
          style: [
            'background-size: 200px 130px;background-image:url("https://www.mobygames.com/images/covers/l/629712-shadowrun-snes-front-cover.jpg");',
            'background-size: 200px 130px;background-image:url("https://www.mobygames.com/images/covers/l/629713-shadowrun-snes-back-cover.jpg");'
          ],
          token_id: '7UYaE6vhu6F3QEKVUg37qos3NbJQqkYyGxV8zXHTSKgv',
        },

        'oVkAzvXBzrntHKpvum6kNDyzLfqBWaRAu1hTpfeRptU': {
          title: 'Space Invaders',
          rom_url: 'https://gateway.pinata.cloud/ipfs/QmShDdZ785updJ52dBbNJ2EAaicuaJbHvWkzRJsXGwDbb3?filename=Space%20Invaders%20%28USA%29.smc',
          system: 'snes',
          img_url: [
            'https://www.mobygames.com/images/covers/l/68477-space-invaders-snes-front-cover.jpg',
            'https://www.mobygames.com/images/covers/l/68478-space-invaders-snes-back-cover.jpg'
          ],
          style: [
            'background-size: 200px 130px;background-image:url("https://www.mobygames.com/images/covers/l/68477-space-invaders-snes-front-cover.jpg");',
            'background-size: 200px 130px;background-image:url("https://www.mobygames.com/images/covers/l/68478-space-invaders-snes-back-cover.jpg");'
          ],
          token_id: 'oVkAzvXBzrntHKpvum6kNDyzLfqBWaRAu1hTpfeRptU',
        },
        'XhKzZ58UokfQvPa8VTSXadVKcWuuzbS7egYuYMjgDye': {
          title: 'Contra III',
          rom_url: 'https://gateway.pinata.cloud/ipfs/QmRF7PefTzDaBvuMWcbA8xnV5kEd758wSKgK2mSRAXsxUh?filename=Contra%20III%20-%20The%20Alien%20Wars.smc',
          system: 'snes',
          img_url: [
            'https://www.mobygames.com/images/covers/l/70112-contra-iii-the-alien-wars-snes-front-cover.jpg',
            'https://www.mobygames.com/images/covers/l/586315-contra-iii-the-alien-wars-snes-back-cover.png'
          ],
          style: [
            'background-size: 200px 130px;background-image:url("https://www.mobygames.com/images/covers/l/70112-contra-iii-the-alien-wars-snes-front-cover.jpg");',
            'background-size: 200px 130px;background-image:url("https://www.mobygames.com/images/covers/l/586315-contra-iii-the-alien-wars-snes-back-cover.png");'
          ],
          token_id: 'XhKzZ58UokfQvPa8VTSXadVKcWuuzbS7egYuYMjgDye',
        },
        '4v5iS7demX7W3WhthddzUtM7u42v921g1mGXvbjYqXqv': {
          title: 'F-Zero',
          rom_url: 'https://gateway.pinata.cloud/ipfs/QmNS18nMHvYL6XaJjqa8G7xzE4aYTD1rRKbKmQ7pJZvWLx?filename=F-Zero.smc',
          system: 'snes',
          img_url: [
            'https://www.mobygames.com/images/covers/l/37387-f-zero-snes-front-cover.jpg',
            'https://www.mobygames.com/images/covers/l/57407-f-zero-snes-back-cover.jpg'
          ],
          style: [
            'background-size: 200px 130px;background-image:url("https://www.mobygames.com/images/covers/l/37387-f-zero-snes-front-cover.jpg");',
            'background-size: 200px 130px;background-image:url("https://www.mobygames.com/images/covers/l/57407-f-zero-snes-back-cover.jpg");'
          ],
          token_id: '4v5iS7demX7W3WhthddzUtM7u42v921g1mGXvbjYqXqv',
        },



        'wc6RRTr1RpvpDiybHFUSoUQGpNrcVoVSmgQwZCYgCpq': {
          title: 'Super Metroid',
          rom_url: 'https://gateway.pinata.cloud/ipfs/QmUMkAKwzi7GqvmNDBpQx9fBDQqgXPYZxJoD1UNLG7njjc?filename=Super%20Metroid.smc',
          system: 'snes',
          img_url: [
            'https://www.mobygames.com/images/covers/l/35570-super-metroid-snes-front-cover.jpg',
            'https://www.mobygames.com/images/covers/l/16502-super-metroid-snes-back-cover.jpg'
          ],
          style: [
            'background-size: 200px 130px;background-image:url("https://www.mobygames.com/images/covers/l/35570-super-metroid-snes-front-cover.jpg");',
            'background-size: 200px 130px;background-image:url("https://www.mobygames.com/images/covers/l/16502-super-metroid-snes-back-cover.jpg");'
          ],
          token_id: 'wc6RRTr1RpvpDiybHFUSoUQGpNrcVoVSmgQwZCYgCpq',
        },

        '6LTwXnjR5wobbe7q9ciVN8wcXBHbEv2YEFUUiwkBaKHz': {
          title: 'Battletoads & Double Dragon: The Ultimate Team',
          rom_url: 'https://gateway.pinata.cloud/ipfs/QmTdGf6XevVdHBouBU6PsAozw4CS4uNK792b8eZNyW1ovx?filename=Battletoads%20%26%20Double%20Dragon%20-%20The%20Ultimate%20Team.smc',
          system: 'snes',
          img_url: [
            'https://www.mobygames.com/images/covers/l/34522-battletoads-double-dragon-snes-front-cover.jpg',
            'https://www.mobygames.com/images/covers/l/34523-battletoads-double-dragon-snes-back-cover.jpg'
          ],
          style: [
            'background-size: 200px 130px;background-image:url("https://www.mobygames.com/images/covers/l/34522-battletoads-double-dragon-snes-front-cover.jpg");',
            'background-size: 200px 130px;background-image:url("https://www.mobygames.com/images/covers/l/34523-battletoads-double-dragon-snes-back-cover.jpg");'
          ],
          token_id: '6LTwXnjR5wobbe7q9ciVN8wcXBHbEv2YEFUUiwkBaKHz',
        },

        '3qsxdM82aaZJC7DrATYyLMFh9wPJCeuXgZbyqMQHxLvN': {
          title: 'Darius Twin',
          rom_url: 'https://gateway.pinata.cloud/ipfs/QmbeowGV5pggoEBa2Tmiw6Xfxuwu3Fcd9ejibi9djNgGCa?filename=Darius%20Twin%20%28USA%29.smc',
          system: 'snes',
          img_url: [
            'https://gamefaqs.gamespot.com/a/box/6/0/0/50600_front.jpg',
            'https://gamefaqs.gamespot.com/a/box/6/0/4/50604_back.jpg'
          ],
          style: [
            'background-size: 200px 130px;background-image:url("https://gamefaqs.gamespot.com/a/box/6/0/0/50600_front.jpg");',
            'background-size: 200px 130px;background-image:url("https://gamefaqs.gamespot.com/a/box/6/0/4/50604_back.jpg");'
          ],
          token_id: '3qsxdM82aaZJC7DrATYyLMFh9wPJCeuXgZbyqMQHxLvN',
        },
      },

    },

    /** =============
     *  Computed vars
     *  ============= */

    computed: {
      btnStatus: function () {
        return {
          'classDisabled cmn-btn': !this.userEmailAddress,
          'classEnabled cmn-btn': this.userEmailAddress
        }
      },
      isPhantomInstalled: function () {
        return this.solana && this.solana.isPhantom
      },

      //whether the game is visible or not
      gameVisibility: function () {
        return {
          'classHidden': !this.isShowGame,
          'classShow d-flex justify-content-center': this.isShowGame
        }
      }
    },

    /** ===========
     *  App methods
     *  =========== */
    methods: {

      /** ==============================
       *  Grab Wallet Tokens (Etherscan)
       *  ============================== */


      getWalletAssetsSolana: async function (wallet_address) {
        const _this = this

        var _assets = []

        if (typeof this.walletAddress == 'undefined' || !this.walletAddress) {
          console.log('!!! ERROR. wallet address not avail')
          return false
        }

        console.log(`### checking solana wallet address ${wallet_address} for NFTs`)



        for (const [key, o] of Object.entries(this.romAssets)) {
          console.log(`checking for NFT token ID: ${o.token_id}`)
          var data = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "getTokenAccountsByOwner",
            "params": [
              this.walletAddress,
              {
                "mint": o.token_id
              },
              {
                "encoding": "jsonParsed"
              }
            ]
          }
          await axios.post(`https://api.devnet.solana.com`, data).then(function (res) {

            try {
              var _token = res.data.result.value[0].account.data.parsed.info.mint
              console.log(`#### looking up token: ${_token}`)
              _assets.push(_this.romAssets[_token])

            } catch (e) {
              console.log('!!! error reading token:')
              console.log(e)
              console.log('response:')
              console.log(res.data)
              return false
            }
          })

        }

        console.log('### assets complete:')
        console.log(_assets)
        this.walletAssets = _assets



        //if there are 1 or more, lets say how many we found
        if (this.walletAssets.length > 0) {
          this.consoleWriter(this.walletAssets.length + ' NFTs found in your wallet')
          console.log('## Assets:')
          console.log(this.walletAssets)

          //initialize the jQuery slider once we have all the NFts loaded
          _this.showGameMenu()


        } else _this.consoleWriter('😞... Sorry, no NFTs found. Maybe go get some?')


        return _assets

      },

      /** ==========================
       *  Trigger Metamask Auth Flow
       *  ========================== */

      authPhantom: async function () {
        this.solana = window.solana

        console.log('Game visibility: ' + this.isShowGame + ' ' + this.gameVisibility)

        console.log('### SOLANA:')
        console.log(this.solana)
        if (!this.isPhantomInstalled) {
          console.log('### Phantom NOT installed')
          this.consoleWriter('Yikes. Phantom is required to play.')
          return false
        }

        console.log('### Phantom is installed!!')
        this.consoleWriter('Congrats, you have Phantom installed 👍')

        //window.solana.connect()

        window.solana.on("connect", await this.getPhantomWallet)
        this.networkIcon = 'https://phantom.app/img/logo_large.png'

        //this.solana.request({url:"http://devnet.solana.com/", method: "connect" })
        this.solana.connect({ method: 'connect', url: 'https://devnet.solana.com/' })
        this.solanaConnection = new this.solanaWeb3.Connection('https://devnet.solana.com/')

        this.network = 'solana-devnet'

      },

      selectGame: async function () {
        this.isShowGame = true
        this.isShowAssets = false
        this.isLoadingAssets = false
        this.walletAssets = true
      },

      reloadGameMenu: function () {
        window.location.hash = this.walletAddress
        window.location.reload()
      },

      showGameMenu: async function () {
        const _this = this
        this.isShowGame = false
        this.isLoadingAssets = false
        this.isShowAssets = true


        setTimeout(() => {

          //initialize Slick Slider
          $('.blog-slider').slick({
            autoplay: false,
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: false,
            speed: 700,
            arrows: true,
            dots: false,
            prevArrow: '<div class="prev"><img src="assets/images/elements/prev-btn.png"></div>',
            nextArrow: '<div class="next"><img src="assets/images/elements/next-btn.png"></div>',
            responsive: [
              {
                breakpoint: 1200,
                settings: {
                  slidesToShow: 4
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 4
                }
              }
            ]
          });
        }, 200)

      },

      getPhantomWallet: async function (wallet_address) {
        console.log('### getPhantomWallet')


        //show loading screen
        this.isLoadingAssets = true

        this.consoleWriter('...Retrieving your wallet')


        if (wallet_address && wallet_address.length > 40)
          this.walletAddress = wallet_address
        else {
          this.walletAddress = this.solana.publicKey.toString()
          this.walletBalance = await this.solanaConnection.getBalance(this.solana.publicKey)
          this.walletBalance = this.walletBalance * 0.000000001
          this.walletPrompt = 'Balance: ' + this.walletBalance.toString().substring(0, 6)

        }

        console.log('Wallet address: ' + this.walletAddress)

        this.consoleWriter('Wallet found 👉 ' + this.walletAddress + ' w/ balance: ' + this.walletBalance)

        console.log(`### network: ${this.network}`)

        this.getWalletAssetsSolana()

      },

      /** =========
       *  Load NFTs
       *  ========= */

      //this gets triggered when a user selects an NFT

      loadNFT: function (token_id, game_system, rom_url) {
        console.log(`token_id: ${token_id} game_system: ${game_system} rom_url: ${rom_url}`)
        var _this = this
        this.consoleWriter(`token_id: ${token_id} game_system: ${game_system} rom_url: ${rom_url}`)

        const scriptList = document.getElementsByTagName("script")
        const convertedNodeList = Array.from(scriptList)
        for (i = 0; i <= convertedNodeList.length - 1; i++) {
          console.log('### script: ' + convertedNodeList[i].src)
          if (
            convertedNodeList[i].src.indexOf('www.emulatorjs.com') > -1
          ) {
            console.log('## FOUND and removing: ' + convertedNodeList[i].src)
            convertedNodeList[i].parentNode.removeChild(convertedNodeList[i])
          }
        }

        emu1 = document.querySelector("#emulator1");
        emu2 = document.querySelector('#emulator2')

        if (emu1 && emu2) {
          console.log('## found them and removing them!')
          emu1.remove()
          emu2.remove()

          document.head.getElementsByTagName('script')[0].remove()
          document.head.getElementsByTagName('script')[0].remove()
        }


        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
          this.sizeClass = 'size-mobile'
          console.log('#### size-mobile')

        } else {
          this.sizeClass = 'size-desktop'
          console.log('#### size-desktop')
        }

        var script2 = document.createElement("script")
        var script = document.createElement("script")

        script.id = 'emulator1'
        script2.id = 'emulator2'

        script.type = 'text/javascript'
        script2.type = 'text/javascript'
        script.src = 'https://www.emulatorjs.com/loader.js'
        script2.innerHTML = `
          EJS_player = '#game';
          EJS_gameUrl = '${rom_url}'; // Url to Game rom
          EJS_gameID = 2; // ID in your website, required for netplay.
          EJS_core = '${game_system}';
          EJS_mouse = false; // SNES Mouse
          EJS_multitap = false; // SNES Multitap
        `
        script.onload = () => {
          console.log('### script loaded just fine :)')
        };
        document.body.appendChild(script2)
        document.body.appendChild(script)

        //hide the NFT selection screen
        this.isShowAssets = false

        //show the Unity screen
        this.isShowGame = true

      },


      /** ===============
       *  App Entry-point
       *  =============== */
      initialize: function () {

        // address provided in hash
        if (window.location.hash.length > 40) {
          this.getPhantomWallet(window.location.hash.substr(1, window.location.hash.length - 1))

        }
      },



      /** =======================
       *  Black bar at the bottom
       *  ======================= */
      consoleWriter: function (text) {
        this.consoleText = text
      },

      round: function (value, decimals) {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
      },
      WeiToEth: function (wei) {
        return wei * 0.000000000000000001
      },

      isMetaMaskInstalled: function () {
        const { ethereum } = window
        return Boolean(ethereum && ethereum.isMetaMask)
      },

    },

    /** ================
     *  VueJS entrypoint
     *  ================ */

    mounted() {

      if (this.isPhantomInstalled) {
        console.log('You have Metamask installed!')
        this.consoleWriter('Congrats, you have Phantom installed 👍')
      } else {
        console.log('Metamask not installed!')
        this.consoleWriter('Yikes. Phantom is required to play.')
      }
      console.log('Game visibility: ' + this.isShowGame + ' ' + this.gameVisibility)

      this.initialize()

    }
  })


});


