(function(){
    var script = {
 "children": [
  "this.MainViewer"
 ],
 "id": "rootPlayer",
 "backgroundPreloadEnabled": true,
 "data": {
  "name": "Player486"
 },
 "start": "this.init()",
 "paddingBottom": 0,
 "scrollBarWidth": 10,
 "width": "100%",
 "downloadEnabled": false,
 "layout": "absolute",
 "paddingRight": 0,
 "borderRadius": 0,
 "overflow": "visible",
 "minHeight": 20,
 "desktopMipmappingEnabled": false,
 "verticalAlign": "top",
 "propagateClick": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "minWidth": 20,
 "vrPolyfillScale": 0.5,
 "height": "100%",
 "scrollBarVisible": "rollOver",
 "gap": 10,
 "horizontalAlign": "left",
 "class": "Player",
 "mobileMipmappingEnabled": false,
 "defaultVRPointer": "laser",
 "paddingTop": 0,
 "mouseWheelEnabled": true,
 "contentOpaque": false,
 "scripts": {
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "getKey": function(key){  return window[key]; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "existsKey": function(key){  return key in window; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "unregisterKey": function(key){  delete window[key]; },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "registerKey": function(key, value){  window[key] = value; }
 },
 "definitions": [{
 "partial": false,
 "label": "4bhk_bedroom_02 copy",
 "id": "panorama_10A96800_0139_3693_4154_C75F68C57800",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -139.29,
   "panorama": "this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42",
   "backwardYaw": 8.67,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_1F068397_0107_19BE_4171_71AB44B1EA6D"
 ],
 "thumbnailUrl": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_t.jpg",
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 160.83,
  "pitch": 0
 },
 "id": "camera_509438B4_4180_E1D5_41C2_8CD1F7276E09",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4bhk_Bedroom_003 copy",
 "id": "panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 15.71,
   "panorama": "this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942",
   "backwardYaw": 134.53,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_13B21729_013B_1A95_416C_98A10822AB74"
 ],
 "thumbnailUrl": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_t.jpg",
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "partial": false,
 "label": "4bhk_bolcony_28",
 "id": "panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -167.28,
   "panorama": "this.panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75",
   "backwardYaw": -1.88,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_F7CC2CF2_E6F2_E5F5_41C2_AAC8BF3B7DDA"
 ],
 "thumbnailUrl": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.12,
  "pitch": 0
 },
 "id": "camera_50435A71_4180_E16F_41C8_971B9562089B",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -111.62,
  "pitch": 0
 },
 "id": "camera_53543C23_4180_E0F3_41BB_987E5EA662E0",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4bhk_bolcony_23",
 "id": "panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -158.86,
   "panorama": "this.panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674",
   "backwardYaw": -1.62,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_F6B6F5DA_E6F2_2435_41D4_7EFE955F637C"
 ],
 "thumbnailUrl": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -52.5,
  "pitch": 0
 },
 "id": "camera_50D5F99C_4180_E3D5_41C6_0C0E48A238A8",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -109.11,
  "pitch": 0
 },
 "id": "camera_50215A35_4180_E0D7_41C8_B15C0BB77FD0",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK BEDROOM 04 1 17th",
 "id": "panorama_CC131311_C71D_3F72_41C7_6DBD9418A942",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -21.56,
   "panorama": "this.panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335",
   "backwardYaw": 68.51,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 154.03,
   "panorama": "this.panorama_389785F0_3327_3814_41C9_2FC03DB15F5D",
   "backwardYaw": 78,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 134.53,
   "panorama": "this.panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE",
   "backwardYaw": 15.71,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_D29433BE_C765_3EAE_41D8_CC80272D951C",
  "this.overlay_D179CE94_C763_4971_41E1_4D5D0BD3A926",
  "this.overlay_272A1E92_332B_4814_41AA_E3151C20A966"
 ],
 "thumbnailUrl": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -157.77,
  "pitch": 0
 },
 "id": "camera_5214D5FD_4180_E356_41BB_BE9B118944C7",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4_BHK_BEDROOM_4_TOILET copy",
 "id": "panorama_121539AD_013B_29ED_4160_3D4F82B47E36",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 167.82,
   "panorama": "this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A",
   "backwardYaw": 24.24,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_1D727724_011B_1A93_4171_CF3D20B290EA"
 ],
 "thumbnailUrl": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_t.jpg",
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "partial": false,
 "label": "4BHK BEDROOM 04 2 23rd",
 "id": "panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 69.51,
   "panorama": "this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC",
   "backwardYaw": -19.17,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_D8D0AEBD_C71D_46B2_41E2_77FAFEC5B3BD"
 ],
 "thumbnailUrl": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -21.7,
  "pitch": 0
 },
 "id": "camera_5249E67F_4180_E153_41C2_D2F0B5EC09A1",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 126.36,
  "pitch": -4.52
 },
 "id": "panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK BEDROOM 02 2 28th",
 "id": "panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558",
 "pitch": 0,
 "hfovMax": 130,
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
   "panorama": "this.panorama_3FD93565_332B_583D_41C9_645338B595F0",
   "backwardYaw": 29.4,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_E3C0EB9C_C727_CF72_41D8_2929BE9FB4EE",
  "this.overlay_E2CC1B58_C725_4FF1_41E7_2F6766A1B20D"
 ],
 "thumbnailUrl": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -158.27,
  "pitch": 0
 },
 "id": "camera_5390DAFC_4180_E155_41C8_82D8B1CBB4B5",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4bhk Powder toilet",
 "id": "panorama_27D62BB1_011F_69F2_416D_0AB033A18B06",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -113.49,
   "panorama": "this.panorama_3FD93565_332B_583D_41C9_645338B595F0",
   "backwardYaw": 110.42,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_299D94A8_0107_1F92_4177_026B7F551234"
 ],
 "thumbnailUrl": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_t.jpg",
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "partial": false,
 "label": "4bhk Powder toilet",
 "id": "panorama_24CDB527_010B_7E9D_4174_52D79CB239F2",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -112.74,
   "panorama": "this.panorama_3F725F51_3327_C814_41AA_6410005E16A5",
   "backwardYaw": 110.68,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_246B1C44_0107_6E93_416A_CF9A21893363"
 ],
 "thumbnailUrl": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_t.jpg",
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 158.44,
  "pitch": 0
 },
 "id": "camera_53C05B4D_4180_E0B6_41CE_E75751611AE4",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -158.36,
  "pitch": 0
 },
 "id": "camera_50E3C9C2_4180_E3AD_41CE_CA3E4D008539",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 102.17,
  "pitch": 0
 },
 "id": "camera_530B205D_4180_E157_41B9_9800D316DECA",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK BEDROOM 01 2 28th",
 "id": "panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 144.5,
   "panorama": "this.panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE",
   "backwardYaw": -136.37,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 7.66,
   "panorama": "this.panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E",
   "backwardYaw": -137.91,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 1.29,
   "panorama": "this.panorama_3FD93565_332B_583D_41C9_645338B595F0",
   "backwardYaw": 127.5,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_E4AC823C_C723_F9B2_41B4_39B29FEEA91C",
  "this.overlay_E33D35E2_C723_3AD1_41A1_22D3C41AFB56",
  "this.overlay_148591CC_3365_3873_41C5_5BF064D6EBF6"
 ],
 "thumbnailUrl": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK BEDROOM 02 1 17th",
 "id": "panorama_CC175683_C71F_5956_41AA_704EB81E1F05",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 55.82,
   "panorama": "this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045",
   "backwardYaw": -23.19,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 158.81,
   "panorama": "this.panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80",
   "backwardYaw": -60.41,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_D4F9B791_C76F_4773_41B6_B1727AC576AD",
  "this.overlay_09C2C4FC_065B_0D8A_4181_30568EDF6179"
 ],
 "thumbnailUrl": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 158.57,
  "pitch": 0
 },
 "id": "camera_5044A29D_4180_E1D7_41B8_1F56D30C4B9C",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4bhk_bedroom_02 copy",
 "id": "panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -140.8,
   "panorama": "this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2",
   "backwardYaw": 10.93,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_0F921219_0107_1AB2_4163_2FA0B008B772"
 ],
 "thumbnailUrl": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_t.jpg",
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 116.86,
  "pitch": 0
 },
 "id": "camera_50883118_4180_E0DD_4194_919E448A0374",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 36.59,
  "pitch": 0
 },
 "id": "camera_50876104_4180_E0B5_4192_D8838B2E1AB6",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 177.12,
  "pitch": 0
 },
 "id": "camera_509EA8DC_4180_E155_41C1_4EA5F38BA8EA",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK_Bedroom01_ copy",
 "id": "panorama_10BE6159_013F_76B5_411F_D68688796320",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -61.67,
   "panorama": "this.panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751",
   "backwardYaw": 158.3,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_153F3E16_010B_2ABF_4102_306DCD1B8DA0"
 ],
 "thumbnailUrl": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_t.jpg",
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "partial": false,
 "label": "4BHK BEDROOM 03 2 17th",
 "id": "panorama_CD888F1A_C71C_C776_41E5_354715787DA9",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -148.42,
   "panorama": "this.panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0",
   "backwardYaw": -87.63,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 22.99,
   "panorama": "this.panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00",
   "backwardYaw": 166.32,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 22.02,
   "panorama": "this.panorama_389785F0_3327_3814_41C9_2FC03DB15F5D",
   "backwardYaw": 92.07,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_D3646773_C765_47B6_41E0_73AF92AE0B87",
  "this.overlay_D246BEC5_C767_C6D3_417F_B7C47770AE7C",
  "this.overlay_20CA203B_332C_F814_41BB_124149BEECE3"
 ],
 "thumbnailUrl": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -69.58,
  "pitch": 0
 },
 "id": "camera_529584D7_4180_E153_41C2_12B22D2691E7",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK BEDROOM 02 1 23rd",
 "id": "panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 158.3,
   "panorama": "this.panorama_10BE6159_013F_76B5_411F_D68688796320",
   "backwardYaw": -61.67,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 68.88,
   "panorama": "this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4",
   "backwardYaw": -14.77,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_DB599724_C763_4752_41D6_A0FA163F689B",
  "this.overlay_1654E670_064B_0C9A_4147_50EF66183F10"
 ],
 "thumbnailUrl": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 31.07,
  "pitch": 0
 },
 "id": "camera_500C422A_4180_E0F2_41CC_AB03E2389305",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK BEDROOM 01 1 28th",
 "id": "panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -136.37,
   "panorama": "this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01",
   "backwardYaw": 144.5,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_E31F4E35_C725_49B2_41E3_75B373DD479F"
 ],
 "thumbnailUrl": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -110.49,
  "pitch": 0
 },
 "id": "camera_55046796_4180_EFD5_41B1_D5FE3A380605",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4bhk living 02 28th",
 "id": "panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 77.75,
   "panorama": "this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD",
   "backwardYaw": 154.28,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -1.88,
   "panorama": "this.panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269",
   "backwardYaw": -167.28,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 93.58,
   "panorama": "this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A",
   "backwardYaw": 21.89,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -119.77,
   "panorama": "this.panorama_3FD93565_332B_583D_41C9_645338B595F0",
   "backwardYaw": -168.13,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_13ACC0B1_336F_5814_41B3_CF6134E86EAC",
  "this.overlay_129ED365_336F_583D_418B_3FE762298228",
  "this.overlay_103A83CC_336C_F873_41A5_4AEAC87E592E",
  "this.overlay_11A6770F_336B_380D_41C2_1AE4C498D01F"
 ],
 "thumbnailUrl": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_t.jpg",
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -20.44,
  "pitch": 0
 },
 "id": "camera_50A9D918_4180_E0DD_41CD_E6BBD85EF6DC",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 165.23,
  "pitch": 0
 },
 "id": "camera_52A8851A_4180_E0D2_41BA_F050C192FEB9",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK BEDROOM 04 1 28th",
 "id": "panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 154.28,
   "panorama": "this.panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75",
   "backwardYaw": 77.75,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -19.04,
   "panorama": "this.panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD",
   "backwardYaw": 68.38,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 134.28,
   "panorama": "this.panorama_10AB2713_013B_1AB5_4162_9A65609A81B1",
   "backwardYaw": 15.08,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_E0AC7D99_C73D_CB72_41E2_CDE435C74BDD",
  "this.overlay_EFD00FA6_C73C_C75E_41E0_8DE91C303B0D",
  "this.overlay_18124021_3364_D834_41BD_B7C5B964EFB6"
 ],
 "thumbnailUrl": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 152.65,
  "pitch": -7.4
 },
 "id": "panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK BEDROOM 01 1 33rd",
 "id": "panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -131.59,
   "panorama": "this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42",
   "backwardYaw": 148.02,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_E9099FDF_C72F_C6EE_41E3_A646B2C2340D"
 ],
 "thumbnailUrl": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 37.97,
  "pitch": 0
 },
 "id": "camera_532F0432_4180_E0D2_41C5_A447ACD85B71",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 10.84,
  "pitch": 0
 },
 "id": "camera_53502472_4180_E152_41C6_49B747DDF9A4",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4bhk living 02 33rd",
 "id": "panorama_3F2BA48E_3325_580C_41C2_AB809D46139D",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 92.07,
   "panorama": "this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506",
   "backwardYaw": 21.64,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -118.39,
   "panorama": "this.panorama_3FC32490_3325_7813_41B5_5ED0D40BC796",
   "backwardYaw": -169.64,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -2.88,
   "panorama": "this.panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7",
   "backwardYaw": -169.16,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 75.99,
   "panorama": "this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045",
   "backwardYaw": 152.65,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_1E29C2F2_337D_7817_414B_0F71C2427990",
  "this.overlay_1D30EC33_337D_4815_41C6_1AD386142BCC",
  "this.overlay_1DFAC394_337C_D81C_419B_CD9FDBFD294E",
  "this.overlay_1C270587_337B_F8FC_41B5_CE1C9045E09B"
 ],
 "thumbnailUrl": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_t.jpg",
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -45.47,
  "pitch": 0
 },
 "id": "camera_50B3B16E_4180_E372_41C8_68CFBA64F7BD",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4bhk kitchen",
 "id": "panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -59.5,
   "panorama": "this.panorama_3F725F51_3327_C814_41AA_6410005E16A5",
   "backwardYaw": -20.01,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_D6C3F8D5_C723_4AF3_41E1_A8B34E8F3123"
 ],
 "thumbnailUrl": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -102.25,
  "pitch": 0
 },
 "id": "camera_5347CC10_4180_E0AE_4173_547E1CB1EFA2",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 10.98,
  "pitch": 0
 },
 "id": "camera_55E6776C_4180_EF76_41CC_42BEB4415771",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -13.68,
  "pitch": 0
 },
 "id": "camera_558C36EA_4180_E17D_41CC_C08C39629257",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 154,
  "pitch": -1.26
 },
 "id": "panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK_Bedroom01_ copy",
 "id": "panorama_10AB6D68_013B_EE92_4160_6689FDC41054",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -60.91,
   "panorama": "this.panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F",
   "backwardYaw": 159.56,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_1B991A50_0119_2AB2_4132_0A687531F080"
 ],
 "thumbnailUrl": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_t.jpg",
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_121539AD_013B_29ED_4160_3D4F82B47E36_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK BEDROOM 04 2 28th",
 "id": "panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 68.38,
   "panorama": "this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD",
   "backwardYaw": -19.04,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_EE27537F_C723_5FAE_41E1_DBA13BA4CC54"
 ],
 "thumbnailUrl": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 162.8,
  "pitch": -8.53
 },
 "id": "panorama_CD888F1A_C71C_C776_41E5_354715787DA9_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK BEDROOM 03 1 33rd",
 "id": "panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -77.83,
   "panorama": "this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506",
   "backwardYaw": -148.93,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_F5309816_C725_4971_41DC_62B6061471DF"
 ],
 "thumbnailUrl": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4bhk living 01 23rd",
 "id": "panorama_3FC52041_332B_3875_41C7_36D298EEF65B",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -170.14,
   "panorama": "this.panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674",
   "backwardYaw": -123.54,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 29.4,
   "panorama": "this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4",
   "backwardYaw": -143.41,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 110.67,
   "panorama": "this.panorama_2740B091_0119_17B5_4159_67CCDF611884",
   "backwardYaw": -113.63,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -19.22,
   "panorama": "this.panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1",
   "backwardYaw": -58.37,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 128.01,
   "panorama": "this.panorama_CD732023_C71F_F956_41D6_6910628043DA",
   "backwardYaw": 1.04,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_265C376C_3324_F80C_41B3_61B0F86D8EC4",
  "this.overlay_2518098B_3327_48F4_413D_ABF49686336E",
  "this.overlay_269A2233_3327_5815_41B2_A92B04A09121",
  "this.overlay_255C8B93_3324_C815_41B7_85EEB0BF60FC",
  "this.overlay_259D67C0_3325_D873_41C8_839B4E4B846C"
 ],
 "thumbnailUrl": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_t.jpg",
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -157.01,
  "pitch": 0
 },
 "id": "camera_53863317_4180_E0D3_41BB_945DFC6F9670",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK BEDROOM 01 2 23rd",
 "id": "panorama_CD732023_C71F_F956_41D6_6910628043DA",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 154.8,
   "panorama": "this.panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C",
   "backwardYaw": -133.6,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 9.67,
   "panorama": "this.panorama_10BCB494_013F_1FB2_4161_C83441295AC6",
   "backwardYaw": -140.17,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 1.04,
   "panorama": "this.panorama_3FC52041_332B_3875_41C7_36D298EEF65B",
   "backwardYaw": 128.01,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_DD070AC8_C763_4ED2_41C9_24B475FBBEEE",
  "this.overlay_DDFC90E3_C76D_7AD6_41E6_FFEEF526FE90",
  "this.overlay_29D37BC2_335C_C877_41AD_908816526B4A"
 ],
 "thumbnailUrl": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 151.74,
  "pitch": -9.04
 },
 "id": "panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -102,
  "pitch": 0
 },
 "id": "camera_50589A98_4180_E1DD_41CB_A88DAB7287BA",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -150.31,
  "pitch": 0
 },
 "id": "camera_5259969B_4180_E1D3_41BA_75C706B206B5",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4bhk living 01 33rd",
 "id": "panorama_3FC32490_3325_7813_41B5_5ED0D40BC796",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 30.03,
   "panorama": "this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545",
   "backwardYaw": -143.41,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -19.97,
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
   "yaw": -169.64,
   "panorama": "this.panorama_3F2BA48E_3325_580C_41C2_AB809D46139D",
   "backwardYaw": -118.39,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 109.92,
   "panorama": "this.panorama_28495FE3_011F_2995_4161_1F0BD106F099",
   "backwardYaw": -112.94,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_19480E30_337B_4813_41B5_5EE57717F00C",
  "this.overlay_1EA30795_337C_D81C_41C8_094AEDF22DA3",
  "this.overlay_1EB6AA28_337D_C834_4170_E0B4D73010B3",
  "this.overlay_1EC35158_337D_7813_419F_5D7970C11AAE",
  "this.overlay_1E5ECCE1_337C_C835_41BF_5A7E54CDBE3D"
 ],
 "thumbnailUrl": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_t.jpg",
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 160.96,
  "pitch": 0
 },
 "id": "camera_50E501CD_4180_E3B6_417F_8731033BD3C4",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4bhk living 01 28th",
 "id": "panorama_3FD93565_332B_583D_41C9_645338B595F0",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -168.13,
   "panorama": "this.panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75",
   "backwardYaw": -119.77,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 110.42,
   "panorama": "this.panorama_27D62BB1_011F_69F2_416D_0AB033A18B06",
   "backwardYaw": -113.49,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -21.23,
   "panorama": "this.panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A",
   "backwardYaw": -62.51,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 127.5,
   "panorama": "this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01",
   "backwardYaw": 1.29,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 29.4,
   "panorama": "this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558",
   "backwardYaw": -142.03,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_2DC8F859_336B_4814_41B1_C16A01C564F1",
  "this.overlay_2DA86454_336B_D81C_41C3_F1BCB36CCD21",
  "this.overlay_2C2FAB5E_336B_480C_41C9_A40B894F5FBE",
  "this.overlay_13C72680_336D_58F4_41B6_4936D69BC2F8",
  "this.overlay_12A76CF0_336D_C814_41B0_FCC8F1EC7567"
 ],
 "thumbnailUrl": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_t.jpg",
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -169.07,
  "pitch": 0
 },
 "id": "camera_522B063E_4180_E0D5_41CC_CBE8B7409848",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 5.31,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 5.31,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 5.31,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -164.29,
  "pitch": 0
 },
 "id": "camera_506C9AAB_4180_E1F2_41BD_3FEAD4870DF5",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 159.24,
  "pitch": -2.18
 },
 "id": "panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -170.58,
  "pitch": -4.27
 },
 "id": "panorama_3FC52041_332B_3875_41C7_36D298EEF65B_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -2.76,
  "pitch": 0.5
 },
 "id": "panorama_10F8A1A0_0139_3993_4126_7D4276303500_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4bhk kitchen",
 "id": "panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -58.37,
   "panorama": "this.panorama_3FC52041_332B_3875_41C7_36D298EEF65B",
   "backwardYaw": -19.22,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_DD3041EE_C764_DAAE_41E6_5D3D4684B50F"
 ],
 "thumbnailUrl": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 118.33,
  "pitch": 0
 },
 "id": "camera_529874F6_4180_E152_41B6_454067CFE5F6",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -9.79,
  "pitch": 0
 },
 "id": "camera_50FB5217_4180_E0D3_41C4_28BD20E23484",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK BEDROOM 03 1 17th",
 "id": "panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -87.63,
   "panorama": "this.panorama_CD888F1A_C71C_C776_41E5_354715787DA9",
   "backwardYaw": -148.42,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_D201568E_C765_3951_41E8_132B3132B361"
 ],
 "thumbnailUrl": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -44.97,
  "pitch": 0
 },
 "id": "camera_501B6254_4180_E155_41CA_CEFBF6B8F626",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 66.37,
  "pitch": 0
 },
 "id": "camera_52E39598_4180_E3DE_41CF_169CBE9E24FF",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4_BHK_BEDROOM_4_TOILET copy",
 "id": "panorama_12091E1F_013F_2AAE_4168_C4499D5E4133",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 170.21,
   "panorama": "this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0",
   "backwardYaw": 21.73,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_14ADE4BE_010F_1FEF_416E_76EF10A518E9"
 ],
 "thumbnailUrl": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_t.jpg",
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 42.09,
  "pitch": 0
 },
 "id": "camera_50CCF986_4180_E3B2_41C3_18A5B21E18C8",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -31.98,
  "pitch": 0
 },
 "id": "camera_507C9302_4180_E0B3_41C9_AF94B886A9C9",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4bhk_Bedroom_003 copy",
 "id": "panorama_10AB2713_013B_1AB5_4162_9A65609A81B1",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 15.08,
   "panorama": "this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD",
   "backwardYaw": 134.28,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_1CBAC74F_0119_3AAE_4169_5B722A4C2C71"
 ],
 "thumbnailUrl": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_t.jpg",
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 60.23,
  "pitch": 0
 },
 "id": "camera_53F463DD_4180_E757_41B3_22FDD38421D7",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 165.55,
  "pitch": -2.76
 },
 "id": "panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "frameTransitionTime": 5000,
 "frameDisplayTime": 5000,
 "label": "4bhk kitchen",
 "id": "panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -62.51,
   "panorama": "this.panorama_3FD93565_332B_583D_41C9_645338B595F0",
   "backwardYaw": -21.23,
   "distance": 1
  }
 ],
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "overlays": [
    "this.overlay_E4FA5D36_C72C_CBBE_41DE_84376FB29EF5"
   ],
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  },
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "LivePanorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -170.08,
  "pitch": -4.27
 },
 "id": "panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 12.72,
  "pitch": 0
 },
 "id": "camera_553BC7F2_4180_EF52_41C9_7D0CF69682EF",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -178.71,
  "pitch": 0
 },
 "id": "camera_531E141C_4180_E0D6_41B8_ED4BE0476384",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4_BHK_BEDROOM_4_TOILET copy",
 "id": "panorama_10F8A1A0_0139_3993_4126_7D4276303500",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 166.07,
   "panorama": "this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506",
   "backwardYaw": 22.23,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_227ECEFD_0109_2B6D_416E_3A14758B111C"
 ],
 "thumbnailUrl": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_t.jpg",
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 39.83,
  "pitch": 0
 },
 "id": "camera_506422D9_4180_E15F_41B4_E4BB488F705E",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -170.58,
  "pitch": -3.01
 },
 "id": "panorama_3FD93565_332B_583D_41C9_645338B595F0_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -69.32,
  "pitch": 0
 },
 "id": "camera_50DE89AF_4180_E3F2_4192_879BEBB18A92",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 92.37,
  "pitch": 0
 },
 "id": "camera_527C66D3_4180_E152_41A9_FB527125694E",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -45.72,
  "pitch": 0
 },
 "id": "camera_523BA65E_4180_E152_41C3_491A43F439FB",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK BEDROOM 04 2 33rd",
 "id": "panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 70.89,
   "panorama": "this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045",
   "backwardYaw": -18.67,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_F4767B1F_C727_4F6F_41DB_8ED192ED33D1"
 ],
 "thumbnailUrl": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -13.93,
  "pitch": 0
 },
 "id": "camera_517000DA_4180_E15D_41C8_E0B84770F7FB",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK BEDROOM 03 2 23rd",
 "id": "panorama_CD93C521_C71D_3B53_41E8_25606B0344D0",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 21.64,
   "panorama": "this.panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674",
   "backwardYaw": 93.58,
   "distance": 1
  },
  {
   "panorama": "this.panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0",
   "class": "AdjacentPanorama"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 21.73,
   "panorama": "this.panorama_12091E1F_013F_2AAE_4168_C4499D5E4133",
   "backwardYaw": 170.21,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_DB374A8C_C765_4952_41E1_A2E190D5388B",
  "this.overlay_D912F139_C767_5BB2_41DE_1B6920A1E6C5",
  "this.overlay_2F7EFB5A_3365_C817_41BE_6597E5C0442A"
 ],
 "thumbnailUrl": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -171.04,
  "pitch": -3.3
 },
 "id": "panorama_3F725F51_3327_C814_41AA_6410005E16A5_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -86.42,
  "pitch": 0
 },
 "id": "camera_5076EABF_4180_E1D2_41CA_E9C6F28E2E06",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -21.19,
  "pitch": 0
 },
 "id": "camera_5016C23F_4180_E0D2_4151_C52FFD8693B1",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 37.59,
  "pitch": 0
 },
 "id": "camera_53B4C366_4180_E775_41C7_FB22B96FEA99",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4bhk living 01 17th",
 "id": "panorama_3F725F51_3327_C814_41AA_6410005E16A5",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 110.68,
   "panorama": "this.panorama_24CDB527_010B_7E9D_4174_52D79CB239F2",
   "backwardYaw": -112.74,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 128.04,
   "panorama": "this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2",
   "backwardYaw": 0.29,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -169.02,
   "panorama": "this.panorama_389785F0_3327_3814_41C9_2FC03DB15F5D",
   "backwardYaw": -120.4,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 29.69,
   "panorama": "this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045",
   "backwardYaw": -142.41,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -20.01,
   "panorama": "this.panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C",
   "backwardYaw": -59.5,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_3DBB7384_333D_38F3_41C1_53B54FACFB40",
  "this.overlay_3C2F8DD9_333D_4815_41B7_9EBE46B8599A",
  "this.overlay_3C9B0F8A_333F_48F7_41C8_42F46B74985E",
  "this.overlay_2396CDBC_333D_4813_4185_94CB756CAC19",
  "this.overlay_22255151_333D_D815_41C0_71E393FD43EC"
 ],
 "thumbnailUrl": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_t.jpg",
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.71,
  "pitch": 0
 },
 "id": "camera_539C1340_4180_E0AE_41C8_8E8132661EE0",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 5.31,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 5.31,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 5.31,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -157.98,
  "pitch": 0
 },
 "id": "camera_55C04745_4180_E0B7_4124_ED0ACDCCA0F4",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 36.59,
  "pitch": 0
 },
 "id": "camera_52DD6578_4180_E35E_41AD_BFAB4F908097",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_10BE6159_013F_76B5_411F_D68688796320_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 117.49,
  "pitch": 0
 },
 "id": "camera_530BE408_4180_E0BD_41BB_CB72EF51DDD5",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 117.08,
  "pitch": 0
 },
 "id": "camera_50CF619C_4180_E3D6_414A_D9EED6AF4C18",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -86.42,
  "pitch": 0
 },
 "id": "camera_50F0E1FC_4180_E355_41C3_39F58220E844",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 166.56,
  "pitch": -2.76
 },
 "id": "panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 5.31,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 5.31,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 5.31,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 61.61,
  "pitch": 0
 },
 "id": "camera_50A47140_4180_E0AD_419B_09A9620F29D6",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK BEDROOM 01 2 33rd",
 "id": "panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -0.72,
   "panorama": "this.panorama_3FC32490_3325_7813_41B5_5ED0D40BC796",
   "backwardYaw": 128.26,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 148.02,
   "panorama": "this.panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060",
   "backwardYaw": -131.59,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 8.67,
   "panorama": "this.panorama_10A96800_0139_3693_4154_C75F68C57800",
   "backwardYaw": -139.29,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_EAECF1EB_C72D_FAD6_41A8_B49AEB304111",
  "this.overlay_E91CF77E_C72C_C7AE_41E6_ED92117BB9B5",
  "this.overlay_077D34F6_3367_581F_41C8_C54C2DC06817"
 ],
 "thumbnailUrl": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK BEDROOM 02 1 33rd",
 "id": "panorama_CD973440_C71F_79D2_41CE_832903CFC20A",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 71.39,
   "panorama": "this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545",
   "backwardYaw": -22.69,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 158.3,
   "panorama": "this.panorama_10A654BD_0139_1FED_4171_7FACE1C8F817",
   "backwardYaw": -62.92,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_E8B6B81F_C72D_496E_41E6_150256507011",
  "this.overlay_17E47A34_064B_049A_4197_FDC631E459DD"
 ],
 "thumbnailUrl": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -170.33,
  "pitch": -0.75
 },
 "id": "panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -172.34,
  "pitch": 0
 },
 "id": "camera_5376149A_4180_E1D2_41C3_3EF4A7AC6528",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4bhk Powder toilet",
 "id": "panorama_2740B091_0119_17B5_4159_67CCDF611884",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -113.63,
   "panorama": "this.panorama_3FC52041_332B_3875_41C7_36D298EEF65B",
   "backwardYaw": 110.67,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_27E5C64F_0119_1AAD_4168_4CBEDDEFB1DF"
 ],
 "thumbnailUrl": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_t.jpg",
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 11.87,
  "pitch": 0
 },
 "id": "camera_555B281B_4180_E0D2_41CD_4C17D089BA8A",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -104.01,
  "pitch": 0
 },
 "id": "camera_501F2A22_4180_E0ED_4196_02460525CAC3",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.38,
  "pitch": 0
 },
 "id": "camera_5284E4AE_4180_E1F5_41CC_8DBFFD02BAE5",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 59.6,
  "pitch": 0
 },
 "id": "camera_53A0D353_4180_E752_4181_74E3C9A52A1E",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4bhk_bolcony_33",
 "id": "panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -169.16,
   "panorama": "this.panorama_3F2BA48E_3325_580C_41C2_AB809D46139D",
   "backwardYaw": -2.88,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_F4A93A03_E6FE_6C1A_41B1_F38C9DDC27C0"
 ],
 "thumbnailUrl": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -149.97,
  "pitch": 0
 },
 "id": "camera_53AE1B23_4180_E0F2_41BC_A5A999E46865",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4_BHK_BEDROOM_4_TOILET copy",
 "id": "panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 166.32,
   "panorama": "this.panorama_CD888F1A_C71C_C776_41E5_354715787DA9",
   "backwardYaw": 22.99,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_10AE33E1_0109_1995_416C_2A5286DB7CD2"
 ],
 "thumbnailUrl": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_t.jpg",
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -165.3,
  "pitch": 0
 },
 "id": "camera_551407B1_4180_EFEF_41A4_AECE014F221C",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK BEDROOM 04 2 17th",
 "id": "panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 68.51,
   "panorama": "this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942",
   "backwardYaw": -21.56,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_D10180AB_C763_D956_41E1_17A33D3BEE1E"
 ],
 "thumbnailUrl": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -150.6,
  "pitch": 0
 },
 "id": "camera_50A3A903_4180_E0B3_41AA_A2318CB80B71",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -25.97,
  "pitch": 0
 },
 "id": "camera_55D1B758_4180_EF5E_41B2_BE120BBD8AE7",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 172.09,
  "pitch": -4.52
 },
 "id": "panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 21.14,
  "pitch": 0
 },
 "id": "camera_50EA19D4_4180_E356_41B0_C2BE0DD21059",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4bhk_bedroom_02 copy",
 "id": "panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -137.91,
   "panorama": "this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01",
   "backwardYaw": 7.66,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_16FBB4AF_0109_3FEE_4160_1AEF26426FD1"
 ],
 "thumbnailUrl": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_t.jpg",
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 41.12,
  "pitch": 0
 },
 "id": "camera_50B7092C_4180_E0F6_41CE_B10C027045CF",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK BEDROOM 04 1 33rd",
 "id": "panorama_EBE3DC98_C723_4972_41E0_39A7A1000045",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 135.03,
   "panorama": "this.panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8",
   "backwardYaw": 15.08,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 152.65,
   "panorama": "this.panorama_3F2BA48E_3325_580C_41C2_AB809D46139D",
   "backwardYaw": 75.99,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -18.67,
   "panorama": "this.panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05",
   "backwardYaw": 70.89,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_F4E4001F_C725_596E_41E0_DD5EA526DD91",
  "this.overlay_F3F318C8_C723_4AD2_41E2_333E3532C07C",
  "this.overlay_04092059_336D_7815_41C8_44B93151666E"
 ],
 "thumbnailUrl": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -150.6,
  "pitch": 0
 },
 "id": "camera_53D223B0_4180_E7EE_41B1_D28E6857D835",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -0.25,
  "pitch": -2.26
 },
 "id": "panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -51.96,
  "pitch": 0
 },
 "id": "camera_50B22942_4180_E0B2_41CA_FE7966F2C1F1",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -102.5,
  "pitch": 0
 },
 "id": "camera_551A77C8_4180_EFBD_41C7_537C0EED699D",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK BEDROOM 03 2 28th",
 "id": "panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 21.89,
   "panorama": "this.panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75",
   "backwardYaw": 93.58,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 24.24,
   "panorama": "this.panorama_121539AD_013B_29ED_4160_3D4F82B47E36",
   "backwardYaw": 167.82,
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
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_E11B8401_C724_F952_41BA_B115171D0330",
  "this.overlay_E05F9DD6_C723_CAF1_41E7_95CA81350DF9",
  "this.overlay_149CB3EC_3364_D833_41C7_409024E90602"
 ],
 "thumbnailUrl": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 31.58,
  "pitch": 0
 },
 "id": "camera_50357A48_4180_E0BE_41A9_DF6F97A2ED02",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_10BCB494_013F_1FB2_4161_C83441295AC6_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 159.99,
  "pitch": 0
 },
 "id": "camera_53CEC394_4180_E7D6_41A7_24049374A2C0",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK BEDROOM 02 2 23rd",
 "id": "panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -143.41,
   "panorama": "this.panorama_3FC52041_332B_3875_41C7_36D298EEF65B",
   "backwardYaw": 29.4,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -14.77,
   "panorama": "this.panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751",
   "backwardYaw": 68.88,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_DC659AFB_C76F_4EB6_41D5_0F1877D4D037",
  "this.overlay_DCF81359_C76F_7FF3_41A8_62F50E047FA0"
 ],
 "thumbnailUrl": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -124.18,
  "pitch": 0
 },
 "id": "camera_526FF6B7_4180_E1D3_41C9_FBE3E81C58B6",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4bhk_Bedroom_003 copy",
 "id": "panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 14.7,
   "panorama": "this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC",
   "backwardYaw": 136.29,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_17C8401E_0109_16AF_4164_AB7919665F6E"
 ],
 "thumbnailUrl": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_t.jpg",
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 156.81,
  "pitch": 0
 },
 "id": "camera_53D60B61_4180_E76E_41CD_33939DD8FB04",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 121.63,
  "pitch": 0
 },
 "id": "camera_52F0C5B9_4180_E3DF_41C8_24A922B3A40A",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -155.76,
  "pitch": 0
 },
 "id": "camera_509358C8_4180_E1BD_41CA_3A8D13F43D19",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -25.72,
  "pitch": 0
 },
 "id": "camera_552A77DD_4180_EF57_41C6_28AD5E2C4054",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -51.74,
  "pitch": 0
 },
 "id": "camera_53E81B86_4180_E7B2_41C8_0594060A4516",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 160.78,
  "pitch": 0
 },
 "id": "camera_5179E0EE_4180_E172_41A2_B66B027CCD3A",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -111.49,
  "pitch": 0
 },
 "id": "camera_5054EA84_4180_E1B6_41C5_991296E2FB40",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -170.33,
  "pitch": 0
 },
 "id": "camera_539A0B0F_4180_E0B3_41AD_EE841DDDF41C",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK_Bedroom01_ copy",
 "id": "panorama_10A654BD_0139_1FED_4171_7FACE1C8F817",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -62.92,
   "panorama": "this.panorama_CD973440_C71F_79D2_41CE_832903CFC20A",
   "backwardYaw": 158.3,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_214EEAE1_010B_EB95_416D_C987852A4510"
 ],
 "thumbnailUrl": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_t.jpg",
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -101.07,
  "pitch": 0
 },
 "id": "camera_50A4C8EF_4180_E172_41BE_2CEE04B0F87D",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -164.92,
  "pitch": 0
 },
 "id": "camera_500AFA0F_4180_E0B3_41B4_9AE1B45746D3",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 43.63,
  "pitch": 0
 },
 "id": "camera_50C76973_4180_E353_41B8_DAB02EEF9FD7",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 40.71,
  "pitch": 0
 },
 "id": "camera_530D5BB6_4180_E7D2_41C9_D6ACDDF45DBE",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 120.5,
  "pitch": 0
 },
 "id": "camera_53B8237C_4180_E756_41C1_84C1764C68AE",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4bhk kitchen",
 "id": "panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -63.14,
   "panorama": "this.panorama_3FC32490_3325_7813_41B5_5ED0D40BC796",
   "backwardYaw": -19.97,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_F418FFB4_C727_46B1_41E3_7157AAB75A6C"
 ],
 "thumbnailUrl": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.12,
  "pitch": 0
 },
 "id": "camera_53200BE7_4180_E772_41C4_CA333DDBC17C",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -70.08,
  "pitch": 0
 },
 "id": "camera_536BBC4A_4180_E0B2_41CF_FAE19D1F3AAA",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 170.24,
  "pitch": -1.28
 },
 "id": "panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 18.75,
  "pitch": 0
 },
 "id": "camera_55F63780_4180_EFAE_41CC_3754F23C14E1",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_10A96800_0139_3693_4154_C75F68C57800_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK BEDROOM 01 1 23rd",
 "id": "panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -133.6,
   "panorama": "this.panorama_CD732023_C71F_F956_41D6_6910628043DA",
   "backwardYaw": 154.8,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_DDB914AF_C76D_7AAE_41DD_FD246BE7004B"
 ],
 "thumbnailUrl": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -87.93,
  "pitch": 0
 },
 "id": "camera_517420C6_4180_E1B5_41B3_09A960F0717C",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -21.7,
  "pitch": 0
 },
 "id": "camera_53315BFB_4180_E753_41C4_AA00F167B909",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -108.61,
  "pitch": 0
 },
 "id": "camera_53BCDB37_4180_E0D2_41CA_64A81B9BB09D",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 67.26,
  "pitch": 0
 },
 "id": "camera_538A332B_4180_E0F3_41C0_0A615EC9C7AE",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -69.33,
  "pitch": 0
 },
 "id": "camera_503E8A5C_4180_E155_41B0_5FE5009751BE",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK BEDROOM 02 2 33rd",
 "id": "panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -143.41,
   "panorama": "this.panorama_3FC32490_3325_7813_41B5_5ED0D40BC796",
   "backwardYaw": 30.03,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -22.69,
   "panorama": "this.panorama_CD973440_C71F_79D2_41CE_832903CFC20A",
   "backwardYaw": 71.39,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_E994C697_C72F_797F_41D3_1180D963962C",
  "this.overlay_E8B86196_C72D_7B7E_41D9_E9ACE1C1D537"
 ],
 "thumbnailUrl": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "partial": false,
 "label": "4bhk_bedroom_02 copy",
 "id": "panorama_10BCB494_013F_1FB2_4161_C83441295AC6",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -140.17,
   "panorama": "this.panorama_CD732023_C71F_F956_41D6_6910628043DA",
   "backwardYaw": 9.67,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_12BC958B_0109_7995_4112_D3CFE865F0D8"
 ],
 "thumbnailUrl": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_t.jpg",
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -26.34,
  "pitch": 0
 },
 "id": "camera_50FF19E8_4180_E37D_41A8_07812B8E0818",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -158.41,
  "pitch": -3.02
 },
 "id": "panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -35.5,
  "pitch": 0
 },
 "id": "camera_504EE2B0_4180_E1EE_41CA_5046374B7BAE",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -158.36,
  "pitch": 0
 },
 "id": "camera_533D0448_4180_E0BD_419E_198DE156DFAE",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 119.59,
  "pitch": 0
 },
 "id": "camera_53DA4B74_4180_E756_41BD_C0BBD5B69A29",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 157.31,
  "pitch": 0
 },
 "id": "camera_50C49186_4180_E3B2_41A0_71E8BEF894C4",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_3F725F51_3327_C814_41AA_6410005E16A5_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "media": "this.panorama_3F725F51_3327_C814_41AA_6410005E16A5",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "media": "this.panorama_389785F0_3327_3814_41C9_2FC03DB15F5D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "media": "this.panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "media": "this.panorama_24CDB527_010B_7E9D_4174_52D79CB239F2",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "media": "this.panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "media": "this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "media": "this.panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "media": "this.panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "media": "this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CC175683_C71F_5956_41AA_704EB81E1F05_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "media": "this.panorama_CC175683_C71F_5956_41AA_704EB81E1F05",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "media": "this.panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD888F1A_C71C_C776_41E5_354715787DA9_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "media": "this.panorama_CD888F1A_C71C_C776_41E5_354715787DA9",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "media": "this.panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "media": "this.panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "media": "this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "media": "this.panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "media": "this.panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_3FC52041_332B_3875_41C7_36D298EEF65B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "media": "this.panorama_3FC52041_332B_3875_41C7_36D298EEF65B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "media": "this.panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "media": "this.panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_2740B091_0119_17B5_4159_67CCDF611884_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "media": "this.panorama_2740B091_0119_17B5_4159_67CCDF611884",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "media": "this.panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD732023_C71F_F956_41D6_6910628043DA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "media": "this.panorama_CD732023_C71F_F956_41D6_6910628043DA",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "media": "this.panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_10BCB494_013F_1FB2_4161_C83441295AC6_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "media": "this.panorama_10BCB494_013F_1FB2_4161_C83441295AC6",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "media": "this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "media": "this.panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_10BE6159_013F_76B5_411F_D68688796320_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "media": "this.panorama_10BE6159_013F_76B5_411F_D68688796320",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "media": "this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 30)",
   "media": "this.panorama_CD894C2A_C71C_C951_4172_7357AF61EE99",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 30, 31)",
   "media": "this.panorama_12091E1F_013F_2AAE_4168_C4499D5E4133",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 31, 32)",
   "media": "this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 32, 33)",
   "media": "this.panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 33, 34)",
   "media": "this.panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_3FD93565_332B_583D_41C9_645338B595F0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 34, 35)",
   "media": "this.panorama_3FD93565_332B_583D_41C9_645338B595F0",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 35, 36)",
   "media": "this.panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 36, 37)",
   "media": "this.panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 37, 38)",
   "media": "this.panorama_27D62BB1_011F_69F2_416D_0AB033A18B06",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "start": "this.MainViewerPanoramaPlayer.set('displayPlaybackBar', false)",
   "camera": "this.panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 38, 39)",
   "media": "this.panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 39, 40)",
   "media": "this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 40, 41)",
   "media": "this.panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 41, 42)",
   "media": "this.panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 42, 43)",
   "media": "this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 43, 44)",
   "media": "this.panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_10AB6D68_013B_EE92_4160_6689FDC41054_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 44, 45)",
   "media": "this.panorama_10AB6D68_013B_EE92_4160_6689FDC41054",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 45, 46)",
   "media": "this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 46, 47)",
   "media": "this.panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_121539AD_013B_29ED_4160_3D4F82B47E36_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 47, 48)",
   "media": "this.panorama_121539AD_013B_29ED_4160_3D4F82B47E36",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 48, 49)",
   "media": "this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 49, 50)",
   "media": "this.panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 50, 51)",
   "media": "this.panorama_10AB2713_013B_1AB5_4162_9A65609A81B1",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 51, 52)",
   "media": "this.panorama_3FC32490_3325_7813_41B5_5ED0D40BC796",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 52, 53)",
   "media": "this.panorama_3F2BA48E_3325_580C_41C2_AB809D46139D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 53, 54)",
   "media": "this.panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_28495FE3_011F_2995_4161_1F0BD106F099_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 54, 55)",
   "media": "this.panorama_28495FE3_011F_2995_4161_1F0BD106F099",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 55, 56)",
   "media": "this.panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 56, 57)",
   "media": "this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 57, 58)",
   "media": "this.panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_10A96800_0139_3693_4154_C75F68C57800_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 58, 59)",
   "media": "this.panorama_10A96800_0139_3693_4154_C75F68C57800",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 59, 60)",
   "media": "this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD973440_C71F_79D2_41CE_832903CFC20A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 60, 61)",
   "media": "this.panorama_CD973440_C71F_79D2_41CE_832903CFC20A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 61, 62)",
   "media": "this.panorama_10A654BD_0139_1FED_4171_7FACE1C8F817",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 62, 63)",
   "media": "this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 63, 64)",
   "media": "this.panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_10F8A1A0_0139_3993_4126_7D4276303500_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 64, 65)",
   "media": "this.panorama_10F8A1A0_0139_3993_4126_7D4276303500",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 65, 66)",
   "media": "this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 66, 67)",
   "media": "this.panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 67, 0)",
   "media": "this.panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "mainPlayList"
},
{
 "partial": false,
 "label": "4BHK BEDROOM 01 1 17th",
 "id": "panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -138.88,
   "panorama": "this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2",
   "backwardYaw": 155.88,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_D5B45B26_C76D_CF5E_41D0_7E370B2F5BD4"
 ],
 "thumbnailUrl": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "partial": false,
 "label": "4bhk Powder toilet",
 "id": "panorama_28495FE3_011F_2995_4161_1F0BD106F099",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -112.94,
   "panorama": "this.panorama_3FC32490_3325_7813_41B5_5ED0D40BC796",
   "backwardYaw": 109.92,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_28543281_0109_3B92_4172_B2B47CE181F9"
 ],
 "thumbnailUrl": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_t.jpg",
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 119.09,
  "pitch": 0
 },
 "id": "camera_50309287_4180_E1B3_4191_62EC69CCAF4C",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaPlayer",
 "mouseControlMode": "drag_acceleration",
 "touchControlMode": "drag_rotation",
 "displayPlaybackBar": true,
 "viewerArea": "this.MainViewer",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true
},
{
 "partial": false,
 "label": "4BHK BEDROOM 04 1 23rd",
 "id": "panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC",
 "pitch": 0,
 "hfovMax": 130,
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
   "yaw": 136.29,
   "panorama": "this.panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898",
   "backwardYaw": 14.7,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 153.66,
   "panorama": "this.panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674",
   "backwardYaw": 77.5,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_D95E3B79_C764_CFB2_41CF_C88AFF6D4BC6",
  "this.overlay_D84AC366_C763_5FD1_41D2_AE1B94515E56",
  "this.overlay_2E819605_3367_5BFC_41B8_E790FCBF0C1C"
 ],
 "thumbnailUrl": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 31.83,
  "pitch": 0
 },
 "id": "camera_52BFC53A_4180_E0D2_41BE_B54BB315BF91",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK BEDROOM 03 2 33rd",
 "id": "panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506",
 "pitch": 0,
 "hfovMax": 130,
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
   "panorama": "this.panorama_3F2BA48E_3325_580C_41C2_AB809D46139D",
   "backwardYaw": 92.07,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 22.23,
   "panorama": "this.panorama_10F8A1A0_0139_3993_4126_7D4276303500",
   "backwardYaw": 166.07,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_F7CC04EB_C723_5AD6_41D4_F9DE6E7EE7BF",
  "this.overlay_F6F55B77_C723_4FBE_41D4_D6F2BBFF046B",
  "this.overlay_054D7046_3365_587C_41B4_341A68250AD4"
 ],
 "thumbnailUrl": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -87.93,
  "pitch": 0
 },
 "id": "camera_559DA708_4180_E0BE_41C3_3657E6F68197",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -25.2,
  "pitch": 0
 },
 "id": "camera_521AD61B_4180_E0D1_41C2_E077A82D538C",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4bhk living 02 23rd",
 "id": "panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 93.58,
   "panorama": "this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0",
   "backwardYaw": 21.64,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -1.62,
   "panorama": "this.panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43",
   "backwardYaw": -158.86,
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
   "yaw": -123.54,
   "panorama": "this.panorama_3FC52041_332B_3875_41C7_36D298EEF65B",
   "backwardYaw": -170.14,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_241BB4D3_3325_3814_41C6_89CAB51CC72B",
  "this.overlay_241B9CB4_335B_4813_41C8_FB53C1DE9901",
  "this.overlay_2BEDF09F_335B_D80D_41C8_6EE16588E85C",
  "this.overlay_2A2C951D_335C_D80D_41C3_D3A1362340BD"
 ],
 "thumbnailUrl": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_t.jpg",
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 161.33,
  "pitch": 0
 },
 "id": "camera_50D061B7_4180_E3D1_41C4_71D50BEB9577",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4bhk_bolcony_17",
 "id": "panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -161.25,
   "panorama": "this.panorama_389785F0_3327_3814_41C9_2FC03DB15F5D",
   "backwardYaw": -1.88,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_E98B544E_E6F6_642D_41D5_639CA13A6B69"
 ],
 "thumbnailUrl": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -158.11,
  "pitch": 0
 },
 "id": "camera_554BC807_4180_E0B2_4179_199E04610CC2",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -27.35,
  "pitch": 0
 },
 "id": "camera_53612486_4180_E1B2_41A8_1BB160EF1F52",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK BEDROOM 02 2 17th",
 "id": "panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -142.41,
   "panorama": "this.panorama_3F725F51_3327_C814_41AA_6410005E16A5",
   "backwardYaw": 29.69,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -23.19,
   "panorama": "this.panorama_CC175683_C71F_5956_41AA_704EB81E1F05",
   "backwardYaw": 55.82,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_D464C36F_C76D_5FAF_41D8_35D099FAD98B",
  "this.overlay_D4E3A43C_C76F_59B1_41D0_FA262DAB39CB"
 ],
 "thumbnailUrl": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CD973440_C71F_79D2_41CE_832903CFC20A_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_28495FE3_011F_2995_4161_1F0BD106F099_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 158.77,
  "pitch": 0
 },
 "id": "camera_55B3E731_4180_E0EF_41CC_18C279C9F8C9",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 97.9,
  "pitch": 0
 },
 "id": "camera_538C3AE8_4180_E17D_41CF_0CC50B36149B",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 156.51,
  "pitch": -4.02
 },
 "id": "panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CC175683_C71F_5956_41AA_704EB81E1F05_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4bhk_Bedroom_003 copy",
 "id": "panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 15.08,
   "panorama": "this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045",
   "backwardYaw": 135.03,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_055AB65B_336D_F815_41C0_3EE3DBDD5EBD"
 ],
 "thumbnailUrl": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_t.jpg",
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_2740B091_0119_17B5_4159_67CCDF611884_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 39.2,
  "pitch": 0
 },
 "id": "camera_50B8495F_4180_E352_41A0_54D5047334B5",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 171.58,
  "pitch": -1.26
 },
 "id": "panorama_CD732023_C71F_F956_41D6_6910628043DA_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -43.71,
  "pitch": 0
 },
 "id": "camera_50EFD1E2_4180_E36D_41B0_FEAA275C0B67",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 9.86,
  "pitch": 0
 },
 "id": "camera_500189FC_4180_E355_41AF_60744C9B1AD3",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4bhk living 02 17th",
 "id": "panorama_389785F0_3327_3814_41C9_2FC03DB15F5D",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 92.07,
   "panorama": "this.panorama_CD888F1A_C71C_C776_41E5_354715787DA9",
   "backwardYaw": 22.02,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 78,
   "panorama": "this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942",
   "backwardYaw": 154.03,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -120.4,
   "panorama": "this.panorama_3F725F51_3327_C814_41AA_6410005E16A5",
   "backwardYaw": -169.02,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -1.88,
   "panorama": "this.panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A",
   "backwardYaw": -161.25,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_23C14CCE_3325_C80F_41A1_C6AC5B361F71",
  "this.overlay_221DC314_3325_3813_41A8_082AB46F5780",
  "this.overlay_22D0E017_332B_781C_41AC_346875398785",
  "this.overlay_228FF5B1_332B_3814_41C7_17FB7C40FCDE"
 ],
 "thumbnailUrl": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_t.jpg",
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 46.4,
  "pitch": 0
 },
 "id": "camera_5052B2C4_4180_E1B5_41CA_BD44DB97BDA6",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -12.18,
  "pitch": 0
 },
 "id": "camera_507AEAD3_4180_E153_41A4_0C6437F81B61",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 160.03,
  "pitch": 0
 },
 "id": "camera_53125BD0_4180_E7AD_41B9_E8A908346E08",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 67.06,
  "pitch": 0
 },
 "id": "camera_50A96159_4180_E35E_41B7_ABCAA4CE9A84",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -164.92,
  "pitch": 0
 },
 "id": "camera_535A9C37_4180_E0D3_41C3_2BE1080560E8",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -171.33,
  "pitch": 0
 },
 "id": "camera_55A2371C_4180_E0D6_41CB_05BF2535258B",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -24.12,
  "pitch": 0
 },
 "id": "camera_502F126F_4180_E173_41C3_939FBC69D067",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 5.31,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 5.31,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 5.31,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 10.36,
  "pitch": 0
 },
 "id": "camera_5342645B_4180_E153_419C_15F767DF7393",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 56.46,
  "pitch": 0
 },
 "id": "camera_52CC2559_4180_E35E_41B3_EAB6C16C16CA",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -178.96,
  "pitch": 0
 },
 "id": "camera_520765DC_4180_E355_419A_0BCC2A85B5F3",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 48.41,
  "pitch": 0
 },
 "id": "camera_53FFFB9C_4180_E7D5_41A6_EC7B3D025D13",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK BEDROOM 01 2 17th",
 "id": "panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2",
 "pitch": 0,
 "hfovMax": 130,
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
   "panorama": "this.panorama_3F725F51_3327_C814_41AA_6410005E16A5",
   "backwardYaw": 128.04,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 10.93,
   "panorama": "this.panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A",
   "backwardYaw": -140.8,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_D51089C5_C765_CAD2_41E5_192F51616448",
  "this.overlay_D5FA2C1E_C764_C971_41E4_AEEDE47EBAA0",
  "this.overlay_201E14C5_332D_587D_41C6_941459487D53"
 ],
 "thumbnailUrl": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -51.99,
  "pitch": 0
 },
 "id": "camera_5068C2EE_4180_E175_41C3_FAF3B346AE54",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 75.37,
  "pitch": -3.27
 },
 "id": "panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK_Bedroom01_ copy",
 "id": "panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -60.41,
   "panorama": "this.panorama_CC175683_C71F_5956_41AA_704EB81E1F05",
   "backwardYaw": 158.81,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_1189CF7A_0109_6977_4165_30E4901C9436"
 ],
 "thumbnailUrl": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_t.jpg",
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -111.12,
  "pitch": 0
 },
 "id": "camera_53E0F3C6_4180_E7B5_4197_5C0644A1CEB7",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK BEDROOM 03 1 23rd",
 "id": "panorama_CD894C2A_C71C_C951_4172_7357AF61EE99",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0",
   "class": "AdjacentPanorama"
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_DA67D643_C765_39D6_41E7_BD2D534FD43E"
 ],
 "thumbnailUrl": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "partial": false,
 "label": "4BHK BEDROOM 03 1 28th",
 "id": "panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -82.1,
   "panorama": "this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A",
   "backwardYaw": -148.17,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_E039B42F_C73C_D9AE_4179_6CED54A79A5C"
 ],
 "thumbnailUrl": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.28,
  "pitch": 0
 },
 "id": "camera_509D012C_4180_E0F5_41C3_B6A0B165FE17",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "partial": false,
 "label": "4BHK BEDROOM 02 1 28th",
 "id": "panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 159.56,
   "panorama": "this.panorama_10AB6D68_013B_EE92_4160_6689FDC41054",
   "backwardYaw": -60.91,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 78.93,
   "panorama": "this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558",
   "backwardYaw": -21.43,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
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
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_E167051F_C725_5B6F_41E8_EC2A8AF34DDA",
  "this.overlay_176102E4_064F_05BA_418C_77CA1322ED25"
 ],
 "thumbnailUrl": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_t.jpg",
 "hfov": 360,
 "hfovMin": "150%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 66.51,
  "pitch": 0
 },
 "id": "camera_53FA63F2_4180_E76D_41BA_4FE7C09BB548",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 133.15,
  "pitch": -9.3
 },
 "id": "panorama_10AB6D68_013B_EE92_4160_6689FDC41054_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 13.26,
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ]
 }
},
{
 "progressBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "id": "MainViewer",
 "progressBorderSize": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipBorderSize": 1,
 "width": "100%",
 "toolTipPaddingRight": 6,
 "paddingBottom": 0,
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 4,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "toolTipPaddingLeft": 6,
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "minHeight": 50,
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "playbackBarHeadShadowBlurRadius": 3,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadHeight": 15,
 "progressBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "progressBarBorderColor": "#000000",
 "paddingLeft": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "height": "100%",
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "minWidth": 100,
 "toolTipBorderColor": "#767676",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBorderColor": "#000000",
 "class": "ViewerArea",
 "toolTipOpacity": 1,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "paddingTop": 0,
 "toolTipTextShadowColor": "#000000",
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "shadow": false,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarProgressBorderColor": "#000000",
 "transitionMode": "blending",
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
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
 "toolTipShadowHorizontalLength": 0,
 "vrPointerSelectionTime": 2000,
 "transitionDuration": 500,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "progressRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "data": {
  "name": "Main Viewer"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -139.29,
   "hfov": 14.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 19,
      "height": 16
     }
    ]
   },
   "pitch": -2.33
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42, this.camera_55A2371C_4180_E0D6_41CB_05BF2535258B); this.mainPlayList.set('selectedIndex', 56)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 234,
      "height": 188
     }
    ]
   },
   "pitch": -2.33,
   "yaw": -139.29,
   "distance": 50
  }
 ],
 "id": "overlay_1F068397_0107_19BE_4171_71AB44B1EA6D",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 15.71,
   "hfov": 13.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.05
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942, this.camera_50B3B16E_4180_E372_41C8_68CFBA64F7BD); this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 217,
      "height": 209
     }
    ]
   },
   "pitch": 0.05,
   "yaw": 15.71,
   "distance": 50
  }
 ],
 "id": "overlay_13B21729_013B_1A95_416C_98A10822AB74",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -167.28,
   "hfov": 15.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 17
     }
    ]
   },
   "pitch": 4.68
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75, this.camera_53200BE7_4180_E772_41C4_CA333DDBC17C); this.mainPlayList.set('selectedIndex', 35)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 220,
      "height": 241
     }
    ]
   },
   "pitch": 4.68,
   "yaw": -167.28,
   "distance": 50
  }
 ],
 "id": "overlay_F7CC2CF2_E6F2_E5F5_41C2_AAC8BF3B7DDA",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -158.86,
   "hfov": 15.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.28
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674, this.camera_5284E4AE_4180_E1F5_41CC_8DBFFD02BAE5); this.mainPlayList.set('selectedIndex', 18)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 217,
      "height": 224
     }
    ]
   },
   "pitch": 0.28,
   "yaw": -158.86,
   "distance": 50
  }
 ],
 "id": "overlay_F6B6F5DA_E6F2_2435_41D4_7EFE955F637C",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 154.03,
   "hfov": 15.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": 1.41
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_389785F0_3327_3814_41C9_2FC03DB15F5D, this.camera_50589A98_4180_E1DD_41CB_A88DAB7287BA); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 220,
      "height": 199
     }
    ]
   },
   "pitch": 1.41,
   "yaw": 154.03,
   "distance": 50
  }
 ],
 "id": "overlay_D29433BE_C765_3EAE_41D8_CC80272D951C",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -21.56,
   "hfov": 17.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -28.7
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335, this.camera_5054EA84_4180_E1B6_41C5_991296E2FB40); this.mainPlayList.set('selectedIndex', 15)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D1F893E7_C77D_5EDE_41C5_65F129D18629",
   "yaw": -21.56,
   "pitch": -28.7,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 17.05,
   "distance": 100
  }
 ],
 "id": "overlay_D179CE94_C763_4971_41E1_4D5D0BD3A926",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 134.53,
   "hfov": 7.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -10.49
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE, this.camera_506C9AAB_4180_E1F2_41BD_3FEAD4870DF5); this.mainPlayList.set('selectedIndex', 16)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CC463C1_3DEA_B735_41AB_DD4FB5E1D333",
   "yaw": 134.53,
   "pitch": -10.49,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.41,
   "distance": 50
  }
 ],
 "id": "overlay_272A1E92_332B_4814_41AA_E3151C20A966",
 "data": {
  "label": "Arrow 01 Left"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 167.82,
   "hfov": 14.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 17
     }
    ]
   },
   "pitch": 5.96
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A, this.camera_509358C8_4180_E1BD_41CA_3A8D13F43D19); this.mainPlayList.set('selectedIndex', 45)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 238,
      "height": 264
     }
    ]
   },
   "pitch": 5.96,
   "yaw": 167.82,
   "distance": 50
  }
 ],
 "id": "overlay_1D727724_011B_1A93_4171_CF3D20B290EA",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 69.51,
   "hfov": 9.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -32.59
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC, this.camera_509438B4_4180_E1D5_41C2_8CD1F7276E09); this.mainPlayList.set('selectedIndex', 31)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22BD5C76_010B_6F7E_4166_469CD7719366",
   "yaw": 69.51,
   "pitch": -32.59,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.82,
   "distance": 100
  }
 ],
 "id": "overlay_D8D0AEBD_C71D_46B2_41E2_77FAFEC5B3BD",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -142.03,
   "hfov": 15.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 18,
      "height": 16
     }
    ]
   },
   "pitch": 0.03
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3FD93565_332B_583D_41C9_645338B595F0, this.camera_50A3A903_4180_E0B3_41AA_A2318CB80B71); this.mainPlayList.set('selectedIndex', 34)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 217,
      "height": 189
     }
    ]
   },
   "pitch": 0.03,
   "yaw": -142.03,
   "distance": 50
  }
 ],
 "id": "overlay_E3C0EB9C_C727_CF72_41D8_2929BE9FB4EE",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -21.43,
   "hfov": 16.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -26.82
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F, this.camera_50A4C8EF_4180_E172_41BE_2CEE04B0F87D); this.mainPlayList.set('selectedIndex', 43)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22A4AC79_010B_6F72_416E_51CCA57431BC",
   "yaw": -21.43,
   "pitch": -26.82,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.23,
   "distance": 100
  }
 ],
 "id": "overlay_E2CC1B58_C725_4FF1_41E7_2F6766A1B20D",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -113.49,
   "hfov": 17.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -5.47
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3FD93565_332B_583D_41C9_645338B595F0, this.camera_529584D7_4180_E153_41C2_12B22D2691E7); this.mainPlayList.set('selectedIndex', 34)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 17.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 290,
      "height": 290
     }
    ]
   },
   "pitch": -5.47,
   "yaw": -113.49,
   "distance": 50
  }
 ],
 "id": "overlay_299D94A8_0107_1F92_4177_026B7F551234",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -112.74,
   "hfov": 17.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -1.9
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3F725F51_3327_C814_41AA_6410005E16A5, this.camera_50DE89AF_4180_E3F2_4192_879BEBB18A92); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 17.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 295,
      "height": 308
     }
    ]
   },
   "pitch": -1.9,
   "yaw": -112.74,
   "distance": 50
  }
 ],
 "id": "overlay_246B1C44_0107_6E93_416A_CF9A21893363",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1.29,
   "hfov": 10.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.91
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3FD93565_332B_583D_41C9_645338B595F0, this.camera_50D5F99C_4180_E3D5_41C6_0C0E48A238A8); this.mainPlayList.set('selectedIndex', 34)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 151,
      "height": 151
     }
    ]
   },
   "pitch": 0.91,
   "yaw": 1.29,
   "distance": 50
  }
 ],
 "id": "overlay_E4AC823C_C723_F9B2_41B4_39B29FEEA91C",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 144.5,
   "hfov": 13.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -44.78
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE, this.camera_50C76973_4180_E353_41B8_DAB02EEF9FD7); this.mainPlayList.set('selectedIndex', 40)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22B97C78_010B_6F72_4168_A626EED7BAD0",
   "yaw": 144.5,
   "pitch": -44.78,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.8,
   "distance": 100
  }
 ],
 "id": "overlay_E33D35E2_C723_3AD1_41A1_22D3C41AFB56",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 7.66,
   "hfov": 7.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -12.25
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E, this.camera_50CCF986_4180_E3B2_41C3_18A5B21E18C8); this.mainPlayList.set('selectedIndex', 41)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CD7B3CA_3DEA_B737_41CB_DC50A9EBF807",
   "yaw": 7.66,
   "pitch": -12.25,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.37,
   "distance": 50
  }
 ],
 "id": "overlay_148591CC_3365_3873_41C5_5BF064D6EBF6",
 "data": {
  "label": "Arrow 01 Right"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 55.82,
   "hfov": 15.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -38.5
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045, this.camera_53D60B61_4180_E76E_41CD_33939DD8FB04); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D1F953E7_C77D_5EDE_41B3_BBC8AE666EFB",
   "yaw": 55.82,
   "pitch": -38.5,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.21,
   "distance": 100
  }
 ],
 "id": "overlay_D4F9B791_C76F_4773_41B6_B1727AC576AD",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 158.81,
   "hfov": 10.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.4
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80, this.camera_53DA4B74_4180_E756_41BD_C0BBD5B69A29); this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 151,
      "height": 151
     }
    ]
   },
   "pitch": 0.4,
   "yaw": 158.81,
   "distance": 50
  }
 ],
 "id": "overlay_09C2C4FC_065B_0D8A_4181_30568EDF6179",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -140.8,
   "hfov": 14.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.19
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2, this.camera_522B063E_4180_E0D5_41CC_CBE8B7409848); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 234,
      "height": 230
     }
    ]
   },
   "pitch": 1.19,
   "yaw": -140.8,
   "distance": 50
  }
 ],
 "id": "overlay_0F921219_0107_1AB2_4163_2FA0B008B772",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -61.67,
   "hfov": 16.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 18,
      "height": 16
     }
    ]
   },
   "pitch": -1.45
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751, this.camera_53315BFB_4180_E753_41C4_AA00F167B909); this.mainPlayList.set('selectedIndex', 26)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 268,
      "height": 234
     }
    ]
   },
   "pitch": -1.45,
   "yaw": -61.67,
   "distance": 50
  }
 ],
 "id": "overlay_153F3E16_010B_2ABF_4102_306DCD1B8DA0",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 22.02,
   "hfov": 10.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 17
     }
    ]
   },
   "pitch": 11.44
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_389785F0_3327_3814_41C9_2FC03DB15F5D, this.camera_559DA708_4180_E0BE_41C3_3657E6F68197); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 147,
      "height": 164
     }
    ]
   },
   "pitch": 11.44,
   "yaw": 22.02,
   "distance": 50
  }
 ],
 "id": "overlay_D3646773_C765_47B6_41E0_73AF92AE0B87",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -148.42,
   "hfov": 13.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -47.8
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0, this.camera_527C66D3_4180_E152_41A9_FB527125694E); this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D1F9D3E7_C77D_5EDE_41D3_15BE236E2A6A",
   "yaw": -148.42,
   "pitch": -47.8,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.06,
   "distance": 100
  }
 ],
 "id": "overlay_D246BEC5_C767_C6D3_417F_B7C47770AE7C",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 22.99,
   "hfov": 7.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -12.77
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00, this.camera_558C36EA_4180_E17D_41CC_C08C39629257); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CC523C1_3DEA_B735_41BB_7CAD57160089",
   "yaw": 22.99,
   "pitch": -12.77,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.35,
   "distance": 50
  }
 ],
 "id": "overlay_20CA203B_332C_F814_41BB_124149BEECE3",
 "data": {
  "label": "Arrow 01 Right"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 68.88,
   "hfov": 14.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -42.77
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4, this.camera_52A8851A_4180_E0D2_41BA_F050C192FEB9); this.mainPlayList.set('selectedIndex', 25)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22BEDC74_010B_6F73_416E_DDABD29706F9",
   "yaw": 68.88,
   "pitch": -42.77,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.27,
   "distance": 100
  }
 ],
 "id": "overlay_DB599724_C763_4752_41D6_A0FA163F689B",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 158.3,
   "hfov": 10.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -1.35
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_10BE6159_013F_76B5_411F_D68688796320, this.camera_529874F6_4180_E152_41B6_454067CFE5F6); this.mainPlayList.set('selectedIndex', 27)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 151,
      "height": 151
     }
    ]
   },
   "pitch": -1.35,
   "yaw": 158.3,
   "distance": 50
  }
 ],
 "id": "overlay_1654E670_064B_0C9A_4147_50EF66183F10",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -136.37,
   "hfov": 15.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -38
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01, this.camera_504EE2B0_4180_E1EE_41CA_5046374B7BAE); this.mainPlayList.set('selectedIndex', 39)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22A66C79_010B_6F72_416E_D5DC8CEB8DEC",
   "yaw": -136.37,
   "pitch": -38,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.32,
   "distance": 100
  }
 ],
 "id": "overlay_E31F4E35_C725_49B2_41E3_75B373DD479F",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -119.77,
   "hfov": 11.29,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -29.18
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3FD93565_332B_583D_41C9_645338B595F0, this.camera_555B281B_4180_E0D2_41CD_4C17D089BA8A); this.mainPlayList.set('selectedIndex', 34)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CD303C8_3DEA_B733_41B1_09A8C2B14416",
   "yaw": -119.77,
   "pitch": -29.18,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.29,
   "distance": 100
  }
 ],
 "id": "overlay_13ACC0B1_336F_5814_41B3_CF6134E86EAC",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 77.75,
   "hfov": 7.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -1.95
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD, this.camera_552A77DD_4180_EF57_41C6_28AD5E2C4054); this.mainPlayList.set('selectedIndex', 48)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CD363C8_3DEA_B733_41C9_F71A831BD29F",
   "yaw": 77.75,
   "pitch": -1.95,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.53,
   "distance": 50
  }
 ],
 "id": "overlay_129ED365_336F_583D_418B_3FE762298228",
 "data": {
  "label": "Arrow 01 Left"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 93.58,
   "hfov": 7.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -3.2
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A, this.camera_554BC807_4180_E0B2_4179_199E04610CC2); this.mainPlayList.set('selectedIndex', 45)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CD213C8_3DEA_B733_41A1_06B629511452",
   "yaw": 93.58,
   "pitch": -3.2,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.52,
   "distance": 50
  }
 ],
 "id": "overlay_103A83CC_336C_F873_41A5_4AEAC87E592E",
 "data": {
  "label": "Arrow 01 Right"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.88,
   "hfov": 9.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -1.95
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269, this.camera_553BC7F2_4180_EF52_41C9_7D0CF69682EF); this.mainPlayList.set('selectedIndex', 36)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_1_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 151,
      "height": 151
     }
    ]
   },
   "pitch": -1.95,
   "yaw": -1.88,
   "distance": 50
  }
 ],
 "id": "overlay_11A6770F_336B_380D_41C2_1AE4C498D01F",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 154.28,
   "hfov": 15.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 15
     }
    ]
   },
   "pitch": 3.92
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75, this.camera_5347CC10_4180_E0AE_4173_547E1CB1EFA2); this.mainPlayList.set('selectedIndex', 35)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 220,
      "height": 206
     }
    ]
   },
   "pitch": 3.92,
   "yaw": 154.28,
   "distance": 50
  }
 ],
 "id": "overlay_E0AC7D99_C73D_CB72_41E2_CDE435C74BDD",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -19.04,
   "hfov": 13.76,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -26.82
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD, this.camera_53543C23_4180_E0F3_41BB_987E5EA662E0); this.mainPlayList.set('selectedIndex', 49)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22A0CC7B_010B_6F76_4146_3D8C62DD6E62",
   "yaw": -19.04,
   "pitch": -26.82,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.76,
   "distance": 100
  }
 ],
 "id": "overlay_EFD00FA6_C73C_C75E_41E0_8DE91C303B0D",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 134.28,
   "hfov": 9.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -17.65
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_10AB2713_013B_1AB5_4162_9A65609A81B1, this.camera_535A9C37_4180_E0D3_41C3_2BE1080560E8); this.mainPlayList.set('selectedIndex', 50)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CEA33CD_3DEA_B6CD_4176_BDA7140D8FA6",
   "yaw": 134.28,
   "pitch": -17.65,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.58,
   "distance": 50
  }
 ],
 "id": "overlay_18124021_3364_D834_41BD_B7C5B964EFB6",
 "data": {
  "label": "Arrow 01 Left"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -131.59,
   "hfov": 14.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -41.01
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42, this.camera_507C9302_4180_E0B3_41C9_AF94B886A9C9); this.mainPlayList.set('selectedIndex', 56)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22A9AC7F_010B_6F6E_416B_2EA4E226EE03",
   "yaw": -131.59,
   "pitch": -41.01,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.67,
   "distance": 100
  }
 ],
 "id": "overlay_E9099FDF_C72F_C6EE_41E3_A646B2C2340D",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 75.99,
   "hfov": 7.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.31
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045, this.camera_53612486_4180_E1B2_41A8_1BB160EF1F52); this.mainPlayList.set('selectedIndex', 65)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CEC53CF_3DEA_B6CD_41CC_25149D16B0DF",
   "yaw": 75.99,
   "pitch": 0.31,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.54,
   "distance": 50
  }
 ],
 "id": "overlay_1E29C2F2_337D_7817_414B_0F71C2427990",
 "data": {
  "label": "Arrow 01 Left"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 92.07,
   "hfov": 7.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.06
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506, this.camera_533D0448_4180_E0BD_419E_198DE156DFAE); this.mainPlayList.set('selectedIndex', 62)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CEFC3CF_3DEA_B6CD_41BF_A6712A1CCD8F",
   "yaw": 92.07,
   "pitch": 0.06,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.54,
   "distance": 50
  }
 ],
 "id": "overlay_1D30EC33_337D_4815_41C6_1AD386142BCC",
 "data": {
  "label": "Arrow 01 Right"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -2.88,
   "hfov": 9.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.2
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7, this.camera_53502472_4180_E152_41C6_49B747DDF9A4); this.mainPlayList.set('selectedIndex', 53)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_1_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 151,
      "height": 151
     }
    ]
   },
   "pitch": -0.2,
   "yaw": -2.88,
   "distance": 50
  }
 ],
 "id": "overlay_1DFAC394_337C_D81C_419B_CD9FDBFD294E",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -118.39,
   "hfov": 11.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -30.31
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3FC32490_3325_7813_41B5_5ED0D40BC796, this.camera_5342645B_4180_E153_419C_15F767DF7393); this.mainPlayList.set('selectedIndex', 51)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CEED3CF_3DEA_B6CD_41CB_ED49F5764221",
   "yaw": -118.39,
   "pitch": -30.31,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.38,
   "distance": 100
  }
 ],
 "id": "overlay_1C270587_337B_F8FC_41B5_CE1C9045E09B",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -59.5,
   "hfov": 6.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -35.86
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3F725F51_3327_C814_41AA_6410005E16A5, this.camera_53CEC394_4180_E7D6_41A7_24049374A2C0); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D1FFD3DD_C77D_5EF2_41CE_89845FEA3E36",
   "yaw": -59.5,
   "pitch": -35.86,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.79,
   "distance": 100
  }
 ],
 "id": "overlay_D6C3F8D5_C723_4AF3_41E1_A8B34E8F3123",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -60.91,
   "hfov": 15.01,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 17
     }
    ]
   },
   "pitch": -5.97
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F, this.camera_50A9D918_4180_E0DD_41CD_E6BBD85EF6DC); this.mainPlayList.set('selectedIndex', 43)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.01,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 251,
      "height": 276
     }
    ]
   },
   "pitch": -5.97,
   "yaw": -60.91,
   "distance": 50
  }
 ],
 "id": "overlay_1B991A50_0119_2AB2_4132_0A687531F080",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 68.38,
   "hfov": 10.01,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -32.72
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD, this.camera_50E501CD_4180_E3B6_417F_8731033BD3C4); this.mainPlayList.set('selectedIndex', 48)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22A1FC7B_010B_6F76_4168_B63BC17E5FDC",
   "yaw": 68.38,
   "pitch": -32.72,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.01,
   "distance": 100
  }
 ],
 "id": "overlay_EE27537F_C723_5FAE_41E1_DBA13BA4CC54",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -77.83,
   "hfov": 15.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -38.26
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506, this.camera_500C422A_4180_E0F2_41CC_AB03E2389305); this.mainPlayList.set('selectedIndex', 62)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22928C81_010B_6F92_4155_88CC3FCC3378",
   "yaw": -77.83,
   "pitch": -38.26,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.26,
   "distance": 100
  }
 ],
 "id": "overlay_F5309816_C725_4971_41DC_62B6061471DF",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -19.22,
   "hfov": 7.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.94
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1, this.camera_52F0C5B9_4180_E3DF_41C8_24A922B3A40A); this.mainPlayList.set('selectedIndex', 21)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CC753C2_3DEA_B737_41C7_1DE4DAD587C7",
   "yaw": -19.22,
   "pitch": -0.94,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.54,
   "distance": 50
  }
 ],
 "id": "overlay_265C376C_3324_F80C_41B3_61B0F86D8EC4",
 "data": {
  "label": "Arrow 01 Left"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 29.4,
   "hfov": 10.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.2
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4, this.camera_52DD6578_4180_E35E_41AD_BFAB4F908097); this.mainPlayList.set('selectedIndex', 25)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_1_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 180,
      "height": 176
     }
    ]
   },
   "pitch": -0.2,
   "yaw": 29.4,
   "distance": 50
  }
 ],
 "id": "overlay_2518098B_3327_48F4_413D_ABF49686336E",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 110.67,
   "hfov": 9.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.56
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_2740B091_0119_17B5_4159_67CCDF611884, this.camera_52E39598_4180_E3DE_41CF_169CBE9E24FF); this.mainPlayList.set('selectedIndex', 20)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_1_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 151,
      "height": 151
     }
    ]
   },
   "pitch": 0.56,
   "yaw": 110.67,
   "distance": 50
  }
 ],
 "id": "overlay_269A2233_3327_5815_41B2_A92B04A09121",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 128.01,
   "hfov": 9.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.2
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD732023_C71F_F956_41D6_6910628043DA, this.camera_520765DC_4180_E355_419A_0BCC2A85B5F3); this.mainPlayList.set('selectedIndex', 22)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_1_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 151,
      "height": 151
     }
    ]
   },
   "pitch": -0.2,
   "yaw": 128.01,
   "distance": 50
  }
 ],
 "id": "overlay_255C8B93_3324_C815_41B7_85EEB0BF60FC",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -170.14,
   "hfov": 14.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_1_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -25.29
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674, this.camera_52CC2559_4180_E35E_41B3_EAB6C16C16CA); this.mainPlayList.set('selectedIndex', 18)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CD983C2_3DEA_B737_41C1_EA60C9A4A467",
   "yaw": -170.14,
   "pitch": -25.29,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.65,
   "distance": 100
  }
 ],
 "id": "overlay_259D67C0_3325_D873_41C8_839B4E4B846C",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1.04,
   "hfov": 10.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 4.93
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3FC52041_332B_3875_41C7_36D298EEF65B, this.camera_5068C2EE_4180_E175_41C3_FAF3B346AE54); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 151,
      "height": 151
     }
    ]
   },
   "pitch": 4.93,
   "yaw": 1.04,
   "distance": 50
  }
 ],
 "id": "overlay_DD070AC8_C763_4ED2_41C9_24B475FBBEEE",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 154.8,
   "hfov": 13.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -44.28
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C, this.camera_5052B2C4_4180_E1B5_41CA_BD44DB97BDA6); this.mainPlayList.set('selectedIndex', 23)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22B02C73_010B_6F75_4168_F9B6711844B1",
   "yaw": 154.8,
   "pitch": -44.28,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.92,
   "distance": 100
  }
 ],
 "id": "overlay_DDFC90E3_C76D_7AD6_41E6_FFEEF526FE90",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 9.67,
   "hfov": 7.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -13.75
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_10BCB494_013F_1FB2_4161_C83441295AC6, this.camera_506422D9_4180_E15F_41B4_E4BB488F705E); this.mainPlayList.set('selectedIndex', 24)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CDA93C4_3DEA_B733_41B8_2EA1D92E00DF",
   "yaw": 9.67,
   "pitch": -13.75,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.32,
   "distance": 50
  }
 ],
 "id": "overlay_29D37BC2_335C_C877_41AD_908816526B4A",
 "data": {
  "label": "Arrow 01 Right"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -19.97,
   "hfov": 12.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -4.84
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC, this.camera_50883118_4180_E0DD_4194_919E448A0374); this.mainPlayList.set('selectedIndex', 55)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CEA13CD_3DEA_B6CD_41C2_75879BFAB51A",
   "yaw": -19.97,
   "pitch": -4.84,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 12.02,
   "distance": 50
  }
 ],
 "id": "overlay_19480E30_337B_4813_41B5_5EE57717F00C",
 "data": {
  "label": "Arrow 01 Left"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 30.03,
   "hfov": 9.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -1.7
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545, this.camera_50876104_4180_E0B5_4192_D8838B2E1AB6); this.mainPlayList.set('selectedIndex', 59)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_1_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 151,
      "height": 151
     }
    ]
   },
   "pitch": -1.7,
   "yaw": 30.03,
   "distance": 50
  }
 ],
 "id": "overlay_1EA30795_337C_D81C_41C8_094AEDF22DA3",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 109.92,
   "hfov": 9.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.31
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_28495FE3_011F_2995_4161_1F0BD106F099, this.camera_50A96159_4180_E35E_41B7_ABCAA4CE9A84); this.mainPlayList.set('selectedIndex', 54)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_1_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 151,
      "height": 151
     }
    ]
   },
   "pitch": 0.31,
   "yaw": 109.92,
   "distance": 50
  }
 ],
 "id": "overlay_1EB6AA28_337D_C834_4170_E0B4D73010B3",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 128.26,
   "hfov": 9.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -2.21
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42, this.camera_509D012C_4180_E0F5_41C3_B6A0B165FE17); this.mainPlayList.set('selectedIndex', 56)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_1_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 151,
      "height": 151
     }
    ]
   },
   "pitch": -2.21,
   "yaw": 128.26,
   "distance": 50
  }
 ],
 "id": "overlay_1EC35158_337D_7813_419F_5D7970C11AAE",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -169.64,
   "hfov": 13.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_1_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -26.04
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3F2BA48E_3325_580C_41C2_AB809D46139D, this.camera_50A47140_4180_E0AD_419B_09A9620F29D6); this.mainPlayList.set('selectedIndex', 52)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CECD3CE_3DEA_B6CF_41C2_B3C31D6E36F4",
   "yaw": -169.64,
   "pitch": -26.04,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.2,
   "distance": 100
  }
 ],
 "id": "overlay_1E5ECCE1_337C_C835_41BF_5A7E54CDBE3D",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -168.13,
   "hfov": 10.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -30.06
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75, this.camera_53F463DD_4180_E757_41B3_22FDD38421D7); this.mainPlayList.set('selectedIndex', 35)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CD123C7_3DEA_B73D_41B1_9C8E2056CF60",
   "yaw": -168.13,
   "pitch": -30.06,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.98,
   "distance": 100
  }
 ],
 "id": "overlay_2DC8F859_336B_4814_41B1_C16A01C564F1",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -21.23,
   "hfov": 7.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -7.22
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A, this.camera_530BE408_4180_E0BD_41BB_CB72EF51DDD5); this.mainPlayList.set('selectedIndex', 38)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CD0B3C7_3DEA_B73D_4167_97A3A94E2EED",
   "yaw": -21.23,
   "pitch": -7.22,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.48,
   "distance": 50
  }
 ],
 "id": "overlay_2DA86454_336B_D81C_41C3_F1BCB36CCD21",
 "data": {
  "label": "Arrow 01 Left"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 29.4,
   "hfov": 10.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.7
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558, this.camera_532F0432_4180_E0D2_41C5_A447ACD85B71); this.mainPlayList.set('selectedIndex', 42)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_1_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 171,
      "height": 176
     }
    ]
   },
   "pitch": -0.7,
   "yaw": 29.4,
   "distance": 50
  }
 ],
 "id": "overlay_2C2FAB5E_336B_480C_41C9_A40B894F5FBE",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 110.42,
   "hfov": 9.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.45
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_27D62BB1_011F_69F2_416D_0AB033A18B06, this.camera_53FA63F2_4180_E76D_41BA_4FE7C09BB548); this.mainPlayList.set('selectedIndex', 37)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_1_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 151,
      "height": 151
     }
    ]
   },
   "pitch": -0.45,
   "yaw": 110.42,
   "distance": 50
  }
 ],
 "id": "overlay_13C72680_336D_58F4_41B6_4936D69BC2F8",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 127.5,
   "hfov": 9.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_1_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.31
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01, this.camera_531E141C_4180_E0D6_41B8_ED4BE0476384); this.mainPlayList.set('selectedIndex', 39)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_1_HS_4_0.png",
      "class": "ImageResourceLevel",
      "width": 151,
      "height": 151
     }
    ]
   },
   "pitch": 0.31,
   "yaw": 127.5,
   "distance": 50
  }
 ],
 "id": "overlay_12A76CF0_336D_C814_41B0_FCC8F1EC7567",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -58.37,
   "hfov": 9.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -32.85
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3FC52041_332B_3875_41C7_36D298EEF65B, this.camera_5179E0EE_4180_E172_41A2_B66B027CCD3A); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22B34C73_010B_6F75_411F_82560BDF5A68",
   "yaw": -58.37,
   "pitch": -32.85,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.36,
   "distance": 100
  }
 ],
 "id": "overlay_DD3041EE_C764_DAAE_41E6_5D3D4684B50F",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -87.63,
   "hfov": 15.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -39.01
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD888F1A_C71C_C776_41E5_354715787DA9, this.camera_50357A48_4180_E0BE_41A9_DF6F97A2ED02); this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D1F813E7_C77D_5EDE_41C5_D3614EBDB84C",
   "yaw": -87.63,
   "pitch": -39.01,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.1,
   "distance": 100
  }
 ],
 "id": "overlay_D201568E_C765_3951_41E8_132B3132B361",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 170.21,
   "hfov": 14.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 17
     }
    ]
   },
   "pitch": 2.44
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0, this.camera_5390DAFC_4180_E155_41C8_82D8B1CBB4B5); this.mainPlayList.set('selectedIndex', 28)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 243,
      "height": 272
     }
    ]
   },
   "pitch": 2.44,
   "yaw": 170.21,
   "distance": 50
  }
 ],
 "id": "overlay_14ADE4BE_010F_1FEF_416E_76EF10A518E9",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 15.08,
   "hfov": 14.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 21,
      "height": 16
     }
    ]
   },
   "pitch": 1.81
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD, this.camera_523BA65E_4180_E152_41C3_491A43F439FB); this.mainPlayList.set('selectedIndex', 48)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 247,
      "height": 184
     }
    ]
   },
   "pitch": 1.81,
   "yaw": 15.08,
   "distance": 50
  }
 ],
 "id": "overlay_1CBAC74F_0119_3AAE_4169_5B722A4C2C71",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -62.51,
   "hfov": 14.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -25.81
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3FD93565_332B_583D_41C9_645338B595F0, this.camera_55B3E731_4180_E0EF_41CC_18C279C9F8C9); this.mainPlayList.set('selectedIndex', 34)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22B98C78_010B_6F72_416E_E7CCB2E81FB4",
   "yaw": -62.51,
   "pitch": -25.81,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.32,
   "distance": 100
  }
 ],
 "id": "overlay_E4FA5D36_C72C_CBBE_41DE_84376FB29EF5",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 166.07,
   "hfov": 14.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 19,
      "height": 16
     }
    ]
   },
   "pitch": 7.34
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506, this.camera_5214D5FD_4180_E356_41BB_BE9B118944C7); this.mainPlayList.set('selectedIndex', 62)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 247,
      "height": 201
     }
    ]
   },
   "pitch": 7.34,
   "yaw": 166.07,
   "distance": 50
  }
 ],
 "id": "overlay_227ECEFD_0109_2B6D_416E_3A14758B111C",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 70.89,
   "hfov": 9.96,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -33.22
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045, this.camera_50D061B7_4180_E3D1_41C4_71D50BEB9577); this.mainPlayList.set('selectedIndex', 65)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2293FC82_010B_6F96_4131_C14090FFAEE0",
   "yaw": 70.89,
   "pitch": -33.22,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.96,
   "distance": 100
  }
 ],
 "id": "overlay_F4767B1F_C727_4F6F_41DB_8ED192ED33D1",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 21.64,
   "hfov": 10.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 18
     }
    ]
   },
   "pitch": 3.53
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674, this.camera_50F0E1FC_4180_E355_41C3_39F58220E844); this.mainPlayList.set('selectedIndex', 18)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 151,
      "height": 175
     }
    ]
   },
   "pitch": 3.53,
   "yaw": 21.64,
   "distance": 50
  }
 ],
 "id": "overlay_DB374A8C_C765_4952_41E1_A2E190D5388B",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -141.39,
   "hfov": 12.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -50.82
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22BF1C74_010B_6F73_416A_B09F42A3520B",
   "yaw": -141.39,
   "pitch": -50.82,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 12.28,
   "distance": 100
  }
 ],
 "id": "overlay_D912F139_C767_5BB2_41DE_1B6920A1E6C5",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 21.73,
   "hfov": 7.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -13.27
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_12091E1F_013F_2AAE_4168_C4499D5E4133, this.camera_50FB5217_4180_E0D3_41C4_28BD20E23484); this.mainPlayList.set('selectedIndex', 30)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CDF93C5_3DEA_B73D_4193_51F5373F2CB4",
   "yaw": 21.73,
   "pitch": -13.27,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.34,
   "distance": 50
  }
 ],
 "id": "overlay_2F7EFB5A_3365_C817_41BE_6597E5C0442A",
 "data": {
  "label": "Arrow 01 Right"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -169.02,
   "hfov": 13.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -26.61
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_389785F0_3327_3814_41C9_2FC03DB15F5D, this.camera_53A0D353_4180_E752_4181_74E3C9A52A1E); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CCE03BF_3DEA_B74D_41BF_80A39C853AFF",
   "yaw": -169.02,
   "pitch": -26.61,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.62,
   "distance": 100
  }
 ],
 "id": "overlay_3DBB7384_333D_38F3_41C1_53B54FACFB40",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -20.01,
   "hfov": 10.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -4.92
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C, this.camera_53B8237C_4180_E756_41C1_84C1764C68AE); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CCE53BF_3DEA_B74D_41C2_AF4BD582D0C8",
   "yaw": -20.01,
   "pitch": -4.92,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.26,
   "distance": 50
  }
 ],
 "id": "overlay_3C2F8DD9_333D_4815_41B7_9EBE46B8599A",
 "data": {
  "label": "Arrow 01 Left"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 29.69,
   "hfov": 10.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.53
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045, this.camera_53B4C366_4180_E775_41C7_FB22B96FEA99); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_1_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 171,
      "height": 171
     }
    ]
   },
   "pitch": -0.53,
   "yaw": 29.69,
   "distance": 50
  }
 ],
 "id": "overlay_3C9B0F8A_333F_48F7_41C8_42F46B74985E",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 110.68,
   "hfov": 10.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.53
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_24CDB527_010B_7E9D_4174_52D79CB239F2, this.camera_538A332B_4180_E0F3_41C0_0A615EC9C7AE); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_1_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 171,
      "height": 171
     }
    ]
   },
   "pitch": -0.53,
   "yaw": 110.68,
   "distance": 50
  }
 ],
 "id": "overlay_2396CDBC_333D_4813_4185_94CB756CAC19",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 128.04,
   "hfov": 10.29,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_1_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -1.15
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2, this.camera_539C1340_4180_E0AE_41C8_8E8132661EE0); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.29,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_1_HS_4_0.png",
      "class": "ImageResourceLevel",
      "width": 171,
      "height": 171
     }
    ]
   },
   "pitch": -1.15,
   "yaw": 128.04,
   "distance": 50
  }
 ],
 "id": "overlay_22255151_333D_D815_41C0_71E393FD43EC",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.72,
   "hfov": 10.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.16
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3FC32490_3325_7813_41B5_5ED0D40BC796, this.camera_53E81B86_4180_E7B2_41C8_0594060A4516); this.mainPlayList.set('selectedIndex', 51)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 151,
      "height": 151
     }
    ]
   },
   "pitch": 1.16,
   "yaw": -0.72,
   "distance": 50
  }
 ],
 "id": "overlay_EAECF1EB_C72D_FAD6_41A8_B49AEB304111",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 148.02,
   "hfov": 12.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -50.56
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060, this.camera_53FFFB9C_4180_E7D5_41A6_EC7B3D025D13); this.mainPlayList.set('selectedIndex', 57)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22AB4C7E_010B_6F6E_4153_0A64B3D630F2",
   "yaw": 148.02,
   "pitch": -50.56,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 12.35,
   "distance": 100
  }
 ],
 "id": "overlay_E91CF77E_C72C_C7AE_41E6_ED92117BB9B5",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 8.67,
   "hfov": 7.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -10.49
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_10A96800_0139_3693_4154_C75F68C57800, this.camera_530D5BB6_4180_E7D2_41C9_D6ACDDF45DBE); this.mainPlayList.set('selectedIndex', 58)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CE053D1_3DEA_B6D5_41C4_CC77ECE49985",
   "yaw": 8.67,
   "pitch": -10.49,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.41,
   "distance": 50
  }
 ],
 "id": "overlay_077D34F6_3367_581F_41C8_C54C2DC06817",
 "data": {
  "label": "Arrow 01 Right"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 71.39,
   "hfov": 14.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -43.52
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545, this.camera_50C49186_4180_E3B2_41A0_71E8BEF894C4); this.mainPlayList.set('selectedIndex', 59)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2297BC7F_010B_6F6E_416E_C01526863309",
   "yaw": 71.39,
   "pitch": -43.52,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.1,
   "distance": 100
  }
 ],
 "id": "overlay_E8B6B81F_C72D_496E_41E6_150256507011",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 158.3,
   "hfov": 10.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.66
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_10A654BD_0139_1FED_4171_7FACE1C8F817, this.camera_50CF619C_4180_E3D6_414A_D9EED6AF4C18); this.mainPlayList.set('selectedIndex', 61)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 151,
      "height": 151
     }
    ]
   },
   "pitch": 0.66,
   "yaw": 158.3,
   "distance": 50
  }
 ],
 "id": "overlay_17E47A34_064B_049A_4197_FDC631E459DD",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -113.63,
   "hfov": 15.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 15,
      "height": 16
     }
    ]
   },
   "pitch": 3.59
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3FC52041_332B_3875_41C7_36D298EEF65B, this.camera_503E8A5C_4180_E155_41B0_5FE5009751BE); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 253,
      "height": 263
     }
    ]
   },
   "pitch": 3.59,
   "yaw": -113.63,
   "distance": 50
  }
 ],
 "id": "overlay_27E5C64F_0119_1AAD_4168_4CBEDDEFB1DF",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -169.16,
   "hfov": 16.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 18,
      "height": 15
     }
    ]
   },
   "pitch": 4.05
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3F2BA48E_3325_580C_41C2_AB809D46139D, this.camera_509EA8DC_4180_E155_41C1_4EA5F38BA8EA); this.mainPlayList.set('selectedIndex', 52)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 224,
      "height": 196
     }
    ]
   },
   "pitch": 4.05,
   "yaw": -169.16,
   "distance": 50
  }
 ],
 "id": "overlay_F4A93A03_E6FE_6C1A_41B1_F38C9DDC27C0",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 166.32,
   "hfov": 14.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 18,
      "height": 16
     }
    ]
   },
   "pitch": 4.83
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD888F1A_C71C_C776_41E5_354715787DA9, this.camera_53863317_4180_E0D3_41BB_945DFC6F9670); this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 238,
      "height": 209
     }
    ]
   },
   "pitch": 4.83,
   "yaw": 166.32,
   "distance": 50
  }
 ],
 "id": "overlay_10AE33E1_0109_1995_416C_2A5286DB7CD2",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 68.51,
   "hfov": 10.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -33.47
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942, this.camera_53C05B4D_4180_E0B6_41CE_E75751611AE4); this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D1F8D3E7_C77D_5EDE_41E7_872B52F6C2BA",
   "yaw": 68.51,
   "pitch": -33.47,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.14,
   "distance": 100
  }
 ],
 "id": "overlay_D10180AB_C763_D956_41E1_17A33D3BEE1E",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -137.91,
   "hfov": 13.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.57
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01, this.camera_5376149A_4180_E1D2_41C3_3EF4A7AC6528); this.mainPlayList.set('selectedIndex', 39)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 222,
      "height": 230
     }
    ]
   },
   "pitch": -0.57,
   "yaw": -137.91,
   "distance": 50
  }
 ],
 "id": "overlay_16FBB4AF_0109_3FEE_4160_1AEF26426FD1",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 152.65,
   "hfov": 13.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.66
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3F2BA48E_3325_580C_41C2_AB809D46139D, this.camera_501F2A22_4180_E0ED_4196_02460525CAC3); this.mainPlayList.set('selectedIndex', 52)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 189,
      "height": 192
     }
    ]
   },
   "pitch": 1.66,
   "yaw": 152.65,
   "distance": 50
  }
 ],
 "id": "overlay_F4E4001F_C725_596E_41E0_DD5EA526DD91",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -18.67,
   "hfov": 11.77,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -26.57
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05, this.camera_50215A35_4180_E0D7_41C8_B15C0BB77FD0); this.mainPlayList.set('selectedIndex', 66)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22928C81_010B_6F92_414F_1D4E8A9E78E0",
   "yaw": -18.67,
   "pitch": -26.57,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.77,
   "distance": 100
  }
 ],
 "id": "overlay_F3F318C8_C723_4AD2_41E2_333E3532C07C",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 135.03,
   "hfov": 7.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -20.29
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8, this.camera_500AFA0F_4180_E0B3_41B4_9AE1B45746D3); this.mainPlayList.set('selectedIndex', 67)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CF903D5_3DEA_B6DD_41BD_3CFD48DF9648",
   "yaw": 135.03,
   "pitch": -20.29,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.07,
   "distance": 50
  }
 ],
 "id": "overlay_04092059_336D_7815_41C8_44B93151666E",
 "data": {
  "label": "Arrow 01 Left"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 21.89,
   "hfov": 10.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 2.9
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75, this.camera_5076EABF_4180_E1D2_41CA_E9C6F28E2E06); this.mainPlayList.set('selectedIndex', 35)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 151,
      "height": 150
     }
    ]
   },
   "pitch": 2.9,
   "yaw": 21.89,
   "distance": 50
  }
 ],
 "id": "overlay_E11B8401_C724_F952_41BA_B115171D0330",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -148.17,
   "hfov": 13.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -45.29
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3, this.camera_538C3AE8_4180_E17D_41CF_0CC50B36149B); this.mainPlayList.set('selectedIndex', 46)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22A28C7A_010B_6F76_4171_1E7F3F42C069",
   "yaw": -148.17,
   "pitch": -45.29,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.68,
   "distance": 100
  }
 ],
 "id": "overlay_E05F9DD6_C723_CAF1_41E7_95CA81350DF9",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 24.24,
   "hfov": 7.29,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -14.78
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_121539AD_013B_29ED_4160_3D4F82B47E36, this.camera_507AEAD3_4180_E153_41A4_0C6437F81B61); this.mainPlayList.set('selectedIndex', 47)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CE853CC_3DEA_B733_41C4_92CFEF67097F",
   "yaw": 24.24,
   "pitch": -14.78,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.29,
   "distance": 50
  }
 ],
 "id": "overlay_149CB3EC_3364_D833_41C7_409024E90602",
 "data": {
  "label": "Arrow 01 Right"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -143.41,
   "hfov": 16.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 2.16
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3FC52041_332B_3875_41C7_36D298EEF65B, this.camera_53D223B0_4180_E7EE_41B1_D28E6857D835); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 234,
      "height": 234
     }
    ]
   },
   "pitch": 2.16,
   "yaw": -143.41,
   "distance": 50
  }
 ],
 "id": "overlay_DC659AFB_C76F_4EB6_41D5_0F1877D4D037",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -14.77,
   "hfov": 16.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -31.97
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751, this.camera_53E0F3C6_4180_E7B5_4197_5C0644A1CEB7); this.mainPlayList.set('selectedIndex', 26)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22BEAC74_010B_6F73_4169_5866E05F9E82",
   "yaw": -14.77,
   "pitch": -31.97,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.49,
   "distance": 100
  }
 ],
 "id": "overlay_DCF81359_C76F_7FF3_41A8_62F50E047FA0",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 14.7,
   "hfov": 15.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.69
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC, this.camera_50EFD1E2_4180_E36D_41B0_FEAA275C0B67); this.mainPlayList.set('selectedIndex', 31)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 259,
      "height": 264
     }
    ]
   },
   "pitch": 1.69,
   "yaw": 14.7,
   "distance": 50
  }
 ],
 "id": "overlay_17C8401E_0109_16AF_4164_AB7919665F6E",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -62.92,
   "hfov": 16.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 19,
      "height": 16
     }
    ]
   },
   "pitch": -2.21
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD973440_C71F_79D2_41CE_832903CFC20A, this.camera_5249E67F_4180_E153_41C2_D2F0B5EC09A1); this.mainPlayList.set('selectedIndex', 60)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 276,
      "height": 226
     }
    ]
   },
   "pitch": -2.21,
   "yaw": -62.92,
   "distance": 50
  }
 ],
 "id": "overlay_214EEAE1_010B_EB95_416D_C987852A4510",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -63.14,
   "hfov": 11.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -28.7
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3FC32490_3325_7813_41B5_5ED0D40BC796, this.camera_53125BD0_4180_E7AD_41B9_E8A908346E08); this.mainPlayList.set('selectedIndex', 51)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22AA4C7E_010B_6F6E_4141_B5F26DF91260",
   "yaw": -63.14,
   "pitch": -28.7,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.09,
   "distance": 100
  }
 ],
 "id": "overlay_F418FFB4_C727_46B1_41E3_7157AAB75A6C",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -133.6,
   "hfov": 15.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -38.75
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD732023_C71F_F956_41D6_6910628043DA, this.camera_521AD61B_4180_E0D1_41C2_E077A82D538C); this.mainPlayList.set('selectedIndex', 22)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22B1BC73_010B_6F75_4162_7D29F9DD45EF",
   "yaw": -133.6,
   "pitch": -38.75,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.16,
   "distance": 100
  }
 ],
 "id": "overlay_DDB914AF_C76D_7AAE_41DD_FD246BE7004B",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -143.41,
   "hfov": 17.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 19,
      "height": 15
     }
    ]
   },
   "pitch": 0.78
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3FC32490_3325_7813_41B5_5ED0D40BC796, this.camera_53AE1B23_4180_E0F2_41BC_A5A999E46865); this.mainPlayList.set('selectedIndex', 51)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 17.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 241,
      "height": 196
     }
    ]
   },
   "pitch": 0.78,
   "yaw": -143.41,
   "distance": 50
  }
 ],
 "id": "overlay_E994C697_C72F_797F_41D3_1180D963962C",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -22.69,
   "hfov": 15.01,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -25.81
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD973440_C71F_79D2_41CE_832903CFC20A, this.camera_53BCDB37_4180_E0D2_41CA_64A81B9BB09D); this.mainPlayList.set('selectedIndex', 60)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2296DC7F_010B_6F6E_4161_AB4F02E2DFA0",
   "yaw": -22.69,
   "pitch": -25.81,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.01,
   "distance": 100
  }
 ],
 "id": "overlay_E8B86196_C72D_7B7E_41D9_E9ACE1C1D537",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -140.17,
   "hfov": 15.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 21,
      "height": 15
     }
    ]
   },
   "pitch": -0.57
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD732023_C71F_F956_41D6_6910628043DA, this.camera_539A0B0F_4180_E0B3_41AD_EE841DDDF41C); this.mainPlayList.set('selectedIndex', 22)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 264,
      "height": 197
     }
    ]
   },
   "pitch": -0.57,
   "yaw": -140.17,
   "distance": 50
  }
 ],
 "id": "overlay_12BC958B_0109_7995_4112_D3CFE865F0D8",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -138.88,
   "hfov": 15.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -38.25
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2, this.camera_502F126F_4180_E173_41C3_939FBC69D067); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D1FE93E7_C77D_5EDE_41BF_076B82AF6AC9",
   "yaw": -138.88,
   "pitch": -38.25,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.27,
   "distance": 100
  }
 ],
 "id": "overlay_D5B45B26_C76D_CF5E_41D0_7E370B2F5BD4",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -112.94,
   "hfov": 16.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 17
     }
    ]
   },
   "pitch": -1.63
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3FC32490_3325_7813_41B5_5ED0D40BC796, this.camera_536BBC4A_4180_E0B2_41CF_FAE19D1F3AAA); this.mainPlayList.set('selectedIndex', 51)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 276,
      "height": 299
     }
    ]
   },
   "pitch": -1.63,
   "yaw": -112.94,
   "distance": 50
  }
 ],
 "id": "overlay_28543281_0109_3B92_4172_B2B47CE181F9",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 153.66,
   "hfov": 17.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 19,
      "height": 15
     }
    ]
   },
   "pitch": 1.41
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674, this.camera_551A77C8_4180_EFBD_41C7_537C0EED699D); this.mainPlayList.set('selectedIndex', 18)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 17.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 245,
      "height": 206
     }
    ]
   },
   "pitch": 1.41,
   "yaw": 153.66,
   "distance": 50
  }
 ],
 "id": "overlay_D95E3B79_C764_CFB2_41CF_C88AFF6D4BC6",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -19.17,
   "hfov": 11.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -32.09
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6, this.camera_55046796_4180_EFD5_41B1_D5FE3A380605); this.mainPlayList.set('selectedIndex', 32)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22BD9C76_010B_6F7E_414E_09E3204E2660",
   "yaw": -19.17,
   "pitch": -32.09,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.15,
   "distance": 100
  }
 ],
 "id": "overlay_D84AC366_C763_5FD1_41D2_AE1B94515E56",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 136.29,
   "hfov": 7.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -15.01
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898, this.camera_551407B1_4180_EFEF_41A4_AECE014F221C); this.mainPlayList.set('selectedIndex', 33)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CDE23C6_3DEA_B73F_41C8_61936F11B70E",
   "yaw": 136.29,
   "pitch": -15.01,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.28,
   "distance": 50
  }
 ],
 "id": "overlay_2E819605_3367_5BFC_41B8_E790FCBF0C1C",
 "data": {
  "label": "Arrow 01 Left"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 21.64,
   "hfov": 10.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.12
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3F2BA48E_3325_580C_41C2_AB809D46139D, this.camera_517420C6_4180_E1B5_41B3_09A960F0717C); this.mainPlayList.set('selectedIndex', 52)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 151,
      "height": 150
     }
    ]
   },
   "pitch": -0.12,
   "yaw": 21.64,
   "distance": 50
  }
 ],
 "id": "overlay_F7CC04EB_C723_5AD6_41D4_F9DE6E7EE7BF",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -148.93,
   "hfov": 12.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -48.06
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B, this.camera_530B205D_4180_E157_41B9_9800D316DECA); this.mainPlayList.set('selectedIndex', 63)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22958C80_010B_6F92_4165_9E49EF8FB640",
   "yaw": -148.93,
   "pitch": -48.06,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 12.99,
   "distance": 100
  }
 ],
 "id": "overlay_F6F55B77_C723_4FBE_41D4_D6F2BBFF046B",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 22.23,
   "hfov": 7.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -15.78
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_10F8A1A0_0139_3993_4126_7D4276303500, this.camera_517000DA_4180_E15D_41C8_E0B84770F7FB); this.mainPlayList.set('selectedIndex', 64)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CE7D3D3_3DEA_B6D5_41CD_29461DF27158",
   "yaw": 22.23,
   "pitch": -15.78,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.25,
   "distance": 50
  }
 ],
 "id": "overlay_054D7046_3365_587C_41B4_341A68250AD4",
 "data": {
  "label": "Arrow 01 Right"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -123.54,
   "hfov": 11.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -27.8
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3FC52041_332B_3875_41C7_36D298EEF65B, this.camera_500189FC_4180_E355_41AF_60744C9B1AD3); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CD9F3C2_3DEA_B737_41A0_8DAFABED27BE",
   "yaw": -123.54,
   "pitch": -27.8,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.89,
   "distance": 100
  }
 ],
 "id": "overlay_241BB4D3_3325_3814_41C6_89CAB51CC72B",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.62,
   "hfov": 9.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -2.46
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43, this.camera_50EA19D4_4180_E356_41B0_C2BE0DD21059); this.mainPlayList.set('selectedIndex', 19)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_1_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 151,
      "height": 151
     }
    ]
   },
   "pitch": -2.46,
   "yaw": -1.62,
   "distance": 50
  }
 ],
 "id": "overlay_241B9CB4_335B_4813_41C8_FB53C1DE9901",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 77.5,
   "hfov": 7.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.57
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC, this.camera_50FF19E8_4180_E37D_41A8_07812B8E0818); this.mainPlayList.set('selectedIndex', 31)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CD963C3_3DEA_B735_41B8_51C1E6916DAD",
   "yaw": 77.5,
   "pitch": 1.57,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.53,
   "distance": 50
  }
 ],
 "id": "overlay_2BEDF09F_335B_D80D_41C8_6EE16588E85C",
 "data": {
  "label": "Arrow 01 Left"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 93.58,
   "hfov": 7.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.07
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0, this.camera_50E3C9C2_4180_E3AD_41CE_CA3E4D008539); this.mainPlayList.set('selectedIndex', 28)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CD8F3C3_3DEA_B735_41A9_69CD45D3CC76",
   "yaw": 93.58,
   "pitch": 1.07,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.54,
   "distance": 50
  }
 ],
 "id": "overlay_2A2C951D_335C_D80D_41C3_D3A1362340BD",
 "data": {
  "label": "Arrow 01 Right"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -161.25,
   "hfov": 16.31,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 5.93
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_389785F0_3327_3814_41C9_2FC03DB15F5D, this.camera_50435A71_4180_E16F_41C8_971B9562089B); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.31,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 227,
      "height": 220
     }
    ]
   },
   "pitch": 5.93,
   "yaw": -161.25,
   "distance": 50
  }
 ],
 "id": "overlay_E98B544E_E6F6_642D_41D5_639CA13A6B69",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -142.41,
   "hfov": 16.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 18,
      "height": 15
     }
    ]
   },
   "pitch": 4.3
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3F725F51_3327_C814_41AA_6410005E16A5, this.camera_5259969B_4180_E1D3_41BA_75C706B206B5); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 227,
      "height": 196
     }
    ]
   },
   "pitch": 4.3,
   "yaw": -142.41,
   "distance": 50
  }
 ],
 "id": "overlay_D464C36F_C76D_5FAF_41D8_35D099FAD98B",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -23.19,
   "hfov": 15.01,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -25.81
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CC175683_C71F_5956_41AA_704EB81E1F05, this.camera_526FF6B7_4180_E1D3_41C9_FBE3E81C58B6); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D1FEF3E7_C77D_5EDE_41D4_38C2D06ADC42",
   "yaw": -23.19,
   "pitch": -25.81,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.01,
   "distance": 100
  }
 ],
 "id": "overlay_D4E3A43C_C76F_59B1_41D0_FA262DAB39CB",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 15.08,
   "hfov": 10.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.93
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045, this.camera_501B6254_4180_E155_41CA_CEFBF6B8F626); this.mainPlayList.set('selectedIndex', 65)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 180,
      "height": 171
     }
    ]
   },
   "pitch": 0.93,
   "yaw": 15.08,
   "distance": 50
  }
 ],
 "id": "overlay_055AB65B_336D_F815_41C0_3EE3DBDD5EBD",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -120.4,
   "hfov": 14.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -30.06
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3F725F51_3327_C814_41AA_6410005E16A5, this.camera_55E6776C_4180_EF76_41CC_42BEB4415771); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CC103BF_3DEA_B74D_41C5_48E47E066ACB",
   "yaw": -120.4,
   "pitch": -30.06,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.02,
   "distance": 100
  }
 ],
 "id": "overlay_23C14CCE_3325_C80F_41A1_C6AC5B361F71",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 78,
   "hfov": 7.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.57
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942, this.camera_55D1B758_4180_EF5E_41B2_BE120BBD8AE7); this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CC153BF_3DEA_B74D_41C6_AF8BF147E2C4",
   "yaw": 78,
   "pitch": 1.57,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.53,
   "distance": 50
  }
 ],
 "id": "overlay_221DC314_3325_3813_41A8_082AB46F5780",
 "data": {
  "label": "Arrow 01 Left"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 92.07,
   "hfov": 7.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.07
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD888F1A_C71C_C776_41E5_354715787DA9, this.camera_55C04745_4180_E0B7_4124_ED0ACDCCA0F4); this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CC083BF_3DEA_B74D_419F_34A388F04D3D",
   "yaw": 92.07,
   "pitch": 1.07,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.54,
   "distance": 50
  }
 ],
 "id": "overlay_22D0E017_332B_781C_41AC_346875398785",
 "data": {
  "label": "Arrow 01 Right"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.88,
   "hfov": 9.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.2
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A, this.camera_55F63780_4180_EFAE_41CC_3754F23C14E1); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_1_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 151,
      "height": 151
     }
    ]
   },
   "pitch": -0.2,
   "yaw": -1.88,
   "distance": 50
  }
 ],
 "id": "overlay_228FF5B1_332B_3814_41C7_17FB7C40FCDE",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.29,
   "hfov": 10.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.4
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_3F725F51_3327_C814_41AA_6410005E16A5, this.camera_50B22942_4180_E0B2_41CA_FE7966F2C1F1); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 151,
      "height": 151
     }
    ]
   },
   "pitch": 0.4,
   "yaw": 0.29,
   "distance": 50
  }
 ],
 "id": "overlay_D51089C5_C765_CAD2_41E5_192F51616448",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 155.88,
   "hfov": 12.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -45.77
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA, this.camera_50B7092C_4180_E0F6_41CE_B10C027045CF); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D1FE33E7_C77D_5EDE_41D2_061D00B2B4AE",
   "yaw": 155.88,
   "pitch": -45.77,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 12.27,
   "distance": 100
  }
 ],
 "id": "overlay_D5FA2C1E_C764_C971_41E4_AEEDE47EBAA0",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 10.93,
   "hfov": 7.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.06
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A, this.camera_50B8495F_4180_E352_41A0_54D5047334B5); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2CC313C0_3DEA_B733_41CB_5029F1F7B3A4",
   "yaw": 10.93,
   "pitch": 0.06,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.54,
   "distance": 50
  }
 ],
 "id": "overlay_201E14C5_332D_587D_41C6_941459487D53",
 "data": {
  "label": "Arrow 01 Right"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -60.41,
   "hfov": 16.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 18,
      "height": 16
     }
    ]
   },
   "pitch": -2.58
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CC175683_C71F_5956_41AA_704EB81E1F05, this.camera_5016C23F_4180_E0D2_4151_C52FFD8693B1); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 268,
      "height": 238
     }
    ]
   },
   "pitch": -2.58,
   "yaw": -60.41,
   "distance": 50
  }
 ],
 "id": "overlay_1189CF7A_0109_6977_4165_30E4901C9436",
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -86.37,
   "hfov": 15.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -39.26
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 28)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22BCEC74_010B_6F73_4171_9BF28B8564F4",
   "yaw": -86.37,
   "pitch": -39.26,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.05,
   "distance": 100
  }
 ],
 "id": "overlay_DA67D643_C765_39D6_41E7_BD2D534FD43E",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -82.1,
   "hfov": 15.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -38.76
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A, this.camera_52BFC53A_4180_E0D2_41BE_B54BB315BF91); this.mainPlayList.set('selectedIndex', 45)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22A3BC7A_010B_6F76_4152_7002231254E2",
   "yaw": -82.1,
   "pitch": -38.76,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.16,
   "distance": 100
  }
 ],
 "id": "overlay_E039B42F_C73C_D9AE_4179_6CED54A79A5C",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 78.93,
   "hfov": 13.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -45.28
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558, this.camera_5044A29D_4180_E1D7_41B8_1F56D30C4B9C); this.mainPlayList.set('selectedIndex', 42)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_22A42C79_010B_6F72_4149_88EC1ECE95A9",
   "yaw": 78.93,
   "pitch": -45.28,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.68,
   "distance": 100
  }
 ],
 "id": "overlay_E167051F_C725_5B6F_41E8_EC2A8AF34DDA",
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 159.56,
   "hfov": 10.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.41
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_10AB6D68_013B_EE92_4160_6689FDC41054, this.camera_50309287_4180_E1B3_4191_62EC69CCAF4C); this.mainPlayList.set('selectedIndex', 44)",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 151,
      "height": 151
     }
    ]
   },
   "pitch": 1.41,
   "yaw": 159.56,
   "distance": 50
  }
 ],
 "id": "overlay_176102E4_064F_05BA_418C_77CA1322ED25",
 "data": {
  "label": "Image"
 }
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_D1F893E7_C77D_5EDE_41C5_65F129D18629",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_2CC463C1_3DEA_B735_41AB_DD4FB5E1D333",
 "rowCount": 3,
 "levels": [
  {
   "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_22BD5C76_010B_6F7E_4166_469CD7719366",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_22A4AC79_010B_6F72_416E_51CCA57431BC",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_22B97C78_010B_6F72_4168_A626EED7BAD0",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_2CD7B3CA_3DEA_B737_41CB_DC50A9EBF807",
 "rowCount": 3,
 "levels": [
  {
   "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_D1F953E7_C77D_5EDE_41B3_BBC8AE666EFB",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_D1F9D3E7_C77D_5EDE_41D3_15BE236E2A6A",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_2CC523C1_3DEA_B735_41BB_7CAD57160089",
 "rowCount": 3,
 "levels": [
  {
   "url": "media/panorama_CD888F1A_C71C_C776_41E5_354715787DA9_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_22BEDC74_010B_6F73_416E_DDABD29706F9",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_22A66C79_010B_6F72_416E_D5DC8CEB8DEC",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_2CD303C8_3DEA_B733_41B1_09A8C2B14416",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_2CD363C8_3DEA_B733_41C9_F71A831BD29F",
 "rowCount": 3,
 "levels": [
  {
   "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_2CD213C8_3DEA_B733_41A1_06B629511452",
 "rowCount": 3,
 "levels": [
  {
   "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_22A0CC7B_010B_6F76_4146_3D8C62DD6E62",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_2CEA33CD_3DEA_B6CD_4176_BDA7140D8FA6",
 "rowCount": 3,
 "levels": [
  {
   "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_22A9AC7F_010B_6F6E_416B_2EA4E226EE03",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_2CEC53CF_3DEA_B6CD_41CC_25149D16B0DF",
 "rowCount": 3,
 "levels": [
  {
   "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_2CEFC3CF_3DEA_B6CD_41BF_A6712A1CCD8F",
 "rowCount": 3,
 "levels": [
  {
   "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_2CEED3CF_3DEA_B6CD_41CB_ED49F5764221",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_1_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_D1FFD3DD_C77D_5EF2_41CE_89845FEA3E36",
 "rowCount": 3,
 "levels": [
  {
   "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_22A1FC7B_010B_6F76_4168_B63BC17E5FDC",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_22928C81_010B_6F92_4155_88CC3FCC3378",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_2CC753C2_3DEA_B737_41C7_1DE4DAD587C7",
 "rowCount": 3,
 "levels": [
  {
   "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_2CD983C2_3DEA_B737_41C1_EA60C9A4A467",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_1_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_22B02C73_010B_6F75_4168_F9B6711844B1",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_2CDA93C4_3DEA_B733_41B8_2EA1D92E00DF",
 "rowCount": 3,
 "levels": [
  {
   "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_2CEA13CD_3DEA_B6CD_41C2_75879BFAB51A",
 "rowCount": 3,
 "levels": [
  {
   "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_2CECD3CE_3DEA_B6CF_41C2_B3C31D6E36F4",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_1_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_2CD123C7_3DEA_B73D_41B1_9C8E2056CF60",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_2CD0B3C7_3DEA_B73D_4167_97A3A94E2EED",
 "rowCount": 3,
 "levels": [
  {
   "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_22B34C73_010B_6F75_411F_82560BDF5A68",
 "rowCount": 3,
 "levels": [
  {
   "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_D1F813E7_C77D_5EDE_41C5_D3614EBDB84C",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_22B98C78_010B_6F72_416E_E7CCB2E81FB4",
 "rowCount": 3,
 "levels": [
  {
   "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_2293FC82_010B_6F96_4131_C14090FFAEE0",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_22BF1C74_010B_6F73_416A_B09F42A3520B",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_2CDF93C5_3DEA_B73D_4193_51F5373F2CB4",
 "rowCount": 3,
 "levels": [
  {
   "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_2CCE03BF_3DEA_B74D_41BF_80A39C853AFF",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_2CCE53BF_3DEA_B74D_41C2_AF4BD582D0C8",
 "rowCount": 3,
 "levels": [
  {
   "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_22AB4C7E_010B_6F6E_4153_0A64B3D630F2",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_2CE053D1_3DEA_B6D5_41C4_CC77ECE49985",
 "rowCount": 3,
 "levels": [
  {
   "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_2297BC7F_010B_6F6E_416E_C01526863309",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_D1F8D3E7_C77D_5EDE_41E7_872B52F6C2BA",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_22928C81_010B_6F92_414F_1D4E8A9E78E0",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_2CF903D5_3DEA_B6DD_41BD_3CFD48DF9648",
 "rowCount": 3,
 "levels": [
  {
   "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_22A28C7A_010B_6F76_4171_1E7F3F42C069",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_2CE853CC_3DEA_B733_41C4_92CFEF67097F",
 "rowCount": 3,
 "levels": [
  {
   "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_22BEAC74_010B_6F73_4169_5866E05F9E82",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_22AA4C7E_010B_6F6E_4141_B5F26DF91260",
 "rowCount": 3,
 "levels": [
  {
   "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_22B1BC73_010B_6F75_4162_7D29F9DD45EF",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_2296DC7F_010B_6F6E_4161_AB4F02E2DFA0",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_D1FE93E7_C77D_5EDE_41BF_076B82AF6AC9",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_22BD9C76_010B_6F7E_414E_09E3204E2660",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_2CDE23C6_3DEA_B73F_41C8_61936F11B70E",
 "rowCount": 3,
 "levels": [
  {
   "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_22958C80_010B_6F92_4165_9E49EF8FB640",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_2CE7D3D3_3DEA_B6D5_41CD_29461DF27158",
 "rowCount": 3,
 "levels": [
  {
   "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_2CD9F3C2_3DEA_B737_41A0_8DAFABED27BE",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_2CD963C3_3DEA_B735_41B8_51C1E6916DAD",
 "rowCount": 3,
 "levels": [
  {
   "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_2CD8F3C3_3DEA_B735_41A9_69CD45D3CC76",
 "rowCount": 3,
 "levels": [
  {
   "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_1_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_D1FEF3E7_C77D_5EDE_41D4_38C2D06ADC42",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_2CC103BF_3DEA_B74D_41C5_48E47E066ACB",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_2CC153BF_3DEA_B74D_41C6_AF8BF147E2C4",
 "rowCount": 3,
 "levels": [
  {
   "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_2CC083BF_3DEA_B74D_419F_34A388F04D3D",
 "rowCount": 3,
 "levels": [
  {
   "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_D1FE33E7_C77D_5EDE_41D2_061D00B2B4AE",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_2CC313C0_3DEA_B733_41CB_5029F1F7B3A4",
 "rowCount": 3,
 "levels": [
  {
   "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_22BCEC74_010B_6F73_4171_9BF28B8564F4",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_22A3BC7A_010B_6F76_4152_7002231254E2",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "frameCount": 20,
 "colCount": 4,
 "id": "AnimatedImageResource_22A42C79_010B_6F72_4149_88EC1ECE95A9",
 "rowCount": 5,
 "levels": [
  {
   "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 750
  }
 ]
}],
 "scrollBarMargin": 2,
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
