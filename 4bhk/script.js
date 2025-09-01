(function(){
    var script = {
 "backgroundPreloadEnabled": true,
 "paddingTop": 0,
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "children": [
  "this.MainViewer"
 ],
 "defaultVRPointer": "laser",
 "scrollBarMargin": 2,
 "scripts": {
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "registerKey": function(key, value){  window[key] = value; },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "unregisterKey": function(key){  delete window[key]; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "existsKey": function(key){  return key in window; },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "getKey": function(key){  return window[key]; },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } }
 },
 "downloadEnabled": false,
 "contentOpaque": false,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "width": "100%",
 "class": "Player",
 "paddingRight": 0,
 "borderSize": 0,
 "borderRadius": 0,
 "minHeight": 20,
 "verticalAlign": "top",
 "propagateClick": false,
 "scrollBarWidth": 10,
 "height": "100%",
 "start": "this.init()",
 "overflow": "visible",
 "definitions": [{
 "initialPosition": {
  "yaw": 67.26,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 26.51,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2A32DAB8_0108_EBF2_4171_288C8B9E7C57",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -45.64,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2EA1F792_0108_F9B6_416C_F6E0EAB51F88",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 66.51,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2D2F6535_0108_FEF2_415E_88331197CD38",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 10.11,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 26.51,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2B6D9A40_0108_EA93_4173_8FE1305025A8",
 "class": "PanoramaCamera"
},
{
 "label": "4bhk_bedroom_02 copy",
 "id": "panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_0F921219_0107_1AB2_4163_2FA0B008B772"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2",
   "yaw": -140.8,
   "backwardYaw": 10.59,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 178.88,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2AF51A91_0108_EBB2_4178_C99336C24C13",
 "class": "PanoramaCamera"
},
{
 "label": "4BHK BEDROOM 01 1 23rd",
 "id": "panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_DDB914AF_C76D_7AAE_41DD_FD246BE7004B"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD732023_C71F_F956_41D6_6910628043DA",
   "yaw": -133.6,
   "backwardYaw": 154.8,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 160.83,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2B44CA21_0108_EA95_4168_6262339D8C09",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -170.08,
  "pitch": -4.27,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -9.79,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2D98AAF6_0108_EB7F_415D_CA9B66A181BF",
 "class": "PanoramaCamera"
},
{
 "label": "4_BHK_BEDROOM_4_TOILET copy",
 "id": "panorama_12091E1F_013F_2AAE_4168_C4499D5E4133",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_14ADE4BE_010F_1FEF_416E_76EF10A518E9"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0",
   "yaw": 170.21,
   "backwardYaw": 21.56,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "label": "4BHK BEDROOM 03 1 17th",
 "id": "panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D201568E_C765_3951_41E8_132B3132B361"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD888F1A_C71C_C776_41E5_354715787DA9",
   "yaw": -87.63,
   "backwardYaw": -148.42,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "label": "4bhk living 01 23rd",
 "id": "panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D079CAD6_C77D_CEFE_41DD_ABBE2AA0167E",
  "this.overlay_DF5FBBAA_C77C_CF56_41E7_7C881B931889",
  "this.overlay_DF1B664B_C763_59D6_41D4_1CCBA4B7384E",
  "this.overlay_DFF6DAC7_C765_4EDE_41D5_CD99DAE5DE58",
  "this.overlay_278C2B7C_0119_2973_4164_12C480ECE9AC"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB",
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_2740B091_0119_17B5_4159_67CCDF611884",
   "yaw": 111.23,
   "backwardYaw": -113.63,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1",
   "yaw": -21.73,
   "backwardYaw": -58.37,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CD732023_C71F_F956_41D6_6910628043DA",
   "yaw": 127.75,
   "backwardYaw": -0.72,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4",
   "yaw": 29.15,
   "backwardYaw": -143.41,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 13,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 26.51,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2FB3767F_0108_FB6D_4165_0695182B3345",
 "class": "PanoramaCamera"
},
{
 "label": "4BHK BEDROOM 03 2 23rd",
 "id": "panorama_CD93C521_C71D_3B53_41E8_25606B0344D0",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_DB374A8C_C765_4952_41E1_A2E190D5388B",
  "this.overlay_D912F139_C767_5BB2_41DE_1B6920A1E6C5",
  "this.overlay_15E9287B_010B_1775_4145_B25808494F8F"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_12091E1F_013F_2AAE_4168_C4499D5E4133",
   "yaw": 21.56,
   "backwardYaw": 170.21,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0",
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86",
   "yaw": 21.64,
   "backwardYaw": 94.33,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 158.44,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2D96AAEE_0108_EB6F_4156_9B70EB8EF147",
 "class": "PanoramaCamera"
},
{
 "label": "4BHK_Bedroom01_ copy",
 "id": "panorama_10AB6D68_013B_EE92_4160_6689FDC41054",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_1B991A50_0119_2AB2_4132_0A687531F080"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F",
   "yaw": -60.91,
   "backwardYaw": 159.15,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 119.09,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2B4B8A29_0108_EA92_4144_B47AE6FE1418",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -86.17,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2EE397CC_0108_F993_4176_6C0DCB189346",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -149.85,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 26.51,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2C82157E_0108_F96F_4155_5E106C87367F",
 "class": "PanoramaCamera"
},
{
 "label": "4bhk Powder toilet",
 "id": "panorama_24CDB527_010B_7E9D_4174_52D79CB239F2",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_246B1C44_0107_6E93_416A_CF9A21893363"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9",
   "yaw": -112.74,
   "backwardYaw": 110.82,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 157.31,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2CD655AA_0108_F996_4159_FA451FFC1FD2",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 31.07,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2D8964CD_0108_FFAD_4173_0B360EEC25A3",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -87.17,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 26.51,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2AF90A98_0108_EBB2_4162_6A86125E035C",
 "class": "PanoramaCamera"
},
{
 "label": "4bhk_bolcony_23",
 "id": "panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_F6B6F5DA_E6F2_2435_41D4_7EFE955F637C"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86",
   "yaw": -158.86,
   "backwardYaw": -1.12,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": -27.35,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2F91D664_0108_FA93_416B_2E612A0F126C",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -124.18,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2CB4258B_0108_F996_4175_15A691A292F2",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 161.33,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2E9C4765_0108_FA92_416E_DF9B685EEC5E",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -169.87,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2DA214DE_0108_FFAE_4166_2BC57ED3C1AF",
 "class": "PanoramaCamera"
},
{
 "label": "4bhk living 02 17th",
 "id": "panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D77E9814_C72D_C971_41D3_F1C7EEC185B4",
  "this.overlay_D6593DFD_C725_CAB3_41E1_22E863C59B7A",
  "this.overlay_D689F985_C723_4B53_41E0_EF19CAA46BA5",
  "this.overlay_EB45A2A5_E6F6_1C1F_41E0_169A3BFD2919"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9",
   "yaw": -126.3,
   "backwardYaw": -169.89,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CD888F1A_C71C_C776_41E5_354715787DA9",
   "yaw": 92.83,
   "backwardYaw": 21.77,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A",
   "yaw": -1.12,
   "backwardYaw": -161.25,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942",
   "yaw": 76.5,
   "backwardYaw": 154.03,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 67.06,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2BE1C9DB_0108_E9B5_4164_90D446C0906D",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 102.17,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2EC367AD_0108_F992_4174_17BB25B899A7",
 "class": "PanoramaCamera"
},
{
 "label": "4bhk living 02 23rd",
 "id": "panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_DF87A050_C767_D9F2_41B5_A747371BE693",
  "this.overlay_DE0068F1_C767_4AB2_41E8_311A365DEAB0",
  "this.overlay_DDD9E5FF_C765_5AAE_41E5_46C9CCEA06DE",
  "this.overlay_E80D4B8C_E6F2_2C2D_41E0_90C736E7CC60"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0",
   "yaw": 94.33,
   "backwardYaw": 21.64,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC",
   "yaw": 75.99,
   "backwardYaw": 153.66,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB",
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43",
   "yaw": -1.12,
   "backwardYaw": -158.86,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "label": "4BHK BEDROOM 04 1 23rd",
 "id": "panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D95E3B79_C764_CFB2_41CF_C88AFF6D4BC6",
  "this.overlay_D84AC366_C763_5FD1_41D2_AE1B94515E56",
  "this.overlay_173CD9AA_010F_2996_4163_878C96402C7E"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6",
   "yaw": -19.17,
   "backwardYaw": 69.51,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86",
   "yaw": 153.66,
   "backwardYaw": 75.99,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898",
   "yaw": 134.36,
   "backwardYaw": 14.7,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": -45.64,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2B64EA39_0108_EAF2_4161_BFFD970B95BA",
 "class": "PanoramaCamera"
},
{
 "label": "4BHK BEDROOM 01 2 23rd",
 "id": "panorama_CD732023_C71F_F956_41D6_6910628043DA",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_DD070AC8_C763_4ED2_41C9_24B475FBBEEE",
  "this.overlay_DDFC90E3_C76D_7AD6_41E6_FFEEF526FE90",
  "this.overlay_12046B32_0107_EAF7_416B_D6E56AE80173"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_10BCB494_013F_1FB2_4161_C83441295AC6",
   "yaw": 10.13,
   "backwardYaw": -140.17,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB",
   "yaw": -0.72,
   "backwardYaw": 127.75,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C",
   "yaw": 154.8,
   "backwardYaw": -133.6,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "label": "4BHK BEDROOM 02 2 23rd",
 "id": "panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_DC659AFB_C76F_4EB6_41D5_0F1877D4D037",
  "this.overlay_DCF81359_C76F_7FF3_41A8_62F50E047FA0"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751",
   "yaw": -14.77,
   "backwardYaw": 68.88,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB",
   "yaw": -143.41,
   "backwardYaw": 29.15,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": -158.19,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2C93D571_0108_F975_415F_104C5693AD3A",
 "class": "PanoramaCamera"
},
{
 "label": "4bhk_bedroom_02 copy",
 "id": "panorama_10BCB494_013F_1FB2_4161_C83441295AC6",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_12BC958B_0109_7995_4112_D3CFE865F0D8"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD732023_C71F_F956_41D6_6910628043DA",
   "yaw": -140.17,
   "backwardYaw": 10.13,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 116.86,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2B1769E3_0108_E996_4170_060594694980",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 60.98,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2D71F54C_0108_FE93_4173_E616C35131D7",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_10BE6159_013F_76B5_411F_D68688796320_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -164.92,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2AD32A78_0108_EB73_4172_9E30363444B2",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_camera",
 "class": "PanoramaCamera"
},
{
 "label": "4bhk living 01 17th",
 "id": "panorama_CC48A826_C71D_4951_41E7_7F28A52014B9",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_C9502109_C72D_3B52_41E6_EA33AED203C6",
  "this.overlay_C8B50F54_C72F_47F2_41BD_3D4C2E212738",
  "this.overlay_D54F99DC_C72F_CAF2_41E3_249E41049022",
  "this.overlay_D7048D5C_C72C_CBF1_41E2_9CEB980C06AF",
  "this.overlay_2436EEBC_0109_2BF3_4160_6EEF04DAF8BF"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB",
   "yaw": -169.89,
   "backwardYaw": -126.3,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_24CDB527_010B_7E9D_4174_52D79CB239F2",
   "yaw": 110.82,
   "backwardYaw": -112.74,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C",
   "yaw": -20.98,
   "backwardYaw": -59.5,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2",
   "yaw": 127.75,
   "backwardYaw": 0.29,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045",
   "yaw": 30.15,
   "backwardYaw": -142.41,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 170.49,
  "pitch": -3.29,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_camera",
 "class": "PanoramaCamera"
},
{
 "label": "4BHK BEDROOM 01 1 17th",
 "id": "panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D5B45B26_C76D_CF5E_41D0_7E370B2F5BD4"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2",
   "yaw": -138.88,
   "backwardYaw": 155.88,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 12.72,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2B874954_0108_F6B2_4131_62268028E4A8",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -104.01,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2BB8897E_0108_E96E_414D_D50DC9A53CC6",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 40.71,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2C3C060C_0108_FA92_4121_1DCCB0184860",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_camera",
 "class": "PanoramaCamera"
},
{
 "label": "4BHK BEDROOM 02 1 28th",
 "id": "panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E167051F_C725_5B6F_41E8_EC2A8AF34DDA",
  "this.overlay_19CEA5D1_0107_19B2_416C_296CD912445E"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_10AB6D68_013B_EE92_4160_6689FDC41054",
   "yaw": 159.15,
   "backwardYaw": -60.91,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558",
   "yaw": 78.93,
   "backwardYaw": -21.43,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 46.4,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2B2B3A11_0108_EAB5_4171_321C6B3D4238",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 26.51,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -156.3,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2FE4D6CE_0108_FBAF_4174_7B476FEAFEC4",
 "class": "PanoramaCamera"
},
{
 "label": "4bhk living 02 33rd",
 "id": "panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_EC843EC7_C724_C6DF_41E4_78AEC11AB30A",
  "this.overlay_EBD3DBCF_C723_4EEE_41D3_4E82F6F873AE",
  "this.overlay_E9586F13_C72C_C776_41D2_741B38E3831E",
  "this.overlay_F73E3897_E6F2_2C3A_41E8_B2BA995462E3"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506",
   "yaw": 93.83,
   "backwardYaw": 21.64,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045",
   "yaw": 75.74,
   "backwardYaw": 152.65,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7",
   "yaw": -2.38,
   "backwardYaw": -169.16,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CD479071_C71C_D9B2_41D0_92945B278722",
   "yaw": -121.4,
   "backwardYaw": -167,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 154,
  "pitch": -1.26,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 179.28,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2DC5A4F5_0108_FF7D_4175_913901F41506",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -111.49,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2BCBE9BC_0108_E9F2_4176_A1E51CE05EEB",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 165.55,
  "pitch": 1.76,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -51.99,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2BAF698E_0108_E9AE_4173_97C4969CBA71",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_camera",
 "class": "PanoramaCamera"
},
{
 "label": "4BHK BEDROOM 01 1 33rd",
 "id": "panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E9099FDF_C72F_C6EE_41E3_A646B2C2340D"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42",
   "yaw": -131.59,
   "backwardYaw": 148.02,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_camera",
 "class": "PanoramaCamera"
},
{
 "label": "4bhk_Bedroom_003 copy",
 "id": "panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_17C8401E_0109_16AF_4164_AB7919665F6E"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC",
   "yaw": 14.7,
   "backwardYaw": 134.36,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 75.37,
  "pitch": -0.25,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_camera",
 "class": "PanoramaCamera"
},
{
 "label": "4bhk living 01 28th",
 "id": "panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E77541FB_C727_7AB6_41E2_71A4F3A251EC",
  "this.overlay_E66DCEAD_C727_4953_41E4_4338D4DA1A80",
  "this.overlay_E57D9766_C725_47DE_41E4_4EAD320D7E97",
  "this.overlay_E6FF7EBA_C723_46B1_41E8_B0C4C865F516",
  "this.overlay_277FED88_0119_2993_4162_1C85866E4314"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_27D62BB1_011F_69F2_416D_0AB033A18B06",
   "yaw": 110.2,
   "backwardYaw": -113.49,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A",
   "yaw": -20.22,
   "backwardYaw": -62.51,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01",
   "yaw": 128.01,
   "backwardYaw": 1.29,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CD47441A_C71C_F976_41E5_56E16AD8E357",
   "yaw": -166.12,
   "backwardYaw": -119.02,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558",
   "yaw": 30.28,
   "backwardYaw": -142.03,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "label": "4BHK BEDROOM 04 2 28th",
 "id": "panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_EE27537F_C723_5FAE_41E1_DBA13BA4CC54"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD",
   "yaw": 68.38,
   "backwardYaw": -19.04,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 119.59,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2E8E0772_0108_F977_416A_CA19690F2FE7",
 "class": "PanoramaCamera"
},
{
 "label": "4BHK BEDROOM 04 1 33rd",
 "id": "panorama_EBE3DC98_C723_4972_41E0_39A7A1000045",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_F4E4001F_C725_596E_41E0_DD5EA526DD91",
  "this.overlay_F3F318C8_C723_4AD2_41E2_333E3532C07C",
  "this.overlay_233D63E7_010F_199E_411B_8C1C1EF5FD30"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_10A60E5E_0139_2AAF_4170_A488EF414D0A",
   "yaw": 133.86,
   "backwardYaw": 13.95,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05",
   "yaw": -18.67,
   "backwardYaw": 70.89,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD",
   "yaw": 152.65,
   "backwardYaw": 75.74,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "label": "4BHK BEDROOM 03 2 28th",
 "id": "panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E11B8401_C724_F952_41BA_B115171D0330",
  "this.overlay_E05F9DD6_C723_CAF1_41E7_95CA81350DF9",
  "this.overlay_1B91065C_011F_FAB3_415F_9A52427DF53E"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3",
   "yaw": -148.17,
   "backwardYaw": -82.1,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_121539AD_013B_29ED_4160_3D4F82B47E36",
   "yaw": 24.07,
   "backwardYaw": 167.82,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CD47441A_C71C_F976_41E5_56E16AD8E357",
   "yaw": 21.89,
   "backwardYaw": 75.37,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": -85.16,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2AD98A81_0108_EB92_413E_CAA41C36C37A",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -52.25,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2B243A0A_0108_EA97_4169_4AB99A550E87",
 "class": "PanoramaCamera"
},
{
 "label": "4BHK BEDROOM 02 1 23rd",
 "id": "panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_DB599724_C763_4752_41D6_A0FA163F689B",
  "this.overlay_12DF8ADA_0109_6BB7_4158_417DA7908C9B"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_10BE6159_013F_76B5_411F_D68688796320",
   "yaw": 159.02,
   "backwardYaw": -61.67,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4",
   "yaw": 68.88,
   "backwardYaw": -14.77,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "label": "4BHK BEDROOM 02 1 33rd",
 "id": "panorama_CD973440_C71F_79D2_41CE_832903CFC20A",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E8B6B81F_C72D_496E_41E6_150256507011",
  "this.overlay_1E1E3B49_0109_6A92_4131_325625FDB82A"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545",
   "yaw": 71.39,
   "backwardYaw": -22.69,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_10F8A1A0_0139_3993_4126_7D4276303500",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 160.96,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2AB91A67_0108_EA9D_4176_56C9DBD2E822",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -155.93,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2A70CADE_0108_EBAF_4174_19A3D49D6425",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 158.27,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2C5FE62B_0108_FA96_4144_CFAB80141C0B",
 "class": "PanoramaCamera"
},
{
 "label": "4BHK BEDROOM 04 2 33rd",
 "id": "panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_F4767B1F_C727_4F6F_41DB_8ED192ED33D1"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045",
   "yaw": 70.89,
   "backwardYaw": -18.67,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 18.75,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 26.51,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2A875A50_0108_EAB3_4175_9AEBDF568EAC",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -20.85,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2CC855C4_0108_F993_4176_F8A6ECC85719",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -44.76,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2DBEBB06_0108_EA9E_4156_1BBF317B8411",
 "class": "PanoramaCamera"
},
{
 "label": "4BHK BEDROOM 02 2 17th",
 "id": "panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D464C36F_C76D_5FAF_41D8_35D099FAD98B",
  "this.overlay_D4E3A43C_C76F_59B1_41D0_FA262DAB39CB"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9",
   "yaw": -142.41,
   "backwardYaw": 30.15,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CC175683_C71F_5956_41AA_704EB81E1F05",
   "yaw": -23.19,
   "backwardYaw": 55.82,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": -171.58,
  "pitch": 1.51,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 26.51,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -111.62,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2AAC4A6F_0108_EB6D_4171_339D7163E665",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -158.36,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2F4A8737_0108_FAFD_416A_CCA93210983C",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 31.83,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2D0A5524_0108_FE93_416C_796A08545104",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 171.84,
  "pitch": -4.02,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD732023_C71F_F956_41D6_6910628043DA_camera",
 "class": "PanoramaCamera"
},
{
 "displayPlaybackBar": true,
 "gyroscopeVerticalDraggingEnabled": true,
 "class": "PanoramaPlayer",
 "gyroscopeEnabled": true,
 "viewerArea": "this.MainViewer",
 "id": "MainViewerPanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "mouseControlMode": "drag_acceleration"
},
{
 "initialPosition": {
  "yaw": 92.37,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2AEACAA0_0108_EB93_4142_53B161382260",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -150.85,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2CE8B5E4_0108_F993_4124_BEDDDD518150",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_camera",
 "class": "PanoramaCamera"
},
{
 "label": "4bhk Powder toilet",
 "id": "panorama_27D62BB1_011F_69F2_416D_0AB033A18B06",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_299D94A8_0107_1F92_4177_026B7F551234"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932",
   "yaw": -113.49,
   "backwardYaw": 110.2,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_camera",
 "class": "PanoramaCamera"
},
{
 "label": "4BHK_Bedroom01_ copy",
 "id": "panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_1189CF7A_0109_6977_4165_30E4901C9436"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CC175683_C71F_5956_41AA_704EB81E1F05",
   "yaw": -60.41,
   "backwardYaw": 159.78,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": -25.72,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2E56C81B_0108_F6B5_4178_AEB946DB9F52",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -171.08,
  "pitch": -2.01,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -158.41,
  "pitch": -3.02,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -46.14,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2ED1D79F_0108_F9AD_4176_A422ED9FF3DE",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -20.98,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2BC749AC_0108_E993_4167_18FDC8BBB9EC",
 "class": "PanoramaCamera"
},
{
 "label": "4BHK_Bedroom01_ copy",
 "id": "panorama_10BE6159_013F_76B5_411F_D68688796320",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_153F3E16_010B_2ABF_4102_306DCD1B8DA0"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751",
   "yaw": -61.67,
   "backwardYaw": 159.02,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 117.49,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2D5FE53D_0108_FEED_4175_777D5D8C6086",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -104.26,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2FC566AD_0108_FB92_413D_9634CDE9FE52",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 159.78,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2F06D6EC_0108_FB92_4174_1099E4EC950A",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -51.74,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 26.51,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2C0A65FE_0108_F96F_416B_9A4B43D06D37",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 118.33,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2B81095D_0108_F6AD_4168_FCDB0C028504",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CC175683_C71F_5956_41AA_704EB81E1F05_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -166.05,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2FA2E692_0108_FBB6_4176_125353E97E8D",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 66.37,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2DA874E6_0108_FF9F_4172_1CF6A03905C8",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 26.51,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_camera",
 "class": "PanoramaCamera"
},
{
 "label": "4BHK BEDROOM 04 2 23rd",
 "id": "panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D8D0AEBD_C71D_46B2_41E2_77FAFEC5B3BD"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC",
   "yaw": 69.51,
   "backwardYaw": -19.17,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "label": "4BHK BEDROOM 03 2 33rd",
 "id": "panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_F7CC04EB_C723_5AD6_41D4_F9DE6E7EE7BF",
  "this.overlay_F6F55B77_C723_4FBE_41D4_D6F2BBFF046B",
  "this.overlay_21FA05A4_0109_1993_4165_D8879C212997"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B",
   "yaw": -148.93,
   "backwardYaw": -77.83,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_10F8A1A0_0139_3993_4126_7D4276303500",
   "yaw": 23.7,
   "backwardYaw": 166.07,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD",
   "yaw": 21.64,
   "backwardYaw": 93.83,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": -158.44,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2F0806FA_0108_FB77_4169_29F9D72CE1FB",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 178.88,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 26.51,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2CA49598_0108_F9B3_4179_2D94F4D576B1",
 "class": "PanoramaCamera"
},
{
 "label": "4BHK BEDROOM 03 1 33rd",
 "id": "panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_F5309816_C725_4971_41DC_62B6061471DF"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506",
   "yaw": -77.83,
   "backwardYaw": -148.93,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "label": "4bhk_bolcony_33",
 "id": "panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_F4A93A03_E6FE_6C1A_41B1_F38C9DDC27C0"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD",
   "yaw": -169.16,
   "backwardYaw": -2.38,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": -26.34,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2F7C3749_0108_FA95_4160_47E7A5A58F25",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -165.3,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2BA23985_0108_E99D_4139_EA8D88B99ADC",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -158.23,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2A908A49_0108_EA92_4171_F536865642EC",
 "class": "PanoramaCamera"
},
{
 "label": "4bhk living 02 28th",
 "id": "panorama_CD47441A_C71C_F976_41E5_56E16AD8E357",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E69088C4_C72C_CAD2_41E2_67849E970973",
  "this.overlay_E5D3EE61_C72D_49D2_41E0_D1B634887F8E",
  "this.overlay_E44921C1_C72D_3AD3_41D0_85751F7FA73A",
  "this.overlay_F607C52E_E6F2_246D_41E3_2DB987A88877"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A",
   "yaw": 75.37,
   "backwardYaw": 21.89,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD",
   "yaw": 94.84,
   "backwardYaw": 154.28,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932",
   "yaw": -119.02,
   "backwardYaw": -166.12,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269",
   "yaw": -1.37,
   "backwardYaw": -167.28,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": -31.98,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2FF496BA_0108_FBF7_4175_0B4E8DE85023",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 159.02,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 26.51,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2CC665B7_0108_F9FD_4155_2AF40E5FA95A",
 "class": "PanoramaCamera"
},
{
 "label": "4bhk_Bedroom_003 copy",
 "id": "panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_13B21729_013B_1A95_416C_98A10822AB74"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942",
   "yaw": 15.71,
   "backwardYaw": 135.24,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "label": "4BHK BEDROOM 01 1 28th",
 "id": "panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E31F4E35_C725_49B2_41E3_75B373DD479F"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01",
   "yaw": -136.37,
   "backwardYaw": 144.5,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "label": "4BHK BEDROOM 02 2 33rd",
 "id": "panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E994C697_C72F_797F_41D3_1180D963962C",
  "this.overlay_E8B86196_C72D_7B7E_41D9_E9ACE1C1D537"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD973440_C71F_79D2_41CE_832903CFC20A",
   "yaw": -22.69,
   "backwardYaw": 71.39,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CD479071_C71C_D9B2_41D0_92945B278722",
   "yaw": -143.41,
   "backwardYaw": 28.27,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": -69.8,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2BFE89CC_0108_E992_415F_57052E9FF754",
 "class": "PanoramaCamera"
},
{
 "label": "4BHK BEDROOM 01 2 17th",
 "id": "panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D51089C5_C765_CAD2_41E5_192F51616448",
  "this.overlay_D5FA2C1E_C764_C971_41E4_AEEDE47EBAA0",
  "this.overlay_0CFCE4F2_0109_1F77_416C_637A9F84F95D"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9",
   "yaw": 0.29,
   "backwardYaw": 127.75,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA",
   "yaw": 155.88,
   "backwardYaw": -138.88,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A",
   "yaw": 10.59,
   "backwardYaw": -140.8,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": -2.76,
  "pitch": 0.5,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_10F8A1A0_0139_3993_4126_7D4276303500_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 48.41,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2C1A45F1_0108_F975_4143_6CF92882405A",
 "class": "PanoramaCamera"
},
{
 "label": "4BHK BEDROOM 01 2 28th",
 "id": "panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E4AC823C_C723_F9B2_41B4_39B29FEEA91C",
  "this.overlay_E33D35E2_C723_3AD1_41A1_22D3C41AFB56",
  "this.overlay_1663296C_010B_3692_4150_5A99E64207F0"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932",
   "yaw": 1.29,
   "backwardYaw": 128.01,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE",
   "yaw": 144.5,
   "backwardYaw": -136.37,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E",
   "yaw": 12.01,
   "backwardYaw": -137.91,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "label": "4BHK BEDROOM 04 1 17th",
 "id": "panorama_CC131311_C71D_3F72_41C7_6DBD9418A942",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D29433BE_C765_3EAE_41D8_CC80272D951C",
  "this.overlay_D179CE94_C763_4971_41E1_4D5D0BD3A926",
  "this.overlay_1318911B_0107_36B6_4161_1D9EEF544932"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB",
   "yaw": 154.03,
   "backwardYaw": 76.5,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335",
   "yaw": -21.56,
   "backwardYaw": 68.51,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE",
   "yaw": 135.24,
   "backwardYaw": 15.71,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 39.83,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2B3F9A03_0108_EA96_4178_4EC88F5A72FE",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 156.81,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2EBE3784_0108_F993_4176_2722FB166346",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 165.23,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2B8A3965_0108_F69D_4177_7E42250CC009",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -168.57,
  "pitch": -1,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -13.68,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2A1CEAA9_0108_EB92_4146_6E8AD765F482",
 "class": "PanoramaCamera"
},
{
 "label": "4BHK BEDROOM 02 1 17th",
 "id": "panorama_CC175683_C71F_5956_41AA_704EB81E1F05",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D4F9B791_C76F_4773_41B6_B1727AC576AD",
  "this.overlay_0E3B3744_010F_3A93_4145_BD2F3EE28358"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80",
   "yaw": 159.78,
   "backwardYaw": -60.41,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045",
   "yaw": 55.82,
   "backwardYaw": -23.19,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": -25.97,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2A8DCA58_0108_EAB3_4171_06FE2589A157",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -179.71,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2A28FAC7_0108_EB9D_4172_C5F582C0BBFA",
 "class": "PanoramaCamera"
},
{
 "label": "4_BHK_BEDROOM_4_TOILET copy",
 "id": "panorama_10F8A1A0_0139_3993_4126_7D4276303500",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_227ECEFD_0109_2B6D_416E_3A14758B111C"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506",
   "yaw": 166.07,
   "backwardYaw": 23.7,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "label": "4bhk_bolcony_28",
 "id": "panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_F7CC2CF2_E6F2_E5F5_41C2_AAC8BF3B7DDA"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD47441A_C71C_F976_41E5_56E16AD8E357",
   "yaw": -167.28,
   "backwardYaw": -1.37,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "label": "4BHK BEDROOM 02 2 28th",
 "id": "panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E3C0EB9C_C727_CF72_41D8_2929BE9FB4EE",
  "this.overlay_E2CC1B58_C725_4FF1_41E7_2F6766A1B20D"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F",
   "yaw": -21.43,
   "backwardYaw": 78.93,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932",
   "yaw": -142.03,
   "backwardYaw": 30.28,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": -168.99,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2BB5C96D_0108_E96D_4161_BF111A0A1196",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 36.59,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2DC884FD_0108_FF6D_4178_2D0573E4FF02",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 126.87,
  "pitch": -9.04,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -103.5,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 26.51,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2BC039B5_0108_E9F2_4145_A29347FF2D58",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 162.81,
  "pitch": -9.05,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD888F1A_C71C_C776_41E5_354715787DA9_camera",
 "class": "PanoramaCamera"
},
{
 "label": "4bhk kitchen",
 "id": "panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_DD3041EE_C764_DAAE_41E6_5D3D4684B50F"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB",
   "yaw": -58.37,
   "backwardYaw": -21.73,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "label": "4BHK BEDROOM 03 1 23rd",
 "id": "panorama_CD894C2A_C71C_C951_4172_7357AF61EE99",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_DA67D643_C765_39D6_41E7_BD2D534FD43E"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "label": "4bhk_bedroom_02 copy",
 "id": "panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_16FBB4AF_0109_3FEE_4160_1AEF26426FD1"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01",
   "yaw": -137.91,
   "backwardYaw": 12.01,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": -169.41,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2A62EAE7_0108_EB9D_4163_AA6A42FE490A",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 31.58,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2C2DF61D_0108_FAAD_4174_D19AEBE589C7",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 37.97,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2D63855F_0108_FEAD_4103_D714C401F630",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -20.22,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2F38770E_0108_FAAF_4152_3CD9465CFE20",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 26.51,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 43.63,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2BD6F995_0108_E9B2_4165_0D62CB197914",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 179.28,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2B1C89EB_0108_E995_416B_048E614AAAE6",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -149.72,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2C7E4645_0108_FA9D_4167_099945B2CF34",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -169.57,
  "pitch": 0.5,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 26.51,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD479071_C71C_D9B2_41D0_92945B278722_camera",
 "class": "PanoramaCamera"
},
{
 "label": "4bhk kitchen",
 "id": "panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A",
 "frameTransitionTime": 5000,
 "thumbnailUrl": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1_t.jpg",
 "partial": false,
 "frameDisplayTime": 5000,
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "overlays": [
    "this.overlay_E4FA5D36_C72C_CBBE_41DE_84376FB29EF5"
   ],
   "class": "CubicPanoramaFrame"
  },
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "pitch": 0,
 "class": "LivePanorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932",
   "yaw": -62.51,
   "backwardYaw": -20.22,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 53.7,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 26.51,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2A010AB1_0108_EBF2_4165_127437C97CB3",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -108.61,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2F28C71B_0108_FAB5_4175_3A56F23A8C6B",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 159.78,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 26.51,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2AB0CA5F_0108_EAAD_4179_07CFC7C1AA3E",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 41.12,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2E0577E8_0108_F993_4175_6B92EB32DCF1",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "media": "this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9",
   "camera": "this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_24CDB527_010B_7E9D_4174_52D79CB239F2",
   "camera": "this.panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB",
   "camera": "this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A",
   "camera": "this.panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C",
   "camera": "this.panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2",
   "camera": "this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA",
   "camera": "this.panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A",
   "camera": "this.panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045",
   "camera": "this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CC175683_C71F_5956_41AA_704EB81E1F05",
   "camera": "this.panorama_CC175683_C71F_5956_41AA_704EB81E1F05_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80",
   "camera": "this.panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CD888F1A_C71C_C776_41E5_354715787DA9",
   "camera": "this.panorama_CD888F1A_C71C_C776_41E5_354715787DA9_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0",
   "camera": "this.panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00",
   "camera": "this.panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942",
   "camera": "this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335",
   "camera": "this.panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE",
   "camera": "this.panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB",
   "camera": "this.panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2740B091_0119_17B5_4159_67CCDF611884",
   "camera": "this.panorama_2740B091_0119_17B5_4159_67CCDF611884_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86",
   "camera": "this.panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43",
   "camera": "this.panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1",
   "camera": "this.panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CD732023_C71F_F956_41D6_6910628043DA",
   "camera": "this.panorama_CD732023_C71F_F956_41D6_6910628043DA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C",
   "camera": "this.panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_10BCB494_013F_1FB2_4161_C83441295AC6",
   "camera": "this.panorama_10BCB494_013F_1FB2_4161_C83441295AC6_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4",
   "camera": "this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751",
   "camera": "this.panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_10BE6159_013F_76B5_411F_D68688796320",
   "camera": "this.panorama_10BE6159_013F_76B5_411F_D68688796320_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0",
   "camera": "this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CD894C2A_C71C_C951_4172_7357AF61EE99",
   "camera": "this.panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 30)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_12091E1F_013F_2AAE_4168_C4499D5E4133",
   "camera": "this.panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 30, 31)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC",
   "camera": "this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 31, 32)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6",
   "camera": "this.panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 32, 33)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898",
   "camera": "this.panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 33, 34)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932",
   "camera": "this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 34, 35)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_27D62BB1_011F_69F2_416D_0AB033A18B06",
   "camera": "this.panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 35, 36)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_10A60E5E_0139_2AAF_4170_A488EF414D0A",
   "camera": "this.panorama_10A60E5E_0139_2AAF_4170_A488EF414D0A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 36, 37)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CD47441A_C71C_F976_41E5_56E16AD8E357",
   "camera": "this.panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 37, 38)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269",
   "camera": "this.panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 38, 39)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A",
   "camera": "this.panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 39, 40)",
   "player": "this.MainViewerPanoramaPlayer",
   "start": "this.MainViewerPanoramaPlayer.set('displayPlaybackBar', false)",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01",
   "camera": "this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 40, 41)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE",
   "camera": "this.panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 41, 42)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E",
   "camera": "this.panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 42, 43)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558",
   "camera": "this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 43, 44)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F",
   "camera": "this.panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 44, 45)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_10AB6D68_013B_EE92_4160_6689FDC41054",
   "camera": "this.panorama_10AB6D68_013B_EE92_4160_6689FDC41054_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 45, 46)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A",
   "camera": "this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 46, 47)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3",
   "camera": "this.panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 47, 48)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_121539AD_013B_29ED_4160_3D4F82B47E36",
   "camera": "this.panorama_121539AD_013B_29ED_4160_3D4F82B47E36_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 48, 49)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD",
   "camera": "this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 49, 50)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD",
   "camera": "this.panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 50, 51)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_10AB2713_013B_1AB5_4162_9A65609A81B1",
   "camera": "this.panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 51, 52)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CD479071_C71C_D9B2_41D0_92945B278722",
   "camera": "this.panorama_CD479071_C71C_D9B2_41D0_92945B278722_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 52, 53)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_28495FE3_011F_2995_4161_1F0BD106F099",
   "camera": "this.panorama_28495FE3_011F_2995_4161_1F0BD106F099_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 53, 54)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD",
   "camera": "this.panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 54, 55)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7",
   "camera": "this.panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 55, 56)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC",
   "camera": "this.panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 56, 57)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42",
   "camera": "this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 57, 58)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060",
   "camera": "this.panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 58, 59)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_10A96800_0139_3693_4154_C75F68C57800",
   "camera": "this.panorama_10A96800_0139_3693_4154_C75F68C57800_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 59, 60)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545",
   "camera": "this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 60, 61)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CD973440_C71F_79D2_41CE_832903CFC20A",
   "camera": "this.panorama_CD973440_C71F_79D2_41CE_832903CFC20A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 61, 62)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_10A654BD_0139_1FED_4171_7FACE1C8F817",
   "camera": "this.panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 62, 63)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506",
   "camera": "this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 63, 64)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B",
   "camera": "this.panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 64, 65)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_10F8A1A0_0139_3993_4126_7D4276303500",
   "camera": "this.panorama_10F8A1A0_0139_3993_4126_7D4276303500_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 65, 66)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045",
   "camera": "this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 66, 67)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 67, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_10BCB494_013F_1FB2_4161_C83441295AC6_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 21.14,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2F6C5758_0108_FAB2_4155_B7B6438D1434",
 "class": "PanoramaCamera"
},
{
 "label": "4_BHK_BEDROOM_4_TOILET copy",
 "id": "panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_10AE33E1_0109_1995_416C_2A5286DB7CD2"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD888F1A_C71C_C776_41E5_354715787DA9",
   "yaw": 166.32,
   "backwardYaw": 21.81,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 121.63,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2DDF34EE_0108_FF6F_4179_406FECF0CD73",
 "class": "PanoramaCamera"
},
{
 "label": "4bhk kitchen",
 "id": "panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D6C3F8D5_C723_4AF3_41E1_A8B34E8F3123"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9",
   "yaw": -59.5,
   "backwardYaw": -20.98,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_121539AD_013B_29ED_4160_3D4F82B47E36_camera",
 "class": "PanoramaCamera"
},
{
 "label": "4_BHK_BEDROOM_4_TOILET copy",
 "id": "panorama_121539AD_013B_29ED_4160_3D4F82B47E36",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_1D727724_011B_1A93_4171_CF3D20B290EA"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A",
   "yaw": 167.82,
   "backwardYaw": 24.07,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "label": "4BHK BEDROOM 03 2 17th",
 "id": "panorama_CD888F1A_C71C_C776_41E5_354715787DA9",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D3646773_C765_47B6_41E0_73AF92AE0B87",
  "this.overlay_D246BEC5_C767_C6D3_417F_B7C47770AE7C",
  "this.overlay_1191988F_0109_17AD_415A_8E74C0B72A72"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB",
   "yaw": 21.77,
   "backwardYaw": 92.83,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0",
   "yaw": -148.42,
   "backwardYaw": -87.63,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00",
   "yaw": 21.81,
   "backwardYaw": 166.32,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 10.84,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2F836672_0108_FB76_4166_72A79DB44AEA",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 133.65,
  "pitch": 3.01,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_10AB6D68_013B_EE92_4160_6689FDC41054_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 156.26,
  "pitch": -0.5,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_camera",
 "class": "PanoramaCamera"
},
{
 "label": "4bhk_Bedroom_003 copy",
 "id": "panorama_10A60E5E_0139_2AAF_4170_A488EF414D0A",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_10A60E5E_0139_2AAF_4170_A488EF414D0A_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_23D9F64F_010F_3AAD_414A_672ED5B21C48"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_10A60E5E_0139_2AAF_4170_A488EF414D0A_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A60E5E_0139_2AAF_4170_A488EF414D0A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A60E5E_0139_2AAF_4170_A488EF414D0A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_10A60E5E_0139_2AAF_4170_A488EF414D0A_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A60E5E_0139_2AAF_4170_A488EF414D0A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A60E5E_0139_2AAF_4170_A488EF414D0A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_10A60E5E_0139_2AAF_4170_A488EF414D0A_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A60E5E_0139_2AAF_4170_A488EF414D0A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A60E5E_0139_2AAF_4170_A488EF414D0A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_10A60E5E_0139_2AAF_4170_A488EF414D0A_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_10A60E5E_0139_2AAF_4170_A488EF414D0A_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A60E5E_0139_2AAF_4170_A488EF414D0A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A60E5E_0139_2AAF_4170_A488EF414D0A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_10A60E5E_0139_2AAF_4170_A488EF414D0A_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A60E5E_0139_2AAF_4170_A488EF414D0A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A60E5E_0139_2AAF_4170_A488EF414D0A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_10A60E5E_0139_2AAF_4170_A488EF414D0A_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A60E5E_0139_2AAF_4170_A488EF414D0A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A60E5E_0139_2AAF_4170_A488EF414D0A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045",
   "yaw": 13.95,
   "backwardYaw": 133.86,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -12.18,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2DE2C50E_0108_FEAE_416A_BEA02576A82E",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -69.18,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 26.51,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2B5E0A19_0108_EAB2_4154_EE70D9673498",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 152.65,
  "pitch": -7.4,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -25.2,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2D3C852D_0108_FE92_4172_0C2DCD3A2A9A",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD973440_C71F_79D2_41CE_832903CFC20A_camera",
 "class": "PanoramaCamera"
},
{
 "label": "4bhk living 01 33rd",
 "id": "panorama_CD479071_C71C_D9B2_41D0_92945B278722",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_EEDAB568_C725_FBD2_41DB_8D04CB4292A1",
  "this.overlay_EDFCD5B0_C724_DAB2_41D6_0E77907C4F3F",
  "this.overlay_EC51FEB1_C727_46B2_41B8_83F109FE0A5A",
  "this.overlay_ECD21C73_C725_C9B6_4192_D031F772D6EA",
  "this.overlay_29EC2EC0_0108_EB92_415D_899C5F48D760"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545",
   "yaw": 28.27,
   "backwardYaw": -143.41,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_28495FE3_011F_2995_4161_1F0BD106F099",
   "yaw": 111.5,
   "backwardYaw": -112.94,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC",
   "yaw": -20.22,
   "backwardYaw": -63.14,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42",
   "yaw": 128.26,
   "backwardYaw": -0.72,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD",
   "yaw": -167,
   "backwardYaw": -121.4,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": -158.11,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2E27280D_0108_F692_4154_EBD89E81D518",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -104.63,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2D164516_0108_FEBE_4160_0BB22145E85A",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 168.85,
  "pitch": 0.55,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_10A60E5E_0139_2AAF_4170_A488EF414D0A_camera",
 "class": "PanoramaCamera"
},
{
 "label": "4BHK_Bedroom01_ copy",
 "id": "panorama_10A654BD_0139_1FED_4171_7FACE1C8F817",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_214EEAE1_010B_EB95_416D_C987852A4510"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_CD973440_C71F_79D2_41CE_832903CFC20A",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 159.24,
  "pitch": -2.18,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_camera",
 "class": "PanoramaCamera"
},
{
 "label": "4bhk_Bedroom_003 copy",
 "id": "panorama_10AB2713_013B_1AB5_4162_9A65609A81B1",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_1CBAC74F_0119_3AAE_4169_5B722A4C2C71"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD",
   "yaw": 15.08,
   "backwardYaw": 134.36,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 177.62,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2BDDA9A4_0108_E993_4178_3C7635AD5BD8",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -68.77,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2A4E8AD7_0108_EBBD_4172_E7A26D6CBCAD",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -101.07,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2C4E0638_0108_FAF3_4178_9B712878EA61",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -68.5,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 26.51,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2D1B851D_0108_FEAD_4178_A08DD39C4DB1",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -178.71,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2D417545_0108_FE9D_4164_5AF0C15C3344",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 166.56,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 36.59,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2BF8A9D4_0108_E9B3_415C_2E40B441215E",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -35.5,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2ACCBA89_0108_EB92_4170_CC215E2A3E1A",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_2740B091_0119_17B5_4159_67CCDF611884_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -13.93,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2EF377BF_0108_F9EE_4143_F77E4FE01413",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 172.34,
  "pitch": 0.75,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_camera",
 "class": "PanoramaCamera"
},
{
 "label": "4bhk Powder toilet",
 "id": "panorama_2740B091_0119_17B5_4159_67CCDF611884",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_27E5C64F_0119_1AAD_4168_4CBEDDEFB1DF"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB",
   "yaw": -113.63,
   "backwardYaw": 111.23,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 120.5,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2A24EAC0_0108_EB92_40FF_FF210B6C4800",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 151.49,
  "pitch": -11.56,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_camera",
 "class": "PanoramaCamera"
},
{
 "label": "4bhk_bolcony_17",
 "id": "panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E98B544E_E6F6_642D_41D5_639CA13A6B69"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB",
   "yaw": -161.25,
   "backwardYaw": -1.12,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": -52.25,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 26.51,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2E12D7D9_0108_F9B5_4164_8118206052FE",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_camera",
 "class": "PanoramaCamera"
},
{
 "label": "4BHK BEDROOM 03 1 28th",
 "id": "panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E039B42F_C73C_D9AE_4179_6CED54A79A5C"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A",
   "yaw": -82.1,
   "backwardYaw": -148.17,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_camera",
 "class": "PanoramaCamera"
},
{
 "label": "4bhk_bedroom_02 copy",
 "id": "panorama_10A96800_0139_3693_4154_C75F68C57800",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_1F068397_0107_19BE_4171_71AB44B1EA6D"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42",
   "yaw": -139.29,
   "backwardYaw": 11.01,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 178.63,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2B08A9FA_0108_E977_4168_99292E2D8BE0",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_10A96800_0139_3693_4154_C75F68C57800_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 42.09,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2BD2299D_0108_E9AD_414B_98510EB298BC",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -24.12,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2DBCE4D6_0108_FFBE_4161_FA9E15A1A814",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 97.9,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2DFF5505_0108_FE9D_4165_FA9F63487304",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -109.11,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2FD546A0_0108_FB92_4159_4F99180D4080",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 158.57,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2B71EA31_0108_EAF5_4176_502E4B2F6131",
 "class": "PanoramaCamera"
},
{
 "label": "4BHK BEDROOM 04 2 17th",
 "id": "panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D10180AB_C763_D956_41E1_17A33D3BEE1E"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942",
   "yaw": 68.51,
   "backwardYaw": -21.56,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "label": "4BHK BEDROOM 01 2 33rd",
 "id": "panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_EAECF1EB_C72D_FAD6_41A8_B49AEB304111",
  "this.overlay_E91CF77E_C72C_C7AE_41E6_ED92117BB9B5",
  "this.overlay_1F99A29D_0107_1BAD_4168_5698F5922677"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060",
   "yaw": 148.02,
   "backwardYaw": -131.59,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CD479071_C71C_D9B2_41D0_92945B278722",
   "yaw": -0.72,
   "backwardYaw": 128.26,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_10A96800_0139_3693_4154_C75F68C57800",
   "yaw": 11.01,
   "backwardYaw": -139.29,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": -110.49,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2BBF5975_0108_E97D_4148_DB3084E622BA",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -167.99,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2F1656DD_0108_FBB2_416A_949AC0E344F7",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 58.6,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2B03F9F3_0108_E975_4148_2AE558C9F838",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -111.12,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2CF825D2_0108_F9B6_4152_26172038A264",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -85.67,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2D8C7AFE_0108_EB6E_4171_282027663033",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 39.2,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2E3727F8_0108_F973_415E_858CC4ACC19C",
 "class": "PanoramaCamera"
},
{
 "label": "4BHK BEDROOM 04 1 28th",
 "id": "panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E0AC7D99_C73D_CB72_41E2_CDE435C74BDD",
  "this.overlay_EFD00FA6_C73C_C75E_41E0_8DE91C303B0D",
  "this.overlay_1D17FF73_0118_E976_4154_F30BC84C0928"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD",
   "yaw": -19.04,
   "backwardYaw": 68.38,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_10AB2713_013B_1AB5_4162_9A65609A81B1",
   "yaw": 134.36,
   "backwardYaw": 15.08,
   "class": "AdjacentPanorama"
  },
  {
   "distance": 1,
   "panorama": "this.panorama_CD47441A_C71C_F976_41E5_56E16AD8E357",
   "yaw": 154.28,
   "backwardYaw": 94.84,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": -164.29,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2BF729C4_0108_E993_4176_C85763E553D3",
 "class": "PanoramaCamera"
},
{
 "label": "4bhk Powder toilet",
 "id": "panorama_28495FE3_011F_2995_4161_1F0BD106F099",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_28543281_0109_3B92_4172_B2B47CE181F9"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD479071_C71C_D9B2_41D0_92945B278722",
   "yaw": -112.94,
   "backwardYaw": 111.5,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "label": "4bhk kitchen",
 "id": "panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_F418FFB4_C727_46B1_41E3_7157AAB75A6C"
 ],
 "hfov": 360,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "panorama": "this.panorama_CD479071_C71C_D9B2_41D0_92945B278722",
   "yaw": -63.14,
   "backwardYaw": -20.22,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_28495FE3_011F_2995_4161_1F0BD106F099_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 13.88,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2E46F82B_0108_F696_4176_07AE6C0E81EF",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 37.59,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2A5AFACF_0108_EBAD_4152_90EB8027F428",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -151.73,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 26.51,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 26.51,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2F5A6729_0108_FA95_4176_4F1A3B554DAF",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -158.36,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2C61D658_0108_FAB2_4174_F88DA7BBF778",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 21.21,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 21.21,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_camera",
 "class": "PanoramaCamera"
},
{
 "playbackBarOpacity": 1,
 "id": "MainViewer",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "progressBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "width": "100%",
 "progressBorderSize": 0,
 "transitionMode": "blending",
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipBorderSize": 1,
 "toolTipPaddingRight": 6,
 "playbackBarBorderColor": "#FFFFFF",
 "paddingLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingTop": 4,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "class": "ViewerArea",
 "progressBorderRadius": 0,
 "toolTipPaddingLeft": 6,
 "borderSize": 0,
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "minHeight": 50,
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadHeight": 15,
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBorderColor": "#000000",
 "minWidth": 100,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "height": "100%",
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeight": 10,
 "toolTipOpacity": 1,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "paddingTop": 0,
 "shadow": false,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "toolTipShadowVerticalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "transitionDuration": 500,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "data": {
  "name": "Main Viewer"
 },
 "toolTipFontColor": "#606060"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2, this.camera_2A62EAE7_0108_EB9D_4163_AA6A42FE490A); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_1_HS_0_0.png",
      "width": 234,
      "height": 230,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.19,
   "yaw": -140.8
  }
 ],
 "id": "overlay_0F921219_0107_1AB2_4163_2FA0B008B772",
 "maps": [
  {
   "hfov": 14.08,
   "yaw": -140.8,
   "image": {
    "levels": [
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.19,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD732023_C71F_F956_41D6_6910628043DA, this.camera_2D3C852D_0108_FE92_4172_0C2DCD3A2A9A); this.mainPlayList.set('selectedIndex', 22)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22B1BC73_010B_6F75_4162_7D29F9DD45EF",
   "pitch": -38.75,
   "yaw": -133.6,
   "hfov": 15.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_DDB914AF_C76D_7AAE_41DD_FD246BE7004B",
 "maps": [
  {
   "hfov": 15.16,
   "yaw": -133.6,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -38.75,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0, this.camera_2F0806FA_0108_FB77_4169_29F9D72CE1FB); this.mainPlayList.set('selectedIndex', 28)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_1_HS_0_0.png",
      "width": 243,
      "height": 272,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.44,
   "yaw": 170.21
  }
 ],
 "id": "overlay_14ADE4BE_010F_1FEF_416E_76EF10A518E9",
 "maps": [
  {
   "hfov": 14.57,
   "yaw": 170.21,
   "image": {
    "levels": [
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 17,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.44,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD888F1A_C71C_C776_41E5_354715787DA9, this.camera_2C2DF61D_0108_FAAD_4174_D19AEBE589C7); this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D1F813E7_C77D_5EDE_41C5_D3614EBDB84C",
   "pitch": -39.01,
   "yaw": -87.63,
   "hfov": 15.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D201568E_C765_3951_41E8_132B3132B361",
 "maps": [
  {
   "hfov": 15.1,
   "yaw": -87.63,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -39.01,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4, this.camera_2DC884FD_0108_FF6D_4178_2D0573E4FF02); this.mainPlayList.set('selectedIndex', 25)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.31,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0_HS_0_0.png",
      "width": 188,
      "height": 213,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.94,
   "yaw": 29.15
  }
 ],
 "id": "overlay_D079CAD6_C77D_CEFE_41DD_ABBE2AA0167E",
 "maps": [
  {
   "hfov": 11.31,
   "yaw": 29.15,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 18,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.94,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD732023_C71F_F956_41D6_6910628043DA, this.camera_2DC5A4F5_0108_FF7D_4175_913901F41506); this.mainPlayList.set('selectedIndex', 22)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0_HS_1_0.png",
      "width": 151,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.56,
   "yaw": 127.75
  }
 ],
 "id": "overlay_DF5FBBAA_C77C_CF56_41E7_7C881B931889",
 "maps": [
  {
   "hfov": 9.06,
   "yaw": 127.75,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.56,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1, this.camera_2DDF34EE_0108_FF6F_4179_406FECF0CD73); this.mainPlayList.set('selectedIndex', 21)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01 Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22B51C72_010B_6F77_4163_6CC541F5AABF",
   "pitch": 2.58,
   "yaw": -21.73,
   "hfov": 7.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_DF1B664B_C763_59D6_41D4_1CCBA4B7384E",
 "maps": [
  {
   "hfov": 7.53,
   "yaw": -21.73,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.58,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22B2AC72_010B_6F77_4167_80207FC0516B",
   "pitch": -23.66,
   "yaw": -167.13,
   "hfov": 11.62,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_DFF6DAC7_C765_4EDE_41D5_CD99DAE5DE58",
 "maps": [
  {
   "hfov": 11.62,
   "yaw": -167.13,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0_HS_3_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.66,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_2740B091_0119_17B5_4159_67CCDF611884, this.camera_2DA874E6_0108_FF9F_4172_1CF6A03905C8); this.mainPlayList.set('selectedIndex', 18)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0_HS_4_0.png",
      "width": 171,
      "height": 171,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.26,
   "yaw": 111.23
  }
 ],
 "id": "overlay_278C2B7C_0119_2973_4164_12C480ECE9AC",
 "maps": [
  {
   "hfov": 10.3,
   "yaw": 111.23,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0_HS_4_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.26,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86, this.camera_2D8C7AFE_0108_EB6E_4171_282027663033); this.mainPlayList.set('selectedIndex', 19)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.85,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0_HS_0_0.png",
      "width": 151,
      "height": 175,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.53,
   "yaw": 21.64
  }
 ],
 "id": "overlay_DB374A8C_C765_4952_41E1_A2E190D5388B",
 "maps": [
  {
   "hfov": 10.85,
   "yaw": 21.64,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 18,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.53,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22BF1C74_010B_6F73_416A_B09F42A3520B",
   "pitch": -50.82,
   "yaw": -141.39,
   "hfov": 12.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D912F139_C767_5BB2_41DE_1B6920A1E6C5",
 "maps": [
  {
   "hfov": 12.28,
   "yaw": -141.39,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -50.82,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_12091E1F_013F_2AAE_4168_C4499D5E4133, this.camera_2D98AAF6_0108_EB7F_415D_CA9B66A181BF); this.mainPlayList.set('selectedIndex', 30)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.38,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0_HS_2_0.png",
      "width": 176,
      "height": 128,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.37,
   "yaw": 21.56
  }
 ],
 "id": "overlay_15E9287B_010B_1775_4145_B25808494F8F",
 "maps": [
  {
   "hfov": 12.38,
   "yaw": 21.56,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0_HS_2_0_0_map.gif",
      "width": 22,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.37,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F, this.camera_2CC855C4_0108_F993_4176_F8A6ECC85719); this.mainPlayList.set('selectedIndex', 44)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_1_HS_0_0.png",
      "width": 251,
      "height": 276,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.81,
   "yaw": -60.91
  }
 ],
 "id": "overlay_1B991A50_0119_2AB2_4132_0A687531F080",
 "maps": [
  {
   "hfov": 15.08,
   "yaw": -60.91,
   "image": {
    "levels": [
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 17,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.81,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9, this.camera_2B5E0A19_0108_EAB2_4154_EE70D9673498); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.7,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_1_HS_0_0.png",
      "width": 295,
      "height": 308,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.9,
   "yaw": -112.74
  }
 ],
 "id": "overlay_246B1C44_0107_6E93_416A_CF9A21893363",
 "maps": [
  {
   "hfov": 17.7,
   "yaw": -112.74,
   "image": {
    "levels": [
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.9,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86, this.camera_2AF51A91_0108_EBB2_4178_C99336C24C13); this.mainPlayList.set('selectedIndex', 19)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_1_HS_0_0.png",
      "width": 217,
      "height": 224,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.28,
   "yaw": -158.86
  }
 ],
 "id": "overlay_F6B6F5DA_E6F2_2435_41D4_7EFE955F637C",
 "maps": [
  {
   "hfov": 15.65,
   "yaw": -158.86,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.28,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942, this.camera_2A8DCA58_0108_EAB3_4171_06FE2589A157); this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01 Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_27D71E90_0179_6BB3_416C_769EE541B80C",
   "pitch": -18.03,
   "yaw": 76.5,
   "hfov": 7.17,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_D77E9814_C72D_C971_41D3_F1C7EEC185B4",
 "maps": [
  {
   "hfov": 7.17,
   "yaw": 76.5,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.03,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD888F1A_C71C_C776_41E5_354715787DA9, this.camera_2A908A49_0108_EA92_4171_F536865642EC); this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01 Right"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_27D68E90_0179_6BB3_4167_2453BB10B29C",
   "pitch": -18.53,
   "yaw": 92.83,
   "hfov": 7.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_D6593DFD_C725_CAB3_41E1_22E863C59B7A",
 "maps": [
  {
   "hfov": 7.15,
   "yaw": 92.83,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.53,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9, this.camera_2B6D9A40_0108_EA93_4173_8FE1305025A8); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D1FF93DD_C77D_5EF2_41CB_8856CCC91593",
   "pitch": -24.53,
   "yaw": -126.3,
   "hfov": 9.94,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D689F985_C723_4B53_41E0_EF19CAA46BA5",
 "maps": [
  {
   "hfov": 9.94,
   "yaw": -126.3,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0_HS_2_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.53,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A, this.camera_2A875A50_0108_EAB3_4175_9AEBDF568EAC); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0_HS_3_0.png",
      "width": 151,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.06,
   "yaw": -1.12
  }
 ],
 "id": "overlay_EB45A2A5_E6F6_1C1F_41E0_169A3BFD2919",
 "maps": [
  {
   "hfov": 9.05,
   "yaw": -1.12,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.06,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22B2FC72_010B_6F77_4167_F91D6BDE3D04",
   "pitch": -30.44,
   "yaw": -121.15,
   "hfov": 11.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_DF87A050_C767_D9F2_41B5_A747371BE693",
 "maps": [
  {
   "hfov": 11.37,
   "yaw": -121.15,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -30.44,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC, this.camera_2F7C3749_0108_FA95_4160_47E7A5A58F25); this.mainPlayList.set('selectedIndex', 31)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01 Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_27CF2E93_0179_6BB5_416D_B92F274499B2",
   "pitch": -18.78,
   "yaw": 75.99,
   "hfov": 7.14,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_DE0068F1_C767_4AB2_41E8_311A365DEAB0",
 "maps": [
  {
   "hfov": 7.14,
   "yaw": 75.99,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.78,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0, this.camera_2F4A8737_0108_FAFD_416A_CCA93210983C); this.mainPlayList.set('selectedIndex', 28)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01 Right"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_27CF5E93_0179_6BB5_4149_3ABE149C704F",
   "pitch": -18.28,
   "yaw": 94.33,
   "hfov": 7.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_DDD9E5FF_C765_5AAE_41E5_46C9CCEA06DE",
 "maps": [
  {
   "hfov": 7.16,
   "yaw": 94.33,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.28,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43, this.camera_2F6C5758_0108_FAB2_4155_B7B6438D1434); this.mainPlayList.set('selectedIndex', 20)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0_HS_3_0.png",
      "width": 151,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.31,
   "yaw": -1.12
  }
 ],
 "id": "overlay_E80D4B8C_E6F2_2C2D_41E0_90C736E7CC60",
 "maps": [
  {
   "hfov": 9.06,
   "yaw": -1.12,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.31,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86, this.camera_2BB8897E_0108_E96E_414D_D50DC9A53CC6); this.mainPlayList.set('selectedIndex', 19)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0_HS_0_0.png",
      "width": 245,
      "height": 206,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.41,
   "yaw": 153.66
  }
 ],
 "id": "overlay_D95E3B79_C764_CFB2_41CF_C88AFF6D4BC6",
 "maps": [
  {
   "hfov": 17.65,
   "yaw": 153.66,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0_HS_0_0_0_map.gif",
      "width": 19,
      "height": 15,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.41,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6, this.camera_2BBF5975_0108_E97D_4148_DB3084E622BA); this.mainPlayList.set('selectedIndex', 32)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22BD9C76_010B_6F7E_414E_09E3204E2660",
   "pitch": -32.09,
   "yaw": -19.17,
   "hfov": 11.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D84AC366_C763_5FD1_41D2_AE1B94515E56",
 "maps": [
  {
   "hfov": 11.15,
   "yaw": -19.17,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -32.09,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898, this.camera_2BA23985_0108_E99D_4139_EA8D88B99ADC); this.mainPlayList.set('selectedIndex', 33)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0_HS_2_0.png",
      "width": 176,
      "height": 226,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.31,
   "yaw": 134.36
  }
 ],
 "id": "overlay_173CD9AA_010F_2996_4163_878C96402C7E",
 "maps": [
  {
   "hfov": 12.65,
   "yaw": 134.36,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 20,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.31,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB, this.camera_2B243A0A_0108_EA97_4169_4AB99A550E87); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0_HS_0_0.png",
      "width": 151,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.4,
   "yaw": -0.72
  }
 ],
 "id": "overlay_DD070AC8_C763_4ED2_41C9_24B475FBBEEE",
 "maps": [
  {
   "hfov": 10.87,
   "yaw": -0.72,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.4,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C, this.camera_2B2B3A11_0108_EAB5_4171_321C6B3D4238); this.mainPlayList.set('selectedIndex', 23)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22B02C73_010B_6F75_4168_F9B6711844B1",
   "pitch": -44.28,
   "yaw": 154.8,
   "hfov": 13.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_DDFC90E3_C76D_7AD6_41E6_FFEEF526FE90",
 "maps": [
  {
   "hfov": 13.92,
   "yaw": 154.8,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -44.28,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_10BCB494_013F_1FB2_4161_C83441295AC6, this.camera_2B3F9A03_0108_EA96_4178_4EC88F5A72FE); this.mainPlayList.set('selectedIndex', 24)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0_HS_2_0.png",
      "width": 138,
      "height": 138,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.72,
   "yaw": 10.13
  }
 ],
 "id": "overlay_12046B32_0107_EAF7_416B_D6E56AE80173",
 "maps": [
  {
   "hfov": 9.72,
   "yaw": 10.13,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.72,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB, this.camera_2CE8B5E4_0108_F993_4124_BEDDDD518150); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0_HS_0_0.png",
      "width": 234,
      "height": 234,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.16,
   "yaw": -143.41
  }
 ],
 "id": "overlay_DC659AFB_C76F_4EB6_41D5_0F1877D4D037",
 "maps": [
  {
   "hfov": 16.89,
   "yaw": -143.41,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.16,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751, this.camera_2CF825D2_0108_F9B6_4152_26172038A264); this.mainPlayList.set('selectedIndex', 26)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22BEAC74_010B_6F73_4169_5866E05F9E82",
   "pitch": -31.97,
   "yaw": -14.77,
   "hfov": 16.49,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_DCF81359_C76F_7FF3_41A8_62F50E047FA0",
 "maps": [
  {
   "hfov": 16.49,
   "yaw": -14.77,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -31.97,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD732023_C71F_F956_41D6_6910628043DA, this.camera_2DA214DE_0108_FFAE_4166_2BC57ED3C1AF); this.mainPlayList.set('selectedIndex', 22)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_1_HS_0_0.png",
      "width": 264,
      "height": 197,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.57,
   "yaw": -140.17
  }
 ],
 "id": "overlay_12BC958B_0109_7995_4112_D3CFE865F0D8",
 "maps": [
  {
   "hfov": 15.84,
   "yaw": -140.17,
   "image": {
    "levels": [
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_1_HS_0_0_0_map.gif",
      "width": 21,
      "height": 15,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.57,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045, this.camera_2A5AFACF_0108_EBAD_4152_90EB8027F428); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.82,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0_HS_0_0.png",
      "width": 197,
      "height": 230,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.19,
   "yaw": 30.15
  }
 ],
 "id": "overlay_C9502109_C72D_3B52_41E6_EA33AED203C6",
 "maps": [
  {
   "hfov": 11.82,
   "yaw": 30.15,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0_HS_0_0_0_map.gif",
      "width": 15,
      "height": 18,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.19,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2, this.camera_2A28FAC7_0108_EB9D_4172_C5F582C0BBFA); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0_HS_1_0.png",
      "width": 151,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.56,
   "yaw": 127.75
  }
 ],
 "id": "overlay_C8B50F54_C72F_47F2_41BD_3D4C2E212738",
 "maps": [
  {
   "hfov": 9.06,
   "yaw": 127.75,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.56,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C, this.camera_2A24EAC0_0108_EB92_40FF_FF210B6C4800); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01 Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D1FC53DD_C77D_5EF2_41E5_1CC973DDBEA3",
   "pitch": -1.19,
   "yaw": -20.98,
   "hfov": 7.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_D54F99DC_C72F_CAF2_41E3_249E41049022",
 "maps": [
  {
   "hfov": 7.54,
   "yaw": -20.98,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.19,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB, this.camera_2A010AB1_0108_EBF2_4165_127437C97CB3); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D1FCA3DD_C77D_5EF2_41DD_9635E996FADF",
   "pitch": -23.91,
   "yaw": -169.89,
   "hfov": 13.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D7048D5C_C72C_CBF1_41E2_9CEB980C06AF",
 "maps": [
  {
   "hfov": 13.89,
   "yaw": -169.89,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0_HS_3_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.91,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_24CDB527_010B_7E9D_4174_52D79CB239F2, this.camera_2A32DAB8_0108_EBF2_4171_288C8B9E7C57); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0_HS_4_0.png",
      "width": 151,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.96,
   "yaw": 110.82
  }
 ],
 "id": "overlay_2436EEBC_0109_2BF3_4160_6EEF04DAF8BF",
 "maps": [
  {
   "hfov": 9.06,
   "yaw": 110.82,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0_HS_4_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.96,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2, this.camera_2DBCE4D6_0108_FFBE_4161_FA9E15A1A814); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D1FE93E7_C77D_5EDE_41BF_076B82AF6AC9",
   "pitch": -38.25,
   "yaw": -138.88,
   "hfov": 15.27,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D5B45B26_C76D_CF5E_41D0_7E370B2F5BD4",
 "maps": [
  {
   "hfov": 15.27,
   "yaw": -138.88,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -38.25,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558, this.camera_2B71EA31_0108_EAF5_4176_502E4B2F6131); this.mainPlayList.set('selectedIndex', 43)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22A42C79_010B_6F72_4149_88EC1ECE95A9",
   "pitch": -45.28,
   "yaw": 78.93,
   "hfov": 13.68,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E167051F_C725_5B6F_41E8_EC2A8AF34DDA",
 "maps": [
  {
   "hfov": 13.68,
   "yaw": 78.93,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -45.28,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_10AB6D68_013B_EE92_4160_6689FDC41054, this.camera_2B4B8A29_0108_EA92_4144_B47AE6FE1418); this.mainPlayList.set('selectedIndex', 45)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0_HS_1_0.png",
      "width": 167,
      "height": 161,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.77,
   "yaw": 159.15
  }
 ],
 "id": "overlay_19CEA5D1_0107_19B2_416C_296CD912445E",
 "maps": [
  {
   "hfov": 12.06,
   "yaw": 159.15,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 15,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.77,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD479071_C71C_D9B2_41D0_92945B278722, this.camera_2FB3767F_0108_FB6D_4165_0695182B3345); this.mainPlayList.set('selectedIndex', 52)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22ACFC7D_010B_6F72_4143_20E894558272",
   "pitch": -27.3,
   "yaw": -121.4,
   "hfov": 14.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_EC843EC7_C724_C6DF_41E4_78AEC11AB30A",
 "maps": [
  {
   "hfov": 14.4,
   "yaw": -121.4,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.3,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045, this.camera_2F91D664_0108_FA93_416B_2E612A0F126C); this.mainPlayList.set('selectedIndex', 66)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01 Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2634AE9D_0179_6BB2_416B_0E619954B364",
   "pitch": -17.77,
   "yaw": 75.74,
   "hfov": 7.18,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_EBD3DBCF_C723_4EEE_41D3_4E82F6F873AE",
 "maps": [
  {
   "hfov": 7.18,
   "yaw": 75.74,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.77,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506, this.camera_2C61D658_0108_FAB2_4174_F88DA7BBF778); this.mainPlayList.set('selectedIndex', 63)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01 Right"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_26340E9D_0179_6BB2_4157_57C208044E2E",
   "pitch": -18.53,
   "yaw": 93.83,
   "hfov": 7.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_E9586F13_C72C_C776_41D2_741B38E3831E",
 "maps": [
  {
   "hfov": 7.15,
   "yaw": 93.83,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.53,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7, this.camera_2F836672_0108_FB76_4166_72A79DB44AEA); this.mainPlayList.set('selectedIndex', 55)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0_HS_3_0.png",
      "width": 151,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.56,
   "yaw": -2.38
  }
 ],
 "id": "overlay_F73E3897_E6F2_2C3A_41E8_B2BA995462E3",
 "maps": [
  {
   "hfov": 9.06,
   "yaw": -2.38,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.56,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42, this.camera_2FF496BA_0108_FBF7_4175_0B4E8DE85023); this.mainPlayList.set('selectedIndex', 57)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22A9AC7F_010B_6F6E_416B_2EA4E226EE03",
   "pitch": -41.01,
   "yaw": -131.59,
   "hfov": 14.67,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E9099FDF_C72F_C6EE_41E3_A646B2C2340D",
 "maps": [
  {
   "hfov": 14.67,
   "yaw": -131.59,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -41.01,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC, this.camera_2B64EA39_0108_EAF2_4161_BFFD970B95BA); this.mainPlayList.set('selectedIndex', 31)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.58,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_1_HS_0_0.png",
      "width": 259,
      "height": 264,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.69,
   "yaw": 14.7
  }
 ],
 "id": "overlay_17C8401E_0109_16AF_4164_AB7919665F6E",
 "maps": [
  {
   "hfov": 15.58,
   "yaw": 14.7,
   "image": {
    "levels": [
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.69,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558, this.camera_2D63855F_0108_FEAD_4103_D714C401F630); this.mainPlayList.set('selectedIndex', 43)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.58,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0_HS_0_0.png",
      "width": 209,
      "height": 217,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.81,
   "yaw": 30.28
  }
 ],
 "id": "overlay_E77541FB_C727_7AB6_41E2_71A4F3A251EC",
 "maps": [
  {
   "hfov": 12.58,
   "yaw": 30.28,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.81,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01, this.camera_2D417545_0108_FE9D_4164_5AF0C15C3344); this.mainPlayList.set('selectedIndex', 40)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0_HS_1_0.png",
      "width": 167,
      "height": 188,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.68,
   "yaw": 128.01
  }
 ],
 "id": "overlay_E66DCEAD_C727_4953_41E4_4338D4DA1A80",
 "maps": [
  {
   "hfov": 10.06,
   "yaw": 128.01,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 18,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.68,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A, this.camera_2D5FE53D_0108_FEED_4175_777D5D8C6086); this.mainPlayList.set('selectedIndex', 39)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01 Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22BD4C77_010B_6F7E_416B_7A4B539AD3E0",
   "pitch": 0.82,
   "yaw": -20.22,
   "hfov": 7.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_E57D9766_C725_47DE_41E4_4EAD320D7E97",
 "maps": [
  {
   "hfov": 7.54,
   "yaw": -20.22,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.82,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD47441A_C71C_F976_41E5_56E16AD8E357, this.camera_2D71F54C_0108_FE93_4173_E616C35131D7); this.mainPlayList.set('selectedIndex', 37)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22BACC77_010B_6F7E_4138_DA669CFB4744",
   "pitch": -29.06,
   "yaw": -166.12,
   "hfov": 14.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E6FF7EBA_C723_46B1_41E8_B0C4C865F516",
 "maps": [
  {
   "hfov": 14.16,
   "yaw": -166.12,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0_HS_3_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -29.06,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_27D62BB1_011F_69F2_416D_0AB033A18B06, this.camera_2D2F6535_0108_FEF2_415E_88331197CD38); this.mainPlayList.set('selectedIndex', 35)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0_HS_4_0.png",
      "width": 171,
      "height": 171,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.46,
   "yaw": 110.2
  }
 ],
 "id": "overlay_277FED88_0119_2993_4162_1C85866E4314",
 "maps": [
  {
   "hfov": 10.3,
   "yaw": 110.2,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0_HS_4_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.46,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD, this.camera_2AB91A67_0108_EA9D_4176_56C9DBD2E822); this.mainPlayList.set('selectedIndex', 49)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22A1FC7B_010B_6F76_4168_B63BC17E5FDC",
   "pitch": -32.72,
   "yaw": 68.38,
   "hfov": 10.01,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_EE27537F_C723_5FAE_41E1_DBA13BA4CC54",
 "maps": [
  {
   "hfov": 10.01,
   "yaw": 68.38,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_1_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -32.72,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD, this.camera_2FC566AD_0108_FB92_413D_9634CDE9FE52); this.mainPlayList.set('selectedIndex', 54)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_1_HS_0_0.png",
      "width": 189,
      "height": 192,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.66,
   "yaw": 152.65
  }
 ],
 "id": "overlay_F4E4001F_C725_596E_41E0_DD5EA526DD91",
 "maps": [
  {
   "hfov": 13.63,
   "yaw": 152.65,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.66,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05, this.camera_2FD546A0_0108_FB92_4159_4F99180D4080); this.mainPlayList.set('selectedIndex', 67)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22928C81_010B_6F92_414F_1D4E8A9E78E0",
   "pitch": -26.57,
   "yaw": -18.67,
   "hfov": 11.77,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_F3F318C8_C723_4AD2_41E2_333E3532C07C",
 "maps": [
  {
   "hfov": 11.77,
   "yaw": -18.67,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_1_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -26.57,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_10A60E5E_0139_2AAF_4170_A488EF414D0A, this.camera_2FA2E692_0108_FBB6_4176_125353E97E8D); this.mainPlayList.set('selectedIndex', 36)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_1_HS_2_0.png",
      "width": 169,
      "height": 191,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.84,
   "yaw": 133.86
  }
 ],
 "id": "overlay_233D63E7_010F_199E_411B_8C1C1EF5FD30",
 "maps": [
  {
   "hfov": 11.96,
   "yaw": 133.86,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 18,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.84,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD47441A_C71C_F976_41E5_56E16AD8E357, this.camera_2D164516_0108_FEBE_4160_0BB22145E85A); this.mainPlayList.set('selectedIndex', 37)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0_HS_0_0.png",
      "width": 151,
      "height": 150,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.9,
   "yaw": 21.89
  }
 ],
 "id": "overlay_E11B8401_C724_F952_41BA_B115171D0330",
 "maps": [
  {
   "hfov": 10.86,
   "yaw": 21.89,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.9,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3, this.camera_2DFF5505_0108_FE9D_4165_FA9F63487304); this.mainPlayList.set('selectedIndex', 47)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22A28C7A_010B_6F76_4171_1E7F3F42C069",
   "pitch": -45.29,
   "yaw": -148.17,
   "hfov": 13.68,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E05F9DD6_C723_CAF1_41E7_95CA81350DF9",
 "maps": [
  {
   "hfov": 13.68,
   "yaw": -148.17,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -45.29,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_121539AD_013B_29ED_4160_3D4F82B47E36, this.camera_2DE2C50E_0108_FEAE_416A_BEA02576A82E); this.mainPlayList.set('selectedIndex', 48)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.39,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0_HS_2_0.png",
      "width": 162,
      "height": 191,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.62,
   "yaw": 24.07
  }
 ],
 "id": "overlay_1B91065C_011F_FAB3_415F_9A52427DF53E",
 "maps": [
  {
   "hfov": 11.39,
   "yaw": 24.07,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 18,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.62,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4, this.camera_2B8A3965_0108_F69D_4177_7E42250CC009); this.mainPlayList.set('selectedIndex', 25)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22BEDC74_010B_6F73_416E_DDABD29706F9",
   "pitch": -42.77,
   "yaw": 68.88,
   "hfov": 14.27,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_DB599724_C763_4752_41D6_A0FA163F689B",
 "maps": [
  {
   "hfov": 14.27,
   "yaw": 68.88,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -42.77,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_10BE6159_013F_76B5_411F_D68688796320, this.camera_2B81095D_0108_F6AD_4168_FCDB0C028504); this.mainPlayList.set('selectedIndex', 27)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0_HS_1_0.png",
      "width": 143,
      "height": 156,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.78,
   "yaw": 159.02
  }
 ],
 "id": "overlay_12DF8ADA_0109_6BB7_4158_417DA7908C9B",
 "maps": [
  {
   "hfov": 10.3,
   "yaw": 159.02,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 17,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.78,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545, this.camera_2CD655AA_0108_F996_4159_FA451FFC1FD2); this.mainPlayList.set('selectedIndex', 60)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2297BC7F_010B_6F6E_416E_C01526863309",
   "pitch": -43.52,
   "yaw": 71.39,
   "hfov": 14.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E8B6B81F_C72D_496E_41E6_150256507011",
 "maps": [
  {
   "hfov": 14.1,
   "yaw": 71.39,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -43.52,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 65)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.55,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0_HS_1_0.png",
      "width": 160,
      "height": 177,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.97,
   "yaw": 159.15
  }
 ],
 "id": "overlay_1E1E3B49_0109_6A92_4131_325625FDB82A",
 "maps": [
  {
   "hfov": 11.55,
   "yaw": 159.15,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 17,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.97,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045, this.camera_2E9C4765_0108_FA92_416E_DF9B685EEC5E); this.mainPlayList.set('selectedIndex', 66)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2293FC82_010B_6F96_4131_C14090FFAEE0",
   "pitch": -33.22,
   "yaw": 70.89,
   "hfov": 9.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_F4767B1F_C727_4F6F_41DB_8ED192ED33D1",
 "maps": [
  {
   "hfov": 9.96,
   "yaw": 70.89,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -33.22,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9, this.camera_2C82157E_0108_F96F_4155_5E106C87367F); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.35,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0_HS_0_0.png",
      "width": 227,
      "height": 196,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.3,
   "yaw": -142.41
  }
 ],
 "id": "overlay_D464C36F_C76D_5FAF_41D8_35D099FAD98B",
 "maps": [
  {
   "hfov": 16.35,
   "yaw": -142.41,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0_HS_0_0_0_map.gif",
      "width": 18,
      "height": 15,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.3,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CC175683_C71F_5956_41AA_704EB81E1F05, this.camera_2CB4258B_0108_F996_4175_15A691A292F2); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D1FEF3E7_C77D_5EDE_41D4_38C2D06ADC42",
   "pitch": -25.81,
   "yaw": -23.19,
   "hfov": 15.01,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D4E3A43C_C76F_59B1_41D0_FA262DAB39CB",
 "maps": [
  {
   "hfov": 15.01,
   "yaw": -23.19,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -25.81,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932, this.camera_2BFE89CC_0108_E992_415F_57052E9FF754); this.mainPlayList.set('selectedIndex', 34)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.35,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_1_HS_0_0.png",
      "width": 290,
      "height": 290,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.47,
   "yaw": -113.49
  }
 ],
 "id": "overlay_299D94A8_0107_1F92_4177_026B7F551234",
 "maps": [
  {
   "hfov": 17.35,
   "yaw": -113.49,
   "image": {
    "levels": [
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.47,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CC175683_C71F_5956_41AA_704EB81E1F05, this.camera_2F38770E_0108_FAAF_4152_3CD9465CFE20); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_1_HS_0_0.png",
      "width": 268,
      "height": 238,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.58,
   "yaw": -60.41
  }
 ],
 "id": "overlay_1189CF7A_0109_6977_4165_30E4901C9436",
 "maps": [
  {
   "hfov": 16.08,
   "yaw": -60.41,
   "image": {
    "levels": [
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_1_HS_0_0_0_map.gif",
      "width": 18,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.58,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751, this.camera_2BC749AC_0108_E993_4167_18FDC8BBB9EC); this.mainPlayList.set('selectedIndex', 26)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_1_HS_0_0.png",
      "width": 268,
      "height": 234,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.45,
   "yaw": -61.67
  }
 ],
 "id": "overlay_153F3E16_010B_2ABF_4102_306DCD1B8DA0",
 "maps": [
  {
   "hfov": 16.09,
   "yaw": -61.67,
   "image": {
    "levels": [
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_1_HS_0_0_0_map.gif",
      "width": 18,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.45,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC, this.camera_2B44CA21_0108_EA95_4168_6262339D8C09); this.mainPlayList.set('selectedIndex', 31)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22BD5C76_010B_6F7E_4166_469CD7719366",
   "pitch": -32.59,
   "yaw": 69.51,
   "hfov": 9.82,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D8D0AEBD_C71D_46B2_41E2_77FAFEC5B3BD",
 "maps": [
  {
   "hfov": 9.82,
   "yaw": 69.51,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -32.59,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD, this.camera_2EE397CC_0108_F993_4176_6C0DCB189346); this.mainPlayList.set('selectedIndex', 54)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0_HS_0_0.png",
      "width": 151,
      "height": 150,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.12,
   "yaw": 21.64
  }
 ],
 "id": "overlay_F7CC04EB_C723_5AD6_41D4_F9DE6E7EE7BF",
 "maps": [
  {
   "hfov": 10.87,
   "yaw": 21.64,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.12,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B, this.camera_2EC367AD_0108_F992_4174_17BB25B899A7); this.mainPlayList.set('selectedIndex', 64)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22958C80_010B_6F92_4165_9E49EF8FB640",
   "pitch": -48.06,
   "yaw": -148.93,
   "hfov": 12.99,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_F6F55B77_C723_4FBE_41D4_D6F2BBFF046B",
 "maps": [
  {
   "hfov": 12.99,
   "yaw": -148.93,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -48.06,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_10F8A1A0_0139_3993_4126_7D4276303500, this.camera_2EF377BF_0108_F9EE_4143_F77E4FE01413); this.mainPlayList.set('selectedIndex', 65)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.14,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0_HS_2_0.png",
      "width": 180,
      "height": 135,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.65,
   "yaw": 23.7
  }
 ],
 "id": "overlay_21FA05A4_0109_1993_4165_D8879C212997",
 "maps": [
  {
   "hfov": 12.14,
   "yaw": 23.7,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0_HS_2_0_0_map.gif",
      "width": 21,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.65,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506, this.camera_2D8964CD_0108_FFAD_4173_0B360EEC25A3); this.mainPlayList.set('selectedIndex', 63)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22928C81_010B_6F92_4155_88CC3FCC3378",
   "pitch": -38.26,
   "yaw": -77.83,
   "hfov": 15.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_F5309816_C725_4971_41DC_62B6061471DF",
 "maps": [
  {
   "hfov": 15.26,
   "yaw": -77.83,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -38.26,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD, this.camera_2BDDA9A4_0108_E993_4178_3C7635AD5BD8); this.mainPlayList.set('selectedIndex', 54)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_1_HS_0_0.png",
      "width": 224,
      "height": 196,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.05,
   "yaw": -169.16
  }
 ],
 "id": "overlay_F4A93A03_E6FE_6C1A_41B1_F38C9DDC27C0",
 "maps": [
  {
   "hfov": 16.11,
   "yaw": -169.16,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_1_HS_0_0_0_map.gif",
      "width": 18,
      "height": 15,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.05,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A, this.camera_2E27280D_0108_F692_4154_EBD89E81D518); this.mainPlayList.set('selectedIndex', 46)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01 Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2639EE97_0179_6BBD_4149_51DCE6744A69",
   "pitch": -18.78,
   "yaw": 75.37,
   "hfov": 5.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_E69088C4_C72C_CAD2_41E2_67849E970973",
 "maps": [
  {
   "hfov": 5.95,
   "yaw": 75.37,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.78,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD, this.camera_2E56C81B_0108_F6B5_4178_AEB946DB9F52); this.mainPlayList.set('selectedIndex', 49)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01 Right"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_26391E97_0179_6BBD_413B_682F552976AC",
   "pitch": -20.03,
   "yaw": 94.84,
   "hfov": 7.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_E5D3EE61_C72D_49D2_41E0_D1B634887F8E",
 "maps": [
  {
   "hfov": 7.08,
   "yaw": 94.84,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.03,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932, this.camera_2E46F82B_0108_F696_4176_07AE6C0E81EF); this.mainPlayList.set('selectedIndex', 34)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22BB4C77_010B_6F7E_415E_2918A1BF855A",
   "pitch": -28.93,
   "yaw": -119.02,
   "hfov": 9.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E44921C1_C72D_3AD3_41D0_85751F7FA73A",
 "maps": [
  {
   "hfov": 9.56,
   "yaw": -119.02,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0_HS_2_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -28.93,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269, this.camera_2B874954_0108_F6B2_4131_62268028E4A8); this.mainPlayList.set('selectedIndex', 38)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0_HS_3_0.png",
      "width": 151,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.06,
   "yaw": -1.37
  }
 ],
 "id": "overlay_F607C52E_E6F2_246D_41E3_2DB987A88877",
 "maps": [
  {
   "hfov": 9.06,
   "yaw": -1.37,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.06,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942, this.camera_2DBEBB06_0108_EA9E_4156_1BBF317B8411); this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_1_HS_0_0.png",
      "width": 217,
      "height": 209,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.05,
   "yaw": 15.71
  }
 ],
 "id": "overlay_13B21729_013B_1A95_416C_98A10822AB74",
 "maps": [
  {
   "hfov": 13.08,
   "yaw": 15.71,
   "image": {
    "levels": [
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.05,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01, this.camera_2ACCBA89_0108_EB92_4170_CC215E2A3E1A); this.mainPlayList.set('selectedIndex', 40)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22A66C79_010B_6F72_416E_D5DC8CEB8DEC",
   "pitch": -38,
   "yaw": -136.37,
   "hfov": 15.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E31F4E35_C725_49B2_41E3_75B373DD479F",
 "maps": [
  {
   "hfov": 15.32,
   "yaw": -136.37,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -38,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD479071_C71C_D9B2_41D0_92945B278722, this.camera_2F5A6729_0108_FA95_4176_4F1A3B554DAF); this.mainPlayList.set('selectedIndex', 52)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0_HS_0_0.png",
      "width": 241,
      "height": 196,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.78,
   "yaw": -143.41
  }
 ],
 "id": "overlay_E994C697_C72F_797F_41D3_1180D963962C",
 "maps": [
  {
   "hfov": 17.4,
   "yaw": -143.41,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0_HS_0_0_0_map.gif",
      "width": 19,
      "height": 15,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.78,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD973440_C71F_79D2_41CE_832903CFC20A, this.camera_2F28C71B_0108_FAB5_4175_3A56F23A8C6B); this.mainPlayList.set('selectedIndex', 61)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2296DC7F_010B_6F6E_4161_AB4F02E2DFA0",
   "pitch": -25.81,
   "yaw": -22.69,
   "hfov": 15.01,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E8B86196_C72D_7B7E_41D9_E9ACE1C1D537",
 "maps": [
  {
   "hfov": 15.01,
   "yaw": -22.69,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -25.81,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9, this.camera_2E12D7D9_0108_F9B5_4164_8118206052FE); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0_HS_0_0.png",
      "width": 151,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.4,
   "yaw": 0.29
  }
 ],
 "id": "overlay_D51089C5_C765_CAD2_41E5_192F51616448",
 "maps": [
  {
   "hfov": 10.87,
   "yaw": 0.29,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.4,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA, this.camera_2E0577E8_0108_F993_4175_6B92EB32DCF1); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D1FE33E7_C77D_5EDE_41D2_061D00B2B4AE",
   "pitch": -45.77,
   "yaw": 155.88,
   "hfov": 12.27,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D5FA2C1E_C764_C971_41E4_AEEDE47EBAA0",
 "maps": [
  {
   "hfov": 12.27,
   "yaw": 155.88,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -45.77,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A, this.camera_2E3727F8_0108_F973_415E_858CC4ACC19C); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.41,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0_HS_2_0.png",
      "width": 102,
      "height": 165,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.22,
   "yaw": 10.59
  }
 ],
 "id": "overlay_0CFCE4F2_0109_1F77_416C_637A9F84F95D",
 "maps": [
  {
   "hfov": 7.41,
   "yaw": 10.59,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 25,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.22,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932, this.camera_2BAF698E_0108_E9AE_4173_97C4969CBA71); this.mainPlayList.set('selectedIndex', 34)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0_HS_0_0.png",
      "width": 151,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.91,
   "yaw": 1.29
  }
 ],
 "id": "overlay_E4AC823C_C723_F9B2_41B4_39B29FEEA91C",
 "maps": [
  {
   "hfov": 10.87,
   "yaw": 1.29,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.91,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE, this.camera_2BD6F995_0108_E9B2_4165_0D62CB197914); this.mainPlayList.set('selectedIndex', 41)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22B97C78_010B_6F72_4168_A626EED7BAD0",
   "pitch": -44.78,
   "yaw": 144.5,
   "hfov": 13.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E33D35E2_C723_3AD1_41A1_22D3C41AFB56",
 "maps": [
  {
   "hfov": 13.8,
   "yaw": 144.5,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -44.78,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E, this.camera_2BD2299D_0108_E9AD_414B_98510EB298BC); this.mainPlayList.set('selectedIndex', 42)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0_HS_2_0.png",
      "width": 176,
      "height": 246,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.83,
   "yaw": 12.01
  }
 ],
 "id": "overlay_1663296C_010B_3692_4150_5A99E64207F0",
 "maps": [
  {
   "hfov": 12.54,
   "yaw": 12.01,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 22,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.83,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB, this.camera_2BC039B5_0108_E9F2_4145_A29347FF2D58); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0_HS_0_0.png",
      "width": 220,
      "height": 199,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.41,
   "yaw": 154.03
  }
 ],
 "id": "overlay_D29433BE_C765_3EAE_41D8_CC80272D951C",
 "maps": [
  {
   "hfov": 15.89,
   "yaw": 154.03,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0_HS_0_0_0_map.gif",
      "width": 17,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.41,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335, this.camera_2BCBE9BC_0108_E9F2_4176_A1E51CE05EEB); this.mainPlayList.set('selectedIndex', 15)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D1F893E7_C77D_5EDE_41C5_65F129D18629",
   "pitch": -28.7,
   "yaw": -21.56,
   "hfov": 17.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D179CE94_C763_4971_41E1_4D5D0BD3A926",
 "maps": [
  {
   "hfov": 17.05,
   "yaw": -21.56,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -28.7,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE, this.camera_2BF729C4_0108_E993_4176_C85763E553D3); this.mainPlayList.set('selectedIndex', 16)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.77,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0_HS_2_0.png",
      "width": 263,
      "height": 177,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.08,
   "yaw": 135.24
  }
 ],
 "id": "overlay_1318911B_0107_36B6_4161_1D9EEF544932",
 "maps": [
  {
   "hfov": 18.77,
   "yaw": 135.24,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0_HS_2_0_0_map.gif",
      "width": 23,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.08,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045, this.camera_2EBE3784_0108_F993_4176_2722FB166346); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D1F953E7_C77D_5EDE_41B3_BBC8AE666EFB",
   "pitch": -38.5,
   "yaw": 55.82,
   "hfov": 15.21,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D4F9B791_C76F_4773_41B6_B1727AC576AD",
 "maps": [
  {
   "hfov": 15.21,
   "yaw": 55.82,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -38.5,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80, this.camera_2E8E0772_0108_F977_416A_CA19690F2FE7); this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.81,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0_HS_1_0.png",
      "width": 163,
      "height": 154,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.21,
   "yaw": 159.78
  }
 ],
 "id": "overlay_0E3B3744_010F_3A93_4145_BD2F3EE28358",
 "maps": [
  {
   "hfov": 11.81,
   "yaw": 159.78,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.21,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506, this.camera_2FE4D6CE_0108_FBAF_4174_7B476FEAFEC4); this.mainPlayList.set('selectedIndex', 63)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_1_HS_0_0.png",
      "width": 247,
      "height": 201,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 7.34,
   "yaw": 166.07
  }
 ],
 "id": "overlay_227ECEFD_0109_2B6D_416E_3A14758B111C",
 "maps": [
  {
   "hfov": 14.72,
   "yaw": 166.07,
   "image": {
    "levels": [
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_1_HS_0_0_0_map.gif",
      "width": 19,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 7.34,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD47441A_C71C_F976_41E5_56E16AD8E357, this.camera_2B08A9FA_0108_E977_4168_99292E2D8BE0); this.mainPlayList.set('selectedIndex', 37)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_1_HS_0_0.png",
      "width": 220,
      "height": 241,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.68,
   "yaw": -167.28
  }
 ],
 "id": "overlay_F7CC2CF2_E6F2_E5F5_41C2_AAC8BF3B7DDA",
 "maps": [
  {
   "hfov": 15.84,
   "yaw": -167.28,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 17,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.68,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932, this.camera_2C7E4645_0108_FA9D_4167_099945B2CF34); this.mainPlayList.set('selectedIndex', 34)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0_HS_0_0.png",
      "width": 217,
      "height": 189,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.03,
   "yaw": -142.03
  }
 ],
 "id": "overlay_E3C0EB9C_C727_CF72_41D8_2929BE9FB4EE",
 "maps": [
  {
   "hfov": 15.65,
   "yaw": -142.03,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0_HS_0_0_0_map.gif",
      "width": 18,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.03,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F, this.camera_2C4E0638_0108_FAF3_4178_9B712878EA61); this.mainPlayList.set('selectedIndex', 44)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22A4AC79_010B_6F72_416E_51CCA57431BC",
   "pitch": -26.82,
   "yaw": -21.43,
   "hfov": 16.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E2CC1B58_C725_4FF1_41E7_2F6766A1B20D",
 "maps": [
  {
   "hfov": 16.23,
   "yaw": -21.43,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -26.82,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB, this.camera_2C5FE62B_0108_FA96_4144_CFAB80141C0B); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22B34C73_010B_6F75_411F_82560BDF5A68",
   "pitch": -32.85,
   "yaw": -58.37,
   "hfov": 9.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_DD3041EE_C764_DAAE_41E6_5D3D4684B50F",
 "maps": [
  {
   "hfov": 9.36,
   "yaw": -58.37,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0_HS_0_0_0_map.gif",
      "width": 17,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -32.85,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 28)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22BCEC74_010B_6F73_4171_9BF28B8564F4",
   "pitch": -39.26,
   "yaw": -86.37,
   "hfov": 15.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_DA67D643_C765_39D6_41E7_BD2D534FD43E",
 "maps": [
  {
   "hfov": 15.05,
   "yaw": -86.37,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -39.26,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01, this.camera_2F1656DD_0108_FBB2_416A_949AC0E344F7); this.mainPlayList.set('selectedIndex', 40)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_1_HS_0_0.png",
      "width": 222,
      "height": 230,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.57,
   "yaw": -137.91
  }
 ],
 "id": "overlay_16FBB4AF_0109_3FEE_4160_1AEF26426FD1",
 "maps": [
  {
   "hfov": 13.33,
   "yaw": -137.91,
   "image": {
    "levels": [
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.57,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932, this.camera_2F06D6EC_0108_FB92_4174_1099E4EC950A); this.mainPlayList.set('selectedIndex', 34)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22B98C78_010B_6F72_416E_E7CCB2E81FB4",
   "pitch": -25.81,
   "yaw": -62.51,
   "hfov": 14.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E4FA5D36_C72C_CBBE_41DE_84376FB29EF5",
 "maps": [
  {
   "hfov": 14.32,
   "yaw": -62.51,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0_HS_0_0_0_map.gif",
      "width": 17,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -25.81,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD888F1A_C71C_C776_41E5_354715787DA9, this.camera_2C93D571_0108_F975_415F_104C5693AD3A); this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_1_HS_0_0.png",
      "width": 238,
      "height": 209,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.83,
   "yaw": 166.32
  }
 ],
 "id": "overlay_10AE33E1_0109_1995_416C_2A5286DB7CD2",
 "maps": [
  {
   "hfov": 14.28,
   "yaw": 166.32,
   "image": {
    "levels": [
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_1_HS_0_0_0_map.gif",
      "width": 18,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.83,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9, this.camera_2CC665B7_0108_F9FD_4155_2AF40E5FA95A); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D1FFD3DD_C77D_5EF2_41CE_89845FEA3E36",
   "pitch": -35.86,
   "yaw": -59.5,
   "hfov": 6.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D6C3F8D5_C723_4AF3_41E1_A8B34E8F3123",
 "maps": [
  {
   "hfov": 6.79,
   "yaw": -59.5,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0_HS_0_0_0_map.gif",
      "width": 17,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -35.86,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A, this.camera_2A70CADE_0108_EBAF_4174_19A3D49D6425); this.mainPlayList.set('selectedIndex', 46)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_1_HS_0_0.png",
      "width": 238,
      "height": 264,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 5.96,
   "yaw": 167.82
  }
 ],
 "id": "overlay_1D727724_011B_1A93_4171_CF3D20B290EA",
 "maps": [
  {
   "hfov": 14.26,
   "yaw": 167.82,
   "image": {
    "levels": [
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 17,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 5.96,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB, this.camera_2AF90A98_0108_EBB2_4162_6A86125E035C); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.62,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0_HS_0_0.png",
      "width": 147,
      "height": 164,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.64,
   "yaw": 21.77
  }
 ],
 "id": "overlay_D3646773_C765_47B6_41E0_73AF92AE0B87",
 "maps": [
  {
   "hfov": 10.62,
   "yaw": 21.77,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 17,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.64,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0, this.camera_2AEACAA0_0108_EB93_4142_53B161382260); this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D1F9D3E7_C77D_5EDE_41D3_15BE236E2A6A",
   "pitch": -47.8,
   "yaw": -148.42,
   "hfov": 13.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D246BEC5_C767_C6D3_417F_B7C47770AE7C",
 "maps": [
  {
   "hfov": 13.06,
   "yaw": -148.42,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -47.8,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00, this.camera_2A1CEAA9_0108_EB92_4146_6E8AD765F482); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0_HS_2_0.png",
      "width": 148,
      "height": 170,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.61,
   "yaw": 21.81
  }
 ],
 "id": "overlay_1191988F_0109_17AD_415A_8E74C0B72A72",
 "maps": [
  {
   "hfov": 10.46,
   "yaw": 21.81,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 18,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.61,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045, this.camera_2ED1D79F_0108_F9AD_4176_A422ED9FF3DE); this.mainPlayList.set('selectedIndex', 66)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_10A60E5E_0139_2AAF_4170_A488EF414D0A_1_HS_0_0.png",
      "width": 268,
      "height": 217,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.06,
   "yaw": 13.95
  }
 ],
 "id": "overlay_23D9F64F_010F_3AAD_414A_672ED5B21C48",
 "maps": [
  {
   "hfov": 16.09,
   "yaw": 13.95,
   "image": {
    "levels": [
     {
      "url": "media/panorama_10A60E5E_0139_2AAF_4170_A488EF414D0A_1_HS_0_0_0_map.gif",
      "width": 19,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.06,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545, this.camera_2BF8A9D4_0108_E9B3_415C_2E40B441215E); this.mainPlayList.set('selectedIndex', 60)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.07,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0_HS_0_0.png",
      "width": 201,
      "height": 213,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.69,
   "yaw": 28.27
  }
 ],
 "id": "overlay_EEDAB568_C725_FBD2_41DB_8D04CB4292A1",
 "maps": [
  {
   "hfov": 12.07,
   "yaw": 28.27,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.69,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42, this.camera_2B1C89EB_0108_E995_416B_048E614AAAE6); this.mainPlayList.set('selectedIndex', 57)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0_HS_1_0.png",
      "width": 151,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.56,
   "yaw": 128.26
  }
 ],
 "id": "overlay_EDFCD5B0_C724_DAB2_41D6_0E77907C4F3F",
 "maps": [
  {
   "hfov": 9.06,
   "yaw": 128.26,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.56,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC, this.camera_2B1769E3_0108_E996_4170_060594694980); this.mainPlayList.set('selectedIndex', 56)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01 Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22AF9C7C_010B_6F72_4170_B5D62730845C",
   "pitch": -0.19,
   "yaw": -20.22,
   "hfov": 7.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_EC51FEB1_C727_46B2_41B8_83F109FE0A5A",
 "maps": [
  {
   "hfov": 7.54,
   "yaw": -20.22,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.19,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD, this.camera_2B03F9F3_0108_E975_4148_2AE558C9F838); this.mainPlayList.set('selectedIndex', 54)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22AF6C7C_010B_6F72_413F_50CB26210EC0",
   "pitch": -27.17,
   "yaw": -167,
   "hfov": 10.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_ECD21C73_C725_C9B6_4192_D031F772D6EA",
 "maps": [
  {
   "hfov": 10.61,
   "yaw": -167,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0_HS_3_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.17,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_28495FE3_011F_2995_4161_1F0BD106F099, this.camera_2BE1C9DB_0108_E9B5_4164_90D446C0906D); this.mainPlayList.set('selectedIndex', 53)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.29,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0_HS_4_0.png",
      "width": 171,
      "height": 171,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.12,
   "yaw": 111.5
  }
 ],
 "id": "overlay_29EC2EC0_0108_EB92_415D_899C5F48D760",
 "maps": [
  {
   "hfov": 10.29,
   "yaw": 111.5,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0_HS_4_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.12,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 61)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.58,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_1_HS_0_0.png",
      "width": 276,
      "height": 226,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.21,
   "yaw": -62.92
  }
 ],
 "id": "overlay_214EEAE1_010B_EB95_416D_C987852A4510",
 "maps": [
  {
   "hfov": 16.58,
   "yaw": -62.92,
   "image": {
    "levels": [
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_1_HS_0_0_0_map.gif",
      "width": 19,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.21,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD, this.camera_2EA1F792_0108_F9B6_416C_F6E0EAB51F88); this.mainPlayList.set('selectedIndex', 49)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.83,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_1_HS_0_0.png",
      "width": 247,
      "height": 184,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.81,
   "yaw": 15.08
  }
 ],
 "id": "overlay_1CBAC74F_0119_3AAE_4169_5B722A4C2C71",
 "maps": [
  {
   "hfov": 14.83,
   "yaw": 15.08,
   "image": {
    "levels": [
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_1_HS_0_0_0_map.gif",
      "width": 21,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.81,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB, this.camera_2A4E8AD7_0108_EBBD_4172_E7A26D6CBCAD); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.21,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_1_HS_0_0.png",
      "width": 253,
      "height": 263,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.59,
   "yaw": -113.63
  }
 ],
 "id": "overlay_27E5C64F_0119_1AAD_4168_4CBEDDEFB1DF",
 "maps": [
  {
   "hfov": 15.21,
   "yaw": -113.63,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_1_HS_0_0_0_map.gif",
      "width": 15,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.59,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB, this.camera_2CA49598_0108_F9B3_4179_2D94F4D576B1); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.31,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_1_HS_0_0.png",
      "width": 227,
      "height": 220,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 5.93,
   "yaw": -161.25
  }
 ],
 "id": "overlay_E98B544E_E6F6_642D_41D5_639CA13A6B69",
 "maps": [
  {
   "hfov": 16.31,
   "yaw": -161.25,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 5.93,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A, this.camera_2D0A5524_0108_FE93_416C_796A08545104); this.mainPlayList.set('selectedIndex', 46)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22A3BC7A_010B_6F76_4152_7002231254E2",
   "pitch": -38.76,
   "yaw": -82.1,
   "hfov": 15.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E039B42F_C73C_D9AE_4179_6CED54A79A5C",
 "maps": [
  {
   "hfov": 15.16,
   "yaw": -82.1,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -38.76,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42, this.camera_2BB5C96D_0108_E96D_4161_BF111A0A1196); this.mainPlayList.set('selectedIndex', 57)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.07,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_1_HS_0_0.png",
      "width": 234,
      "height": 188,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.33,
   "yaw": -139.29
  }
 ],
 "id": "overlay_1F068397_0107_19BE_4171_71AB44B1EA6D",
 "maps": [
  {
   "hfov": 14.07,
   "yaw": -139.29,
   "image": {
    "levels": [
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_1_HS_0_0_0_map.gif",
      "width": 19,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.33,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942, this.camera_2D96AAEE_0108_EB6F_4156_9B70EB8EF147); this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D1F8D3E7_C77D_5EDE_41E7_872B52F6C2BA",
   "pitch": -33.47,
   "yaw": 68.51,
   "hfov": 10.14,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D10180AB_C763_D956_41E1_17A33D3BEE1E",
 "maps": [
  {
   "hfov": 10.14,
   "yaw": 68.51,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -33.47,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD479071_C71C_D9B2_41D0_92945B278722, this.camera_2C0A65FE_0108_F96F_416B_9A4B43D06D37); this.mainPlayList.set('selectedIndex', 52)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0_HS_0_0.png",
      "width": 151,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.16,
   "yaw": -0.72
  }
 ],
 "id": "overlay_EAECF1EB_C72D_FAD6_41A8_B49AEB304111",
 "maps": [
  {
   "hfov": 10.87,
   "yaw": -0.72,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.16,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060, this.camera_2C1A45F1_0108_F975_4143_6CF92882405A); this.mainPlayList.set('selectedIndex', 58)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22AB4C7E_010B_6F6E_4153_0A64B3D630F2",
   "pitch": -50.56,
   "yaw": 148.02,
   "hfov": 12.35,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E91CF77E_C72C_C7AE_41E6_ED92117BB9B5",
 "maps": [
  {
   "hfov": 12.35,
   "yaw": 148.02,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -50.56,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_10A96800_0139_3693_4154_C75F68C57800, this.camera_2C3C060C_0108_FA92_4121_1DCCB0184860); this.mainPlayList.set('selectedIndex', 59)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0_HS_2_0.png",
      "width": 141,
      "height": 219,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.33,
   "yaw": 11.01
  }
 ],
 "id": "overlay_1F99A29D_0107_1BAD_4168_5698F5922677",
 "maps": [
  {
   "hfov": 10.08,
   "yaw": 11.01,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 24,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.33,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD47441A_C71C_F976_41E5_56E16AD8E357, this.camera_2AD98A81_0108_EB92_413E_CAA41C36C37A); this.mainPlayList.set('selectedIndex', 37)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0_HS_0_0.png",
      "width": 220,
      "height": 206,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.92,
   "yaw": 154.28
  }
 ],
 "id": "overlay_E0AC7D99_C73D_CB72_41E2_CDE435C74BDD",
 "maps": [
  {
   "hfov": 15.86,
   "yaw": 154.28,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0_HS_0_0_0_map.gif",
      "width": 17,
      "height": 15,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.92,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD, this.camera_2AAC4A6F_0108_EB6D_4171_339D7163E665); this.mainPlayList.set('selectedIndex', 50)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22A0CC7B_010B_6F76_4146_3D8C62DD6E62",
   "pitch": -26.82,
   "yaw": -19.04,
   "hfov": 13.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_EFD00FA6_C73C_C75E_41E0_8DE91C303B0D",
 "maps": [
  {
   "hfov": 13.76,
   "yaw": -19.04,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -26.82,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_10AB2713_013B_1AB5_4162_9A65609A81B1, this.camera_2AD32A78_0108_EB73_4172_9E30363444B2); this.mainPlayList.set('selectedIndex', 51)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.98,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0_HS_2_0.png",
      "width": 225,
      "height": 86,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.33,
   "yaw": 134.36
  }
 ],
 "id": "overlay_1D17FF73_0118_E976_4154_F30BC84C0928",
 "maps": [
  {
   "hfov": 15.98,
   "yaw": 134.36,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0_HS_2_0_0_map.gif",
      "width": 41,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.33,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD479071_C71C_D9B2_41D0_92945B278722, this.camera_2D1B851D_0108_FEAD_4178_A08DD39C4DB1); this.mainPlayList.set('selectedIndex', 52)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.6,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_1_HS_0_0.png",
      "width": 276,
      "height": 299,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.63,
   "yaw": -112.94
  }
 ],
 "id": "overlay_28543281_0109_3B92_4172_B2B47CE181F9",
 "maps": [
  {
   "hfov": 16.6,
   "yaw": -112.94,
   "image": {
    "levels": [
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 17,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.63,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD479071_C71C_D9B2_41D0_92945B278722, this.camera_2AB0CA5F_0108_EAAD_4179_07CFC7C1AA3E); this.mainPlayList.set('selectedIndex', 52)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22AA4C7E_010B_6F6E_4141_B5F26DF91260",
   "pitch": -28.7,
   "yaw": -63.14,
   "hfov": 11.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_F418FFB4_C727_46B1_41E3_7157AAB75A6C",
 "maps": [
  {
   "hfov": 11.09,
   "yaw": -63.14,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_1_HS_0_0_0_map.gif",
      "width": 17,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -28.7,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "id": "AnimatedImageResource_22B1BC73_010B_6F75_4162_7D29F9DD45EF",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_D1F813E7_C77D_5EDE_41C5_D3614EBDB84C",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22B51C72_010B_6F77_4163_6CC541F5AABF",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0_HS_2_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22B2AC72_010B_6F77_4167_80207FC0516B",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0_HS_3_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22BF1C74_010B_6F73_416A_B09F42A3520B",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0_HS_1_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_27D71E90_0179_6BB3_416C_769EE541B80C",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0_HS_0_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_27D68E90_0179_6BB3_4167_2453BB10B29C",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0_HS_1_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_D1FF93DD_C77D_5EF2_41CB_8856CCC91593",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0_HS_2_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22B2FC72_010B_6F77_4167_F91D6BDE3D04",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_27CF2E93_0179_6BB5_416D_B92F274499B2",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0_HS_1_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_27CF5E93_0179_6BB5_4149_3ABE149C704F",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0_HS_2_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22BD9C76_010B_6F7E_414E_09E3204E2660",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0_HS_1_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22B02C73_010B_6F75_4168_F9B6711844B1",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0_HS_1_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22BEAC74_010B_6F73_4169_5866E05F9E82",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0_HS_1_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_D1FC53DD_C77D_5EF2_41E5_1CC973DDBEA3",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0_HS_2_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_D1FCA3DD_C77D_5EF2_41DD_9635E996FADF",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0_HS_3_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_D1FE93E7_C77D_5EDE_41BF_076B82AF6AC9",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22A42C79_010B_6F72_4149_88EC1ECE95A9",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22ACFC7D_010B_6F72_4143_20E894558272",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_2634AE9D_0179_6BB2_416B_0E619954B364",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0_HS_1_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_26340E9D_0179_6BB2_4157_57C208044E2E",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0_HS_2_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22A9AC7F_010B_6F6E_416B_2EA4E226EE03",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22BD4C77_010B_6F7E_416B_7A4B539AD3E0",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0_HS_2_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22BACC77_010B_6F7E_4138_DA669CFB4744",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0_HS_3_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22A1FC7B_010B_6F76_4168_B63BC17E5FDC",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_1_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22928C81_010B_6F92_414F_1D4E8A9E78E0",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_1_HS_1_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22A28C7A_010B_6F76_4171_1E7F3F42C069",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0_HS_1_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22BEDC74_010B_6F73_416E_DDABD29706F9",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_2297BC7F_010B_6F6E_416E_C01526863309",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_2293FC82_010B_6F96_4131_C14090FFAEE0",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_D1FEF3E7_C77D_5EDE_41D4_38C2D06ADC42",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0_HS_1_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22BD5C76_010B_6F7E_4166_469CD7719366",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22958C80_010B_6F92_4165_9E49EF8FB640",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0_HS_1_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22928C81_010B_6F92_4155_88CC3FCC3378",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_2639EE97_0179_6BBD_4149_51DCE6744A69",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0_HS_0_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_26391E97_0179_6BBD_413B_682F552976AC",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0_HS_1_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22BB4C77_010B_6F7E_415E_2918A1BF855A",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0_HS_2_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22A66C79_010B_6F72_416E_D5DC8CEB8DEC",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_2296DC7F_010B_6F6E_4161_AB4F02E2DFA0",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0_HS_1_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_D1FE33E7_C77D_5EDE_41D2_061D00B2B4AE",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0_HS_1_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22B97C78_010B_6F72_4168_A626EED7BAD0",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0_HS_1_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_D1F893E7_C77D_5EDE_41C5_65F129D18629",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0_HS_1_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_D1F953E7_C77D_5EDE_41B3_BBC8AE666EFB",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22A4AC79_010B_6F72_416E_51CCA57431BC",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0_HS_1_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22B34C73_010B_6F75_411F_82560BDF5A68",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0_HS_0_0.png",
   "width": 300,
   "height": 270,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22BCEC74_010B_6F73_4171_9BF28B8564F4",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22B98C78_010B_6F72_416E_E7CCB2E81FB4",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0_HS_0_0.png",
   "width": 300,
   "height": 270,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_D1FFD3DD_C77D_5EF2_41CE_89845FEA3E36",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0_HS_0_0.png",
   "width": 300,
   "height": 270,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_D1F9D3E7_C77D_5EDE_41D3_15BE236E2A6A",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0_HS_1_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22AF9C7C_010B_6F72_4170_B5D62730845C",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0_HS_2_0.png",
   "width": 300,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22AF6C7C_010B_6F72_413F_50CB26210EC0",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0_HS_3_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22A3BC7A_010B_6F76_4152_7002231254E2",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_D1F8D3E7_C77D_5EDE_41E7_872B52F6C2BA",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0_HS_0_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22AB4C7E_010B_6F6E_4153_0A64B3D630F2",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0_HS_1_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22A0CC7B_010B_6F76_4146_3D8C62DD6E62",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0_HS_1_0.png",
   "width": 1080,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "id": "AnimatedImageResource_22AA4C7E_010B_6F6E_4141_B5F26DF91260",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_1_HS_0_0.png",
   "width": 300,
   "height": 270,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
}],
 "minWidth": 20,
 "desktopMipmappingEnabled": false,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "mouseWheelEnabled": true,
 "gap": 10,
 "vrPolyfillScale": 0.5,
 "horizontalAlign": "left",
 "data": {
  "name": "Player486"
 },
 "shadow": false
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
