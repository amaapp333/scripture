var BACKUP_STREAM =
    'https://storage.googleapis.com/interactive-media-ads/media/bbb.m3u8'

// Live stream asset key.
var TEST_ASSET_KEY = "sN_IYUG8STe1ZzhIIE_ksA";

// VOD content source and video IDs.
var TEST_CONTENT_SOURCE_ID = "2528370";
var TEST_VIDEO_ID = "tears-of-steel";

var hls = new Hls(); // hls.js video player
var videoElement;
var adUiElement;
var isAdBreak;

function initPlayer() {
  videoElement = document.getElementById('video');
  adUiElement = document.getElementById('adUi');
}
