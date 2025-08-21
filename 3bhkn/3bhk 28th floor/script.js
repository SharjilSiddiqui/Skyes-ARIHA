(function(){
    var script = {
 "scrollBarOpacity": 0.5,
 "defaultVRPointer": "laser",
 "paddingTop": 0,
 "id": "rootPlayer",
 "backgroundPreloadEnabled": true,
 "children": [
  "this.MainViewer"
 ],
 "start": "this.init()",
 "mouseWheelEnabled": true,
 "contentOpaque": false,
 "scripts": {
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "registerKey": function(key, value){  window[key] = value; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "existsKey": function(key){  return key in window; },
  "getKey": function(key){  return window[key]; },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "unregisterKey": function(key){  delete window[key]; },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } }
 },
 "downloadEnabled": false,
 "scrollBarMargin": 2,
 "minHeight": 20,
 "width": "100%",
 "paddingBottom": 0,
 "layout": "absolute",
 "verticalAlign": "top",
 "minWidth": 20,
 "borderSize": 0,
 "borderRadius": 0,
 "overflow": "visible",
 "scrollBarWidth": 10,
 "propagateClick": false,
 "paddingRight": 0,
 "paddingLeft": 0,
 "definitions": [{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_B77A00A7_B861_4D70_41E5_02B0A10E1F6F",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 54.02,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_B72FA103_B861_4F30_41E0_D1E3B9658101",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -52.83,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_A62CDD10_AD4E_75D1_41D8_DCF3CE619A06_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -144.14,
  "pitch": -0.27
 }
},
{
 "vfov": 180,
 "label": "3bhk_bedroom01_90",
 "id": "panorama_A62B26AA_AD4D_B4F0_41E2_08BC7C746B92",
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_A62B26AA_AD4D_B4F0_41E2_08BC7C746B92_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A62B26AA_AD4D_B4F0_41E2_08BC7C746B92_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A62B26AA_AD4D_B4F0_41E2_08BC7C746B92_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_A62B26AA_AD4D_B4F0_41E2_08BC7C746B92_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A62B26AA_AD4D_B4F0_41E2_08BC7C746B92_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A62B26AA_AD4D_B4F0_41E2_08BC7C746B92_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A62B26AA_AD4D_B4F0_41E2_08BC7C746B92_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A62B26AA_AD4D_B4F0_41E2_08BC7C746B92_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A62B26AA_AD4D_B4F0_41E2_08BC7C746B92_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A62B26AA_AD4D_B4F0_41E2_08BC7C746B92_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A62B26AA_AD4D_B4F0_41E2_08BC7C746B92_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A62B26AA_AD4D_B4F0_41E2_08BC7C746B92_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A62B26AA_AD4D_B4F0_41E2_08BC7C746B92_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A62B26AA_AD4D_B4F0_41E2_08BC7C746B92_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A62B26AA_AD4D_B4F0_41E2_08BC7C746B92_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A62B26AA_AD4D_B4F0_41E2_08BC7C746B92_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A62B26AA_AD4D_B4F0_41E2_08BC7C746B92_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A62B26AA_AD4D_B4F0_41E2_08BC7C746B92_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A62B26AA_AD4D_B4F0_41E2_08BC7C746B92_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "hfovMax": 130,
 "pitch": 0,
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -56.6,
   "backwardYaw": 30.28,
   "distance": 1,
   "panorama": "this.panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9"
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_BDCF43E1_AD45_EC73_41CD_0D7923523ACC"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_A62B26AA_AD4D_B4F0_41E2_08BC7C746B92_t.jpg"
},
{
 "vfov": 180,
 "label": "3bhkbedroom02_90",
 "id": "panorama_A64E0C40_AD4A_DBB0_41B6_10CBEB47E698",
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_A64E0C40_AD4A_DBB0_41B6_10CBEB47E698_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A64E0C40_AD4A_DBB0_41B6_10CBEB47E698_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A64E0C40_AD4A_DBB0_41B6_10CBEB47E698_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_A64E0C40_AD4A_DBB0_41B6_10CBEB47E698_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A64E0C40_AD4A_DBB0_41B6_10CBEB47E698_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A64E0C40_AD4A_DBB0_41B6_10CBEB47E698_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A64E0C40_AD4A_DBB0_41B6_10CBEB47E698_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A64E0C40_AD4A_DBB0_41B6_10CBEB47E698_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A64E0C40_AD4A_DBB0_41B6_10CBEB47E698_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A64E0C40_AD4A_DBB0_41B6_10CBEB47E698_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A64E0C40_AD4A_DBB0_41B6_10CBEB47E698_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A64E0C40_AD4A_DBB0_41B6_10CBEB47E698_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A64E0C40_AD4A_DBB0_41B6_10CBEB47E698_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A64E0C40_AD4A_DBB0_41B6_10CBEB47E698_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A64E0C40_AD4A_DBB0_41B6_10CBEB47E698_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A64E0C40_AD4A_DBB0_41B6_10CBEB47E698_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A64E0C40_AD4A_DBB0_41B6_10CBEB47E698_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A64E0C40_AD4A_DBB0_41B6_10CBEB47E698_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A64E0C40_AD4A_DBB0_41B6_10CBEB47E698_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "hfovMax": 130,
 "pitch": 0,
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 75.16,
   "backwardYaw": -20.05,
   "distance": 1,
   "panorama": "this.panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988"
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_BDA8900B_AD4A_EBB7_41CB_9F15257F3665"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_A64E0C40_AD4A_DBB0_41B6_10CBEB47E698_t.jpg"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_B6934070_B861_4DD0_41E0_BEA120DD9752",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 177.41,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_B75BF0DF_B861_4ED0_41CD_89FE117D3625",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -148.55,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_B7693081_B861_4D30_41D5_0908E17B31E4",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 97.39,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_B7327129_B861_4F70_41B4_3A8289B2A0E3",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -28.23,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "3bhk_360 Passage_90M_28th_floor",
 "id": "panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC",
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "hfovMax": 130,
 "pitch": 0,
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 33.95,
   "backwardYaw": 151.77,
   "distance": 1,
   "panorama": "this.panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -2.59,
   "backwardYaw": 5.45,
   "distance": 1,
   "panorama": "this.panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -82.61,
   "backwardYaw": 5.32,
   "distance": 1,
   "panorama": "this.panorama_A62CDD10_AD4E_75D1_41D8_DCF3CE619A06"
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_A20EA9DA_AD4B_DC50_41AC_03F85F3A107A",
  "this.overlay_A2331AF3_AD4A_FC50_41D7_B0C83D42C2EE",
  "this.overlay_A22147A6_AD4A_74F0_41CF_A9092679BA14"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC_t.jpg"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_B706214F_B861_4F30_41D2_B5B1CC7AF0F0",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -174.68,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_B75280F2_B861_4ED0_41D9_8D78EAB343D8",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 32.82,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "3bhkbedroom02_2 _90",
 "id": "panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988",
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "hfovMax": 130,
 "pitch": 0,
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -147.18,
   "backwardYaw": 135.03,
   "distance": 1,
   "panorama": "this.panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -20.05,
   "backwardYaw": 75.16,
   "distance": 1,
   "panorama": "this.panorama_A64E0C40_AD4A_DBB0_41B6_10CBEB47E698"
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_BDE04244_AD46_AFB0_41D4_89A26588A30F",
  "this.overlay_BDD7DAD2_AD45_DC50_41AC_E781C681BA0A"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988_t.jpg"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_A96D4FEB_B861_52F1_41D5_64A4CBF8F5E9",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -146.05,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_A64DBA71_AD4A_5C50_41C9_DA9E1CB9FE1D_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_B7396116_B861_4F50_41DD_BFF52A0CF207",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 21.15,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "3bhk_360_90_28th floor",
 "id": "panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228",
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "hfovMax": 130,
 "pitch": 0,
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 135.03,
   "backwardYaw": -147.18,
   "distance": 1,
   "panorama": "this.panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 147.65,
   "backwardYaw": 127.17,
   "distance": 1,
   "panorama": "this.panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -125.98,
   "backwardYaw": -158.85,
   "distance": 1,
   "panorama": "this.panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9"
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_A3CB0D93_AD4A_F4D0_4199_3714C92D51C8",
  "this.overlay_A3EFD3C1_AD4E_6CB3_41C8_DE65ADEE2128",
  "this.overlay_A2AFEB79_AD4A_7C53_41C4_8EA05CBA107F"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228_t.jpg"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 171.33,
  "pitch": 2.26
 }
},
{
 "class": "PanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "displayPlaybackBar": true,
 "viewerArea": "this.MainViewer",
 "id": "MainViewerPanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "gyroscopeEnabled": true,
 "mouseControlMode": "drag_rotation"
},
{
 "vfov": 180,
 "label": "3bhk_360_90_2_28th floor",
 "id": "panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD",
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "hfovMax": 130,
 "pitch": 0,
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 127.17,
   "backwardYaw": 147.65,
   "distance": 1,
   "panorama": "this.panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 5.45,
   "backwardYaw": -2.59,
   "distance": 1,
   "panorama": "this.panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC"
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_A0ACA4D7_AD4A_D450_4183_D7F486465867",
  "this.overlay_A378C1EC_AD4B_AC70_41E2_8C41581D0986"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD_t.jpg"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_B7132163_B861_4FF0_41E0_BC7DB8AC7DA2",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -44.97,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_A62B26AA_AD4D_B4F0_41E2_08BC7C746B92_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "kitchen copy",
 "id": "panorama_A62CDD10_AD4E_75D1_41D8_DCF3CE619A06",
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_A62CDD10_AD4E_75D1_41D8_DCF3CE619A06_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A62CDD10_AD4E_75D1_41D8_DCF3CE619A06_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A62CDD10_AD4E_75D1_41D8_DCF3CE619A06_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_A62CDD10_AD4E_75D1_41D8_DCF3CE619A06_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A62CDD10_AD4E_75D1_41D8_DCF3CE619A06_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A62CDD10_AD4E_75D1_41D8_DCF3CE619A06_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A62CDD10_AD4E_75D1_41D8_DCF3CE619A06_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A62CDD10_AD4E_75D1_41D8_DCF3CE619A06_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A62CDD10_AD4E_75D1_41D8_DCF3CE619A06_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A62CDD10_AD4E_75D1_41D8_DCF3CE619A06_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A62CDD10_AD4E_75D1_41D8_DCF3CE619A06_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A62CDD10_AD4E_75D1_41D8_DCF3CE619A06_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A62CDD10_AD4E_75D1_41D8_DCF3CE619A06_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A62CDD10_AD4E_75D1_41D8_DCF3CE619A06_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A62CDD10_AD4E_75D1_41D8_DCF3CE619A06_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A62CDD10_AD4E_75D1_41D8_DCF3CE619A06_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A62CDD10_AD4E_75D1_41D8_DCF3CE619A06_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A62CDD10_AD4E_75D1_41D8_DCF3CE619A06_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A62CDD10_AD4E_75D1_41D8_DCF3CE619A06_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "hfovMax": 130,
 "pitch": 0,
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 5.32,
   "backwardYaw": -82.61,
   "distance": 1,
   "panorama": "this.panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC"
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_BD3E3756_AD46_F451_41E0_83A45B0AF613"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_A62CDD10_AD4E_75D1_41D8_DCF3CE619A06_t.jpg"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_B77730BA_B861_4D53_41E1_EB08FF113F40",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 123.4,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_A9679FFD_B861_52D0_41D8_7E432B9DBF24",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 134.83,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "3bhk_bedroom03_01_90",
 "id": "panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B",
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "hfovMax": 130,
 "pitch": 0,
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 151.77,
   "backwardYaw": 33.95,
   "distance": 1,
   "panorama": "this.panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 31.45,
   "backwardYaw": -45.17,
   "distance": 1,
   "panorama": "this.panorama_A64DBA71_AD4A_5C50_41C9_DA9E1CB9FE1D"
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_BD99008B_AD4B_ECB0_41C5_B8528D450D73",
  "this.overlay_BC21BC60_AD4A_F470_41CE_3693762ABADA"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B_t.jpg"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_A64E0C40_AD4A_DBB0_41B6_10CBEB47E698_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "3bhk_bedroom02_90",
 "id": "panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9",
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "hfovMax": 130,
 "pitch": 0,
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -158.85,
   "backwardYaw": -125.98,
   "distance": 1,
   "panorama": "this.panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 30.28,
   "backwardYaw": -56.6,
   "distance": 1,
   "panorama": "this.panorama_A62B26AA_AD4D_B4F0_41E2_08BC7C746B92"
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_B5FA8089_B862_CD30_41E2_07A215B0E136",
  "this.overlay_B622D803_B861_3D30_41E4_70F82F5C3AA6"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9_t.jpg"
},
{
 "vfov": 180,
 "label": "3bhk_bedroom03_02 _90",
 "id": "panorama_A64DBA71_AD4A_5C50_41C9_DA9E1CB9FE1D",
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_A64DBA71_AD4A_5C50_41C9_DA9E1CB9FE1D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A64DBA71_AD4A_5C50_41C9_DA9E1CB9FE1D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A64DBA71_AD4A_5C50_41C9_DA9E1CB9FE1D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_A64DBA71_AD4A_5C50_41C9_DA9E1CB9FE1D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A64DBA71_AD4A_5C50_41C9_DA9E1CB9FE1D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A64DBA71_AD4A_5C50_41C9_DA9E1CB9FE1D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A64DBA71_AD4A_5C50_41C9_DA9E1CB9FE1D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A64DBA71_AD4A_5C50_41C9_DA9E1CB9FE1D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A64DBA71_AD4A_5C50_41C9_DA9E1CB9FE1D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A64DBA71_AD4A_5C50_41C9_DA9E1CB9FE1D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A64DBA71_AD4A_5C50_41C9_DA9E1CB9FE1D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A64DBA71_AD4A_5C50_41C9_DA9E1CB9FE1D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A64DBA71_AD4A_5C50_41C9_DA9E1CB9FE1D_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A64DBA71_AD4A_5C50_41C9_DA9E1CB9FE1D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A64DBA71_AD4A_5C50_41C9_DA9E1CB9FE1D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A64DBA71_AD4A_5C50_41C9_DA9E1CB9FE1D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A64DBA71_AD4A_5C50_41C9_DA9E1CB9FE1D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_A64DBA71_AD4A_5C50_41C9_DA9E1CB9FE1D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_A64DBA71_AD4A_5C50_41C9_DA9E1CB9FE1D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "hfovMax": 130,
 "pitch": 0,
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -45.17,
   "backwardYaw": 31.45,
   "distance": 1,
   "panorama": "this.panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B"
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_BC2BA285_AD4D_ACB0_41DC_20986B8A15F3"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_A64DBA71_AD4A_5C50_41C9_DA9E1CB9FE1D_t.jpg"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "media": "this.panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "media": "this.panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "media": "this.panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "media": "this.panorama_A62CDD10_AD4E_75D1_41D8_DCF3CE619A06",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_A62CDD10_AD4E_75D1_41D8_DCF3CE619A06_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "media": "this.panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "media": "this.panorama_A62B26AA_AD4D_B4F0_41E2_08BC7C746B92",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_A62B26AA_AD4D_B4F0_41E2_08BC7C746B92_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "media": "this.panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "media": "this.panorama_A64E0C40_AD4A_DBB0_41B6_10CBEB47E698",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_A64E0C40_AD4A_DBB0_41B6_10CBEB47E698_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "media": "this.panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "end": "this.trigger('tourEnded')",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 0)",
   "media": "this.panorama_A64DBA71_AD4A_5C50_41C9_DA9E1CB9FE1D",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_A64DBA71_AD4A_5C50_41C9_DA9E1CB9FE1D_camera"
  }
 ],
 "id": "mainPlayList"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_B70CA13C_B861_4F57_41E4_A72AD4E0A57C",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -174.55,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_B761B095_B861_4D50_41E1_28430AE4621B",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -149.72,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_B69C905B_B861_4DD0_41D7_E0A816CEA62F",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -32.35,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_B74EE0CD_B861_4D30_41D9_0F0568FC0F8C",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 159.95,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_B7EDC176_B861_4FD0_41E2_1B9438094DAD",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -104.84,
  "pitch": 0
 }
},
{
 "playbackBarOpacity": 1,
 "progressBackgroundOpacity": 1,
 "id": "MainViewer",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "vrPointerColor": "#FFFFFF",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "progressBarOpacity": 1,
 "width": "100%",
 "progressBorderSize": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "minHeight": 50,
 "toolTipPaddingTop": 4,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipBorderSize": 1,
 "paddingBottom": 0,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBorderRadius": 0,
 "toolTipPaddingLeft": 6,
 "toolTipPaddingRight": 6,
 "minWidth": 100,
 "toolTipDisplayTime": 600,
 "playbackBarHeadShadowBlurRadius": 3,
 "borderSize": 0,
 "borderRadius": 0,
 "transitionMode": "blending",
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipBorderRadius": 3,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "paddingRight": 0,
 "displayTooltipInTouchScreens": true,
 "progressBarBorderColor": "#000000",
 "height": "100%",
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 5,
 "playbackBarHeadOpacity": 1,
 "shadow": false,
 "toolTipShadowSpread": 0,
 "class": "ViewerArea",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
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
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "transitionDuration": 500,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "paddingLeft": 0,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "data": {
  "name": "Main Viewer"
 },
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_BDCF43E1_AD45_EC73_41CD_0D7923523ACC",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_A62B26AA_AD4D_B4F0_41E2_08BC7C746B92_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -56.6,
   "hfov": 11.57,
   "pitch": -28.45
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_B4C76E55_B82A_D0D5_41D3_D0C0E997F99B",
   "pitch": -28.45,
   "yaw": -56.6,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.57,
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9, this.camera_B761B095_B861_4D50_41E1_28430AE4621B); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_BDA8900B_AD4A_EBB7_41CB_9F15257F3665",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_A64E0C40_AD4A_DBB0_41B6_10CBEB47E698_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 75.16,
   "hfov": 13.6,
   "pitch": -45.61
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_B4C48E56_B82A_D0D4_41E1_E8D6CDB2737D",
   "pitch": -45.61,
   "yaw": 75.16,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.6,
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988, this.camera_B74EE0CD_B861_4D30_41D9_0F0568FC0F8C); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_A20EA9DA_AD4B_DC50_41AC_03F85F3A107A",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -2.59,
   "hfov": 12.05,
   "pitch": -23.68
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_B4C79E52_B82A_D02F_41E3_D8A77434595E",
   "pitch": -23.68,
   "yaw": -2.59,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 12.05,
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD, this.camera_B70CA13C_B861_4F57_41E4_A72AD4E0A57C); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_A2331AF3_AD4A_FC50_41D7_B0C83D42C2EE",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -82.61,
   "hfov": 5.77,
   "pitch": -46.41
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_B4C7FE52_B82A_D02F_41CA_0C7F791B6292",
   "pitch": -46.41,
   "yaw": -82.61,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.77,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A62CDD10_AD4E_75D1_41D8_DCF3CE619A06, this.camera_B706214F_B861_4F30_41D2_B5B1CC7AF0F0); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_A22147A6_AD4A_74F0_41CF_A9092679BA14",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 33.95,
   "hfov": 10.87,
   "pitch": -0.35
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.87,
   "distance": 50,
   "pitch": -0.35,
   "yaw": 33.95,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC_1_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 151,
      "height": 151
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B, this.camera_B7327129_B861_4F70_41B4_3A8289B2A0E3); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_BDE04244_AD46_AFB0_41D4_89A26588A30F",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 15
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -147.18,
   "hfov": 14.89,
   "pitch": 0.95
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.89,
   "distance": 50,
   "pitch": 0.95,
   "yaw": -147.18,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 206,
      "height": 196
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228, this.camera_B7132163_B861_4FF0_41E0_BC7DB8AC7DA2); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_BDD7DAD2_AD45_DC50_41AC_E781C681BA0A",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -20.05,
   "hfov": 9.91,
   "pitch": -29.66
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_B4C4AE55_B82A_D0D5_41D6_5D875A99DE1A",
   "pitch": -29.66,
   "yaw": -20.05,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.91,
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A64E0C40_AD4A_DBB0_41B6_10CBEB47E698, this.camera_B7EDC176_B861_4FD0_41E2_1B9438094DAD); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_A3CB0D93_AD4A_F4D0_4199_3714C92D51C8",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 147.65,
   "hfov": 12.73,
   "pitch": -29.94
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_B4C67E50_B82A_D02B_41DE_9FA2BA7A32CC",
   "pitch": -29.94,
   "yaw": 147.65,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 12.73,
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD, this.camera_B72FA103_B861_4F30_41E0_D1E3B9658101); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_A3EFD3C1_AD4E_6CB3_41C8_DE65ADEE2128",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -125.98,
   "hfov": 8.06,
   "pitch": -0.07
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.06,
   "distance": 50,
   "pitch": -0.07,
   "yaw": -125.98,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228_1_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 134,
      "height": 130
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9, this.camera_B7396116_B861_4F50_41DD_BFF52A0CF207); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_A2AFEB79_AD4A_7C53_41C4_8EA05CBA107F",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 135.03,
   "hfov": 7.52,
   "pitch": 3.33
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_B4C64E51_B82A_D02D_41E5_C5F6B0512DF0",
   "pitch": 3.33,
   "yaw": 135.03,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.52,
   "distance": 50
  }
 ],
 "data": {
  "label": "Arrow 01 Left"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988, this.camera_B75280F2_B861_4ED0_41D9_8D78EAB343D8); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_A0ACA4D7_AD4A_D450_4183_D7F486465867",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 127.17,
   "hfov": 16.36,
   "pitch": -32.72
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_B4C1CE49_B82A_D03C_41A1_C48155252DBE",
   "pitch": -32.72,
   "yaw": 127.17,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.36,
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228, this.camera_B69C905B_B861_4DD0_41D7_E0A816CEA62F); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_A378C1EC_AD4B_AC70_41E2_8C41581D0986",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 5.45,
   "hfov": 13.35,
   "pitch": -19.53
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_B4C61E4E_B82A_D034_41D7_76E37504BC5E",
   "pitch": -19.53,
   "yaw": 5.45,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.35,
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC, this.camera_B6934070_B861_4DD0_41E0_BEA120DD9752); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_BD3E3756_AD46_F451_41E0_83A45B0AF613",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_A62CDD10_AD4E_75D1_41D8_DCF3CE619A06_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 5.32,
   "hfov": 7.42,
   "pitch": -27.57
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_B4C73E53_B82A_D02D_41DB_B728CCDC74FE",
   "pitch": -27.57,
   "yaw": 5.32,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.42,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC, this.camera_B7693081_B861_4D30_41D5_0908E17B31E4); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_BD99008B_AD4B_ECB0_41C5_B8528D450D73",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 151.77,
   "hfov": 10.84,
   "pitch": 4.68
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.84,
   "distance": 50,
   "pitch": 4.68,
   "yaw": 151.77,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 151,
      "height": 151
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC, this.camera_A96D4FEB_B861_52F1_41D5_64A4CBF8F5E9); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_BC21BC60_AD4A_F470_41CE_3693762ABADA",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 31.45,
   "hfov": 12.23,
   "pitch": -28.45
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_B4C4CE57_B82A_D0D4_41E6_560D3C9210D4",
   "pitch": -28.45,
   "yaw": 31.45,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 12.23,
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A64DBA71_AD4A_5C50_41C9_DA9E1CB9FE1D, this.camera_A9679FFD_B861_52D0_41D8_7E432B9DBF24); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_B5FA8089_B862_CD30_41E2_07A215B0E136",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 30.28,
   "hfov": 11.46,
   "pitch": -37.78
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_B6A53018_B86E_CD50_41E0_AAE932970C37",
   "pitch": -37.78,
   "yaw": 30.28,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.46,
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A62B26AA_AD4D_B4F0_41E2_08BC7C746B92, this.camera_B77730BA_B861_4D53_41E1_EB08FF113F40); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_B622D803_B861_3D30_41E4_70F82F5C3AA6",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -158.85,
   "hfov": 10.85,
   "pitch": 3.78
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.85,
   "distance": 50,
   "pitch": 3.78,
   "yaw": -158.85,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9_1_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 150,
      "height": 150
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228, this.camera_B77A00A7_B861_4D70_41E5_02B0A10E1F6F); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_BC2BA285_AD4D_ACB0_41DC_20986B8A15F3",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_A64DBA71_AD4A_5C50_41C9_DA9E1CB9FE1D_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -45.17,
   "hfov": 9.85,
   "pitch": -30.21
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_B4C42E57_B82A_D0D4_41E0_386E4BDE85BC",
   "pitch": -30.21,
   "yaw": -45.17,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.85,
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B, this.camera_B75BF0DF_B861_4ED0_41CD_89FE117D3625); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_A62B26AA_AD4D_B4F0_41E2_08BC7C746B92_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_B4C76E55_B82A_D0D5_41D3_D0C0E997F99B",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_A64E0C40_AD4A_DBB0_41B6_10CBEB47E698_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_B4C48E56_B82A_D0D4_41E1_E8D6CDB2737D",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_B4C79E52_B82A_D02F_41E3_D8A77434595E",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_A6AF935C_AD4E_EC50_41E2_16242E4399EC_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "frameCount": 9,
 "id": "AnimatedImageResource_B4C7FE52_B82A_D02F_41CA_0C7F791B6292",
 "colCount": 3
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_A65B7605_AD4A_D7B0_41DF_8EA2779FA988_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_B4C4AE55_B82A_D0D5_41D6_5D875A99DE1A",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_B4C67E50_B82A_D02B_41DE_9FA2BA7A32CC",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_A6D28DBE_AD46_54D0_41D8_297B6B981228_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "frameCount": 9,
 "id": "AnimatedImageResource_B4C64E51_B82A_D02D_41E5_C5F6B0512DF0",
 "colCount": 3
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_B4C1CE49_B82A_D03C_41A1_C48155252DBE",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_A6864CF5_AD46_F450_41B9_4CFA698FF9AD_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_B4C61E4E_B82A_D034_41D7_76E37504BC5E",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_A62CDD10_AD4E_75D1_41D8_DCF3CE619A06_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "frameCount": 9,
 "id": "AnimatedImageResource_B4C73E53_B82A_D02D_41DB_B728CCDC74FE",
 "colCount": 3
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_A6C325E4_AD4A_5470_41A2_14D67F8DCE1B_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_B4C4CE57_B82A_D0D4_41E6_560D3C9210D4",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_B4D39FEB_B862_D2F0_41E4_09B5153E38F9_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_B6A53018_B86E_CD50_41E0_AAE932970C37",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_A64DBA71_AD4A_5C50_41C9_DA9E1CB9FE1D_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "frameCount": 20,
 "id": "AnimatedImageResource_B4C42E57_B82A_D0D4_41E0_386E4BDE85BC",
 "colCount": 4
}],
 "class": "Player",
 "desktopMipmappingEnabled": false,
 "horizontalAlign": "left",
 "shadow": false,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "Player485"
 },
 "mobileMipmappingEnabled": false,
 "height": "100%",
 "vrPolyfillScale": 0.5,
 "gap": 10
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
