(function(){
    var script = {
 "shadow": false,
 "height": "100%",
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "children": [
  "this.MainViewer"
 ],
 "defaultVRPointer": "laser",
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "scripts": {
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "existsKey": function(key){  return key in window; },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "registerKey": function(key, value){  window[key] = value; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "getKey": function(key){  return window[key]; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "unregisterKey": function(key){  delete window[key]; },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); }
 },
 "downloadEnabled": false,
 "width": "100%",
 "paddingBottom": 0,
 "layout": "absolute",
 "verticalAlign": "top",
 "paddingRight": 0,
 "borderRadius": 0,
 "minHeight": 20,
 "paddingLeft": 0,
 "propagateClick": false,
 "class": "Player",
 "horizontalAlign": "left",
 "start": "this.init()",
 "overflow": "visible",
 "desktopMipmappingEnabled": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minWidth": 20,
 "definitions": [{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 55.49,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E0922B63_C634_4847_41E2_417AA41BCC32"
},
{
 "hfovMax": 130,
 "label": "3bhk bedroom03 02 28th",
 "id": "panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B",
   "class": "AdjacentPanorama",
   "yaw": -49.75,
   "backwardYaw": 34.74,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_DDE3106F_C64C_D85F_41C3_782CF613010E"
 ],
 "hfov": 360
},
{
 "hfovMax": 130,
 "label": "3bhk bedroom02 1 23rd",
 "id": "panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5",
   "class": "AdjacentPanorama",
   "yaw": 75.99,
   "backwardYaw": -20.79,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_D55AF350_C65C_5841_41E8_2583A752FBE8"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 174.65,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_EECD9E8E_C634_48C1_41D3_14E7AD483038"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -91.93,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E1AECD34_C634_49C1_41B7_AB0D5E5748A2"
},
{
 "hfovMax": 130,
 "label": "3bhk bedroom02 2 28th",
 "id": "panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5",
   "class": "AdjacentPanorama",
   "yaw": -21.75,
   "backwardYaw": 88.07,
   "distance": 1
  },
  {
   "panorama": "this.panorama_C8E097E2_C390_F8A2_419E_45918FB20A48",
   "class": "AdjacentPanorama",
   "yaw": -148.21,
   "backwardYaw": 136.48,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_DF50E086_C674_38C1_41C4_7464DFF3A926",
  "this.overlay_DFC10996_C674_48CE_41D4_631A257C6571"
 ],
 "hfov": 360
},
{
 "hfovMax": 130,
 "label": "3bhk 01 hall 23rd floor",
 "id": "panorama_C8E03182_C390_F962_41E3_AA944CB11FB1",
 "partial": false,
 "pitch": 0,
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4",
   "class": "AdjacentPanorama",
   "yaw": 146.64,
   "backwardYaw": 123.01,
   "distance": 1
  },
  {
   "panorama": "this.panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5",
   "class": "AdjacentPanorama",
   "yaw": 135.94,
   "backwardYaw": -145.19,
   "distance": 1
  },
  {
   "panorama": "this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590",
   "class": "AdjacentPanorama",
   "yaw": -123.79,
   "backwardYaw": -157.27,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_C8D35665_C635_D843_41C9_9D8B672250E4",
  "this.overlay_C90800DC_C634_F841_41DC_32CC6E30E91E",
  "this.overlay_C9007F6B_C637_C847_41AC_9B1840EF4CA4"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -142.38,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_EF246629_C634_7BC3_4189_E62D4629BFB0"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_camera"
},
{
 "hfovMax": 130,
 "label": "3bhk Passage 33rd floor",
 "id": "panorama_C8E84376_C391_79A5_41A5_D6230668BC5C",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_E609D5D6_C65C_5841_41DC_4408506ECD34",
   "class": "AdjacentPanorama",
   "yaw": -81.21,
   "backwardYaw": 6.37,
   "distance": 1
  },
  {
   "panorama": "this.panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0",
   "class": "AdjacentPanorama",
   "yaw": 34.3,
   "backwardYaw": 152.97,
   "distance": 1
  },
  {
   "panorama": "this.panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D",
   "class": "AdjacentPanorama",
   "yaw": -4.73,
   "backwardYaw": 6.08,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_D8F8C72D_C654_79C3_41E0_91645FDFE3E3",
  "this.overlay_D9A2C71D_C65C_79C3_41E6_11CD592B17BA",
  "this.overlay_E657F276_C65C_D841_41A5_62C616D8BAE0"
 ],
 "hfov": 360
},
{
 "hfovMax": 130,
 "label": "3bhk bedroom03 01 17th",
 "id": "panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4",
   "class": "AdjacentPanorama",
   "yaw": 44.28,
   "backwardYaw": -50.85,
   "distance": 1
  },
  {
   "panorama": "this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A",
   "class": "AdjacentPanorama",
   "yaw": 153.25,
   "backwardYaw": 35.46,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_D7B8A38F_C3F7_B962_4174_75177DEADA11",
  "this.overlay_D7F45601_C3F0_BB5E_41C2_C0C993F67D5C"
 ],
 "hfov": 360
},
{
 "hfovMax": 130,
 "label": "3bhk Passage 28th floor",
 "id": "panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4",
   "class": "AdjacentPanorama",
   "yaw": -4.73,
   "backwardYaw": 6.94,
   "distance": 1
  },
  {
   "panorama": "this.panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9",
   "class": "AdjacentPanorama",
   "yaw": -77.5,
   "backwardYaw": 5.82,
   "distance": 1
  },
  {
   "panorama": "this.panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B",
   "class": "AdjacentPanorama",
   "yaw": 35.45,
   "backwardYaw": 151.46,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_D0EB7FEB_C674_4847_41D1_C5CAD7EE65EC",
  "this.overlay_D17567AD_C674_58C3_41C9_B73C22230BA4",
  "this.overlay_D11844E5_C674_7843_41DB_71EEDEBF776A"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_camera"
},
{
 "hfovMax": 130,
 "label": "3bhk 01 hall 28th floor",
 "id": "panorama_C8E097E2_C390_F8A2_419E_45918FB20A48",
 "partial": false,
 "pitch": 0,
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4",
   "class": "AdjacentPanorama",
   "yaw": 153.23,
   "backwardYaw": 127.05,
   "distance": 1
  },
  {
   "panorama": "this.panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A",
   "class": "AdjacentPanorama",
   "yaw": -125.71,
   "backwardYaw": -158.16,
   "distance": 1
  },
  {
   "panorama": "this.panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0",
   "class": "AdjacentPanorama",
   "yaw": 136.48,
   "backwardYaw": -148.21,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_D3405AA1_C64C_48C3_41AC_D04C40137A31",
  "this.overlay_D3F9A377_C64C_384F_41A6_37339C461757",
  "this.overlay_D3B6FDAD_C64C_48C3_41CA_3934E98FB99D"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 158.25,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_EE46FDBD_C634_48C3_41DB_884006ACDF4F"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 125.1,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E0C63B02_C634_49C1_41D7_8A9CEDE70A8D"
},
{
 "hfovMax": 130,
 "label": "3bhk 02 entrance 33rd floor",
 "id": "panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594",
   "class": "AdjacentPanorama",
   "yaw": 127.47,
   "backwardYaw": 144.86,
   "distance": 1
  },
  {
   "panorama": "this.panorama_C8E84376_C391_79A5_41A5_D6230668BC5C",
   "class": "AdjacentPanorama",
   "yaw": 6.08,
   "backwardYaw": -4.73,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_DDAC91FB_C64C_3847_41DE_4E8AC2FC381D",
  "this.overlay_DA2CFE08_C64C_4BC1_41C2_4C4C28E16DA7"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_camera"
},
{
 "hfovMax": 130,
 "label": "3bhk bedroom01 23rd",
 "id": "panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590",
   "class": "AdjacentPanorama",
   "yaw": -61.42,
   "backwardYaw": 33.02,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_D4424B68_C654_C841_41AA_04E4BDB57422"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 97.42,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E0D3AAEF_C634_485F_41B8_9064BABE05A2"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -104.01,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_EF51BF2F_C634_49DF_41A5_FAA0CC321B0B"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -144.55,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E0B32B29_C634_49C3_41BB_6F6C5B20DEE9"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -52.53,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E0EF4ADA_C634_4841_41D3_BEEDBF4CA79D"
},
{
 "hfovMax": 130,
 "label": "3bhk bedroom03 02 106th",
 "id": "panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0",
   "class": "AdjacentPanorama",
   "yaw": -49.96,
   "backwardYaw": 37.62,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_E24DF921_C64C_C9C3_41E0_1DE050A43B4D"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 22.73,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E1F82CB8_C634_48C1_41D4_F6F2BA962840"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -140.53,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_EF407F48_C634_4841_41D6_84F72201ADA1"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -54.18,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E141DC21_C634_4FC3_41E5_C8C5F6EC4815"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -56.99,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E1071C92_C634_48C1_41C5_DD2D3654C192"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -135.72,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E06DE995_C634_48C3_41D1_535253561EDE"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -26.75,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E1CD8D08_C634_49C1_41C2_9478EB568618"
},
{
 "hfovMax": 130,
 "label": "3bhk bedroom02 2 23rd",
 "id": "panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C8E03182_C390_F962_41E3_AA944CB11FB1",
   "class": "AdjacentPanorama",
   "yaw": -145.19,
   "backwardYaw": 135.94,
   "distance": 1
  },
  {
   "panorama": "this.panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9",
   "class": "AdjacentPanorama",
   "yaw": -20.79,
   "backwardYaw": 75.99,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_D409C066_C655_F841_41C2_9E382AAA888D",
  "this.overlay_D4F58EF9_C654_C843_41C9_E71581556A11"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 98.79,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E1143C7C_C634_4841_41E4_31B4C0C02E96"
},
{
 "hfovMax": 130,
 "label": "3bhk bedroom02 2 33rd",
 "id": "panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594",
   "class": "AdjacentPanorama",
   "yaw": -145.32,
   "backwardYaw": 136.35,
   "distance": 1
  },
  {
   "panorama": "this.panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A",
   "class": "AdjacentPanorama"
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_E468F0B7_C654_58CF_41DE_C89AEED028EF",
  "this.overlay_E4E80CAC_C657_C8C1_41D8_7F180578F07D"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 172.42,
  "pitch": 3.29
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 169.94,
  "pitch": 0.55
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 152.65,
  "pitch": -2.47
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CF1013BA_C391_98A2_4167_0505D502E364_camera"
},
{
 "hfovMax": 130,
 "label": "3bhk bedroom01 17th",
 "id": "panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5",
   "class": "AdjacentPanorama",
   "yaw": -64.1,
   "backwardYaw": 35.42,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_D1422BDB_C3F3_88E2_41BD_FA3D9EE50658"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -136.2,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E0676983_C634_48C7_41C6_5A37C2205DE5"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -144.58,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_EEEA1E63_C634_4847_41E0_E79012B84E2A"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -43.52,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E1908D4C_C634_4841_41DF_E3DE63A847E6"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 118.58,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E1661BC3_C634_4847_41C9_B2BE73D63400"
},
{
 "hfovMax": 130,
 "label": "3bhk bedroom02 1 17th",
 "id": "panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40",
   "class": "AdjacentPanorama",
   "yaw": -21.06,
   "backwardYaw": 88.82,
   "distance": 1
  },
  {
   "panorama": "this.panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B",
   "class": "AdjacentPanorama",
   "yaw": -146.66,
   "backwardYaw": 135.92,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_D0840BD8_C3F0_88ED_41D5_401F4C1D0F9A",
  "this.overlay_D0C5DA7D_C3F1_8BA7_41D0_40EE562498C3"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 22.46,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E0F27AAD_C634_48C3_41E0_EFB86597E2EF"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 168.3,
  "pitch": 4.12
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_camera"
},
{
 "hfovMax": 130,
 "label": "3bhk 02 entrance 28th floor",
 "id": "panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C8E097E2_C390_F8A2_419E_45918FB20A48",
   "class": "AdjacentPanorama",
   "yaw": 127.05,
   "backwardYaw": 153.23,
   "distance": 1
  },
  {
   "panorama": "this.panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA",
   "class": "AdjacentPanorama",
   "yaw": 6.94,
   "backwardYaw": -4.73,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_D23040EA_C64C_D841_41DD_F09C37DF4C5B",
  "this.overlay_D29C36D7_C64C_384F_41E4_FDFADB56E550"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -26.77,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_EE367DD4_C634_4841_41DD_846FABE2F8B5"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 34.81,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E109CCA6_C634_48C1_41AF_35252867FAD5"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -173.63,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E38E094A_C634_4841_41E3_AE39645BEC95"
},
{
 "hfovMax": 130,
 "label": "3bhk bedroom02 2 17th",
 "id": "panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9",
   "class": "AdjacentPanorama",
   "yaw": 88.82,
   "backwardYaw": -21.06,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_D06F55C7_C3F0_98E2_41E3_464100BECDC1"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -173.06,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_EE29FE03_C634_4BC7_41B4_93BCB371FFE9"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_camera"
},
{
 "hfovMax": 130,
 "label": "3bhk kitchen",
 "id": "panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034",
   "class": "AdjacentPanorama",
   "yaw": 6.37,
   "backwardYaw": -80.93,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_D6BEFA7F_C64C_483F_41C3_9F7466FB8F67"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -44.08,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E02DEA42_C634_4841_41E3_06B771498351"
},
{
 "hfovMax": 130,
 "label": "3bhk Passage 23rd floor",
 "id": "panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA",
   "class": "AdjacentPanorama",
   "yaw": -80.93,
   "backwardYaw": 6.37,
   "distance": 1
  },
  {
   "panorama": "this.panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4",
   "class": "AdjacentPanorama",
   "yaw": 37.66,
   "backwardYaw": 5.98,
   "distance": 1
  },
  {
   "panorama": "this.panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4",
   "class": "AdjacentPanorama",
   "yaw": -4.32,
   "backwardYaw": 5.98,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_D6A133C2_C634_D841_41E3_3F1875A05CAD",
  "this.overlay_D78B856A_C635_D841_41D8_38F24CF45E90",
  "this.overlay_D6DCC2CE_C634_F841_41DB_C74AF57B3D08"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -174.02,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E388795D_C634_4843_41E2_FDA655F61E6D"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -144.54,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_EE726D7B_C634_4847_41E1_81E838863A02"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_camera"
},
{
 "hfovMax": 130,
 "label": "3bhk bedroom03 01 106th",
 "id": "panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C8E84376_C391_79A5_41A5_D6230668BC5C",
   "class": "AdjacentPanorama",
   "yaw": 152.97,
   "backwardYaw": 34.3,
   "distance": 1
  },
  {
   "panorama": "this.panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA",
   "class": "AdjacentPanorama",
   "yaw": 37.62,
   "backwardYaw": -49.96,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_E54E0653_C654_5847_41E2_4F2F79E153AD",
  "this.overlay_E5F8F5BF_C654_583F_41E0_5A5263ACE886"
 ],
 "hfov": 360
},
{
 "hfovMax": 130,
 "label": "3bhk bedroom02 17th",
 "id": "panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B",
   "class": "AdjacentPanorama",
   "yaw": -158.37,
   "backwardYaw": -125.71,
   "distance": 1
  },
  {
   "panorama": "this.panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23",
   "class": "AdjacentPanorama",
   "yaw": 35.42,
   "backwardYaw": -64.1,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_D0FEC682_C3F1_BB62_41D4_9102F3B6D6C5",
  "this.overlay_D09F0370_C3F0_99BE_41E4_9F144A073A5D"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_camera"
},
{
 "hfovMax": 130,
 "label": "3bhk bedroom02 1 33rd",
 "id": "panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40",
   "class": "AdjacentPanorama"
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_E483FB4F_C654_C85F_41D6_EB69928269D3"
 ],
 "hfov": 360
},
{
 "class": "PlayList",
 "items": [
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_camera",
   "media": "this.panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_camera",
   "media": "this.panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_camera",
   "media": "this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CF1013BA_C391_98A2_4167_0505D502E364_camera",
   "media": "this.panorama_CF1013BA_C391_98A2_4167_0505D502E364",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_camera",
   "media": "this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_camera",
   "media": "this.panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_camera",
   "media": "this.panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_camera",
   "media": "this.panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_camera",
   "media": "this.panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_camera",
   "media": "this.panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_camera",
   "media": "this.panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_camera",
   "media": "this.panorama_C8E03182_C390_F962_41E3_AA944CB11FB1",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_camera",
   "media": "this.panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_camera",
   "media": "this.panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_camera",
   "media": "this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_camera",
   "media": "this.panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_camera",
   "media": "this.panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_camera",
   "media": "this.panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_camera",
   "media": "this.panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_camera",
   "media": "this.panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_camera",
   "media": "this.panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_camera",
   "media": "this.panorama_C8E097E2_C390_F8A2_419E_45918FB20A48",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_camera",
   "media": "this.panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_camera",
   "media": "this.panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_camera",
   "media": "this.panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_camera",
   "media": "this.panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_camera",
   "media": "this.panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_camera",
   "media": "this.panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_camera",
   "media": "this.panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 30)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_camera",
   "media": "this.panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 30, 31)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_camera",
   "media": "this.panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 31, 32)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_camera",
   "media": "this.panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 32, 33)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_camera",
   "media": "this.panorama_C8E84376_C391_79A5_41A5_D6230668BC5C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 33, 34)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_camera",
   "media": "this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 34, 35)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_camera",
   "media": "this.panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 35, 36)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_camera",
   "media": "this.panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 36, 37)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_camera",
   "media": "this.panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 37, 38)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_camera",
   "media": "this.panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 38, 39)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_camera",
   "media": "this.panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 39, 0)",
   "class": "PanoramaPlayListItem",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_camera",
   "media": "this.panorama_E609D5D6_C65C_5841_41DC_4408506ECD34",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "mainPlayList"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -43.65,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_EE640D93_C634_48C7_41D3_2C2E10E3E0D0"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 175.27,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E15C7BFC_C634_4841_41C4_783EFD5CBA87"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -175.28,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E1BE5D1C_C634_49C1_41D0_30F480EEE912"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 158.94,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_EF4225DF_C634_787F_4195_AF6511CB5D5F"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -146.98,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E1EAFCCB_C634_4847_41E1_216A9DF23FF6"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 159.21,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_EE54ADAA_C634_48C1_41E4_9686A8DB1A2E"
},
{
 "hfovMax": 130,
 "label": "3bhk bedroom03 01 28th",
 "id": "panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6",
   "class": "AdjacentPanorama",
   "yaw": 34.74,
   "backwardYaw": -49.75,
   "distance": 1
  },
  {
   "panorama": "this.panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA",
   "class": "AdjacentPanorama",
   "yaw": 151.46,
   "backwardYaw": 35.45,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_DC0C8682_C673_D8C1_41C9_3F738D8FB7A5",
  "this.overlay_DC8E5D89_C64C_48C3_41D0_5E147F703183"
 ],
 "hfov": 360
},
{
 "hfovMax": 130,
 "label": "3bhk bedroom03 02 23rd",
 "id": "panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7",
   "class": "AdjacentPanorama",
   "yaw": -54.9,
   "backwardYaw": 43.8,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_D25D23DA_C655_D841_41D7_0482A8407978"
 ],
 "hfov": 360
},
{
 "hfovMax": 130,
 "label": "3bhk 01 hall 17th floor",
 "id": "panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B",
 "partial": false,
 "pitch": 0,
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF",
   "class": "AdjacentPanorama",
   "yaw": 144.86,
   "backwardYaw": 125.82,
   "distance": 1
  },
  {
   "panorama": "this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5",
   "class": "AdjacentPanorama",
   "yaw": -125.71,
   "backwardYaw": -158.37,
   "distance": 1
  },
  {
   "panorama": "this.panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9",
   "class": "AdjacentPanorama",
   "yaw": 135.92,
   "backwardYaw": -146.66,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_D3E76ABF_C3F1_88A2_41C2_2B986BB16AE4",
  "this.overlay_D33D2D6F_C3F0_89A3_41A0_BD4E7B18DF22",
  "this.overlay_D20E9669_C3F1_BBAF_41DD_B912974B3B2A"
 ],
 "hfov": 360
},
{
 "hfovMax": 130,
 "label": "3bhk 01 hall 33 rd floor",
 "id": "panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594",
 "partial": false,
 "pitch": 0,
 "hfovMin": "135%",
 "thumbnailUrl": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068",
   "class": "AdjacentPanorama",
   "yaw": -124.51,
   "backwardYaw": -157.54,
   "distance": 1
  },
  {
   "panorama": "this.panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A",
   "class": "AdjacentPanorama",
   "yaw": 136.35,
   "backwardYaw": -145.32,
   "distance": 1
  },
  {
   "panorama": "this.panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D",
   "class": "AdjacentPanorama",
   "yaw": 144.86,
   "backwardYaw": 127.47,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_DAD97D83_C654_48C7_41B7_5C3CD58749B6",
  "this.overlay_DB45F6D9_C654_3843_41E0_655C9315E778",
  "this.overlay_DBC73BCC_C654_4841_41C6_2F8A5000FCD7"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 21.63,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E1333C43_C634_4847_41D8_CAAD98001FA4"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_camera"
},
{
 "mouseControlMode": "drag_acceleration",
 "class": "PanoramaPlayer",
 "gyroscopeEnabled": true,
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "gyroscopeVerticalDraggingEnabled": true,
 "id": "MainViewerPanoramaPlayer",
 "touchControlMode": "drag_rotation"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -91.18,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E026BA22_C634_4BC1_41E7_88365E2E8EDB"
},
{
 "hfovMax": 130,
 "label": "3bhk bedroom02 28th",
 "id": "panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C8E097E2_C390_F8A2_419E_45918FB20A48",
   "class": "AdjacentPanorama",
   "yaw": -158.16,
   "backwardYaw": -125.71,
   "distance": 1
  },
  {
   "panorama": "this.panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5",
   "class": "AdjacentPanorama",
   "yaw": 39.47,
   "backwardYaw": -65.68,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_DE78BD94_C67C_48C1_41E0_19E3E3F56405",
  "this.overlay_DEFD2A97_C674_C8CF_41E4_A52F962F63C7"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -44.06,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_EF6E2F18_C634_49C1_41D9_B21333E6D4BE"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -173.92,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_EF7E3F06_C634_49C1_41E0_B9EF25C359C9"
},
{
 "hfovMax": 130,
 "label": "3bhk bedroom02 1 28th",
 "id": "panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0",
   "class": "AdjacentPanorama",
   "yaw": 88.07,
   "backwardYaw": -21.75,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_DFA742CC_C674_3841_419D_AB7849550207"
 ],
 "hfov": 360
},
{
 "hfovMax": 130,
 "label": "3bhk 02 entrance 17th floor",
 "id": "panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B",
   "class": "AdjacentPanorama",
   "yaw": 125.82,
   "backwardYaw": 144.86,
   "distance": 1
  },
  {
   "panorama": "this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A",
   "class": "AdjacentPanorama",
   "yaw": 4.81,
   "backwardYaw": -5.35,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_CC924D89_C3F3_896E_41E4_09D608EE2A76",
  "this.overlay_CC66AADF_C3F0_88E3_41D2_C7310A6919B1"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 99.07,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_EEF8EE4B_C634_4847_41E6_294B78C8FFCC"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 130.04,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E0ACDB4E_C634_4841_41C3_338DFE1B5FF5"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 56.21,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E1722BA3_C634_48C7_41E3_3A673E80331B"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -52.95,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E010FA62_C634_4841_41E1_434FB51BBFD2"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -173.63,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_EE9F6ED5_C634_4843_41E4_F918BFD63697"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -33.36,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_EEBC5EA6_C634_48C1_41D0_EBDC5E483C32"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -142.34,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_EEADBEBD_C634_48C3_41AB_F32467362AD4"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 115.9,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E030FA03_C634_4BC7_41B3_5F147DC59923"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 130.25,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E0CCEB16_C634_49C1_41E3_75ADFF23439A"
},
{
 "hfovMax": 130,
 "label": "3bhk bedroom02 33rd",
 "id": "panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594",
   "class": "AdjacentPanorama",
   "yaw": -157.54,
   "backwardYaw": -124.51,
   "distance": 1
  },
  {
   "panorama": "this.panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D",
   "class": "AdjacentPanorama",
   "yaw": 37.55,
   "backwardYaw": -68.97,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_E6C34BC9_C65D_C843_41E3_37D707F31C56",
  "this.overlay_E7577260_C65C_7843_41E0_F5DDAEA8A5BD"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -145.7,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E0B9CB3B_C634_49C7_41D4_8C09A90F84FB"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_camera"
},
{
 "hfovMax": 130,
 "label": "3bhk Passage 17th floor",
 "id": "panorama_C857B562_C391_99A2_41D4_622CFBF52C0A",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF",
   "class": "AdjacentPanorama",
   "yaw": -5.35,
   "backwardYaw": 4.81,
   "distance": 1
  },
  {
   "panorama": "this.panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A",
   "class": "AdjacentPanorama",
   "yaw": 35.46,
   "backwardYaw": 153.25,
   "distance": 1
  },
  {
   "panorama": "this.panorama_CF1013BA_C391_98A2_4167_0505D502E364",
   "class": "AdjacentPanorama",
   "yaw": -82.58,
   "backwardYaw": 4.72,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_D2F533D4_C3F3_98E5_41DC_C06241682CEA",
  "this.overlay_D20E5953_C3F1_89E3_41E2_DE390783024A",
  "this.overlay_D181A890_C3F0_977D_41E6_810868AFA24B"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -174.18,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_EE190E1B_C634_4BC7_41C1_5EB318D81DB5"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -35.14,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E16A1BDF_C634_487F_41E3_85C3B001236C"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -27.03,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_EE8F4EED_C634_4843_41E1_CC60AACFBB91"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_camera"
},
{
 "hfovMax": 130,
 "label": "3bhk kitchen",
 "id": "panorama_E609D5D6_C65C_5841_41DC_4408506ECD34",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C8E84376_C391_79A5_41A5_D6230668BC5C",
   "class": "AdjacentPanorama",
   "yaw": 6.37,
   "backwardYaw": -81.21,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_E2FE88E0_C64D_C841_41C3_2E195A899599"
 ],
 "hfov": 360
},
{
 "hfovMax": 130,
 "label": "3bhk 02 entrance  23rd floor",
 "id": "panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C8E03182_C390_F962_41E3_AA944CB11FB1",
   "class": "AdjacentPanorama",
   "yaw": 123.01,
   "backwardYaw": 146.64,
   "distance": 1
  },
  {
   "panorama": "this.panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034",
   "class": "AdjacentPanorama",
   "yaw": 5.98,
   "backwardYaw": 37.66,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_CBF6E3D4_C63C_F841_41B1_3D0CA7E88D7D",
  "this.overlay_C86EA64D_C633_D843_41D8_D6B51675C99B"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -28.54,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_EE08AE33_C634_4BC7_41DD_AC1979E7440B"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 102.5,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E08C5B87_C634_48CF_41CD_B62B1DC94160"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 34.68,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E0E6CAC6_C634_4841_41DE_6CA3F0029CD9"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 111.03,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E099DB74_C634_4841_41E4_6DAB1B36C2BA"
},
{
 "hfovMax": 130,
 "label": "3bhk bedroom01 33rd",
 "id": "panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068",
   "class": "AdjacentPanorama",
   "yaw": -68.97,
   "backwardYaw": 37.55,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_E7E37E24_C654_4BC2_41E1_8DC9EEC30B49"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -174.02,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E071B970_C634_4841_41D0_18B2EC7D41CD"
},
{
 "hfovMax": 130,
 "label": "3bhk kitchen",
 "id": "panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA",
   "class": "AdjacentPanorama",
   "yaw": 5.82,
   "backwardYaw": -77.5,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_DE130192_C67C_38C1_41C4_0A4C5ECF7BB5"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_camera"
},
{
 "hfovMax": 130,
 "label": "3bhk bedroom02 23rd",
 "id": "panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C8E03182_C390_F962_41E3_AA944CB11FB1",
   "class": "AdjacentPanorama",
   "yaw": -157.27,
   "backwardYaw": -123.79,
   "distance": 1
  },
  {
   "panorama": "this.panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2",
   "class": "AdjacentPanorama",
   "yaw": 33.02,
   "backwardYaw": -61.42,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_D7E43C95_C654_48C3_41D5_D441E8F4B5BE",
  "this.overlay_D78C34B1_C654_58C3_41C3_A038E40060B3"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -175.19,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E1DDCCDD_C634_4843_41B3_DB4B819E7839"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 31.79,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E00DEA98_C634_48C1_41E0_CC737756CA68"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 54.29,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E04D89E9_C634_4843_41E7_DFD925BE9A09"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 21.84,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E006AA7B_C634_4847_41E4_A37025BBF531"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 175.27,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_EE392DEC_C634_4841_41D9_3581372B199F"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 175.16,
  "pitch": -0.27
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 33.34,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E1220C5D_C634_4843_41C3_0D355989E59C"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -142.45,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_EF14164A_C634_7841_41D1_4314BC71E042"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 54.29,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E05029B1_C634_48C3_41E5_F0D48AE1D8A6"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -35.14,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_EEDA3E76_C634_4841_41D7_49B64C9A38B2"
},
{
 "hfovMax": 130,
 "label": "3bhk bedroom03 02 17th",
 "id": "panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A",
   "class": "AdjacentPanorama",
   "yaw": -50.85,
   "backwardYaw": 44.28,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_D7296732_C3F0_99BD_41CD_15546F96B28A"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 114.32,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E04709CD_C634_4843_41D3_7F521BFDADEA"
},
{
 "hfovMax": 130,
 "label": "3bhk bedroom03 01 23rd",
 "id": "panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D",
   "class": "AdjacentPanorama",
   "yaw": 43.8,
   "backwardYaw": -54.9,
   "distance": 1
  },
  {
   "panorama": "this.panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034",
   "class": "AdjacentPanorama"
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_D52AF8AA_C65C_C8C1_41E1_368B77920405",
  "this.overlay_D5F4BE96_C654_C8C1_41E5_91FDE5D191D9"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -145.26,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_EF34460A_C634_7BC1_41E6_C34BBE94A6C2"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 129.15,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E183DD63_C634_4847_41D7_76C9561C5041"
},
{
 "hfovMax": 130,
 "label": "3bhk kitchen",
 "id": "panorama_CF1013BA_C391_98A2_4167_0505D502E364",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A",
   "class": "AdjacentPanorama",
   "yaw": 4.72,
   "backwardYaw": -82.58,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_D178C03E_C3F0_B7A5_41CB_0834EED7746E"
 ],
 "hfov": 360
},
{
 "hfovMax": 130,
 "label": "3bhk bedroom01 28th",
 "id": "panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5",
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_t.jpg",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_t.jpg",
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
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
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A",
   "class": "AdjacentPanorama",
   "yaw": -65.68,
   "backwardYaw": 39.47,
   "distance": 1
  }
 ],
 "class": "Panorama",
 "overlays": [
  "this.overlay_DEEEAE21_C674_CBC3_41DF_981A8131049C"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_camera"
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
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipBorderSize": 1,
 "toolTipPaddingRight": 6,
 "paddingBottom": 0,
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 4,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "toolTipShadowVerticalLength": 0,
 "toolTipPaddingLeft": 6,
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "minHeight": 50,
 "playbackBarLeft": 0,
 "paddingLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadHeight": 15,
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBorderColor": "#000000",
 "displayTooltipInTouchScreens": true,
 "borderSize": 0,
 "minWidth": 100,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "height": "100%",
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBorderColor": "#000000",
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
 "shadow": false,
 "paddingTop": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "transitionMode": "blending",
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarHeadShadowVerticalLength": 0,
 "transitionDuration": 500,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "class": "ViewerArea",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowHorizontalLength": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "data": {
  "name": "Main Viewer"
 },
 "playbackBarHeadShadowHorizontalLength": 0
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B, this.camera_EF34460A_C634_7BC1_41E6_C34BBE94A6C2); this.mainPlayList.set('selectedIndex', 28)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE9B3529_C634_79C3_41E2_6373077866CD",
   "yaw": -49.75,
   "pitch": -33.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 16.22
  }
 ],
 "id": "overlay_DDE3106F_C64C_D85F_41C3_782CF613010E",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -49.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -33.46,
   "hfov": 16.22
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5, this.camera_EE54ADAA_C634_48C1_41E4_9686A8DB1A2E); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE93D51E_C634_79C1_4199_FCDDF2FE4CA6",
   "yaw": 75.99,
   "pitch": -51.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 12.22
  }
 ],
 "id": "overlay_D55AF350_C65C_5841_41E8_2583A752FBE8",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 75.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -51.06,
   "hfov": 12.22
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E097E2_C390_F8A2_419E_45918FB20A48, this.camera_E1908D4C_C634_4841_41DF_E3DE63A847E6); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 318,
      "height": 295
     }
    ]
   },
   "pitch": 7.66,
   "yaw": -148.21,
   "hfov": 22.75
  }
 ],
 "id": "overlay_DF50E086_C674_38C1_41C4_7464DFF3A926",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -148.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": 7.66,
   "hfov": 22.75
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5, this.camera_E1AECD34_C634_49C1_41B7_AB0D5E5748A2); this.mainPlayList.set('selectedIndex', 27)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE9D7527_C634_79CF_41D8_0EE7C8EAC465",
   "yaw": -21.75,
   "pitch": -37.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 15.34
  }
 ],
 "id": "overlay_DFC10996_C674_48CE_41D4_631A257C6571",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -21.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -37.88,
   "hfov": 15.34
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4, this.camera_E1071C92_C634_48C1_41C5_DD2D3654C192); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE95B51A_C634_79C1_41AA_C27846BCCE73",
   "yaw": 146.64,
   "pitch": -26.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 10.89
  }
 ],
 "id": "overlay_C8D35665_C635_D843_41C9_9D8B672250E4",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 146.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -26.96,
   "hfov": 10.89
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590, this.camera_E1F82CB8_C634_48C1_41D4_F6F2BA962840); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_1_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 171,
      "height": 171
     }
    ]
   },
   "pitch": -0.53,
   "yaw": -123.79,
   "hfov": 10.3
  }
 ],
 "id": "overlay_C90800DC_C634_F841_41DC_32CC6E30E91E",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -123.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.53,
   "hfov": 10.3
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5, this.camera_E109CCA6_C634_48C1_41AF_35252867FAD5); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01 Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE94B51B_C634_79C7_41E7_DF3C12E87276",
   "yaw": 135.94,
   "pitch": 2.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "hfov": 6.99
  }
 ],
 "id": "overlay_C9007F6B_C637_C847_41AC_9B1840EF4CA4",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 135.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 2.63,
   "hfov": 6.99
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_E609D5D6_C65C_5841_41DC_4408506ECD34, this.camera_EE9F6ED5_C634_4843_41E4_F918BFD63697); this.mainPlayList.set('selectedIndex', 39)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE982534_C634_79C1_41B1_FCE0D32794A2",
   "yaw": -81.21,
   "pitch": -49.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 7.36
  }
 ],
 "id": "overlay_D8F8C72D_C654_79C3_41E0_91645FDFE3E3",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -81.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -49.95,
   "hfov": 7.36
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0, this.camera_EE8F4EED_C634_4843_41E1_CC60AACFBB91); this.mainPlayList.set('selectedIndex', 37)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_1_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 196,
      "height": 204
     }
    ]
   },
   "pitch": 1.93,
   "yaw": 34.3,
   "hfov": 14.16
  }
 ],
 "id": "overlay_D9A2C71D_C65C_79C3_41E6_11CD592B17BA",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 34.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 15,
      "height": 16
     }
    ]
   },
   "pitch": 1.93,
   "hfov": 14.16
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D, this.camera_EF7E3F06_C634_49C1_41E0_B9EF25C359C9); this.mainPlayList.set('selectedIndex', 30)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE992535_C634_79C3_41CC_0F82C39BF420",
   "yaw": -4.73,
   "pitch": -22.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 13.37
  }
 ],
 "id": "overlay_E657F276_C65C_D841_41A5_62C616D8BAE0",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -4.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -22.75,
   "hfov": 13.37
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4, this.camera_E183DD63_C634_4847_41D7_76C9561C5041); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE973518_C634_79C1_41B1_D4F6FE4DD0CE",
   "yaw": 44.28,
   "pitch": -33.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 16.28
  }
 ],
 "id": "overlay_D7B8A38F_C3F7_B962_4174_75177DEADA11",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 44.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -33.11,
   "hfov": 16.28
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A, this.camera_EE726D7B_C634_4847_41E1_81E838863A02); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_1_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 204,
      "height": 212
     }
    ]
   },
   "pitch": 2.75,
   "yaw": 153.25,
   "hfov": 14.7
  }
 ],
 "id": "overlay_D7F45601_C3F0_BB5E_41C2_C0C993F67D5C",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 153.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 2.75,
   "hfov": 14.7
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9, this.camera_EE190E1B_C634_4BC7_41C1_5EB318D81DB5); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE9E7522_C634_79C1_41D2_BDC23086CB3A",
   "yaw": -77.5,
   "pitch": -43.34,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 13.71
  }
 ],
 "id": "overlay_D0EB7FEB_C674_4847_41D1_C5CAD7EE65EC",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -77.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -43.34,
   "hfov": 13.71
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4, this.camera_EE29FE03_C634_4BC7_41B4_93BCB371FFE9); this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE9FE523_C634_79C7_41DF_1F6FC3B5DE01",
   "yaw": -4.73,
   "pitch": -20.55,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 14.6
  }
 ],
 "id": "overlay_D17567AD_C674_58C3_41C9_B73C22230BA4",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -4.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -20.55,
   "hfov": 14.6
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B, this.camera_EE08AE33_C634_4BC7_41DD_AC1979E7440B); this.mainPlayList.set('selectedIndex', 28)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_1_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 212,
      "height": 200
     }
    ]
   },
   "pitch": 5.08,
   "yaw": 35.45,
   "hfov": 15.2
  }
 ],
 "id": "overlay_D11844E5_C674_7843_41DB_71EEDEBF776A",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 35.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 5.08,
   "hfov": 15.2
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A, this.camera_E006AA7B_C634_4847_41E4_A37025BBF531); this.mainPlayList.set('selectedIndex', 24)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 171,
      "height": 171
     }
    ]
   },
   "pitch": 0.5,
   "yaw": -125.71,
   "hfov": 10.3
  }
 ],
 "id": "overlay_D3405AA1_C64C_48C3_41AC_D04C40137A31",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -125.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.5,
   "hfov": 10.3
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4, this.camera_E010FA62_C634_4841_41E1_434FB51BBFD2); this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE9EA521_C634_79C3_41CB_87B2F5C5B2E2",
   "yaw": 153.23,
   "pitch": -31.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 15.79
  }
 ],
 "id": "overlay_D3F9A377_C64C_384F_41A6_37339C461757",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 153.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -31.56,
   "hfov": 15.79
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0, this.camera_E00DEA98_C634_48C1_41E0_CC737756CA68); this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01 Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE9E2522_C634_79C1_41C5_07C0CEC09C22",
   "yaw": 136.48,
   "pitch": 4.68,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "hfov": 10.26
  }
 ],
 "id": "overlay_D3B6FDAD_C64C_48C3_41CA_3934E98FB99D",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 136.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 4.68,
   "hfov": 10.26
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594, this.camera_E16A1BDF_C634_487F_41E3_85C3B001236C); this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE9B5530_C634_79C1_41B4_11C1132B83F0",
   "yaw": 127.47,
   "pitch": -31.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 13.53
  }
 ],
 "id": "overlay_DDAC91FB_C64C_3847_41DE_4E8AC2FC381D",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 127.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -31.53,
   "hfov": 13.53
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E84376_C391_79A5_41A5_D6230668BC5C, this.camera_E15C7BFC_C634_4841_41C4_783EFD5CBA87); this.mainPlayList.set('selectedIndex', 32)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE98C530_C634_79C1_41E2_5F0839D67BE3",
   "yaw": 6.08,
   "pitch": -19.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 13.42
  }
 ],
 "id": "overlay_DA2CFE08_C64C_4BC1_41C2_4C4C28E16DA7",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 6.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -19.3,
   "hfov": 13.42
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590, this.camera_E1EAFCCB_C634_4847_41E1_216A9DF23FF6); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE92251D_C634_79C3_41D0_BCD536C9B445",
   "yaw": -61.42,
   "pitch": -33.44,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 13.24
  }
 ],
 "id": "overlay_D4424B68_C654_C841_41AA_04E4BDB57422",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -61.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -33.44,
   "hfov": 13.24
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0, this.camera_EF246629_C634_7BC3_4189_E62D4629BFB0); this.mainPlayList.set('selectedIndex', 37)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE85E53C_C634_79C1_41DB_7F3562B22FD2",
   "yaw": -49.96,
   "pitch": -32.43,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 16.41
  }
 ],
 "id": "overlay_E24DF921_C64C_C9C3_41E0_1DE050A43B4D",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -49.96,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -32.43,
   "hfov": 16.41
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E03182_C390_F962_41E3_AA944CB11FB1, this.camera_EF6E2F18_C634_49C1_41D9_B21333E6D4BE); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 280,
      "height": 330
     }
    ]
   },
   "pitch": 0.66,
   "yaw": -145.19,
   "hfov": 20.21
  }
 ],
 "id": "overlay_D409C066_C655_F841_41C2_9E382AAA888D",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -145.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 18
     }
    ]
   },
   "pitch": 0.66,
   "hfov": 20.21
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9, this.camera_EF51BF2F_C634_49DF_41A5_FAA0CC321B0B); this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE93A51E_C634_79C1_41E1_1FE79DE4D4E8",
   "yaw": -20.79,
   "pitch": -33.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 16.2
  }
 ],
 "id": "overlay_D4F58EF9_C654_C843_41C9_E71581556A11",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -20.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -33.56,
   "hfov": 16.2
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594, this.camera_EE640D93_C634_48C7_41D3_2C2E10E3E0D0); this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 269,
      "height": 311
     }
    ]
   },
   "pitch": -0.85,
   "yaw": -145.32,
   "hfov": 19.38
  }
 ],
 "id": "overlay_E468F0B7_C654_58CF_41DE_C89AEED028EF",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -145.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 18
     }
    ]
   },
   "pitch": -0.85,
   "hfov": 19.38
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 36)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE872539_C634_79C3_41C0_5F139E4D450B",
   "yaw": -26.28,
   "pitch": -36.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 15.67
  }
 ],
 "id": "overlay_E4E80CAC_C657_C8C1_41D8_7F180578F07D",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -26.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -36.3,
   "hfov": 15.67
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5, this.camera_EEEA1E63_C634_4847_41E0_E79012B84E2A); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE96F517_C634_79CF_41DD_B98B1CDAC4EF",
   "yaw": -64.1,
   "pitch": -30.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 14.14
  }
 ],
 "id": "overlay_D1422BDB_C3F3_88E2_41BD_FA3D9EE50658",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -64.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -30.57,
   "hfov": 14.14
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40, this.camera_E026BA22_C634_4BC1_41E7_88365E2E8EDB); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE960517_C634_79CE_41A3_AD59E10D5AB0",
   "yaw": -21.06,
   "pitch": -34.59,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 11.71
  }
 ],
 "id": "overlay_D0840BD8_C3F0_88ED_41D5_401F4C1D0F9A",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -21.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -34.59,
   "hfov": 11.71
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B, this.camera_E02DEA42_C634_4841_41E3_06B771498351); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_1_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 318,
      "height": 349
     }
    ]
   },
   "pitch": -0.47,
   "yaw": -146.66,
   "hfov": 22.95
  }
 ],
 "id": "overlay_D0C5DA7D_C3F1_8BA7_41D0_40EE562498C3",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -146.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 17
     }
    ]
   },
   "pitch": -0.47,
   "hfov": 22.95
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E097E2_C390_F8A2_419E_45918FB20A48, this.camera_EE367DD4_C634_4841_41DD_846FABE2F8B5); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE904520_C634_79C1_41D2_C80236AFDEAF",
   "yaw": 127.05,
   "pitch": -33.59,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 11.62
  }
 ],
 "id": "overlay_D23040EA_C64C_D841_41DD_F09C37DF4C5B",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 127.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -33.59,
   "hfov": 11.62
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA, this.camera_EE392DEC_C634_4841_41D9_3581372B199F); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE91C521_C634_79C3_41CC_F17162481F82",
   "yaw": 6.94,
   "pitch": -20.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 11.23
  }
 ],
 "id": "overlay_D29C36D7_C64C_384F_41E4_FDFADB56E550",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 6.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -20.96,
   "hfov": 11.23
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9, this.camera_EF4225DF_C634_787F_4195_AF6511CB5D5F); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE978518_C634_79C1_41BF_08456E54B1D1",
   "yaw": 88.82,
   "pitch": -42.82,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 14.26
  }
 ],
 "id": "overlay_D06F55C7_C3F0_98E2_41E3_464100BECDC1",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 88.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -42.82,
   "hfov": 14.26
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034, this.camera_EEF8EE4B_C634_4847_41E6_294B78C8FFCC); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE95D51C_C634_79C1_41D1_15DF599FD598",
   "yaw": 6.37,
   "pitch": -34.85,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 9.39
  }
 ],
 "id": "overlay_D6BEFA7F_C64C_483F_41C3_9F7466FB8F67",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 6.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -34.85,
   "hfov": 9.39
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA, this.camera_E38E094A_C634_4841_41E3_AE39645BEC95); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE94D51C_C634_79C1_41DC_732DA7699835",
   "yaw": -80.93,
   "pitch": -46.66,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 7.85
  }
 ],
 "id": "overlay_D6A133C2_C634_D841_41E3_3F1875A05CAD",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -80.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -46.66,
   "hfov": 7.85
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4, this.camera_E388795D_C634_4843_41E2_FDA655F61E6D); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_1_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 150,
      "height": 150
     }
    ]
   },
   "pitch": 2.2,
   "yaw": 37.66,
   "hfov": 10.86
  }
 ],
 "id": "overlay_D78B856A_C635_D841_41D8_38F24CF45E90",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 37.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 2.2,
   "hfov": 10.86
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4, this.camera_E071B970_C634_4841_41D0_18B2EC7D41CD); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE95A51C_C634_79C1_41E7_4B60BD608A25",
   "yaw": -4.32,
   "pitch": -22.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 12.16
  }
 ],
 "id": "overlay_D6DCC2CE_C634_F841_41DB_C74AF57B3D08",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -4.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -22.06,
   "hfov": 12.16
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA, this.camera_E0ACDB4E_C634_4841_41C3_338DFE1B5FF5); this.mainPlayList.set('selectedIndex', 38)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE84253B_C634_79C7_41E0_968E01AFCA33",
   "yaw": 37.62,
   "pitch": -30.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 16.71
  }
 ],
 "id": "overlay_E54E0653_C654_5847_41E2_4F2F79E153AD",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 37.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -30.71,
   "hfov": 16.71
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E84376_C391_79A5_41A5_D6230668BC5C, this.camera_E0B9CB3B_C634_49C7_41D4_8C09A90F84FB); this.mainPlayList.set('selectedIndex', 32)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_1_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 234,
      "height": 208
     }
    ]
   },
   "pitch": 2.34,
   "yaw": 152.97,
   "hfov": 16.9
  }
 ],
 "id": "overlay_E5F8F5BF_C654_583F_41E0_5A5263ACE886",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 152.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 18,
      "height": 16
     }
    ]
   },
   "pitch": 2.34,
   "hfov": 16.9
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B, this.camera_E04D89E9_C634_4843_41E7_DFD925BE9A09); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 150,
      "height": 150
     }
    ]
   },
   "pitch": 3.3,
   "yaw": -158.37,
   "hfov": 10.85
  }
 ],
 "id": "overlay_D0FEC682_C3F1_BB62_41D4_9102F3B6D6C5",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -158.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 3.3,
   "hfov": 10.85
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23, this.camera_E030FA03_C634_4BC7_41B3_5F147DC59923); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE96A517_C634_79CF_41BB_38AC08D7DC61",
   "yaw": 35.42,
   "pitch": -36.82,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 12.93
  }
 ],
 "id": "overlay_D09F0370_C3F0_99BE_41E4_9F144A073A5D",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 35.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -36.82,
   "hfov": 12.93
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE84853A_C634_79C1_41DD_0215F77B0541",
   "yaw": 84.77,
   "pitch": -51.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 12.22
  }
 ],
 "id": "overlay_E483FB4F_C654_C85F_41D6_EB69928269D3",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 84.77,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -51.06,
   "hfov": 12.22
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA, this.camera_E0B32B29_C634_49C3_41BB_6F6C5B20DEE9); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 231,
      "height": 246
     }
    ]
   },
   "pitch": 5.63,
   "yaw": 151.46,
   "hfov": 16.56
  }
 ],
 "id": "overlay_DC0C8682_C673_D8C1_41C9_3F738D8FB7A5",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 151.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 17
     }
    ]
   },
   "pitch": 5.63,
   "hfov": 16.56
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6, this.camera_E0CCEB16_C634_49C1_41E3_75ADFF23439A); this.mainPlayList.set('selectedIndex', 29)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE9BB528_C634_79C1_41B3_1F353BE8FDD6",
   "yaw": 34.74,
   "pitch": -31.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 16.59
  }
 ],
 "id": "overlay_DC8E5D89_C64C_48C3_41D0_5E147F703183",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 34.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -31.4,
   "hfov": 16.59
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7, this.camera_E0676983_C634_48C7_41C6_5A37C2205DE5); this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE902520_C634_79C1_41BF_257FBF304234",
   "yaw": -54.9,
   "pitch": -32.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 16.46
  }
 ],
 "id": "overlay_D25D23DA_C655_D841_41D7_0482A8407978",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -54.9,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -32.15,
   "hfov": 16.46
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF, this.camera_E141DC21_C634_4FC3_41E5_C8C5F6EC4815); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EEAB6513_C634_79C7_41C5_016AAFA35151",
   "yaw": 144.86,
   "pitch": -29.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 16.15
  }
 ],
 "id": "overlay_D3E76ABF_C3F1_88A2_41C2_2B986BB16AE4",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 144.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -29.36,
   "hfov": 16.15
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5, this.camera_E1333C43_C634_4847_41D8_CAAD98001FA4); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_1_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 171,
      "height": 171
     }
    ]
   },
   "pitch": 1.53,
   "yaw": -125.71,
   "hfov": 10.29
  }
 ],
 "id": "overlay_D33D2D6F_C3F0_89A3_41A0_BD4E7B18DF22",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -125.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.53,
   "hfov": 10.29
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9, this.camera_E1220C5D_C634_4843_41C3_0D355989E59C); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01 Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EEA8F514_C634_79C1_41D2_016258F6485B",
   "yaw": 135.92,
   "pitch": 0.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "hfov": 8.1
  }
 ],
 "id": "overlay_D20E9669_C3F1_BBAF_41DD_B912974B3B2A",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 135.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.02,
   "hfov": 8.1
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068, this.camera_E0F27AAD_C634_48C3_41E0_EFB86597E2EF); this.mainPlayList.set('selectedIndex', 33)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 212,
      "height": 199
     }
    ]
   },
   "pitch": 0.84,
   "yaw": -124.51,
   "hfov": 12.77
  }
 ],
 "id": "overlay_DAD97D83_C654_48C7_41B7_5C3CD58749B6",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -124.51,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": 0.84,
   "hfov": 12.77
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D, this.camera_E0EF4ADA_C634_4841_41D3_BEEDBF4CA79D); this.mainPlayList.set('selectedIndex', 30)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE99E532_C634_79C1_41D6_1B017FB56B5D",
   "yaw": 144.86,
   "pitch": -29.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 16.18
  }
 ],
 "id": "overlay_DB45F6D9_C654_3843_41E0_655C9315E778",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 144.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -29.15,
   "hfov": 16.18
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A, this.camera_E0E6CAC6_C634_4841_41DE_6CA3F0029CD9); this.mainPlayList.set('selectedIndex', 35)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01 Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE98B533_C634_79C7_41CE_E8F5D45B1A6B",
   "yaw": 136.35,
   "pitch": 4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "hfov": 8.35
  }
 ],
 "id": "overlay_DBC73BCC_C654_4841_41C6_2F8A5000FCD7",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 136.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 4,
   "hfov": 8.35
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E097E2_C390_F8A2_419E_45918FB20A48, this.camera_E05029B1_C634_48C3_41E5_F0D48AE1D8A6); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 150,
      "height": 150
     }
    ]
   },
   "pitch": 1.24,
   "yaw": -158.16,
   "hfov": 10.87
  }
 ],
 "id": "overlay_DE78BD94_C67C_48C1_41E0_19E3E3F56405",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -158.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.24,
   "hfov": 10.87
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5, this.camera_E04709CD_C634_4843_41D3_7F521BFDADEA); this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE9C0525_C634_79C3_41E5_176E60E12F40",
   "yaw": 39.47,
   "pitch": -36.48,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 15.63
  }
 ],
 "id": "overlay_DEFD2A97_C674_C8CF_41E4_A52F962F63C7",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 39.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -36.48,
   "hfov": 15.63
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0, this.camera_EE46FDBD_C634_48C3_41DB_884006ACDF4F); this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE9AE527_C634_79CF_41CB_542FF5E39B28",
   "yaw": 88.07,
   "pitch": -53.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 11.55
  }
 ],
 "id": "overlay_DFA742CC_C674_3841_419D_AB7849550207",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 88.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -53.53,
   "hfov": 11.55
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B, this.camera_EEDA3E76_C634_4841_41D7_49B64C9A38B2); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EEAAA508_C634_79C1_41D8_AB01FEA3A2FF",
   "yaw": 125.82,
   "pitch": -30.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 10.41
  }
 ],
 "id": "overlay_CC924D89_C3F3_896E_41E4_09D608EE2A76",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 125.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -30.02,
   "hfov": 10.41
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A, this.camera_EECD9E8E_C634_48C1_41D3_14E7AD483038); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EEAB0513_C634_79C7_41E1_6DABE2DBB8E8",
   "yaw": 4.81,
   "pitch": -20.07,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 11.55
  }
 ],
 "id": "overlay_CC66AADF_C3F0_88E3_41D2_C7310A6919B1",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 4.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -20.07,
   "hfov": 11.55
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594, this.camera_E0922B63_C634_4847_41E2_417AA41BCC32); this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 250,
      "height": 261
     }
    ]
   },
   "pitch": 1.24,
   "yaw": -157.54,
   "hfov": 18.01
  }
 ],
 "id": "overlay_E6C34BC9_C65D_C843_41E3_37D707F31C56",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -157.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.24,
   "hfov": 18.01
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D, this.camera_E099DB74_C634_4841_41E4_6DAB1B36C2BA); this.mainPlayList.set('selectedIndex', 34)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE868537_C634_79CF_41DE_C101E360270A",
   "yaw": 37.55,
   "pitch": -38.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 15.24
  }
 ],
 "id": "overlay_E7577260_C65C_7843_41E0_F5DDAEA8A5BD",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 37.55,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -38.4,
   "hfov": 15.24
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF, this.camera_E1DDCCDD_C634_4843_41B3_DB4B819E7839); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EEA83515_C634_79C3_41D3_CD95A4DC902C",
   "yaw": -5.35,
   "pitch": -22.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 17.95
  }
 ],
 "id": "overlay_D2F533D4_C3F3_98E5_41DC_C06241682CEA",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -5.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -22.61,
   "hfov": 17.95
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CF1013BA_C391_98A2_4167_0505D502E364, this.camera_E1BE5D1C_C634_49C1_41D0_30F480EEE912); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EEA85515_C634_79C3_41E0_6091C7CEDAF8",
   "yaw": -82.58,
   "pitch": -45.01,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 8.09
  }
 ],
 "id": "overlay_D20E5953_C3F1_89E3_41E2_DE390783024A",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -82.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -45.01,
   "hfov": 8.09
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A, this.camera_E1CD8D08_C634_49C1_41C2_9478EB568618); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_1_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 150,
      "height": 150
     }
    ]
   },
   "pitch": 3.3,
   "yaw": 35.46,
   "hfov": 10.85
  }
 ],
 "id": "overlay_D181A890_C3F0_977D_41E6_810868AFA24B",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 35.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 3.3,
   "hfov": 10.85
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E84376_C391_79A5_41A5_D6230668BC5C, this.camera_E1143C7C_C634_4841_41E4_31B4C0C02E96); this.mainPlayList.set('selectedIndex', 32)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE85753D_C634_79C3_41D0_D071D6C1482E",
   "yaw": 6.37,
   "pitch": -29.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 10
  }
 ],
 "id": "overlay_E2FE88E0_C64D_C841_41C3_2E195A899599",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 6.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -29.08,
   "hfov": 10
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E03182_C390_F962_41E3_AA944CB11FB1, this.camera_EEBC5EA6_C634_48C1_41D0_EBDC5E483C32); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE94F519_C634_79C3_41E7_CF7F35AA8B57",
   "yaw": 123.01,
   "pitch": -31.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 16.62
  }
 ],
 "id": "overlay_CBF6E3D4_C63C_F841_41B1_3D0CA7E88D7D",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 123.01,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -31.26,
   "hfov": 16.62
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034, this.camera_EEADBEBD_C634_48C3_41AB_F32467362AD4); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE94651A_C634_79C1_41C0_7213AD55ED9D",
   "yaw": 5.98,
   "pitch": -19.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 10.02
  }
 ],
 "id": "overlay_C86EA64D_C633_D843_41D8_D6B51675C99B",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 5.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -19.87,
   "hfov": 10.02
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068, this.camera_EF14164A_C634_7841_41D1_4314BC71E042); this.mainPlayList.set('selectedIndex', 33)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE861538_C634_79C1_41E5_D5BEC86A2DD1",
   "yaw": -68.97,
   "pitch": -37.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 11.47
  }
 ],
 "id": "overlay_E7E37E24_C654_4BC2_41E1_8DC9EEC30B49",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -68.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -37.71,
   "hfov": 11.47
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA, this.camera_E08C5B87_C634_48CF_41CD_B62B1DC94160); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE9F5524_C634_79C1_4151_C56E80BD365E",
   "yaw": 5.82,
   "pitch": -29.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 9.97
  }
 ],
 "id": "overlay_DE130192_C67C_38C1_41C4_0A4C5ECF7BB5",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 5.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -29.36,
   "hfov": 9.97
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E03182_C390_F962_41E3_AA944CB11FB1, this.camera_E1722BA3_C634_48C7_41E3_3A673E80331B); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 150,
      "height": 150
     }
    ]
   },
   "pitch": 4.95,
   "yaw": -157.27,
   "hfov": 10.83
  }
 ],
 "id": "overlay_D7E43C95_C654_48C3_41D5_D441E8F4B5BE",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -157.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 4.95,
   "hfov": 10.83
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2, this.camera_E1661BC3_C634_4847_41C9_B2BE73D63400); this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE92B51D_C634_79C3_41E6_BF230F987FF4",
   "yaw": 33.02,
   "pitch": -34.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 11.91
  }
 ],
 "id": "overlay_D78C34B1_C654_58C3_41C3_A038E40060B3",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 33.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -34.76,
   "hfov": 11.91
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A, this.camera_E06DE995_C634_48C3_41D1_535253561EDE); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE94B519_C634_79C3_41E2_987DBE2A3C20",
   "yaw": -50.85,
   "pitch": -32.43,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 16.41
  }
 ],
 "id": "overlay_D7296732_C3F0_99BD_41CD_15546F96B28A",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -50.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -32.43,
   "hfov": 16.41
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 223,
      "height": 219
     }
    ]
   },
   "pitch": 1.1,
   "yaw": 151.74,
   "hfov": 16.09
  }
 ],
 "id": "overlay_D52AF8AA_C65C_C8C1_41E1_368B77920405",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 151.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.1,
   "hfov": 16.09
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D, this.camera_E0C63B02_C634_49C1_41D7_8A9CEDE70A8D); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE90B51F_C634_79FF_41C5_A79C01C84446",
   "yaw": 43.8,
   "pitch": -29.41,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 16.94
  }
 ],
 "id": "overlay_D5F4BE96_C654_C8C1_41E5_91FDE5D191D9",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 43.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -29.41,
   "hfov": 16.94
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A, this.camera_E0D3AAEF_C634_485F_41B8_9064BABE05A2); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EEA93516_C634_79C1_41D5_E7DFC2676D36",
   "yaw": 4.72,
   "pitch": -30.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 9.87
  }
 ],
 "id": "overlay_D178C03E_C3F0_B7A5_41CB_0834EED7746E",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 4.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -30.32,
   "hfov": 9.87
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A, this.camera_EF407F48_C634_4841_41D6_84F72201ADA1); this.mainPlayList.set('selectedIndex', 24)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE9D8526_C634_79C1_41D1_BFDADEF90055",
   "yaw": -65.68,
   "pitch": -39.22,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 11.23
  }
 ],
 "id": "overlay_DEEEAE21_C674_CBC3_41DF_981A8131049C",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -65.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -39.22,
   "hfov": 11.23
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE9B3529_C634_79C3_41E2_6373077866CD",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE93D51E_C634_79C1_4199_FCDDF2FE4CA6",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE9D7527_C634_79CF_41D8_0EE7C8EAC465",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE95B51A_C634_79C1_41AA_C27846BCCE73",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_EE94B51B_C634_79C7_41E7_DF3C12E87276",
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_C8E03182_C390_F962_41E3_AA944CB11FB1_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_EE982534_C634_79C1_41B1_FCE0D32794A2",
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE992535_C634_79C3_41CC_0F82C39BF420",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8E84376_C391_79A5_41A5_D6230668BC5C_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE973518_C634_79C1_41B1_D4F6FE4DD0CE",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_EE9E7522_C634_79C1_41D2_BDC23086CB3A",
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE9FE523_C634_79C7_41DF_1F6FC3B5DE01",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8E8EEF1_C391_88BE_41E1_593F441770DA_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE9EA521_C634_79C3_41CB_87B2F5C5B2E2",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_EE9E2522_C634_79C1_41C5_07C0CEC09C22",
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_C8E097E2_C390_F8A2_419E_45918FB20A48_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE9B5530_C634_79C1_41B4_11C1132B83F0",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE98C530_C634_79C1_41E2_5F0839D67BE3",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8E1F231_C38F_9BBF_41C7_8B73F57AA26D_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE92251D_C634_79C3_41D0_BCD536C9B445",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE85E53C_C634_79C1_41DB_7F3562B22FD2",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE93A51E_C634_79C1_41E1_1FE79DE4D4E8",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE872539_C634_79C3_41C0_5F139E4D450B",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE96F517_C634_79CF_41DD_B98B1CDAC4EF",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE960517_C634_79CE_41A3_AD59E10D5AB0",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE904520_C634_79C1_41D2_C80236AFDEAF",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE91C521_C634_79C3_41CC_F17162481F82",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8E21D8B_C38F_8962_41E8_4ED88E72A8E4_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE978518_C634_79C1_41BF_08456E54B1D1",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_EE95D51C_C634_79C1_41D1_15DF599FD598",
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_EE94D51C_C634_79C1_41DC_732DA7699835",
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE95A51C_C634_79C1_41E7_4B60BD608A25",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8E759F9_C391_88AE_41D0_5C4EF78B7034_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE84253B_C634_79C7_41E0_968E01AFCA33",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE96A517_C634_79CF_41BB_38AC08D7DC61",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE84853A_C634_79C1_41DD_0215F77B0541",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE9BB528_C634_79C1_41B3_1F353BE8FDD6",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE902520_C634_79C1_41BF_257FBF304234",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EEAB6513_C634_79C7_41C5_016AAFA35151",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_EEA8F514_C634_79C1_41D2_016258F6485B",
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_C8443AAC_C390_88A6_41E1_B9756BC8A56B_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE99E532_C634_79C1_41D6_1B017FB56B5D",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_EE98B533_C634_79C7_41CE_E8F5D45B1A6B",
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_C8E07E20_C390_8B5D_41D7_DBEAC9716594_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE9C0525_C634_79C3_41E5_176E60E12F40",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE9AE527_C634_79CF_41CB_542FF5E39B28",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EEAAA508_C634_79C1_41D8_AB01FEA3A2FF",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EEAB0513_C634_79C7_41E1_6DABE2DBB8E8",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE868537_C634_79CF_41DE_C101E360270A",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EEA83515_C634_79C3_41D3_CD95A4DC902C",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_EEA85515_C634_79C3_41E0_6091C7CEDAF8",
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_EE85753D_C634_79C3_41D0_D071D6C1482E",
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE94F519_C634_79C3_41E7_CF7F35AA8B57",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE94651A_C634_79C1_41C0_7213AD55ED9D",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C845D458_C38F_7FEE_41AF_209B05ABC3B4_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE861538_C634_79C1_41E5_D5BEC86A2DD1",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_EE9F5524_C634_79C1_4151_C56E80BD365E",
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE92B51D_C634_79C3_41E6_BF230F987FF4",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE94B519_C634_79C3_41E2_987DBE2A3C20",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE90B51F_C634_79FF_41C5_A79C01C84446",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_EEA93516_C634_79C1_41D5_E7DFC2676D36",
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_EE9D8526_C634_79C1_41D1_BFDADEF90055",
 "rowCount": 5,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
}],
 "backgroundPreloadEnabled": true,
 "vrPolyfillScale": 0.5,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "mouseWheelEnabled": true,
 "gap": 10,
 "data": {
  "name": "Player1235"
 },
 "paddingTop": 0
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
