var streamManager;   // used to request ad-enabled streams.
  var hls = new Hls(); // hls.js video player
  var videoElement;
  var adUiElement;
  var timerElement

  ...

  function initPlayer() {
    videoElement = document.getElementById('video');
    adUiElement = document.getElementById('adUi');
    timerElement = document.getElementById('ad-timer');

  ...

  streamManager.addEventListener(
    [google.ima.dai.api.StreamEvent.Type.LOADED,
     google.ima.dai.api.StreamEvent.Type.ERROR,
     google.ima.dai.api.StreamEvent.Type.AD_BREAK_STARTED,
     google.ima.dai.api.StreamEvent.Type.AD_BREAK_ENDED,
     google.ima.dai.api.StreamEvent.Type.PAUSED,
     google.ima.dai.api.StreamEvent.Type.RESUMED,
     google.ima.dai.api.StreamEvent.Type.AD_PROGRESS],
    onStreamEvent,
    false);

  ...

  function onStreamEvent(e) {
    switch (e.type) {
      case google.ima.dai.api.StreamEvent.Type.LOADED:
        console.log('Stream loaded');
        loadUrl(e.getStreamData().url);
        break;
      case google.ima.dai.api.StreamEvent.Type.ERROR:
        console.log('Error loading stream, playing backup stream.' + e);
        loadUrl(BACKUP_STREAM);
        break;
      case google.ima.dai.api.StreamEvent.Type.AD_BREAK_STARTED:
        console.log('Ad Break Started');
        videoElement.controls = false;
        adUiElement.style.display = 'block';
        break;
      case google.ima.dai.api.StreamEvent.Type.AD_PROGRESS:
        var progressData = e.getStreamData().adProgressData;
        var timeRemaining = Math.ceil(progressData.duration - progressData.currentTime);
        timerElement.innerHTML = 'Ad finished in: ' + timeRemaining;
        break;
      case google.ima.dai.api.StreamEvent.Type.AD_BREAK_ENDED:
        timerElement.innerHTML = 'Ad not currently playing.';
        console.log('Ad Break Ended');
        videoElement.controls = true;
        adUiElement.style.display = 'none';
        break;
      default:
        break;
    }
  }
