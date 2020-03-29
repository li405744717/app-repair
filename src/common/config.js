import VConsole from 'vconsole'

let Config = {
  POSTURL: 'https://poster.ddwenwen.com/diagnose/kb/',
  KBURL: 'https://kb.ddwenwen.com/api/',
  AGENTURL: 'https://consultant.ddwenwen.com/api/',
  ANALYSTURL: 'https://analyst.ddwenwen.com/api/',
  CONFIGURL: 'https://config.ddwenwen.com/api/',
  dev: true,
  env: 'devkb', //后台域名 devkb | kb
  TIMEOUT: 60000,
  UATVERSION: "1.0.0",
  PRODUCT_ID: "agent",
  PRODUCT_SOURCE: "web",
  FONT_SIZE: 75,
  REQUEST_LIMIT: 100,
  fontSize: function () {
    var html = document.documentElement;
    var cliWidth = html.clientWidth;
    if (cliWidth > 750) {
      cliWidth = cliWidth / 2
    }
    return 16 * (cliWidth / 375)
  }
}
var location = window.location
let url = location.href;

//线上
if (url.indexOf('https://h5.ddwenwen.com') > -1) {
  Config.dev = false
  Config.env = "kb"
  window['console']['log'] = function () {
  }; //关闭默认设置

}
if (url.indexOf('devh5.ddwenwen.com') > -1) {
  // 在线console
  var vConsole = new VConsole();
}


if (Config.env == 'devkb') {
  Config.POSTURL = 'https://poster.ddwenwen.com/diagnose/devkb/'
  Config.AGENTURL = 'https://devconsultant.ddwenwen.com/api/'
  Config.KBURL = 'https://devkb.ddwenwen.com/api/'
  Config.ANALYSTURL = 'https://devanalyst.ddwenwen.com/api/'
  Config.CONFIGURL = 'https://config.ddwenwen.com/dev/api/'
} else {
  Config.KBURL = 'https://kb.ddwenwen.com/api/'
  Config.POSTURL = 'https://poster.ddwenwen.com/diagnose/kb/'
  Config.ANALYSTURL = 'https://analyst.ddwenwen.com/api/'
  Config.CONFIGURL = 'https://config.ddwenwen.com/api/'
}

var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var isIPX = false
if (isIOS) {
  var windowHeight = window.screen.height
  var clientHeight = document.documentElement.clientHeight
  if (windowHeight == 812 || windowHeight == 896) {
    //是iphoneX
    isIPX = true
  }
  if (clientHeight == 641 || clientHeight == 724) {
    isIPX = false
  }
}
Config.IS_IOS = isIOS
Config._IS_IPX = isIPX
Config = {
  ...Config,
  get IS_IPX() {
    return Config._IS_IPX
  },
  set IS_IPX(value) {
    Config._IS_IPX = value
  }

}
var html = document.documentElement;
var cliWidth = html.clientWidth;
var cliHeight = html.clientHeight;
if (cliWidth > 750) {
  cliWidth = 750;
}
Config.SYSTEM = {
  SCALE: cliWidth / 750,
  WIDTH: cliWidth,
  HEIGHT: cliHeight

}
export default Config
