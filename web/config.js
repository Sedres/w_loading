const username = window.nuiHandoverData.name
const Config = {
  // ##################Background video Section##################
  backgroundVideo: true,
  backgroundVideoOnline: true,
  backgroundVideoLoop: true,
  backgroundVideoMuted: true,
  videoURL: 'https://www.youtube.com/watch?v=ECCWwo6CsUg',
  // ##################Background Image Section##################
  backgroundColage: {
    enabled: false,
    random: false
  },
  colageTimes: {
    interval: 5,
    imageReveal: 1,
    imageHide: 1
    // This ar all in seconds
  },
  background:
    'https://images.hdqwalls.com/download/michael-gta-5-4k-w9-1920x1080.jpg',
  backgrounds: [
    'https://images.hdqwalls.com/download/michael-gta-5-4k-w9-1920x1080.jpg',
    'https://images.hdqwalls.com/download/michael-gta-5-5k-r8-1920x1080.jpg',
    'https://images.hdqwalls.com/download/gta-online-halloween-ix-1920x1080.jpg',
    'https://images.hdqwalls.com/download/trevor-gta-5-8k-w2-1920x1080.jpg',
    'https://images.hdqwalls.com/download/gta-5-nature-8k-ne-1920x1080.jpg'
  ],

  //   ######################Logo Section######################
  logo: {
    URL: 'assets/logo.png'
  },

  // ######################Socials Section######################
  socials: {
    Discord: {
      icon: 'fab fa-discord',
      URL: 'https://discord.gg/8HsHvJk'
    },
    Twitter: {
      icon: 'fab fa-twitter',
      URL: 'https://twitter.com/WolfGamingGG'
    },
    Youtube: {
      icon: 'fab fa-youtube',
      URL: 'https://www.youtube.com/@WolfGamingGG'
    },
    Web: {
      icon: 'fas fa-globe',
      URL: 'https://wolf.gg/'
    }
  },
  // ######################Info Section######################
  info: {
    changelog: {
      title: 'Server Changelog v2.0',
      description: `
        Changelog v2.0<br>
        - Added more feautures<br>
        - Added more feautures<br>
        - Added more feautures<br>
        - Added more feautures<br>
        - Added more feautures<br>
        - Added more feautures<br>
        - Added more feautures<br>
        - Added more feautures<br>
        - Added more feautures<br>
        - Added more feautures<br>
        - Added more feautures<br>
        - Added more feautures<br>
        - Added more feautures<br>
        - Added more feautures<br>
        - Added more feautures<br>
        - Added more feautures<br>
        - Added more feautures<br>
        - Added more feautures<br> 
      `,
      icon: 'fa-sharp fa-solid fa-scroll'
    },
    infoPage: {
      title: 'Version',
      description: `
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      `,
      icon: 'fa-solid fa-memo-circle-info'
    }
  },

  // ######################Welcome Section######################
  welcome: {
    text: `Welcome ${username} to your server name`,
    icon: 'fa-solid fa-circle-notch fa-spin'
  },

  // ######################Music Section######################
  music: {
    songVolume: 10,
    songs: [
      {
        Title: 'Emin Nilsen - BANE Brazilian',
        portrait: 'https://ncs.io/static/web/img/logo-og.png?_m=1597301782',
        url: 'assets/music/ncs.mp3'
      },
      {
        Title: 'Soundy x Sander Mölder - Donna',
        portrait:
          'https://static.vecteezy.com/system/resources/previews/027/426/085/non_2x/ncs-logo-design-inspiration-for-a-unique-identity-modern-elegance-and-creative-design-watermark-your-success-with-the-striking-this-logo-vector.jpg',
        url: 'assets/music/ncs2.mp3'
      }
    ]
  }
}
