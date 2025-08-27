(function(){
    var script = {
 "backgroundPreloadEnabled": true,
 "paddingTop": 0,
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "vrPolyfillScale": 0.5,
 "children": [
  "this.MainViewer"
 ],
 "data": {
  "name": "Player486"
 },
 "defaultVRPointer": "laser",
 "scrollBarMargin": 2,
 "scripts": {
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "existsKey": function(key){  return key in window; },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "getKey": function(key){  return window[key]; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "registerKey": function(key, value){  window[key] = value; },
  "unregisterKey": function(key){  delete window[key]; },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } }
 },
 "downloadEnabled": false,
 "contentOpaque": false,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "borderRadius": 0,
 "minHeight": 20,
 "verticalAlign": "top",
 "propagateClick": false,
 "scrollBarWidth": 10,
 "height": "100%",
 "start": "this.init()",
 "class": "Player",
 "definitions": [{
 "label": "4BHK BEDROOM 04 1 33rd",
 "id": "panorama_EBE3DC98_C723_4972_41E0_39A7A1000045",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_F4E4001F_C725_596E_41E0_DD5EA526DD91",
  "this.overlay_F3F318C8_C723_4AD2_41E2_333E3532C07C"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -18.67,
   "panorama": "this.panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05",
   "backwardYaw": 70.89,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 152.65,
   "panorama": "this.panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD",
   "backwardYaw": 77.5,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -31.98,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_E857C199_E76D_1736_41DF_98D9B7AA7B5F"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -87.17,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_E9E15138_E76D_1776_4173_84A84F963679"
},
{
 "label": "4bhk_bolcony_33",
 "id": "panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_F4A93A03_E6FE_6C1A_41B1_F38C9DDC27C0"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -169.16,
   "panorama": "this.panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD",
   "backwardYaw": -2.38,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -26.34,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EB11323F_E76D_156A_41CB_ECD0E20858A0"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 121.63,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EBA0C00A_E76D_152A_41E5_84D443138E19"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -158.23,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_E9D2015C_E76D_172E_41E6_B76087842A5A"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -51.74,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EB5DDF94_E76C_EB3F_41D5_AABC4407AFDF"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 21.14,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EBE9C247_E76D_1519_41DC_6108452583FD"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 159.78,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_E81991B7_E76D_177A_41E6_55686D575630"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -171.58,
  "pitch": 1.51
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 160.96,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EB291FA6_E76C_EB1A_41EB_0876116F7693"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -25.97,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_E9B4616B_E76D_17EA_4198_0BF8C1867391"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 37.97,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EAF6707E_E76D_15EA_41D2_F7142A7B14E2"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -85.92,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EA9CF0AE_E76D_156A_41DE_352808C2943F"
},
{
 "label": "4BHK BEDROOM 03 1 23rd",
 "id": "panorama_CD894C2A_C71C_C951_4172_7357AF61EE99",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_DA67D643_C765_39D6_41E7_BD2D534FD43E"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "label": "4bhk living 02 17th",
 "id": "panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB",
 "class": "Panorama",
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
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 92.83,
   "panorama": "this.panorama_CD888F1A_C71C_C776_41E5_354715787DA9",
   "backwardYaw": 21.77,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -126.3,
   "panorama": "this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9",
   "backwardYaw": -169.89,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 77.75,
   "panorama": "this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942",
   "backwardYaw": 154.03,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -1.12,
   "panorama": "this.panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A",
   "backwardYaw": -161.25,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -168.57,
  "pitch": -1
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_camera"
},
{
 "label": "4bhk living 01 28th",
 "id": "panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E77541FB_C727_7AB6_41E2_71A4F3A251EC",
  "this.overlay_E66DCEAD_C727_4953_41E4_4338D4DA1A80",
  "this.overlay_E57D9766_C725_47DE_41E4_4EAD320D7E97",
  "this.overlay_E6FF7EBA_C723_46B1_41E8_B0C4C865F516"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -20.22,
   "panorama": "this.panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A",
   "backwardYaw": -62.51,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 128.01,
   "panorama": "this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01",
   "backwardYaw": 1.29,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -166.12,
   "panorama": "this.panorama_CD47441A_C71C_F976_41E5_56E16AD8E357",
   "backwardYaw": -119.02,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 30.28,
   "panorama": "this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558",
   "backwardYaw": -142.03,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -149.72,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_E910D12B_E76D_176A_41DC_1425F9DB3A3B"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 120.5,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EB0D6221_E76D_1516_41E6_2FE87ABAAAF7"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -111.62,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EA8CC0A6_E76D_151A_41E4_AFE1330FE0A1"
},
{
 "label": "4bhk living 02 23rd",
 "id": "panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86",
 "class": "Panorama",
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
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 93.83,
   "panorama": "this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0",
   "backwardYaw": 21.64,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 77.5,
   "panorama": "this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC",
   "backwardYaw": 153.66,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -1.12,
   "panorama": "this.panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43",
   "backwardYaw": -158.86,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 159.24,
  "pitch": -2.18
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_camera"
},
{
 "label": "4bhk kitchen",
 "id": "panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_F418FFB4_C727_46B1_41E3_7157AAB75A6C"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -63.14,
   "panorama": "this.panorama_CD479071_C71C_D9B2_41D0_92945B278722",
   "backwardYaw": -20.22,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 166.56,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 31.58,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EBAD4002_E76D_151A_41DA_799FFB5C60A0"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -111.12,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EA7A7033_E76D_1579_41E4_E3789EB43ECC"
},
{
 "label": "4bhk living 01 33rd",
 "id": "panorama_CD479071_C71C_D9B2_41D0_92945B278722",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_EEDAB568_C725_FBD2_41DB_8D04CB4292A1",
  "this.overlay_EDFCD5B0_C724_DAB2_41D6_0E77907C4F3F",
  "this.overlay_EC51FEB1_C727_46B2_41B8_83F109FE0A5A",
  "this.overlay_ECD21C73_C725_C9B6_4192_D031F772D6EA"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 28.27,
   "panorama": "this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545",
   "backwardYaw": -143.41,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -20.22,
   "panorama": "this.panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC",
   "backwardYaw": -63.14,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 128.26,
   "panorama": "this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42",
   "backwardYaw": -0.72,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -167,
   "panorama": "this.panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD",
   "backwardYaw": -121.4,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 159.02,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EA20F054_E76D_153E_41C9_16A09777920D"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -124.18,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EAC7F086_E76D_151A_41EB_C54CA19F7DDA"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.88,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_E90FE110_E76D_1736_41D6_F2D708AE4711"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.63,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_E8751189_E76D_1729_41DB_531D3C8E5033"
},
{
 "label": "4BHK BEDROOM 04 2 33rd",
 "id": "panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_F4767B1F_C727_4F6F_41DB_8ED192ED33D1"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 70.89,
   "panorama": "this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045",
   "backwardYaw": -18.67,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 158.44,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_E83701A8_E76D_1716_41EA_C039E61C99A2"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 152.65,
  "pitch": -7.4
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_camera"
},
{
 "label": "4bhk living 02 33rd",
 "id": "panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD",
 "class": "Panorama",
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
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 94.33,
   "panorama": "this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506",
   "backwardYaw": 21.64,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 77.5,
   "panorama": "this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045",
   "backwardYaw": 152.65,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -2.38,
   "panorama": "this.panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7",
   "backwardYaw": -169.16,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -121.4,
   "panorama": "this.panorama_CD479071_C71C_D9B2_41D0_92945B278722",
   "backwardYaw": -167,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_camera"
},
{
 "label": "4BHK BEDROOM 03 1 28th",
 "id": "panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E039B42F_C73C_D9AE_4179_6CED54A79A5C"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -82.1,
   "panorama": "this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A",
   "backwardYaw": -148.17,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 161.33,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_E828B1A1_E76D_1716_41DB_C6BB337DFC72"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_camera"
},
{
 "hfov": 360,
 "vfov": 180,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "label": "4BHK BEDROOM 04 1 33rd",
 "id": "panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D",
 "hfovMin": "150%",
 "class": "Panorama",
 "partial": false,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_t.jpg",
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -102.5,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EBD1C26D_E76D_15EE_417B_19EFF9268446"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 36.59,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_E96D90B6_E76D_157A_41E0_E1437C7ED20F"
},
{
 "label": "4bhk_bolcony_23",
 "id": "panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_F6B6F5DA_E6F2_2435_41D4_7EFE955F637C"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -158.86,
   "panorama": "this.panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86",
   "backwardYaw": -1.12,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 154,
  "pitch": -1.26
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -102.25,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EB130FD1_E76C_EB36_41E9_354433ABF429"
},
{
 "label": "4BHK BEDROOM 02 2 23rd",
 "id": "panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4",
 "class": "Panorama",
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
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -14.77,
   "panorama": "this.panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751",
   "backwardYaw": 68.88,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -143.41,
   "panorama": "this.panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB",
   "backwardYaw": 29.15,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -101.07,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_E900411D_E76D_172E_41DB_41CB2EC9862B"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_camera"
},
{
 "label": "4BHK BEDROOM 03 2 33rd",
 "id": "panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_F7CC04EB_C723_5AD6_41D4_F9DE6E7EE7BF",
  "this.overlay_F6F55B77_C723_4FBE_41D4_D6F2BBFF046B"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -148.93,
   "panorama": "this.panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B",
   "backwardYaw": -77.83,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 21.64,
   "panorama": "this.panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD",
   "backwardYaw": 94.33,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "label": "4bhk living 01 17th",
 "id": "panorama_CC48A826_C71D_4951_41E7_7F28A52014B9",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_C9502109_C72D_3B52_41E6_EA33AED203C6",
  "this.overlay_C8B50F54_C72F_47F2_41BD_3D4C2E212738",
  "this.overlay_D54F99DC_C72F_CAF2_41E3_249E41049022",
  "this.overlay_D7048D5C_C72C_CBF1_41E2_9CEB980C06AF"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -169.89,
   "panorama": "this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB",
   "backwardYaw": -126.3,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -20.98,
   "panorama": "this.panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C",
   "backwardYaw": -59.5,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 127.75,
   "panorama": "this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2",
   "backwardYaw": 0.29,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 30.15,
   "panorama": "this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045",
   "backwardYaw": -142.41,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -110.49,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EBDB3266_E76D_151A_41D9_14BD4FB4ED87"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 43.63,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EABCD09E_E76D_152B_41B5_8B31A581D4C4"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CD973440_C71F_79D2_41CE_832903CFC20A_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_camera"
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
  "class": "PanoramaCameraPosition",
  "yaw": -86.17,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_E8477191_E76D_1736_41C1_6EFAF73707B7"
},
{
 "label": "4BHK BEDROOM 04 2 17th",
 "id": "panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D10180AB_C763_D956_41E1_17A33D3BEE1E"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 68.51,
   "panorama": "this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942",
   "backwardYaw": -21.56,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 10.11,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_E9A3C163_E76D_171A_41E0_5ADE1F2F156B"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -35.5,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EBFD524E_E76D_152B_4180_86F02CDF1B83"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 97.9,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EB381212_E76D_153A_41D5_21E0F5422D08"
},
{
 "label": "4BHK BEDROOM 01 1 28th",
 "id": "panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E31F4E35_C725_49B2_41E3_75B373DD479F"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -136.37,
   "panorama": "this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01",
   "backwardYaw": 144.5,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 177.62,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EBC7725E_E76D_152A_41BB_CA31EE84248B"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 41.12,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EB972023_E76D_151A_41C7_16A82C1C3D51"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 53.7,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EB326219_E76D_1536_41A3_1EA6EF1C645B"
},
{
 "label": "4BHK BEDROOM 03 2 17th",
 "id": "panorama_CD888F1A_C71C_C776_41E5_354715787DA9",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D3646773_C765_47B6_41E0_73AF92AE0B87",
  "this.overlay_D246BEC5_C767_C6D3_417F_B7C47770AE7C"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 21.77,
   "panorama": "this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB",
   "backwardYaw": 92.83,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -148.42,
   "panorama": "this.panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0",
   "backwardYaw": -87.63,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 170.49,
  "pitch": -3.29
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -158.36,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EB3DFFAE_E76C_EB6B_41E2_B34F1CE9082F"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 36.59,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EB87F01B_E76D_152A_41D5_C5FC67B44C44"
},
{
 "label": "4BHK BEDROOM 04 2 23rd",
 "id": "panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D8D0AEBD_C71D_46B2_41E2_77FAFEC5B3BD"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 69.51,
   "panorama": "this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC",
   "backwardYaw": -19.17,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "label": "4BHK BEDROOM 02 1 28th",
 "id": "panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E167051F_C725_5B6F_41E8_EC2A8AF34DDA"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 78.93,
   "panorama": "this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558",
   "backwardYaw": -21.43,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "class": "PlayList",
 "id": "mainPlayList",
 "items": [
  {
   "media": "this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CC175683_C71F_5956_41AA_704EB81E1F05",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CC175683_C71F_5956_41AA_704EB81E1F05_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CD888F1A_C71C_C776_41E5_354715787DA9",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD888F1A_C71C_C776_41E5_354715787DA9_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CD732023_C71F_F956_41D6_6910628043DA",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD732023_C71F_F956_41D6_6910628043DA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CD894C2A_C71C_C951_4172_7357AF61EE99",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CD47441A_C71C_F976_41E5_56E16AD8E357",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "player": "this.MainViewerPanoramaPlayer",
   "start": "this.MainViewerPanoramaPlayer.set('displayPlaybackBar', false)"
  },
  {
   "media": "this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 30)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 30, 31)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 31, 32)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 32, 33)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 33, 34)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 34, 35)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 35, 36)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 36, 37)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CD479071_C71C_D9B2_41D0_92945B278722",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD479071_C71C_D9B2_41D0_92945B278722_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 37, 38)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 38, 39)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 39, 40)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 40, 41)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 41, 42)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 42, 43)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 43, 44)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CD973440_C71F_79D2_41CE_832903CFC20A",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD973440_C71F_79D2_41CE_832903CFC20A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 44, 45)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 45, 46)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 46, 47)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 47, 48)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 48, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "end": "this.trigger('tourEnded')"
  }
 ]
},
{
 "label": "4BHK BEDROOM 02 1 33rd",
 "id": "panorama_CD973440_C71F_79D2_41CE_832903CFC20A",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E8B6B81F_C72D_496E_41E6_150256507011"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 71.39,
   "panorama": "this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545",
   "backwardYaw": -22.69,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -178.71,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EA13706D_E76D_15E9_41E6_F83A3E496F93"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -25.72,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EB99F295_E76D_1539_41E5_DBF312F969C1"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_camera"
},
{
 "label": "4BHK BEDROOM 01 2 17th",
 "id": "panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D51089C5_C765_CAD2_41E5_192F51616448",
  "this.overlay_D5FA2C1E_C764_C971_41E4_AEEDE47EBAA0"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 155.88,
   "panorama": "this.panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA",
   "backwardYaw": -138.88,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 0.29,
   "panorama": "this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9",
   "backwardYaw": 127.75,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_camera"
},
{
 "label": "4bhk living 01 23rd",
 "id": "panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D079CAD6_C77D_CEFE_41DD_ABBE2AA0167E",
  "this.overlay_DF5FBBAA_C77C_CF56_41E7_7C881B931889",
  "this.overlay_DF1B664B_C763_59D6_41D4_1CCBA4B7384E",
  "this.overlay_DFF6DAC7_C765_4EDE_41D5_CD99DAE5DE58"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -21.73,
   "panorama": "this.panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1",
   "backwardYaw": -58.37,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 127.75,
   "panorama": "this.panorama_CD732023_C71F_F956_41D6_6910628043DA",
   "backwardYaw": -0.72,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 29.15,
   "panorama": "this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4",
   "backwardYaw": -143.41,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -25.2,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_E80971B0_E76D_1776_41E9_EEDDEA64A4FA"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 162.81,
  "pitch": -9.05
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CD888F1A_C71C_C776_41E5_354715787DA9_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CDBE40B7_C71D_DABE_41E4_FF4737531D9D_camera"
},
{
 "label": "4BHK BEDROOM 03 1 17th",
 "id": "panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D201568E_C765_3951_41E8_132B3132B361"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -87.63,
   "panorama": "this.panorama_CD888F1A_C71C_C776_41E5_354715787DA9",
   "backwardYaw": -148.42,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "label": "4bhk kitchen",
 "id": "panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D6C3F8D5_C723_4AF3_41E1_A8B34E8F3123"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -59.5,
   "panorama": "this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9",
   "backwardYaw": -20.98,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "label": "4BHK BEDROOM 04 1 23rd",
 "id": "panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D95E3B79_C764_CFB2_41CF_C88AFF6D4BC6",
  "this.overlay_D84AC366_C763_5FD1_41D2_AE1B94515E56"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -19.17,
   "panorama": "this.panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6",
   "backwardYaw": 69.51,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 153.66,
   "panorama": "this.panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86",
   "backwardYaw": 77.5,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.28,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_E94E60D4_E76D_153E_41C5_DD0AF24A1657"
},
{
 "label": "4BHK BEDROOM 03 2 23rd",
 "id": "panorama_CD93C521_C71D_3B53_41E8_25606B0344D0",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_DB374A8C_C765_4952_41E1_A2E190D5388B",
  "this.overlay_D912F139_C767_5BB2_41DE_1B6920A1E6C5"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 21.64,
   "panorama": "this.panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86",
   "backwardYaw": 93.83,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0"
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 171.84,
  "pitch": -4.02
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CD732023_C71F_F956_41D6_6910628043DA_camera"
},
{
 "label": "4BHK BEDROOM 02 2 17th",
 "id": "panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045",
 "class": "Panorama",
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
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -23.19,
   "panorama": "this.panorama_CC175683_C71F_5956_41AA_704EB81E1F05",
   "backwardYaw": 55.82,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -142.41,
   "panorama": "this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9",
   "backwardYaw": 30.15,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "label": "4BHK BEDROOM 04 2 28th",
 "id": "panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_EE27537F_C723_5FAE_41E1_DBA13BA4CC54"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 68.38,
   "panorama": "this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD",
   "backwardYaw": -19.04,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_camera"
},
{
 "label": "4bhk kitchen",
 "id": "panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A",
 "class": "LivePanorama",
 "frameTransitionTime": 5000,
 "thumbnailUrl": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1_t.jpg",
 "partial": false,
 "frameDisplayTime": 5000,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "overlays": [
    "this.overlay_E4FA5D36_C72C_CBBE_41DE_84376FB29EF5"
   ]
  },
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "pitch": 0,
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -62.51,
   "panorama": "this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932",
   "backwardYaw": -20.22,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 10.84,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EB091FC0_E76C_EB17_41E8_6C90C00DE218"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -102.5,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EBC56FF2_E76C_EAFA_41DC_E261E4ACC07A"
},
{
 "label": "4BHK BEDROOM 01 1 33rd",
 "id": "panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E9099FDF_C72F_C6EE_41E3_A646B2C2340D"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -131.59,
   "panorama": "this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42",
   "backwardYaw": 148.02,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -27.35,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EB323FB7_E76C_EB79_41E7_A830DD934BB4"
},
{
 "label": "4BHK BEDROOM 02 2 33rd",
 "id": "panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545",
 "class": "Panorama",
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
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -22.69,
   "panorama": "this.panorama_CD973440_C71F_79D2_41CE_832903CFC20A",
   "backwardYaw": 71.39,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -143.41,
   "panorama": "this.panorama_CD479071_C71C_D9B2_41D0_92945B278722",
   "backwardYaw": 28.27,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.28,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EBB3F013_E76D_153A_41EC_DBE8674693A3"
},
{
 "label": "4BHK BEDROOM 03 2 28th",
 "id": "panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E11B8401_C724_F952_41BA_B115171D0330",
  "this.overlay_E05F9DD6_C723_CAF1_41E7_95CA81350DF9"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 21.89,
   "panorama": "this.panorama_CD47441A_C71C_F976_41E5_56E16AD8E357",
   "backwardYaw": 76.37,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -148.17,
   "panorama": "this.panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3",
   "backwardYaw": -82.1,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -109.11,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EBCE3FE9_E76C_EB16_41DB_CC4AE4159CE4"
},
{
 "label": "4BHK BEDROOM 02 1 17th",
 "id": "panorama_CC175683_C71F_5956_41AA_704EB81E1F05",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D4F9B791_C76F_4773_41B6_B1727AC576AD"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 55.82,
   "panorama": "this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045",
   "backwardYaw": -23.19,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 92.37,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_E9F11145_E76D_171E_41E2_958C45C09658"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -108.61,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EA5D6044_E76D_151E_41E0_17A0A52D2D63"
},
{
 "label": "4BHK BEDROOM 02 1 23rd",
 "id": "panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_DB599724_C763_4752_41D6_A0FA163F689B"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 68.88,
   "panorama": "this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4",
   "backwardYaw": -14.77,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 158.27,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_E996E17A_E76D_17EA_41E6_3F7D147DA038"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 58.6,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_E95EC0E2_E76D_151A_41E0_87EB905CB8A0"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -52.25,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EA69402B_E76D_156A_41C8_909463701983"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 165.23,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EBF3B256_E76D_153A_41EC_52E70C82C5CA"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 60.98,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EAE4A076_E76D_15FA_41BB_ADB3AABA9130"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 31.83,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_E92F90F0_E76D_16F6_41DA_07E97C87893E"
},
{
 "label": "4BHK BEDROOM 04 1 17th",
 "id": "panorama_CC131311_C71D_3F72_41C7_6DBD9418A942",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D29433BE_C765_3EAE_41D8_CC80272D951C",
  "this.overlay_D179CE94_C763_4971_41E1_4D5D0BD3A926"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 154.03,
   "panorama": "this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB",
   "backwardYaw": 77.75,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -21.56,
   "panorama": "this.panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335",
   "backwardYaw": 68.51,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 116.86,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_E97DC0C7_E76D_151A_41D7_0E549B88CD47"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 157.31,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EBA59275_E76D_15FE_41BA_8C0F9BCD1861"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 102.17,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_E8E991BF_E76D_176A_41EC_B1250C07CB55"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 126.87,
  "pitch": -9.04
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 159.78,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_E9C3C152_E76D_173B_41CF_BC96CC978555"
},
{
 "label": "4bhk living 02 28th",
 "id": "panorama_CD47441A_C71C_F976_41E5_56E16AD8E357",
 "class": "Panorama",
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
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 76.37,
   "panorama": "this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A",
   "backwardYaw": 21.89,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 94.08,
   "panorama": "this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD",
   "backwardYaw": 154.28,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -119.02,
   "panorama": "this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932",
   "backwardYaw": -166.12,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -1.37,
   "panorama": "this.panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269",
   "backwardYaw": -167.28,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -51.99,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EAA92096_E76D_153B_41EA_DFB98D9B2E25"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -158.36,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EB1BE238_E76D_1576_41E3_D445CF9BA38B"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -169.57,
  "pitch": 0.5
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CD479071_C71C_D9B2_41D0_92945B278722_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.71,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EB07B228_E76D_1516_41D3_B2C038F43B47"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -158.11,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EB84428D_E76D_152E_41E4_4C3C6552A680"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -103.63,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EB3D020A_E76D_152A_41EB_CA09D7BD4532"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 46.4,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EB8FF285_E76D_151E_41CB_4A976A6397A1"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 48.41,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EB50AF9E_E76C_EB2A_41EC_8C6908F06F28"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -151.73,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EA2D004C_E76D_152E_41DB_AA3D2F8087C8"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 158.57,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EBD93FFA_E76C_EAEA_41DF_24889B3F3AA6"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 13,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EB1F4FC8_E76C_EB16_41E6_067445F53C73"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 13.88,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EA6B829D_E76D_1529_41DA_3404E924D5DF"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -24.12,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_E866E182_E76D_171A_41E0_7948E2FC9B6D"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -111.49,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EBE4FFD9_E76C_EB36_41D1_2778AB453848"
},
{
 "label": "4bhk_bolcony_17",
 "id": "panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E98B544E_E6F6_642D_41D5_639CA13A6B69"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -161.25,
   "panorama": "this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB",
   "backwardYaw": -1.12,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 12.72,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EA7E62A6_E76D_151A_41D0_8C4952181F0C"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -85.67,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_E8FA41C6_E76D_171B_41D1_CF46875DC576"
},
{
 "label": "4BHK BEDROOM 01 1 23rd",
 "id": "panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_DDB914AF_C76D_7AAE_41DD_FD246BE7004B"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -133.6,
   "panorama": "this.panorama_CD732023_C71F_F956_41D6_6910628043DA",
   "backwardYaw": 154.8,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -150.85,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EA4BA03C_E76D_156E_41E2_D94F58DE90A7"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 117.49,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EA025064_E76D_151F_41B7_9ECAE39DC13C"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 37.59,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EB002230_E76D_1576_41B9_58777E68E8FF"
},
{
 "label": "4BHK BEDROOM 01 2 33rd",
 "id": "panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_EAECF1EB_C72D_FAD6_41A8_B49AEB304111",
  "this.overlay_E91CF77E_C72C_C7AE_41E6_ED92117BB9B5"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -0.72,
   "panorama": "this.panorama_CD479071_C71C_D9B2_41D0_92945B278722",
   "backwardYaw": 128.26,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 148.02,
   "panorama": "this.panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060",
   "backwardYaw": -131.59,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "label": "4BHK BEDROOM 02 2 28th",
 "id": "panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558",
 "class": "Panorama",
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
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -21.43,
   "panorama": "this.panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F",
   "backwardYaw": 78.93,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -142.03,
   "panorama": "this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932",
   "backwardYaw": 30.28,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -52.25,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EBBA027D_E76D_15EE_41D4_E5667BB13AC3"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 18.75,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_E9848172_E76D_17FB_41E8_A577CF5943F5"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 160.83,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_E93F90FD_E76D_16E5_41E4_97101B27102B"
},
{
 "label": "4BHK BEDROOM 03 1 33rd",
 "id": "panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_F5309816_C725_4971_41DC_62B6061471DF"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -77.83,
   "panorama": "this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506",
   "backwardYaw": -148.93,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -171.08,
  "pitch": -2.01
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_camera"
},
{
 "label": "4BHK BEDROOM 01 1 17th",
 "id": "panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_D5B45B26_C76D_CF5E_41D0_7E370B2F5BD4"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -138.88,
   "panorama": "this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2",
   "backwardYaw": 155.88,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -149.85,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EAD9C08E_E76D_152A_41E5_DCBC4CA33043"
},
{
 "label": "4BHK BEDROOM 01 2 23rd",
 "id": "panorama_CD732023_C71F_F956_41D6_6910628043DA",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_DD070AC8_C763_4ED2_41C9_24B475FBBEEE",
  "this.overlay_DDFC90E3_C76D_7AD6_41E6_FFEEF526FE90"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -0.72,
   "panorama": "this.panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB",
   "backwardYaw": 127.75,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 154.8,
   "panorama": "this.panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C",
   "backwardYaw": -133.6,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "label": "4bhk kitchen",
 "id": "panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_DD3041EE_C764_DAAE_41E6_5D3D4684B50F"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -58.37,
   "panorama": "this.panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB",
   "backwardYaw": -21.73,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 156.81,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EB49AF8A_E76C_EB2B_41B2_6F9EDCBCA6DB"
},
{
 "label": "4bhk_bolcony_28",
 "id": "panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_F7CC2CF2_E6F2_E5F5_41C2_AAC8BF3B7DDA"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -167.28,
   "panorama": "this.panorama_CD47441A_C71C_F976_41E5_56E16AD8E357",
   "backwardYaw": -1.37,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.88,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EBFA6FE1_E76C_EB16_41C3_0FAE49E842BF"
},
{
 "label": "4BHK BEDROOM 01 2 28th",
 "id": "panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E4AC823C_C723_F9B2_41B4_39B29FEEA91C",
  "this.overlay_E33D35E2_C723_3AD1_41A1_22D3C41AFB56"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 1.29,
   "panorama": "this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932",
   "backwardYaw": 128.01,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 144.5,
   "panorama": "this.panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE",
   "backwardYaw": -136.37,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "label": "4BHK BEDROOM 04 1 28th",
 "id": "panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_t.jpg",
 "partial": false,
 "overlays": [
  "this.overlay_E0AC7D99_C73D_CB72_41E2_CDE435C74BDD",
  "this.overlay_EFD00FA6_C73C_C75E_41E0_8DE91C303B0D"
 ],
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -19.04,
   "panorama": "this.panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD",
   "backwardYaw": 68.38,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 154.28,
   "panorama": "this.panorama_CD47441A_C71C_F976_41E5_56E16AD8E357",
   "backwardYaw": 94.08,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CC175683_C71F_5956_41AA_704EB81E1F05_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 31.07,
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_EA30105C_E76D_152F_41E1_257BFCBA86A7"
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
 "borderSize": 0,
 "progressBorderRadius": 0,
 "toolTipPaddingLeft": 6,
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
 "class": "ViewerArea",
 "minWidth": 100,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "height": "100%",
 "playbackBarBottom": 5,
 "progressBarBorderColor": "#000000",
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
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
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "toolTipShadowVerticalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadowHorizontalLength": 0,
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
   "click": "this.startPanoramaWithCamera(this.panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD, this.camera_EBC56FF2_E76C_EAFA_41DC_E261E4ACC07A); this.mainPlayList.set('selectedIndex', 38)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 13.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_1_HS_0_0.png",
      "width": 189,
      "class": "ImageResourceLevel",
      "height": 192
     }
    ]
   },
   "pitch": 1.66,
   "yaw": 152.65
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_F4E4001F_C725_596E_41E0_DD5EA526DD91",
 "maps": [
  {
   "hfov": 13.63,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 152.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.66
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05, this.camera_EBCE3FE9_E76C_EB16_41DB_CC4AE4159CE4); this.mainPlayList.set('selectedIndex', 48)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E83ADF25_E76C_EB19_41C2_5B1B6FB3E23A",
   "pitch": -26.57,
   "yaw": -18.67,
   "hfov": 11.77,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_F3F318C8_C723_4AD2_41E2_333E3532C07C",
 "maps": [
  {
   "hfov": 11.77,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -18.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_1_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -26.57
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD, this.camera_EBC7725E_E76D_152A_41BB_CA31EE84248B); this.mainPlayList.set('selectedIndex', 38)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 16.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_1_HS_0_0.png",
      "width": 224,
      "class": "ImageResourceLevel",
      "height": 196
     }
    ]
   },
   "pitch": 4.05,
   "yaw": -169.16
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_F4A93A03_E6FE_6C1A_41B1_F38C9DDC27C0",
 "maps": [
  {
   "hfov": 16.11,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -169.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_1_HS_0_0_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 15
     }
    ]
   },
   "pitch": 4.05
  }
 ]
},
{
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 20)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E82FDF1C_E76C_EB2E_41D7_F360563CB1F1",
   "pitch": -39.26,
   "yaw": -86.37,
   "hfov": 15.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_DA67D643_C765_39D6_41E7_BD2D534FD43E",
 "maps": [
  {
   "hfov": 15.05,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -86.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -39.26
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942, this.camera_E9B4616B_E76D_17EA_4198_0BF8C1867391); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01 Left"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_D1FF13DD_C77D_5EF2_41CF_2558FD0159CA",
   "pitch": -1.7,
   "yaw": 77.75,
   "hfov": 7.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_D77E9814_C72D_C971_41D3_F1C7EEC185B4",
 "maps": [
  {
   "hfov": 7.53,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 77.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -1.7
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD888F1A_C71C_C776_41E5_354715787DA9, this.camera_E9D2015C_E76D_172E_41E6_B76087842A5A); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01 Right"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_D1FF53DD_C77D_5EF2_41DF_0CE4BBD4FAA4",
   "pitch": -1.95,
   "yaw": 92.83,
   "hfov": 7.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_D6593DFD_C725_CAB3_41E1_22E863C59B7A",
 "maps": [
  {
   "hfov": 7.53,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 92.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -1.95
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9, this.camera_E9A3C163_E76D_171A_41E0_5ADE1F2F156B); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
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
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_D689F985_C723_4B53_41E0_EF19CAA46BA5",
 "maps": [
  {
   "hfov": 9.94,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -126.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0_HS_2_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -24.53
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A, this.camera_E9848172_E76D_17FB_41E8_A577CF5943F5); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 9.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0_HS_3_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": 2.06,
   "yaw": -1.12
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_EB45A2A5_E6F6_1C1F_41E0_169A3BFD2919",
 "maps": [
  {
   "hfov": 9.05,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 2.06
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558, this.camera_EAF6707E_E76D_15EA_41D2_F7142A7B14E2); this.mainPlayList.set('selectedIndex', 30)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 12.58,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0_HS_0_0.png",
      "width": 209,
      "class": "ImageResourceLevel",
      "height": 217
     }
    ]
   },
   "pitch": 0.81,
   "yaw": 30.28
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_E77541FB_C727_7AB6_41E2_71A4F3A251EC",
 "maps": [
  {
   "hfov": 12.58,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 30.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.81
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01, this.camera_EA13706D_E76D_15E9_41E6_F83A3E496F93); this.mainPlayList.set('selectedIndex', 28)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 10.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0_HS_1_0.png",
      "width": 167,
      "class": "ImageResourceLevel",
      "height": 188
     }
    ]
   },
   "pitch": 0.68,
   "yaw": 128.01
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_E66DCEAD_C727_4953_41E4_4338D4DA1A80",
 "maps": [
  {
   "hfov": 10.06,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 128.01,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   },
   "pitch": 0.68
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A, this.camera_EA025064_E76D_151F_41B7_9ECAE39DC13C); this.mainPlayList.set('selectedIndex', 27)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01 Left"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E82D7F1D_E76C_EB2E_41CC_F20ED857928F",
   "pitch": 0.82,
   "yaw": -20.22,
   "hfov": 7.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_E57D9766_C725_47DE_41E4_4EAD320D7E97",
 "maps": [
  {
   "hfov": 7.54,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -20.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.82
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD47441A_C71C_F976_41E5_56E16AD8E357, this.camera_EAE4A076_E76D_15FA_41BB_ADB3AABA9130); this.mainPlayList.set('selectedIndex', 25)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E82D0F1D_E76C_EB2E_41BC_4579AF675A57",
   "pitch": -29.06,
   "yaw": -166.12,
   "hfov": 14.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_E6FF7EBA_C723_46B1_41E8_B0C4C865F516",
 "maps": [
  {
   "hfov": 14.16,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -166.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0_HS_3_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -29.06
  }
 ]
},
{
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E853DF1A_E76C_EB2A_41E9_567150122C55",
   "pitch": -30.44,
   "yaw": -121.15,
   "hfov": 11.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_DF87A050_C767_D9F2_41B5_A747371BE693",
 "maps": [
  {
   "hfov": 11.37,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -121.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -30.44
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC, this.camera_EB11323F_E76D_156A_41CB_ECD0E20858A0); this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01 Left"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E8537F1A_E76C_EB2A_41D4_54562F46549C",
   "pitch": -1.44,
   "yaw": 77.5,
   "hfov": 7.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_DE0068F1_C767_4AB2_41E8_311A365DEAB0",
 "maps": [
  {
   "hfov": 7.53,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 77.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -1.44
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0, this.camera_EB1BE238_E76D_1576_41E3_D445CF9BA38B); this.mainPlayList.set('selectedIndex', 20)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01 Right"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E8531F1B_E76C_EB2A_41E0_A6F2334598BC",
   "pitch": -0.94,
   "yaw": 93.83,
   "hfov": 7.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_DDD9E5FF_C765_5AAE_41E5_46C9CCEA06DE",
 "maps": [
  {
   "hfov": 7.54,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 93.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.94
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43, this.camera_EBE9C247_E76D_1519_41DC_6108452583FD); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0_HS_3_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": 0.31,
   "yaw": -1.12
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_E80D4B8C_E6F2_2C2D_41E0_90C736E7CC60",
 "maps": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.31
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD479071_C71C_D9B2_41D0_92945B278722, this.camera_E9C3C152_E76D_173B_41CF_BC96CC978555); this.mainPlayList.set('selectedIndex', 37)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E8203F23_E76C_EB19_41E7_0C6EBF52E273",
   "pitch": -28.7,
   "yaw": -63.14,
   "hfov": 11.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_F418FFB4_C727_46B1_41E3_7157AAB75A6C",
 "maps": [
  {
   "hfov": 11.09,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -63.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -28.7
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545, this.camera_E96D90B6_E76D_157A_41E0_E1437C7ED20F); this.mainPlayList.set('selectedIndex', 43)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 12.07,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0_HS_0_0.png",
      "width": 201,
      "class": "ImageResourceLevel",
      "height": 213
     }
    ]
   },
   "pitch": 1.69,
   "yaw": 28.27
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_EEDAB568_C725_FBD2_41DB_8D04CB4292A1",
 "maps": [
  {
   "hfov": 12.07,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 28.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.69
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42, this.camera_E94E60D4_E76D_153E_41C5_DD0AF24A1657); this.mainPlayList.set('selectedIndex', 41)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0_HS_1_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": 0.56,
   "yaw": 128.26
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_EDFCD5B0_C724_DAB2_41D6_0E77907C4F3F",
 "maps": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 128.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.56
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC, this.camera_E97DC0C7_E76D_151A_41D7_0E549B88CD47); this.mainPlayList.set('selectedIndex', 40)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01 Left"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E825AF21_E76C_EB16_41BA_73B4DD5CCB01",
   "pitch": -0.19,
   "yaw": -20.22,
   "hfov": 7.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_EC51FEB1_C727_46B2_41B8_83F109FE0A5A",
 "maps": [
  {
   "hfov": 7.54,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -20.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.19
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD, this.camera_E95EC0E2_E76D_151A_41E0_87EB905CB8A0); this.mainPlayList.set('selectedIndex', 38)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E8252F21_E76C_EB16_41C1_D75A38FBA6AD",
   "pitch": -27.17,
   "yaw": -167,
   "hfov": 10.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_ECD21C73_C725_C9B6_4192_D031F772D6EA",
 "maps": [
  {
   "hfov": 10.61,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -167,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0_HS_3_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -27.17
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045, this.camera_E828B1A1_E76D_1716_41DB_C6BB337DFC72); this.mainPlayList.set('selectedIndex', 47)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E83A2F25_E76C_EB19_41AB_31725129512F",
   "pitch": -33.22,
   "yaw": 70.89,
   "hfov": 9.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_F4767B1F_C727_4F6F_41DB_8ED192ED33D1",
 "maps": [
  {
   "hfov": 9.96,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 70.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -33.22
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD479071_C71C_D9B2_41D0_92945B278722, this.camera_EB1F4FC8_E76C_EB16_41E6_067445F53C73); this.mainPlayList.set('selectedIndex', 37)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E822AF22_E76C_EB1B_41D1_03B41AD27DEC",
   "pitch": -27.3,
   "yaw": -121.4,
   "hfov": 14.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_EC843EC7_C724_C6DF_41E4_78AEC11AB30A",
 "maps": [
  {
   "hfov": 14.4,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -121.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -27.3
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045, this.camera_EB323FB7_E76C_EB79_41E7_A830DD934BB4); this.mainPlayList.set('selectedIndex', 47)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01 Left"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E8220F22_E76C_EB1B_41E9_744FB5EC6063",
   "pitch": -0.44,
   "yaw": 77.5,
   "hfov": 7.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_EBD3DBCF_C723_4EEE_41D3_4E82F6F873AE",
 "maps": [
  {
   "hfov": 7.54,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 77.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.44
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506, this.camera_EB3DFFAE_E76C_EB6B_41E2_B34F1CE9082F); this.mainPlayList.set('selectedIndex', 45)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01 Right"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E8239F22_E76C_EB1B_41CC_FDADA0EAA72C",
   "pitch": -0.69,
   "yaw": 94.33,
   "hfov": 7.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_E9586F13_C72C_C776_41D2_741B38E3831E",
 "maps": [
  {
   "hfov": 7.54,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 94.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.69
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7, this.camera_EB091FC0_E76C_EB17_41E8_6C90C00DE218); this.mainPlayList.set('selectedIndex', 39)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0_HS_3_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": 0.56,
   "yaw": -2.38
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_F73E3897_E6F2_2C3A_41E8_B2BA995462E3",
 "maps": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -2.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.56
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A, this.camera_E92F90F0_E76D_16F6_41DA_07E97C87893E); this.mainPlayList.set('selectedIndex', 32)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E824AF20_E76C_EB16_41E2_012E1C78198C",
   "pitch": -38.76,
   "yaw": -82.1,
   "hfov": 15.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_E039B42F_C73C_D9AE_4179_6CED54A79A5C",
 "maps": [
  {
   "hfov": 15.16,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -82.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -38.76
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86, this.camera_E90FE110_E76D_1736_41D6_F2D708AE4711); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 15.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_1_HS_0_0.png",
      "width": 217,
      "class": "ImageResourceLevel",
      "height": 224
     }
    ]
   },
   "pitch": 0.28,
   "yaw": -158.86
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_F6B6F5DA_E6F2_2435_41D4_7EFE955F637C",
 "maps": [
  {
   "hfov": 15.65,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -158.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.28
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB, this.camera_EA4BA03C_E76D_156E_41E2_D94F58DE90A7); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 16.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0_HS_0_0.png",
      "width": 234,
      "class": "ImageResourceLevel",
      "height": 234
     }
    ]
   },
   "pitch": 2.16,
   "yaw": -143.41
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_DC659AFB_C76F_4EB6_41D5_0F1877D4D037",
 "maps": [
  {
   "hfov": 16.89,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -143.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 2.16
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751, this.camera_EA7A7033_E76D_1579_41E4_E3789EB43ECC); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E8514F1C_E76C_EB2E_41D5_DDD4AC1716AD",
   "pitch": -31.97,
   "yaw": -14.77,
   "hfov": 16.49,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_DCF81359_C76F_7FF3_41A8_62F50E047FA0",
 "maps": [
  {
   "hfov": 16.49,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -14.77,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -31.97
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD, this.camera_E8FA41C6_E76D_171B_41D1_CF46875DC576); this.mainPlayList.set('selectedIndex', 38)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0_HS_0_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 150
     }
    ]
   },
   "pitch": -0.12,
   "yaw": 21.64
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_F7CC04EB_C723_5AD6_41D4_F9DE6E7EE7BF",
 "maps": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 21.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.12
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B, this.camera_E8E991BF_E76D_176A_41EC_B1250C07CB55); this.mainPlayList.set('selectedIndex', 46)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E83C6F24_E76C_EB1F_41C5_E5F8D5337E41",
   "pitch": -48.06,
   "yaw": -148.93,
   "hfov": 12.99,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_F6F55B77_C723_4FBE_41D4_D6F2BBFF046B",
 "maps": [
  {
   "hfov": 12.99,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -148.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -48.06
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045, this.camera_EB002230_E76D_1576_41B9_58777E68E8FF); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 11.82,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0_HS_0_0.png",
      "width": 197,
      "class": "ImageResourceLevel",
      "height": 230
     }
    ]
   },
   "pitch": 1.19,
   "yaw": 30.15
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_C9502109_C72D_3B52_41E6_EA33AED203C6",
 "maps": [
  {
   "hfov": 11.82,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 30.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0_HS_0_0_0_map.gif",
      "width": 15,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   },
   "pitch": 1.19
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2, this.camera_EB07B228_E76D_1516_41D3_B2C038F43B47); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0_HS_1_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": 0.56,
   "yaw": 127.75
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_C8B50F54_C72F_47F2_41BD_3D4C2E212738",
 "maps": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 127.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.56
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C, this.camera_EB0D6221_E76D_1516_41E6_2FE87ABAAAF7); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01 Left"
 },
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
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_D54F99DC_C72F_CAF2_41E3_249E41049022",
 "maps": [
  {
   "hfov": 7.54,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -20.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -1.19
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB, this.camera_EB326219_E76D_1536_41A3_1EA6EF1C645B); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
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
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_D7048D5C_C72C_CBF1_41E2_9CEB980C06AF",
 "maps": [
  {
   "hfov": 13.89,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -169.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0_HS_3_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -23.91
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942, this.camera_E83701A8_E76D_1716_41EA_C039E61C99A2); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
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
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_D10180AB_C763_D956_41E1_17A33D3BEE1E",
 "maps": [
  {
   "hfov": 10.14,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 68.51,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -33.47
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01, this.camera_EBFD524E_E76D_152B_4180_86F02CDF1B83); this.mainPlayList.set('selectedIndex', 28)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E8294F1F_E76C_EB2A_41E0_E6E9B8837EFF",
   "pitch": -38,
   "yaw": -136.37,
   "hfov": 15.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_E31F4E35_C725_49B2_41E3_75B373DD479F",
 "maps": [
  {
   "hfov": 15.32,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -136.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -38
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB, this.camera_E9E15138_E76D_1776_4173_84A84F963679); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 10.62,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0_HS_0_0.png",
      "width": 147,
      "class": "ImageResourceLevel",
      "height": 164
     }
    ]
   },
   "pitch": 0.64,
   "yaw": 21.77
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_D3646773_C765_47B6_41E0_73AF92AE0B87",
 "maps": [
  {
   "hfov": 10.62,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 21.77,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "pitch": 0.64
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0, this.camera_E9F11145_E76D_171E_41E2_958C45C09658); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
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
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_D246BEC5_C767_C6D3_417F_B7C47770AE7C",
 "maps": [
  {
   "hfov": 13.06,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -148.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -47.8
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC, this.camera_E93F90FD_E76D_16E5_41E4_97101B27102B); this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E82CCF1D_E76C_EB2E_41C3_22B181B218AA",
   "pitch": -32.59,
   "yaw": 69.51,
   "hfov": 9.82,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_D8D0AEBD_C71D_46B2_41E2_77FAFEC5B3BD",
 "maps": [
  {
   "hfov": 9.82,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 69.51,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -32.59
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558, this.camera_EBD93FFA_E76C_EAEA_41DF_24889B3F3AA6); this.mainPlayList.set('selectedIndex', 30)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E827DF1F_E76C_EB2A_41BB_FD7891610C7E",
   "pitch": -45.28,
   "yaw": 78.93,
   "hfov": 13.68,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_E167051F_C725_5B6F_41E8_EC2A8AF34DDA",
 "maps": [
  {
   "hfov": 13.68,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 78.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -45.28
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545, this.camera_EBA59275_E76D_15FE_41BA_8C0F9BCD1861); this.mainPlayList.set('selectedIndex', 43)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E83F4F24_E76C_EB1F_41E6_90941A0D7AF0",
   "pitch": -43.52,
   "yaw": 71.39,
   "hfov": 14.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_E8B6B81F_C72D_496E_41E6_150256507011",
 "maps": [
  {
   "hfov": 14.1,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 71.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -43.52
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9, this.camera_EA69402B_E76D_156A_41C8_909463701983); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0_HS_0_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": 0.4,
   "yaw": 0.29
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_D51089C5_C765_CAD2_41E5_192F51616448",
 "maps": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.29,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.4
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA, this.camera_EB972023_E76D_151A_41C7_16A82C1C3D51); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
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
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_D5FA2C1E_C764_C971_41E4_AEEDE47EBAA0",
 "maps": [
  {
   "hfov": 12.27,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 155.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -45.77
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4, this.camera_EB87F01B_E76D_152A_41D5_C5FC67B44C44); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 11.31,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0_HS_0_0.png",
      "width": 188,
      "class": "ImageResourceLevel",
      "height": 213
     }
    ]
   },
   "pitch": 2.94,
   "yaw": 29.15
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_D079CAD6_C77D_CEFE_41DD_ABBE2AA0167E",
 "maps": [
  {
   "hfov": 11.31,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 29.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   },
   "pitch": 2.94
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD732023_C71F_F956_41D6_6910628043DA, this.camera_EBB3F013_E76D_153A_41EC_DBE8674693A3); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0_HS_1_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": 1.56,
   "yaw": 127.75
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_DF5FBBAA_C77C_CF56_41E7_7C881B931889",
 "maps": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 127.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.56
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1, this.camera_EBA0C00A_E76D_152A_41E5_84D443138E19); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01 Left"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E8529F1A_E76C_EB2A_41DD_24401EB5C47F",
   "pitch": 2.58,
   "yaw": -21.73,
   "hfov": 7.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_DF1B664B_C763_59D6_41D4_1CCBA4B7384E",
 "maps": [
  {
   "hfov": 7.53,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -21.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 2.58
  }
 ]
},
{
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E8522F1A_E76C_EB2A_41DD_C4A26E4E9583",
   "pitch": -23.66,
   "yaw": -167.13,
   "hfov": 11.62,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_DFF6DAC7_C765_4EDE_41D5_CD99DAE5DE58",
 "maps": [
  {
   "hfov": 11.62,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -167.13,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0_HS_3_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -23.66
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD888F1A_C71C_C776_41E5_354715787DA9, this.camera_EBAD4002_E76D_151A_41DA_799FFB5C60A0); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
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
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_D201568E_C765_3951_41E8_132B3132B361",
 "maps": [
  {
   "hfov": 15.1,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -87.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -39.01
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9, this.camera_EA20F054_E76D_153E_41C9_16A09777920D); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01"
 },
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
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_D6C3F8D5_C723_4AF3_41E1_A8B34E8F3123",
 "maps": [
  {
   "hfov": 6.79,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -59.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -35.86
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86, this.camera_EBD1C26D_E76D_15EE_417B_19EFF9268446); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 17.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0_HS_0_0.png",
      "width": 245,
      "class": "ImageResourceLevel",
      "height": 206
     }
    ]
   },
   "pitch": 1.41,
   "yaw": 153.66
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_D95E3B79_C764_CFB2_41CF_C88AFF6D4BC6",
 "maps": [
  {
   "hfov": 17.65,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 153.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 15
     }
    ]
   },
   "pitch": 1.41
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6, this.camera_EBDB3266_E76D_151A_41D9_14BD4FB4ED87); this.mainPlayList.set('selectedIndex', 23)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E82F2F1D_E76C_EB2E_41BC_E41792411E58",
   "pitch": -32.09,
   "yaw": -19.17,
   "hfov": 11.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_D84AC366_C763_5FD1_41D2_AE1B94515E56",
 "maps": [
  {
   "hfov": 11.15,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -19.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -32.09
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86, this.camera_E8477191_E76D_1736_41C1_6EFAF73707B7); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 10.85,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0_HS_0_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 175
     }
    ]
   },
   "pitch": 3.53,
   "yaw": 21.64
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_DB374A8C_C765_4952_41E1_A2E190D5388B",
 "maps": [
  {
   "hfov": 10.85,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 21.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   },
   "pitch": 3.53
  }
 ]
},
{
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E82E1F1C_E76C_EB2E_41EA_6CEF4F1493C2",
   "pitch": -50.82,
   "yaw": -141.39,
   "hfov": 12.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_D912F139_C767_5BB2_41DE_1B6920A1E6C5",
 "maps": [
  {
   "hfov": 12.28,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -141.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -50.82
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CC48A826_C71D_4951_41E7_7F28A52014B9, this.camera_EAD9C08E_E76D_152A_41E5_DCBC4CA33043); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 16.35,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0_HS_0_0.png",
      "width": 227,
      "class": "ImageResourceLevel",
      "height": 196
     }
    ]
   },
   "pitch": 4.3,
   "yaw": -142.41
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_D464C36F_C76D_5FAF_41D8_35D099FAD98B",
 "maps": [
  {
   "hfov": 16.35,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -142.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0_HS_0_0_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 15
     }
    ]
   },
   "pitch": 4.3
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CC175683_C71F_5956_41AA_704EB81E1F05, this.camera_EAC7F086_E76D_151A_41EB_C54CA19F7DDA); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
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
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_D4E3A43C_C76F_59B1_41D0_FA262DAB39CB",
 "maps": [
  {
   "hfov": 15.01,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -23.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -25.81
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD, this.camera_EB291FA6_E76C_EB1A_41EB_0876116F7693); this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E8270F21_E76C_EB16_41A0_2E8926C303B8",
   "pitch": -32.72,
   "yaw": 68.38,
   "hfov": 10.01,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_EE27537F_C723_5FAE_41E1_DBA13BA4CC54",
 "maps": [
  {
   "hfov": 10.01,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 68.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -32.72
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932, this.camera_E81991B7_E76D_177A_41E6_55686D575630); this.mainPlayList.set('selectedIndex', 24)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E8287F1E_E76C_EB2A_41D1_60D4618447A3",
   "pitch": -25.81,
   "yaw": -62.51,
   "hfov": 14.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_E4FA5D36_C72C_CBBE_41DE_84376FB29EF5",
 "maps": [
  {
   "hfov": 14.32,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -62.51,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -25.81
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42, this.camera_E857C199_E76D_1736_41DF_98D9B7AA7B5F); this.mainPlayList.set('selectedIndex', 41)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E83EBF23_E76C_EB19_41BC_888A07995457",
   "pitch": -41.01,
   "yaw": -131.59,
   "hfov": 14.67,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_E9099FDF_C72F_C6EE_41E3_A646B2C2340D",
 "maps": [
  {
   "hfov": 14.67,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -131.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -41.01
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD479071_C71C_D9B2_41D0_92945B278722, this.camera_EA2D004C_E76D_152E_41DB_AA3D2F8087C8); this.mainPlayList.set('selectedIndex', 37)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 17.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0_HS_0_0.png",
      "width": 241,
      "class": "ImageResourceLevel",
      "height": 196
     }
    ]
   },
   "pitch": 0.78,
   "yaw": -143.41
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_E994C697_C72F_797F_41D3_1180D963962C",
 "maps": [
  {
   "hfov": 17.4,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -143.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 15
     }
    ]
   },
   "pitch": 0.78
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD973440_C71F_79D2_41CE_832903CFC20A, this.camera_EA5D6044_E76D_151E_41E0_17A0A52D2D63); this.mainPlayList.set('selectedIndex', 44)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E83FDF24_E76C_EB1F_41E4_2BB3D452AF85",
   "pitch": -25.81,
   "yaw": -22.69,
   "hfov": 15.01,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_E8B86196_C72D_7B7E_41D9_E9ACE1C1D537",
 "maps": [
  {
   "hfov": 15.01,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -22.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -25.81
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD47441A_C71C_F976_41E5_56E16AD8E357, this.camera_EB3D020A_E76D_152A_41EB_CA09D7BD4532); this.mainPlayList.set('selectedIndex', 25)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 10.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0_HS_0_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 150
     }
    ]
   },
   "pitch": 2.9,
   "yaw": 21.89
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_E11B8401_C724_F952_41BA_B115171D0330",
 "maps": [
  {
   "hfov": 10.86,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 21.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 2.9
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3, this.camera_EB381212_E76D_153A_41D5_21E0F5422D08); this.mainPlayList.set('selectedIndex', 33)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E8272F20_E76C_EB16_41D4_1F5CB7C2181D",
   "pitch": -45.29,
   "yaw": -148.17,
   "hfov": 13.68,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_E05F9DD6_C723_CAF1_41E7_95CA81350DF9",
 "maps": [
  {
   "hfov": 13.68,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -148.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -45.29
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045, this.camera_EB49AF8A_E76C_EB2B_41B2_6F9EDCBCA6DB); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
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
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_D4F9B791_C76F_4773_41B6_B1727AC576AD",
 "maps": [
  {
   "hfov": 15.21,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 55.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -38.5
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4, this.camera_EBF3B256_E76D_153A_41EC_52E70C82C5CA); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E82ECF1C_E76C_EB2E_41CA_BC4BE70F9F16",
   "pitch": -42.77,
   "yaw": 68.88,
   "hfov": 14.27,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_DB599724_C763_4752_41D6_A0FA163F689B",
 "maps": [
  {
   "hfov": 14.27,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 68.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -42.77
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB, this.camera_EB130FD1_E76C_EB36_41E9_354433ABF429); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 15.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0_HS_0_0.png",
      "width": 220,
      "class": "ImageResourceLevel",
      "height": 199
     }
    ]
   },
   "pitch": 1.41,
   "yaw": 154.03
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_D29433BE_C765_3EAE_41D8_CC80272D951C",
 "maps": [
  {
   "hfov": 15.89,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 154.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.41
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335, this.camera_EBE4FFD9_E76C_EB36_41D1_2778AB453848); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
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
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_D179CE94_C763_4971_41E1_4D5D0BD3A926",
 "maps": [
  {
   "hfov": 17.05,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -21.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -28.7
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A, this.camera_EB84428D_E76D_152E_41E4_4C3C6552A680); this.mainPlayList.set('selectedIndex', 32)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01 Left"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E82A9F1E_E76C_EB2A_41B3_5AB86D8CA52C",
   "pitch": 0.06,
   "yaw": 76.37,
   "hfov": 6.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_E69088C4_C72C_CAD2_41E2_67849E970973",
 "maps": [
  {
   "hfov": 6.28,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 76.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.06
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD, this.camera_EB99F295_E76D_1539_41E5_DBF312F969C1); this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01 Right"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E82A2F1E_E76C_EB2A_41E7_148A85727F9F",
   "pitch": -0.44,
   "yaw": 94.08,
   "hfov": 7.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_E5D3EE61_C72D_49D2_41E0_D1B634887F8E",
 "maps": [
  {
   "hfov": 7.54,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 94.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.44
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932, this.camera_EA6B829D_E76D_1529_41DA_3404E924D5DF); this.mainPlayList.set('selectedIndex', 24)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E82BAF1E_E76C_EB2A_4183_272B195392A7",
   "pitch": -28.93,
   "yaw": -119.02,
   "hfov": 9.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_E44921C1_C72D_3AD3_41D0_85751F7FA73A",
 "maps": [
  {
   "hfov": 9.56,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -119.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0_HS_2_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -28.93
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269, this.camera_EA7E62A6_E76D_151A_41D0_8C4952181F0C); this.mainPlayList.set('selectedIndex', 26)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0_HS_3_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": 1.06,
   "yaw": -1.37
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_F607C52E_E6F2_246D_41E3_2DB987A88877",
 "maps": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.06
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB, this.camera_EBFA6FE1_E76C_EB16_41C3_0FAE49E842BF); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 16.31,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_1_HS_0_0.png",
      "width": 227,
      "class": "ImageResourceLevel",
      "height": 220
     }
    ]
   },
   "pitch": 5.93,
   "yaw": -161.25
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_E98B544E_E6F6_642D_41D5_639CA13A6B69",
 "maps": [
  {
   "hfov": 16.31,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -161.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 5.93
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD732023_C71F_F956_41D6_6910628043DA, this.camera_E80971B0_E76D_1776_41E9_EEDDEA64A4FA); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E851FF1B_E76C_EB2A_41D9_5FFCE5B06DAA",
   "pitch": -38.75,
   "yaw": -133.6,
   "hfov": 15.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_DDB914AF_C76D_7AAE_41DD_FD246BE7004B",
 "maps": [
  {
   "hfov": 15.16,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -133.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -38.75
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD479071_C71C_D9B2_41D0_92945B278722, this.camera_EB5DDF94_E76C_EB3F_41D5_AABC4407AFDF); this.mainPlayList.set('selectedIndex', 37)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0_HS_0_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": 1.16,
   "yaw": -0.72
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_EAECF1EB_C72D_FAD6_41A8_B49AEB304111",
 "maps": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.16
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060, this.camera_EB50AF9E_E76C_EB2A_41EC_8C6908F06F28); this.mainPlayList.set('selectedIndex', 42)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E8213F23_E76C_EB19_41EB_76783D1E4252",
   "pitch": -50.56,
   "yaw": 148.02,
   "hfov": 12.35,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_E91CF77E_C72C_C7AE_41E6_ED92117BB9B5",
 "maps": [
  {
   "hfov": 12.35,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 148.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -50.56
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932, this.camera_E910D12B_E76D_176A_41DC_1425F9DB3A3B); this.mainPlayList.set('selectedIndex', 24)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 15.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0_HS_0_0.png",
      "width": 217,
      "class": "ImageResourceLevel",
      "height": 189
     }
    ]
   },
   "pitch": 0.03,
   "yaw": -142.03
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_E3C0EB9C_C727_CF72_41D8_2929BE9FB4EE",
 "maps": [
  {
   "hfov": 15.65,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -142.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0_HS_0_0_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.03
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F, this.camera_E900411D_E76D_172E_41DB_41CB2EC9862B); this.mainPlayList.set('selectedIndex', 31)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E8267F1F_E76C_EB2A_41D5_094742684A10",
   "pitch": -26.82,
   "yaw": -21.43,
   "hfov": 16.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_E2CC1B58_C725_4FF1_41E7_2F6766A1B20D",
 "maps": [
  {
   "hfov": 16.23,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -21.43,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -26.82
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506, this.camera_EA30105C_E76D_152F_41E1_257BFCBA86A7); this.mainPlayList.set('selectedIndex', 45)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E83DDF24_E76C_EB1F_41B0_0944A5C4DBAD",
   "pitch": -38.26,
   "yaw": -77.83,
   "hfov": 15.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_F5309816_C725_4971_41DC_62B6061471DF",
 "maps": [
  {
   "hfov": 15.26,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -77.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -38.26
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2, this.camera_E866E182_E76D_171A_41E0_7948E2FC9B6D); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
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
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_D5B45B26_C76D_CF5E_41D0_7E370B2F5BD4",
 "maps": [
  {
   "hfov": 15.27,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -138.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -38.25
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB, this.camera_EBBA027D_E76D_15EE_41D4_E5667BB13AC3); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0_HS_0_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": 0.4,
   "yaw": -0.72
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_DD070AC8_C763_4ED2_41C9_24B475FBBEEE",
 "maps": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.4
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C, this.camera_EB8FF285_E76D_151E_41CB_4A976A6397A1); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E8506F1B_E76C_EB2A_41D7_24DFCE28C360",
   "pitch": -44.28,
   "yaw": 154.8,
   "hfov": 13.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_DDFC90E3_C76D_7AD6_41E6_FFEEF526FE90",
 "maps": [
  {
   "hfov": 13.92,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 154.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -44.28
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB, this.camera_E996E17A_E76D_17EA_41E6_3F7D147DA038); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 01"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E8530F1B_E76C_EB2A_41D8_F2076DAF4C23",
   "pitch": -32.85,
   "yaw": -58.37,
   "hfov": 9.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_DD3041EE_C764_DAAE_41E6_5D3D4684B50F",
 "maps": [
  {
   "hfov": 9.36,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -58.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -32.85
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD47441A_C71C_F976_41E5_56E16AD8E357, this.camera_E8751189_E76D_1729_41DB_531D3C8E5033); this.mainPlayList.set('selectedIndex', 25)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 15.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_1_HS_0_0.png",
      "width": 220,
      "class": "ImageResourceLevel",
      "height": 241
     }
    ]
   },
   "pitch": 4.68,
   "yaw": -167.28
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_F7CC2CF2_E6F2_E5F5_41C2_AAC8BF3B7DDA",
 "maps": [
  {
   "hfov": 15.84,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -167.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "pitch": 4.68
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932, this.camera_EAA92096_E76D_153B_41EA_DFB98D9B2E25); this.mainPlayList.set('selectedIndex', 24)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0_HS_0_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": 0.91,
   "yaw": 1.29
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_E4AC823C_C723_F9B2_41B4_39B29FEEA91C",
 "maps": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1.29,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.91
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE, this.camera_EABCD09E_E76D_152B_41B5_8B31A581D4C4); this.mainPlayList.set('selectedIndex', 29)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E829CF1F_E76C_EB2A_41E1_1B63D79C5ED4",
   "pitch": -44.78,
   "yaw": 144.5,
   "hfov": 13.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_E33D35E2_C723_3AD1_41A1_22D3C41AFB56",
 "maps": [
  {
   "hfov": 13.8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 144.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -44.78
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD47441A_C71C_F976_41E5_56E16AD8E357, this.camera_EA9CF0AE_E76D_156A_41DE_352808C2943F); this.mainPlayList.set('selectedIndex', 25)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 15.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0_HS_0_0.png",
      "width": 220,
      "class": "ImageResourceLevel",
      "height": 206
     }
    ]
   },
   "pitch": 3.92,
   "yaw": 154.28
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_E0AC7D99_C73D_CB72_41E2_CDE435C74BDD",
 "maps": [
  {
   "hfov": 15.86,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 154.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 15
     }
    ]
   },
   "pitch": 3.92
  }
 ]
},
{
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD, this.camera_EA8CC0A6_E76D_151A_41E4_AFE1330FE0A1); this.mainPlayList.set('selectedIndex', 35)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01a"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_E825EF20_E76C_EB16_4173_012AA3CDD9E8",
   "pitch": -26.82,
   "yaw": -19.04,
   "hfov": 13.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_EFD00FA6_C73C_C75E_41E0_8DE91C303B0D",
 "maps": [
  {
   "hfov": 13.76,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -19.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -26.82
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E83ADF25_E76C_EB19_41C2_5B1B6FB3E23A",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E82FDF1C_E76C_EB2E_41D7_F360563CB1F1",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_D1FF13DD_C77D_5EF2_41CF_2558FD0159CA",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_D1FF53DD_C77D_5EF2_41DF_0CE4BBD4FAA4",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_D1FF93DD_C77D_5EF2_41CB_8856CCC91593",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD478724_C71C_C752_41DE_8267BD7EC0DB_0_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E82D7F1D_E76C_EB2E_41CC_F20ED857928F",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E82D0F1D_E76C_EB2E_41BC_4579AF675A57",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD47FA08_C71C_C952_41E1_0DFDFA2AE932_0_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E853DF1A_E76C_EB2A_41E9_567150122C55",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E8537F1A_E76C_EB2A_41D4_54562F46549C",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E8531F1B_E76C_EB2A_41E0_A6F2334598BC",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CD471D58_C71C_CBF1_41E5_E68E0239EF86_0_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E8203F23_E76C_EB19_41E7_0C6EBF52E273",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E825AF21_E76C_EB16_41BA_73B4DD5CCB01",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E8252F21_E76C_EB16_41C1_D75A38FBA6AD",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD479071_C71C_D9B2_41D0_92945B278722_0_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E83A2F25_E76C_EB19_41AB_31725129512F",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E822AF22_E76C_EB1B_41D1_03B41AD27DEC",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E8220F22_E76C_EB1B_41E9_744FB5EC6063",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E8239F22_E76C_EB1B_41CC_FDADA0EAA72C",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CD475A4F_C71C_C9EF_41E7_7E3CDE3A0DDD_0_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E824AF20_E76C_EB16_41E2_012E1C78198C",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E8514F1C_E76C_EB2E_41D5_DDD4AC1716AD",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E83C6F24_E76C_EB1F_41C5_E5F8D5337E41",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_D1FC53DD_C77D_5EF2_41E5_1CC973DDBEA3",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_D1FCA3DD_C77D_5EF2_41DD_9635E996FADF",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CC48A826_C71D_4951_41E7_7F28A52014B9_0_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_D1F8D3E7_C77D_5EDE_41E7_872B52F6C2BA",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E8294F1F_E76C_EB2A_41E0_E6E9B8837EFF",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_D1F9D3E7_C77D_5EDE_41D3_15BE236E2A6A",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E82CCF1D_E76C_EB2E_41C3_22B181B218AA",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E827DF1F_E76C_EB2A_41BB_FD7891610C7E",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E83F4F24_E76C_EB1F_41E6_90941A0D7AF0",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_D1FE33E7_C77D_5EDE_41D2_061D00B2B4AE",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E8529F1A_E76C_EB2A_41DD_24401EB5C47F",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E8522F1A_E76C_EB2A_41DD_C4A26E4E9583",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD54F3CF_C71D_3EEE_41BB_CF90CFE715EB_0_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_D1F813E7_C77D_5EDE_41C5_D3614EBDB84C",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_D1FFD3DD_C77D_5EF2_41CE_89845FEA3E36",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E82F2F1D_E76C_EB2E_41BC_E41792411E58",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E82E1F1C_E76C_EB2E_41EA_6CEF4F1493C2",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_D1FEF3E7_C77D_5EDE_41D4_38C2D06ADC42",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E8270F21_E76C_EB16_41A0_2E8926C303B8",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E8287F1E_E76C_EB2A_41D1_60D4618447A3",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E83EBF23_E76C_EB19_41BC_888A07995457",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E83FDF24_E76C_EB1F_41E4_2BB3D452AF85",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E8272F20_E76C_EB16_41D4_1F5CB7C2181D",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_D1F953E7_C77D_5EDE_41B3_BBC8AE666EFB",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E82ECF1C_E76C_EB2E_41CA_BC4BE70F9F16",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_D1F893E7_C77D_5EDE_41C5_65F129D18629",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E82A9F1E_E76C_EB2A_41B3_5AB86D8CA52C",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E82A2F1E_E76C_EB2A_41E7_148A85727F9F",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E82BAF1E_E76C_EB2A_4183_272B195392A7",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD47441A_C71C_F976_41E5_56E16AD8E357_0_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E851FF1B_E76C_EB2A_41D9_5FFCE5B06DAA",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E8213F23_E76C_EB19_41EB_76783D1E4252",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E8267F1F_E76C_EB2A_41D5_094742684A10",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E83DDF24_E76C_EB1F_41B0_0944A5C4DBAD",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_D1FE93E7_C77D_5EDE_41BF_076B82AF6AC9",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E8506F1B_E76C_EB2A_41D7_24DFCE28C360",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E8530F1B_E76C_EB2A_41D8_F2076DAF4C23",
 "frameDuration": 62,
 "colCount": 3,
 "rowCount": 3,
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E829CF1F_E76C_EB2A_41E1_1B63D79C5ED4",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_E825EF20_E76C_EB16_4173_012AA3CDD9E8",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 5,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
}],
 "minWidth": 20,
 "desktopMipmappingEnabled": false,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "mouseWheelEnabled": true,
 "gap": 10,
 "overflow": "visible",
 "horizontalAlign": "left",
 "layout": "absolute",
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
