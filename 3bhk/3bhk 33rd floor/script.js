(function(){
    var script = {
 "mouseWheelEnabled": true,
 "backgroundPreloadEnabled": true,
 "defaultVRPointer": "laser",
 "paddingTop": 0,
 "id": "rootPlayer",
 "start": "this.init()",
 "paddingLeft": 0,
 "children": [
  "this.MainViewer"
 ],
 "scrollBarMargin": 2,
 "scripts": {
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "registerKey": function(key, value){  window[key] = value; },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "getKey": function(key){  return window[key]; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "unregisterKey": function(key){  delete window[key]; },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "existsKey": function(key){  return key in window; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } }
 },
 "minHeight": 20,
 "contentOpaque": false,
 "shadow": false,
 "layout": "absolute",
 "width": "100%",
 "paddingBottom": 0,
 "downloadEnabled": false,
 "borderRadius": 0,
 "minWidth": 20,
 "borderSize": 0,
 "verticalAlign": "top",
 "desktopMipmappingEnabled": false,
 "propagateClick": false,
 "scrollBarWidth": 10,
 "height": "100%",
 "overflow": "visible",
 "definitions": [{
 "vfov": 180,
 "label": "3bhk_360_106_33 rd floor",
 "id": "panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552",
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552_0/b/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552_0/b/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552_0/b/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552_0/f/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552_0/f/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552_0/f/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552_0/u/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552_0/u/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552_0/u/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552_0/r/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552_0/r/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552_0/r/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552_0/d/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552_0/d/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552_0/d/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552_0/l/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552_0/l/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552_0/l/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "partial": false,
 "hfovMax": 130,
 "pitch": 0,
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": 137.04,
   "backwardYaw": -54.49,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537"
  },
  {
   "distance": 1,
   "yaw": -126.73,
   "backwardYaw": -158.49,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62"
  },
  {
   "distance": 1,
   "yaw": 149.66,
   "backwardYaw": 128.42,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD"
  }
 ],
 "overlays": [
  "this.overlay_A3B4E818_AD6D_3C7C_41C9_C0617EE0B5FE",
  "this.overlay_A3961005_AD6E_CC54_41D3_A2783F1E82D9",
  "this.overlay_A3992A4E_AD6F_5CD4_41E5_6E82D68F9A81"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552_t.jpg",
 "class": "Panorama"
},
{
 "vfov": 180,
 "label": "3bhk_bedroom02_106",
 "id": "panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62",
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62_0/b/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62_0/b/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62_0/b/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62_0/f/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62_0/f/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62_0/f/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62_0/u/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62_0/u/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62_0/u/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62_0/r/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62_0/r/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62_0/r/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62_0/d/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62_0/d/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62_0/d/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62_0/l/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62_0/l/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62_0/l/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "partial": false,
 "hfovMax": 130,
 "pitch": 0,
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -158.49,
   "backwardYaw": -126.73,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552"
  },
  {
   "distance": 1,
   "yaw": 36.73,
   "backwardYaw": -68.54,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A632C963_AD65_7CD3_41BE_F3540463449D"
  }
 ],
 "overlays": [
  "this.overlay_BD2CFEFA_AD65_75BC_41C7_CD1EB6166FFB",
  "this.overlay_BD024314_AD65_CC74_41C3_77C38F86BF6F"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62_t.jpg",
 "class": "Panorama"
},
{
 "displayPlaybackBar": true,
 "gyroscopeVerticalDraggingEnabled": true,
 "touchControlMode": "drag_rotation",
 "viewerArea": "this.MainViewer",
 "id": "MainViewerPanoramaPlayer",
 "class": "PanoramaPlayer",
 "gyroscopeEnabled": true,
 "mouseControlMode": "drag_rotation"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_B5D27E7C_B82D_F001_41E1_44EFF11B55E1",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -114.63,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_B5571DCA_B82D_F006_41D4_F93D59DAB3BD",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 174.14,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "3bhk_bedroom03_02106",
 "id": "panorama_A78AF8FB_AD6B_7DBC_41D3_545D325A7873",
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_A78AF8FB_AD6B_7DBC_41D3_545D325A7873_0/b/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A78AF8FB_AD6B_7DBC_41D3_545D325A7873_0/b/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A78AF8FB_AD6B_7DBC_41D3_545D325A7873_0/b/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_A78AF8FB_AD6B_7DBC_41D3_545D325A7873_0/f/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A78AF8FB_AD6B_7DBC_41D3_545D325A7873_0/f/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A78AF8FB_AD6B_7DBC_41D3_545D325A7873_0/f/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A78AF8FB_AD6B_7DBC_41D3_545D325A7873_0/u/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A78AF8FB_AD6B_7DBC_41D3_545D325A7873_0/u/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A78AF8FB_AD6B_7DBC_41D3_545D325A7873_0/u/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A78AF8FB_AD6B_7DBC_41D3_545D325A7873_0/r/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A78AF8FB_AD6B_7DBC_41D3_545D325A7873_0/r/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A78AF8FB_AD6B_7DBC_41D3_545D325A7873_0/r/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A78AF8FB_AD6B_7DBC_41D3_545D325A7873_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A78AF8FB_AD6B_7DBC_41D3_545D325A7873_0/d/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A78AF8FB_AD6B_7DBC_41D3_545D325A7873_0/d/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A78AF8FB_AD6B_7DBC_41D3_545D325A7873_0/d/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A78AF8FB_AD6B_7DBC_41D3_545D325A7873_0/l/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A78AF8FB_AD6B_7DBC_41D3_545D325A7873_0/l/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A78AF8FB_AD6B_7DBC_41D3_545D325A7873_0/l/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "partial": false,
 "hfovMax": 130,
 "pitch": 0,
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -47.18,
   "backwardYaw": 37.73,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A62D1484_AD6B_7454_41D1_22B1836B8069"
  }
 ],
 "overlays": [
  "this.overlay_BC0E2211_AD7D_4C4C_41CC_FB487167A3E3"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_A78AF8FB_AD6B_7DBC_41D3_545D325A7873_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_B594FE12_B82D_F006_41E3_8D4A2A001075",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 21.51,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_B52E5D34_B82D_F001_41CA_C696964F491D",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -145.05,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "3bhk_bedroom03_01 _106",
 "id": "panorama_A62D1484_AD6B_7454_41D1_22B1836B8069",
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_A62D1484_AD6B_7454_41D1_22B1836B8069_0/b/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A62D1484_AD6B_7454_41D1_22B1836B8069_0/b/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A62D1484_AD6B_7454_41D1_22B1836B8069_0/b/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_A62D1484_AD6B_7454_41D1_22B1836B8069_0/f/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A62D1484_AD6B_7454_41D1_22B1836B8069_0/f/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A62D1484_AD6B_7454_41D1_22B1836B8069_0/f/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A62D1484_AD6B_7454_41D1_22B1836B8069_0/u/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A62D1484_AD6B_7454_41D1_22B1836B8069_0/u/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A62D1484_AD6B_7454_41D1_22B1836B8069_0/u/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A62D1484_AD6B_7454_41D1_22B1836B8069_0/r/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A62D1484_AD6B_7454_41D1_22B1836B8069_0/r/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A62D1484_AD6B_7454_41D1_22B1836B8069_0/r/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A62D1484_AD6B_7454_41D1_22B1836B8069_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A62D1484_AD6B_7454_41D1_22B1836B8069_0/d/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A62D1484_AD6B_7454_41D1_22B1836B8069_0/d/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A62D1484_AD6B_7454_41D1_22B1836B8069_0/d/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A62D1484_AD6B_7454_41D1_22B1836B8069_0/l/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A62D1484_AD6B_7454_41D1_22B1836B8069_0/l/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A62D1484_AD6B_7454_41D1_22B1836B8069_0/l/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "partial": false,
 "hfovMax": 130,
 "pitch": 0,
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": 37.73,
   "backwardYaw": -47.18,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A78AF8FB_AD6B_7DBC_41D3_545D325A7873"
  },
  {
   "distance": 1,
   "yaw": 152.53,
   "backwardYaw": 34.95,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF"
  }
 ],
 "overlays": [
  "this.overlay_BC6F4BFC_AD7A_D3B5_41D2_41F0F2BB8483",
  "this.overlay_BC4FAC26_AD7D_5454_41CB_8B9C31254533"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_A62D1484_AD6B_7454_41D1_22B1836B8069_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_B559DDB8_B82D_F001_41C8_B5A49D39B261",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -30.34,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_B51CED6C_B82D_F001_41AC_FADF8D0419F0",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -174.43,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_B5F43E49_B82D_F002_41CB_D54F5D930811",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -143.27,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "3bhk_360_2_106_33 rd floor",
 "id": "panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD",
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD_0/b/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD_0/b/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD_0/b/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD_0/f/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD_0/f/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD_0/f/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD_0/u/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD_0/u/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD_0/u/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD_0/r/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD_0/r/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD_0/r/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD_0/d/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD_0/d/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD_0/d/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD_0/l/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD_0/l/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD_0/l/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "partial": false,
 "hfovMax": 130,
 "pitch": 0,
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": 128.42,
   "backwardYaw": 149.66,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552"
  },
  {
   "distance": 1,
   "yaw": 5.57,
   "backwardYaw": -5.86,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF"
  }
 ],
 "overlays": [
  "this.overlay_A0C62FB1_AD6A_D44C_41D6_2625C26207C3",
  "this.overlay_A32DB1F4_AD6D_4FB4_41DA_0C2E1BABD2F3"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A62D1484_AD6B_7454_41D1_22B1836B8069_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_B56B1D80_B82D_F001_41A3_F98AD9687EF2",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 98.65,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_B5490DA5_B82D_F002_41A7_B1F22D2B2B97",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 111.46,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A78A375E_AD6A_D4F4_41C8_DFCE4BD93DF1_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_B5B6EDEE_B82D_F01E_41E2_0E266070CE7E",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -142.27,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_B5A75DDC_B82D_F002_41E6_2BC6F7F2F517",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 164.47,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_B5797D93_B82D_F007_41D2_8B27D917BCBE",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 53.27,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "3bhk_bedroom01_106",
 "id": "panorama_A632C963_AD65_7CD3_41BE_F3540463449D",
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_A632C963_AD65_7CD3_41BE_F3540463449D_0/b/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A632C963_AD65_7CD3_41BE_F3540463449D_0/b/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A632C963_AD65_7CD3_41BE_F3540463449D_0/b/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_A632C963_AD65_7CD3_41BE_F3540463449D_0/f/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A632C963_AD65_7CD3_41BE_F3540463449D_0/f/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A632C963_AD65_7CD3_41BE_F3540463449D_0/f/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A632C963_AD65_7CD3_41BE_F3540463449D_0/u/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A632C963_AD65_7CD3_41BE_F3540463449D_0/u/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A632C963_AD65_7CD3_41BE_F3540463449D_0/u/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A632C963_AD65_7CD3_41BE_F3540463449D_0/r/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A632C963_AD65_7CD3_41BE_F3540463449D_0/r/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A632C963_AD65_7CD3_41BE_F3540463449D_0/r/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A632C963_AD65_7CD3_41BE_F3540463449D_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A632C963_AD65_7CD3_41BE_F3540463449D_0/d/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A632C963_AD65_7CD3_41BE_F3540463449D_0/d/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A632C963_AD65_7CD3_41BE_F3540463449D_0/d/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A632C963_AD65_7CD3_41BE_F3540463449D_0/l/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A632C963_AD65_7CD3_41BE_F3540463449D_0/l/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A632C963_AD65_7CD3_41BE_F3540463449D_0/l/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "partial": false,
 "hfovMax": 130,
 "pitch": 0,
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -68.54,
   "backwardYaw": 36.73,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62"
  }
 ],
 "overlays": [
  "this.overlay_A290A524_AD67_5454_41DB_802E9F645C97"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_A632C963_AD65_7CD3_41BE_F3540463449D_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_B5C25E62_B82D_F006_41C2_86B3074C83E4",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -42.96,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_B586AE00_B82D_F002_41CA_873819147520",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 125.51,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "3bhkbedroom02_106",
 "id": "panorama_A78A375E_AD6A_D4F4_41C8_DFCE4BD93DF1",
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_A78A375E_AD6A_D4F4_41C8_DFCE4BD93DF1_0/b/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A78A375E_AD6A_D4F4_41C8_DFCE4BD93DF1_0/b/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A78A375E_AD6A_D4F4_41C8_DFCE4BD93DF1_0/b/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_A78A375E_AD6A_D4F4_41C8_DFCE4BD93DF1_0/f/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A78A375E_AD6A_D4F4_41C8_DFCE4BD93DF1_0/f/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A78A375E_AD6A_D4F4_41C8_DFCE4BD93DF1_0/f/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A78A375E_AD6A_D4F4_41C8_DFCE4BD93DF1_0/u/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A78A375E_AD6A_D4F4_41C8_DFCE4BD93DF1_0/u/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A78A375E_AD6A_D4F4_41C8_DFCE4BD93DF1_0/u/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A78A375E_AD6A_D4F4_41C8_DFCE4BD93DF1_0/r/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A78A375E_AD6A_D4F4_41C8_DFCE4BD93DF1_0/r/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A78A375E_AD6A_D4F4_41C8_DFCE4BD93DF1_0/r/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A78A375E_AD6A_D4F4_41C8_DFCE4BD93DF1_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A78A375E_AD6A_D4F4_41C8_DFCE4BD93DF1_0/d/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A78A375E_AD6A_D4F4_41C8_DFCE4BD93DF1_0/d/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A78A375E_AD6A_D4F4_41C8_DFCE4BD93DF1_0/d/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A78A375E_AD6A_D4F4_41C8_DFCE4BD93DF1_0/l/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A78A375E_AD6A_D4F4_41C8_DFCE4BD93DF1_0/l/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A78A375E_AD6A_D4F4_41C8_DFCE4BD93DF1_0/l/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "partial": false,
 "hfovMax": 130,
 "pitch": 0,
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": 65.37,
   "backwardYaw": -15.53,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537"
  }
 ],
 "overlays": [
  "this.overlay_BD886754_AD7B_D4F4_41C0_C1FFAAB3F455"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_A78A375E_AD6A_D4F4_41C8_DFCE4BD93DF1_t.jpg",
 "class": "Panorama"
},
{
 "vfov": 180,
 "label": "3bhkbedroom02_2 _106",
 "id": "panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537",
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537_0/b/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537_0/b/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537_0/b/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537_0/f/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537_0/f/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537_0/f/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537_0/u/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537_0/u/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537_0/u/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537_0/r/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537_0/r/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537_0/r/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537_0/d/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537_0/d/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537_0/d/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537_0/l/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537_0/l/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537_0/l/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "partial": false,
 "hfovMax": 130,
 "pitch": 0,
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -54.49,
   "backwardYaw": 137.04,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552"
  },
  {
   "distance": 1,
   "yaw": -15.53,
   "backwardYaw": 65.37,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A78A375E_AD6A_D4F4_41C8_DFCE4BD93DF1"
  }
 ],
 "overlays": [
  "this.overlay_BC00FE33_AD65_344C_41DE_18AA1494E42A",
  "this.overlay_BC4ED715_AD7B_7474_41DF_F814D4D05B22"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_B4D1AD20_B82D_F002_41D5_C1441047508F",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 132.82,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_B50E9D59_B82D_F003_41DD_F971A854600A",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -174.68,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A78AF8FB_AD6B_7DBC_41D3_545D325A7873_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A62DF4C7_AD65_35D4_41E1_FE86A34DAC82_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 149.08,
  "class": "PanoramaCameraPosition",
  "pitch": 6.31
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 173.85,
  "class": "PanoramaCameraPosition",
  "pitch": 4.77
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_B5E4FE33_B82D_F007_41DC_5B6F0530415D",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -51.58,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "kitchen copy",
 "id": "panorama_A62DF4C7_AD65_35D4_41E1_FE86A34DAC82",
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_A62DF4C7_AD65_35D4_41E1_FE86A34DAC82_0/b/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A62DF4C7_AD65_35D4_41E1_FE86A34DAC82_0/b/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A62DF4C7_AD65_35D4_41E1_FE86A34DAC82_0/b/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_A62DF4C7_AD65_35D4_41E1_FE86A34DAC82_0/f/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A62DF4C7_AD65_35D4_41E1_FE86A34DAC82_0/f/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A62DF4C7_AD65_35D4_41E1_FE86A34DAC82_0/f/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A62DF4C7_AD65_35D4_41E1_FE86A34DAC82_0/u/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A62DF4C7_AD65_35D4_41E1_FE86A34DAC82_0/u/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A62DF4C7_AD65_35D4_41E1_FE86A34DAC82_0/u/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A62DF4C7_AD65_35D4_41E1_FE86A34DAC82_0/r/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A62DF4C7_AD65_35D4_41E1_FE86A34DAC82_0/r/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A62DF4C7_AD65_35D4_41E1_FE86A34DAC82_0/r/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A62DF4C7_AD65_35D4_41E1_FE86A34DAC82_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A62DF4C7_AD65_35D4_41E1_FE86A34DAC82_0/d/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A62DF4C7_AD65_35D4_41E1_FE86A34DAC82_0/d/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A62DF4C7_AD65_35D4_41E1_FE86A34DAC82_0/d/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A62DF4C7_AD65_35D4_41E1_FE86A34DAC82_0/l/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A62DF4C7_AD65_35D4_41E1_FE86A34DAC82_0/l/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A62DF4C7_AD65_35D4_41E1_FE86A34DAC82_0/l/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "partial": false,
 "hfovMax": 130,
 "pitch": 0,
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": 5.32,
   "backwardYaw": -81.35,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF"
  }
 ],
 "overlays": [
  "this.overlay_BD01D554_AD67_74F5_41E4_13A71D86A1C9"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_A62DF4C7_AD65_35D4_41E1_FE86A34DAC82_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_B53EED46_B82D_F00E_41E4_642A5531D119",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -27.47,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "items": [
  {
   "media": "this.panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD_camera"
  },
  {
   "media": "this.panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552_camera"
  },
  {
   "media": "this.panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF_camera"
  },
  {
   "media": "this.panorama_A62DF4C7_AD65_35D4_41E1_FE86A34DAC82",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A62DF4C7_AD65_35D4_41E1_FE86A34DAC82_camera"
  },
  {
   "media": "this.panorama_A632C963_AD65_7CD3_41BE_F3540463449D",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A632C963_AD65_7CD3_41BE_F3540463449D_camera"
  },
  {
   "media": "this.panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62_camera"
  },
  {
   "media": "this.panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537_camera"
  },
  {
   "media": "this.panorama_A78A375E_AD6A_D4F4_41C8_DFCE4BD93DF1",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A78A375E_AD6A_D4F4_41C8_DFCE4BD93DF1_camera"
  },
  {
   "media": "this.panorama_A62D1484_AD6B_7454_41D1_22B1836B8069",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A62D1484_AD6B_7454_41D1_22B1836B8069_camera"
  },
  {
   "media": "this.panorama_A78AF8FB_AD6B_7DBC_41D3_545D325A7873",
   "end": "this.trigger('tourEnded')",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A78AF8FB_AD6B_7DBC_41D3_545D325A7873_camera"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A632C963_AD65_7CD3_41BE_F3540463449D_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "3bhk_360 Passage_106M_33rd_floor",
 "id": "panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF",
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF_0/b/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF_0/b/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF_0/b/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF_0/f/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF_0/f/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF_0/f/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF_0/u/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF_0/u/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF_0/u/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF_0/r/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF_0/r/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF_0/r/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF_0/d/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF_0/d/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF_0/d/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF_0/l/0/{row}_{column}.jpg",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "colCount": 4
     },
     {
      "url": "media/panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF_0/l/1/{row}_{column}.jpg",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "colCount": 2
     },
     {
      "url": "media/panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF_0/l/2/{row}_{column}.jpg",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "partial": false,
 "hfovMax": 130,
 "pitch": 0,
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": 34.95,
   "backwardYaw": 152.53,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A62D1484_AD6B_7454_41D1_22B1836B8069"
  },
  {
   "distance": 1,
   "yaw": -81.35,
   "backwardYaw": 5.32,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A62DF4C7_AD65_35D4_41E1_FE86A34DAC82"
  },
  {
   "distance": 1,
   "yaw": -5.86,
   "backwardYaw": 5.57,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD"
  }
 ],
 "overlays": [
  "this.overlay_A24718CF_AD65_5DD4_41C6_A049600A78DF",
  "this.overlay_A2F2BB33_AD65_3C4C_41C2_37B618C33FE6",
  "this.overlay_A2EFA649_AD66_D4DC_41C9_79857B0EB21D"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF_t.jpg",
 "class": "Panorama"
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
 "minHeight": 50,
 "toolTipPaddingRight": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 4,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "paddingBottom": 0,
 "toolTipPaddingLeft": 6,
 "borderRadius": 0,
 "minWidth": 100,
 "transitionMode": "blending",
 "toolTipDisplayTime": 600,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "borderSize": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "progressBackgroundColorDirection": "vertical",
 "height": "100%",
 "progressBarBorderColor": "#000000",
 "playbackBarHeadHeight": 15,
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 5,
 "paddingRight": 0,
 "playbackBarHeadOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "toolTipShadowSpread": 0,
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
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarRight": 0,
 "paddingTop": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "paddingLeft": 0,
 "toolTipShadowColor": "#333333",
 "shadow": false,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionDuration": 500,
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
 "class": "ViewerArea",
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "data": {
  "name": "Main Viewer"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_A3B4E818_AD6D_3C7C_41C9_C0617EE0B5FE",
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537, this.camera_B586AE00_B82D_F002_41CA_873819147520); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "hfov": 7.03,
   "yaw": 137.04,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.44,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_BFF92E39_AD7F_34BF_41E5_5726BBB1E3A7",
   "pitch": 0.44,
   "yaw": 137.04,
   "hfov": 7.03,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "data": {
  "label": "Arrow 01 Left"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "id": "overlay_A3961005_AD6E_CC54_41D3_A2783F1E82D9",
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD, this.camera_B5E4FE33_B82D_F007_41DC_5B6F0530415D); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "hfov": 11.47,
   "yaw": 149.66,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -29.56,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552_1_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_BFF9DE39_AD7F_34BF_418C_C7F4B644D132",
   "pitch": -29.56,
   "yaw": 149.66,
   "hfov": 11.47,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "id": "overlay_A3992A4E_AD6F_5CD4_41E5_6E82D68F9A81",
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62, this.camera_B594FE12_B82D_F006_41E3_8D4A2A001075); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "hfov": 9.06,
   "yaw": -126.73,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.56,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "items": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552_1_HS_2_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.56,
   "yaw": -126.73
  }
 ],
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "id": "overlay_BD2CFEFA_AD65_75BC_41C7_CD1EB6166FFB",
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A632C963_AD65_7CD3_41BE_F3540463449D, this.camera_B5490DA5_B82D_F002_41A7_B1F22D2B2B97); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "hfov": 11.93,
   "yaw": 36.73,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -43.4,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_BFFFEE3A_AD7F_34BD_41C1_060BCBA42591",
   "pitch": -43.4,
   "yaw": 36.73,
   "hfov": 11.93,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "id": "overlay_BD024314_AD65_CC74_41C3_77C38F86BF6F",
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552, this.camera_B5797D93_B82D_F007_41D2_8B27D917BCBE); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "hfov": 10.86,
   "yaw": -158.49,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 3.17,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "items": [
  {
   "hfov": 10.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62_1_HS_1_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.17,
   "yaw": -158.49
  }
 ],
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "id": "overlay_BC0E2211_AD7D_4C4C_41CC_FB487167A3E3",
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A62D1484_AD6B_7454_41D1_22B1836B8069, this.camera_B5B6EDEE_B82D_F01E_41E2_0E266070CE7E); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "hfov": 13.15,
   "yaw": -47.18,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -31.46,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A78AF8FB_AD6B_7DBC_41D3_545D325A7873_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_BFFF8E3B_AD7F_34B3_41DB_64056A8E21DA",
   "pitch": -31.46,
   "yaw": -47.18,
   "hfov": 13.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "id": "overlay_BC6F4BFC_AD7A_D3B5_41D2_41F0F2BB8483",
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A78AF8FB_AD6B_7DBC_41D3_545D325A7873, this.camera_B4D1AD20_B82D_F002_41D5_C1441047508F); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "hfov": 12.44,
   "yaw": 37.73,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -30.33,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A62D1484_AD6B_7454_41D1_22B1836B8069_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_BFFC9E3B_AD7F_34B3_41E3_B6D6743241F5",
   "pitch": -30.33,
   "yaw": 37.73,
   "hfov": 12.44,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "id": "overlay_BC4FAC26_AD7D_5454_41CB_8B9C31254533",
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF, this.camera_B52E5D34_B82D_F001_41CA_C696964F491D); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "hfov": 10.86,
   "yaw": 152.53,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.41,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A62D1484_AD6B_7454_41D1_22B1836B8069_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "items": [
  {
   "hfov": 10.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A62D1484_AD6B_7454_41D1_22B1836B8069_1_HS_1_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.41,
   "yaw": 152.53
  }
 ],
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "id": "overlay_A0C62FB1_AD6A_D44C_41D6_2625C26207C3",
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552, this.camera_B559DDB8_B82D_F001_41C8_B5A49D39B261); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "hfov": 11,
   "yaw": 128.42,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -34.86,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_BFFBCE38_AD7F_34BC_41D0_C411BE1C592C",
   "pitch": -34.86,
   "yaw": 128.42,
   "hfov": 11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "id": "overlay_A32DB1F4_AD6D_4FB4_41DA_0C2E1BABD2F3",
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF, this.camera_B5571DCA_B82D_F006_41D4_F93D59DAB3BD); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "hfov": 10.9,
   "yaw": 5.57,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -17.02,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD_1_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_BFF97E39_AD7F_34BF_41D9_8D7B16AE93F9",
   "pitch": -17.02,
   "yaw": 5.57,
   "hfov": 10.9,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "id": "overlay_A290A524_AD67_5454_41DB_802E9F645C97",
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62, this.camera_B5F43E49_B82D_F002_41CB_D54F5D930811); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "hfov": 11.97,
   "yaw": -68.54,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -33.85,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A632C963_AD65_7CD3_41BE_F3540463449D_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_BFFF3E3A_AD7F_34BD_41D1_2D0F66B6CF67",
   "pitch": -33.85,
   "yaw": -68.54,
   "hfov": 11.97,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "id": "overlay_BD886754_AD7B_D4F4_41C0_C1FFAAB3F455",
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537, this.camera_B5A75DDC_B82D_F002_41E6_2BC6F7F2F517); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "hfov": 10.47,
   "yaw": 65.37,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -57.42,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A78A375E_AD6A_D4F4_41C8_DFCE4BD93DF1_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_BFFCEE3B_AD7F_34B3_41B8_90D4B5A09F04",
   "pitch": -57.42,
   "yaw": 65.37,
   "hfov": 10.47,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "id": "overlay_BC00FE33_AD65_344C_41DE_18AA1494E42A",
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552, this.camera_B5C25E62_B82D_F006_41C2_86B3074C83E4); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "hfov": 10.84,
   "yaw": -54.49,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 4.6,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 19
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "items": [
  {
   "hfov": 10.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537_0_HS_0_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 185
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.6,
   "yaw": -54.49
  }
 ],
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "id": "overlay_BC4ED715_AD7B_7474_41DF_F814D4D05B22",
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A78A375E_AD6A_D4F4_41C8_DFCE4BD93DF1, this.camera_B5D27E7C_B82D_F001_41E1_44EFF11B55E1); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "hfov": 10.08,
   "yaw": -15.53,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -35.69,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537_1_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_BFFC2E3A_AD7F_34BD_41DF_228CE917A344",
   "pitch": -35.69,
   "yaw": -15.53,
   "hfov": 10.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "id": "overlay_BD01D554_AD67_74F5_41E4_13A71D86A1C9",
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF, this.camera_B56B1D80_B82D_F001_41A3_F98AD9687EF2); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "hfov": 7.19,
   "yaw": 5.32,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -30.84,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A62DF4C7_AD65_35D4_41E1_FE86A34DAC82_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_BFFE9E3A_AD7F_34BD_41E1_BE0E15E69A19",
   "pitch": -30.84,
   "yaw": 5.32,
   "hfov": 7.19,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "id": "overlay_A24718CF_AD65_5DD4_41C6_A049600A78DF",
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD, this.camera_B51CED6C_B82D_F001_41AC_FADF8D0419F0); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "hfov": 11.17,
   "yaw": -5.86,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -23.17,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_BFFE6E3A_AD7F_34BD_41DB_7AA92A1D8480",
   "pitch": -23.17,
   "yaw": -5.86,
   "hfov": 11.17,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "id": "overlay_A2F2BB33_AD65_3C4C_41C2_37B618C33FE6",
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A62DF4C7_AD65_35D4_41E1_FE86A34DAC82, this.camera_B50E9D59_B82D_F003_41DD_F971A854600A); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "hfov": 6.08,
   "yaw": -81.35,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -43.4,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF_1_HS_1_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_BFFE0E3A_AD7F_34BD_41C8_3AED6497C600",
   "pitch": -43.4,
   "yaw": -81.35,
   "hfov": 6.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "id": "overlay_A2EFA649_AD66_D4DC_41C9_79857B0EB21D",
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A62D1484_AD6B_7454_41D1_22B1836B8069, this.camera_B53EED46_B82D_F00E_41E4_642A5531D119); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "hfov": 10.87,
   "yaw": 34.95,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.91,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "items": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF_1_HS_2_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.91,
   "yaw": 34.95
  }
 ],
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_BFF92E39_AD7F_34BF_41E5_5726BBB1E3A7",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_A60FFBED_AD67_F3D4_41B6_7C650FD5D552_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_BFF9DE39_AD7F_34BF_418C_C7F4B644D132",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_A79D1E74_AD65_74B4_41D9_CBA85E9D9E62_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_BFFFEE3A_AD7F_34BD_41C1_060BCBA42591",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_A78AF8FB_AD6B_7DBC_41D3_545D325A7873_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_BFFF8E3B_AD7F_34B3_41DB_64056A8E21DA",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_A62D1484_AD6B_7454_41D1_22B1836B8069_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_BFFC9E3B_AD7F_34B3_41E3_B6D6743241F5",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_BFFBCE38_AD7F_34BC_41D0_C411BE1C592C",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_A1107F26_AD67_5454_41DB_0A72D19E4DAD_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_BFF97E39_AD7F_34BF_41D9_8D7B16AE93F9",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_A632C963_AD65_7CD3_41BE_F3540463449D_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_BFFF3E3A_AD7F_34BD_41D1_2D0F66B6CF67",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_A78A375E_AD6A_D4F4_41C8_DFCE4BD93DF1_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_BFFCEE3B_AD7F_34B3_41B8_90D4B5A09F04",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_A623F10A_AD6A_CC5C_41D7_6BE69B173537_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_BFFC2E3A_AD7F_34BD_41DF_228CE917A344",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_A62DF4C7_AD65_35D4_41E1_FE86A34DAC82_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_BFFE9E3A_AD7F_34BD_41E1_BE0E15E69A19",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_BFFE6E3A_AD7F_34BD_41DB_7AA92A1D8480",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_A616FEF6_AD65_35B4_41E2_229E87A4CFEF_1_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_BFFE0E3A_AD7F_34BD_41C8_3AED6497C600",
 "class": "AnimatedImageResource",
 "colCount": 3
}],
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "class": "Player",
 "mobileMipmappingEnabled": false,
 "vrPolyfillScale": 0.5,
 "gap": 10,
 "data": {
  "name": "Player485"
 },
 "horizontalAlign": "left"
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
