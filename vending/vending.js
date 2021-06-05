/**
 * 
_____/\\\\\\\\\\\__________________/\\\\\\________/\\\\\\\\\\\\__/\\\\\\____________________________________        
 ___/\\\/////////\\\_______________\////\\\______/\\\//////////__\////\\\____________________________________       
  __\//\\\______\///___________________\/\\\_____/\\\________________\/\\\____________________________________      
   ___\////\\\_____________/\\\\\_______\/\\\____\/\\\____/\\\\\\\____\/\\\________/\\\\\_____/\\____/\\___/\\_     
    ______\////\\\________/\\\///\\\_____\/\\\____\/\\\___\/////\\\____\/\\\______/\\\///\\\__\/\\\__/\\\\_/\\\_    
     _________\////\\\____/\\\__\//\\\____\/\\\____\/\\\_______\/\\\____\/\\\_____/\\\__\//\\\_\//\\\/\\\\\/\\\__   
      __/\\\______\//\\\__\//\\\__/\\\_____\/\\\____\/\\\_______\/\\\____\/\\\____\//\\\__/\\\___\//\\\\\/\\\\\___  
       _\///\\\\\\\\\\\/____\///\\\\\/____/\\\\\\\\\_\//\\\\\\\\\\\\/___/\\\\\\\\\__\///\\\\\/_____\//\\\\//\\\____ 
        ___\///////////________\/////_____\/////////___\////////////____\/////////_____\/////________\///__\///_____
  
  Sup dawg? welcome to the SolGlow vending machine
 */

/** =====================
 *  Global vars/constants
 *  ===================== */



var sentToken = "", solana
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
            didSubmitWallet: false,
            submitStatus: 'Submitting SPL token request...',
            userWalletAddress:null,
            networkIcon: 'https://phantom.app/img/logo_large.png',//'https://cdn.iconscout.com/icon/free/png-512/metamask-2728406-2261817.png',
            solana: solana,
            solanaWeb3: solanaWeb3,
            solanaConnection: null,
            sizeClass: 'size-desktop',

            isHardCodedWallet: false, // this is the checkbox, we hardcode to load NFTs if user has none
            userEmailAddress: null, // email address

            //this is set and gets replaced when spencer compiles
            unityMacro: {
                product_name: '{{{ PRODUCT_NAME }}}'
            },


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
            consoleText: 'Welcome to SolGlow',

            //default wallet prompt
            walletPrompt: 'Select Wallet',

            //ETH wallet address
            walletAddress: 'Please click connect to launch Metamask 👉',

            //whether assets have been loaded or not, this is the array
            walletAssets: false,

            //element ID of the button to select wallet
            btnConnectWallet: '#select-wallet',


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

            showModal: function() {
                console.log('clicked show modal!')
                var modal = document.querySelector("#myModal")
                modal.style.display = "block";
      
                btn_close = document.querySelector(".close")
                
                // When the user clicks on <span> (x), close the modal
                btn_close.onclick = function() {
                  modal.style.display = "none";
                }
                
                // When the user clicks anywhere outside of the modal, close it
                window.onclick = function(event) {
                  if (event.target == modal) {
                    modal.style.display = "none";
                  }
                }
            },

            submitWallet:function(wallet_address)
            {
                this.consoleWriter(`Sending tokens to ${wallet_address}`)
                this.didSubmitWallet = true
                const _this = this
                const res = axios.get(`https://solana-api.zeronft.com/send-token/${wallet_address}`).then(function (response) {
                    _this.submitStatus = response.data

                    this.consoleWriter(`Operation complete status: ${response.data}`)

                   
                })
            },

            /** =======================
             *  Black bar at the bottom
             *  ======================= */
            consoleWriter: function (text) {
                this.consoleText = text
            },

            /** ===============
             *  App Entry-point
             *  =============== */
            initialize: function () {
                var _this = this

                setTimeout(() => {

                    //initialize Slick Slider
                    $('.nft-slider').slick({
                        autoplay: false,
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: false,
                        speed: 700,
                        arrows: true,
                        dots: false,
                        prevArrow: '<div class="prev"><img src="../game/assets/images/elements/prev-btn.png"></div>',
                        nextArrow: '<div class="next"><img src="../game/assets/images/elements/next-btn.png"></div>',
                        responsive: [
                            {
                                breakpoint: 1200,
                                settings: {
                                    slidesToShow: 3
                                }
                            },
                            {
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 3
                                }
                            }
                        ]
                    });
                }, 200)
            },


        },

        /** ================
         *  VueJS entrypoint
         *  ================ */

        mounted() {
            this.initialize()
        }
    })


});


