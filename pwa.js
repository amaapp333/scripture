var isAppForeground = true;
var isInterstitialAvailable = false;

function onAdLoaded(e) {
  if (isAppForeground && e.adType === admob.AD_TYPE.INTERSTITIAL) {
    isInterstitialAvailable = true;
  }
}

function onAdOpened(e) {
  if (isAppForeground && e.adType === admob.AD_TYPE.INTERSTITIAL) {
    isInterstitialAvailable = false;
    admob.requestInterstitialAd(); // Request next interstitial
  }
}

function onPause() {
  if (isAppForeground) {
    admob.destroyBannerView();
    isAppForeground = false;
    isInterstitialAvailable = false;
  }
}

function onResume() {
  if (!isAppForeground) {
    setTimeout(admob.createBannerView, 1);
    setTimeout(admob.requestInterstitialAd, 1);
    isAppForeground = true;
  }
}

function registerAdEvents() {
  document.addEventListener(admob.events.onAdLoaded, onAdLoaded);
  document.addEventListener(admob.events.onAdOpened, onAdOpened);

  document.addEventListener("pause", onPause, false);
  document.addEventListener("resume", onResume, false);
}

function initAds() {
  var ids = {
    ios : {
      banner : "ca-app-pub-XXXXXXXXXXXXXXXX/BBBBBBBBBB",
      interstitial : "ca-app-pub-XXXXXXXXXXXXXXXX/IIIIIIIIII"
    },
    android : {
      banner : "ca-app-pub-XXXXXXXXXXXXXXXX/BBBBBBBBBB",
      interstitial : "ca-app-pub-XXXXXXXXXXXXXXXX/IIIIIIIIII"
    }
  };

  var admobid = (/(android)/i.test(navigator.userAgent)) ? ids.android : ids.ios;

  admob.setOptions({
    publisherId:          admobid.banner,
    interstitialAdId:     admobid.interstitial,
    autoShowInterstitial: false,
    isTesting:            true // False on production apps
  });

  registerAdEvents();
}

function onDeviceReady() {
  document.removeEventListener('deviceready', onDeviceReady, false);

  if (window.admob) {
    initAds();
    admob.createBannerView(); // display a banner at startup
    admob.requestInterstitialAd(); // cache an interstitial
  } else {
    alert('Admob plugin not ready');
  }
}

document.addEventListener("deviceready", onDeviceReady, false);

function showInterstitial() {
  if (isInterstitialAvailable) {
    admob.showInterstitialAd();
  } else {
    console.log('Interstitial is not yet available');
  }
}

