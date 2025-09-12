(function(){
    var script = {
 "mouseWheelEnabled": true,
 "mobileMipmappingEnabled": false,
 "propagateClick": false,
 "data": {
  "name": "Player1235"
 },
 "children": [
  "this.MainViewer"
 ],
 "id": "rootPlayer",
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "start": "this.init()",
 "vrPolyfillScale": 0.5,
 "borderSize": 0,
 "width": "100%",
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "desktopMipmappingEnabled": false,
 "paddingRight": 0,
 "contentOpaque": false,
 "minHeight": 20,
 "defaultVRPointer": "laser",
 "downloadEnabled": false,
 "scripts": {
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "existsKey": function(key){  return key in window; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "registerKey": function(key, value){  window[key] = value; },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "unregisterKey": function(key){  delete window[key]; },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getKey": function(key){  return window[key]; }
 },
 "height": "100%",
 "minWidth": 20,
 "backgroundPreloadEnabled": true,
 "class": "Player",
 "borderRadius": 0,
 "scrollBarWidth": 10,
 "paddingTop": 0,
 "gap": 10,
 "definitions": [{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3BHK_Bolcony_17",
 "id": "panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -161.4,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391",
   "backwardYaw": -6.65
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "overlays": [
  "this.overlay_2098B134_32A4_5499_41C2_22F48477A3BD"
 ]
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3BHK_Bolcony_33",
 "id": "panorama_3E181019_32A4_748A_41C7_D30403307065",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -169.82,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309",
   "backwardYaw": -4.64
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "overlays": [
  "this.overlay_15B510C7_3364_7586_41C2_C6620CFBA961"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 163.8,
  "class": "PanoramaCameraPosition",
  "pitch": -3.52
 },
 "id": "panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_camera",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk kitchen",
 "id": "panorama_E609D5D6_C65C_5841_41DC_4408506ECD34",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": 6.37,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00",
   "backwardYaw": -81.35
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_E2FE88E0_C64D_C841_41C3_2E195A899599"
 ]
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk bedroom02 1 28th",
 "id": "panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": 88.07,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0",
   "backwardYaw": -21.75
  },
  {
   "distance": 1,
   "yaw": 117.1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_11906CBC_0049_DF4E_411B_4127E5D5F480",
   "backwardYaw": -131.63
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_DFA742CC_C674_3841_419D_AB7849550207",
  "this.overlay_14AA83F7_0608_A21E_4189_B52BDB95135B"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 123.13,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2DCFAC84_3DB9_B132_41AB_2F31B7E3980A",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_camera",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "Powder toilet 3BHK",
 "id": "panorama_0F2964AA_0199_39D8_415C_DAB75F704D09",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": 107.93,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3E110129_32A4_548A_41A6_17FA339053A0",
   "backwardYaw": -55.99
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "overlays": [
  "this.overlay_12B3B3CD_01A9_1F58_4175_0448822DFE99"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -62.9,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2FBCADAF_3DB9_B34E_41AE_C7C683CBBEB4",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -144.7,
  "class": "PanoramaCameraPosition",
  "pitch": -9.3
 },
 "id": "panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -174.18,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2F5E9B4A_3DB9_B736_41B7_4902A7588C49",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3E181019_32A4_748A_41C7_D30403307065_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_camera",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk bedroom03 02 28th",
 "id": "panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -49.75,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B",
   "backwardYaw": 34.74
  },
  {
   "distance": 1,
   "yaw": -93.92,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_135DA583_0049_293A_414E_3C25985D46CB",
   "backwardYaw": 59.92
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_DDE3106F_C64C_D85F_41C3_782CF613010E",
  "this.overlay_15CEF500_0608_67F2_415C_6AB7E6A6DB80"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -74.2,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2FE7DDF9_3DB9_B2D2_41C9_BEC831C2A032",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 26.51,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 26.51,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 26.51,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 22.73,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_32146BED_3DB9_B6CD_4181_69B9D644DD08",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 26.51,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 26.51,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 26.51,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 62.93,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2EAD0B64_3DB9_B7F2_41B0_E58A099D7092",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk Passage 23rd floor",
 "id": "panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9"
  },
  {
   "distance": 1,
   "yaw": -5.48,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF",
   "backwardYaw": 6.71
  },
  {
   "distance": 1,
   "yaw": 35.46,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7",
   "backwardYaw": 151.74
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_27335F89_32A4_AB8A_41C1_9B84E0221C2D",
  "this.overlay_24F6F26A_32A4_5489_41C4_EC701E187A22",
  "this.overlay_243CA586_32A4_7C79_4170_A5E3FF8D61C7"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -119.57,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2FC60B00_3DB9_B733_41CB_5049BB2BB34A",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 86.45,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2EB15E56_3DB9_B1DE_41C3_94F3C75440A2",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk_bedroom01_toilet copy",
 "id": "panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -3.63,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5",
   "backwardYaw": -115.31
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "overlays": [
  "this.overlay_12802B79_0076_D9D6_40D5_A735950E3D00"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 18.6,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2F62AE3D_3DB9_B152_41B8_831A53C6CB7B",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 9.93,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2D834C53_3DB9_B1D5_41C6_06295236001F",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 118.58,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_322D6ED4_3DB9_AED3_41AD_3ECA9EEE0A75",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk bedroom02 28th",
 "id": "panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -158.16,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9",
   "backwardYaw": -125.48
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_118B7384_0049_E93E_4136_7E71C475A6E0"
  },
  {
   "distance": 1,
   "yaw": 39.47,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5",
   "backwardYaw": -65.68
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_DE78BD94_C67C_48C1_41E0_19E3E3F56405",
  "this.overlay_DEFD2A97_C674_C8CF_41E4_A52F962F63C7",
  "this.overlay_1253AE9D_3364_6D8B_41C1_543577C932F6"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 158.94,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_320A7BFC_3DB9_B6D3_41CE_BD76A79AB3EC",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -52.96,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2DF9CC64_3DB9_B1F2_41CB_CC7130192F97",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -46.48,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_3237DBD5_3DB9_B6D2_41BF_707B474873A3",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 22.46,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2C72AD5E_3DB9_B3CE_41CA_861951942BCB",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -53.84,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2C500D7C_3DB9_B3D2_41B4_82A1790098A4",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 85.83,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2EA10E5F_3DB9_B1CE_41C8_A40002BD64CA",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk bedroom03 02 23rd",
 "id": "panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -94.17,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_136FCF41_004A_D936_4151_FFADF2CFBA26",
   "backwardYaw": 61.56
  },
  {
   "distance": 1,
   "yaw": -54.9,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7",
   "backwardYaw": 43.8
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_D25D23DA_C655_D841_41D7_0482A8407978",
  "this.overlay_141820D1_0608_DE13_4184_3BBBDEF95731"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 48.37,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2C5FDD90_3DB9_B353_41B2_8713095E4162",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -91.93,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2C260D2E_3DB9_B34F_4195_F4241840B4A3",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 174.48,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_3217AEE7_3DB9_AEFE_4172_3826B546EC0B",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 152.14,
  "class": "PanoramaCameraPosition",
  "pitch": -4.72
 },
 "id": "panorama_CF1013BA_C391_98A2_4167_0505D502E364_camera",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk bedroom02 23rd",
 "id": "panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": 33.02,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2",
   "backwardYaw": -61.42
  },
  {
   "distance": 1,
   "yaw": -157.27,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0",
   "backwardYaw": -124.47
  },
  {
   "distance": 1,
   "yaw": -117.07,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7",
   "backwardYaw": -5.52
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_D7E43C95_C654_48C3_41D5_D441E8F4B5BE",
  "this.overlay_D78C34B1_C654_58C3_41C3_A038E40060B3",
  "this.overlay_25020B30_329F_B499_41C0_7B8448BA652A"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 26.51,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 26.51,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 26.51,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -146.98,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2CFC9CF9_3DB9_B2D5_41AC_EC9BEA9B3386",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk Passage 17th floor",
 "id": "panorama_C857B562_C391_99A2_41D4_622CFBF52C0A",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -82.58,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CF1013BA_C391_98A2_4167_0505D502E364",
   "backwardYaw": 4.72
  },
  {
   "distance": 1,
   "yaw": 35.46,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A",
   "backwardYaw": 153.25
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_D2F533D4_C3F3_98E5_41DC_C06241682CEA",
  "this.overlay_D20E5953_C3F1_89E3_41E2_DE390783024A",
  "this.overlay_D181A890_C3F0_977D_41E6_810868AFA24B"
 ]
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk bedroom03 01 106th",
 "id": "panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": 37.62,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA",
   "backwardYaw": -49.96
  },
  {
   "distance": 1,
   "yaw": 152.97,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00",
   "backwardYaw": 34.45
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_E54E0653_C654_5847_41E2_4F2F79E153AD",
  "this.overlay_E5F8F5BF_C654_583F_41E0_5A5263ACE886"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -135.72,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2F331B0A_3DB9_B737_41C5_634B808508D6",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk 01 hall 28th floor",
 "id": "panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -4.14,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032",
   "backwardYaw": -170.07
  },
  {
   "distance": 1,
   "yaw": 135.28,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0",
   "backwardYaw": -148.21
  },
  {
   "distance": 1,
   "yaw": 148.66,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6",
   "backwardYaw": 127.04
  },
  {
   "distance": 1,
   "yaw": -125.48,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A",
   "backwardYaw": -158.16
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "overlays": [
  "this.overlay_281CFD8B_336C_EF8E_41BA_4EEEC4633EEB",
  "this.overlay_28913488_336F_DD8A_41A6_A79938E14234",
  "this.overlay_2F1676EF_336C_5D86_41B8_D7D223FBE696",
  "this.overlay_2F94ADDA_336C_6F89_41B3_E166F691B2DD"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 26.51,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 26.51,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 26.51,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -104.01,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_320E2F0B_3DB9_AF36_418A_2986A7B3DDDB",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 175.86,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2F156E23_3DB9_B176_41C9_2863CAC21C82",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -142.38,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2F22DB15_3DB9_B752_41C0_4C8867764442",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3BHK_Bolcony_28",
 "id": "panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -170.07,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9",
   "backwardYaw": -4.14
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "overlays": [
  "this.overlay_2D68C2F0_336C_759A_41C7_B9B641CD3CD0"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -46.22,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_3274BF12_3DB9_AF56_41C8_78887AAE46D8",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 42.21,
  "class": "PanoramaCameraPosition",
  "pitch": 1.51
 },
 "id": "panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -120.08,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2FC6BE0A_3DB9_B136_41C3_E61257999F2E",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_camera",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk bedroom02 2 33rd",
 "id": "panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -145.32,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309",
   "backwardYaw": 133.52
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A"
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_E468F0B7_C654_58CF_41DE_C89AEED028EF",
  "this.overlay_E4E80CAC_C657_C8C1_41D8_7F180578F07D"
 ]
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk_bedroom01_toilet copy",
 "id": "panorama_118B7384_0049_E93E_4136_7E71C475A6E0",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A"
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "overlays": [
  "this.overlay_17D9B17A_0059_69CA_412E_7A0DA76B62F0"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -54.22,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_322AEBE5_3DB9_B6FD_41B4_669083434D44",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 33.34,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2F526E45_3DB9_B13D_41C7_7EC598E19171",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -38.12,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2E9C4B6C_3DB9_B7F2_41C0_9E82FB820E31",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 130.25,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_32C2BBBB_3DB9_B756_41C5_055297EFC421",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "partial": false,
 "hfov": 360,
 "vfov": 180,
 "label": "3bhk_BDRoom03_toilet copy",
 "id": "panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC",
 "hfovMin": "135%",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_camera",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk_bed2_toilet copy",
 "id": "panorama_0B65F72F_0039_294A_413D_7167CFDDAD60",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -130.12,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40",
   "backwardYaw": 119.11
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "overlays": [
  "this.overlay_1357338D_0077_294E_4147_F9D08C457157"
 ]
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "Powder toilet 3BHK",
 "id": "panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": 105.8,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6",
   "backwardYaw": -56.87
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "overlays": [
  "this.overlay_105CC9D2_01A7_0B48_4158_008E8092F603"
 ]
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk bedroom02 33rd",
 "id": "panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -115.94,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_118D55D0_004A_E8D6_412B_F15016B43EC0",
   "backwardYaw": -3.63
  },
  {
   "distance": 1,
   "yaw": -157.54,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309",
   "backwardYaw": -125.73
  },
  {
   "distance": 1,
   "yaw": 37.55,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D",
   "backwardYaw": -68.97
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_E6C34BC9_C65D_C843_41E3_37D707F31C56",
  "this.overlay_E7577260_C65C_7843_41E0_F5DDAEA8A5BD",
  "this.overlay_18DE8DB9_336C_6F8A_41BD_1994DC6F4A21"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -24.56,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2F0FBB30_3DB9_B752_41AA_66583ACB2B28",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 10.18,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2C622D6C_3DB9_B3F3_41B6_519975F23D43",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 64.69,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2FD74AF7_3DB9_B6DD_41BB_AC41C35ED006",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -144.54,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2C8EECF0_3DB9_B2D3_41C7_B86721972868",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -31.34,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2F894DE0_3DB9_B2F2_41CD_D7C2E087C625",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 21.84,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2DE61C6C_3DB9_B1F2_41AE_2C39D7967558",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -52.96,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2F745E34_3DB9_B152_41B0_712256963C8E",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk_bedroom01_toilet copy",
 "id": "panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -5.52,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590",
   "backwardYaw": -117.07
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "overlays": [
  "this.overlay_146737F2_0057_E8DA_4155_00C91D7C48D2"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 115.9,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2D3EEC8C_3DB9_B132_41CD_F545E6920D41",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 49.88,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_3273FC04_3DB9_B133_41B5_B0F9C9324012",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -145.26,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2FD65E01_3DB9_B132_4196_66E767EEFDB2",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 176.37,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2D0B9CA5_3DB9_B172_41C6_4FF4EE2F8507",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -144.45,
  "class": "PanoramaCameraPosition",
  "pitch": -9.04
 },
 "id": "panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 173.89,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2FF7CDEE_3DB9_B2CE_41B7_0ED359E69B77",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 111.03,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2D685CB6_3DB9_B15E_41C8_C40B899452A8",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 174.52,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2CB4ECCF_3DB9_B2CD_41C8_73483259A6A4",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -173.67,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2D973C4B_3DB9_B135_41C1_FC4087F8C6D8",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3BHK_Bolcony_23",
 "id": "panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -165.42,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0",
   "backwardYaw": -5.64
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "overlays": [
  "this.overlay_271AF4F3_32A4_7D9F_4183_723DC0E5E4C1"
 ]
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk bedroom01 23rd",
 "id": "panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -61.42,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590",
   "backwardYaw": 33.02
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_D4424B68_C654_C841_41AA_04E4BDB57422"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -145.55,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2F255E1B_3DB9_B156_41C8_9901099BB630",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_camera",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk bedroom01 28th",
 "id": "panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -65.68,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A",
   "backwardYaw": 39.47
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_DEEEAE21_C674_CBC3_41DF_981A8131049C"
 ]
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk Passage 28th floor",
 "id": "panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -84.87,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9",
   "backwardYaw": 5.82
  },
  {
   "distance": 1,
   "yaw": -6.11,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6",
   "backwardYaw": 5.32
  },
  {
   "distance": 1,
   "yaw": 35.96,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B",
   "backwardYaw": 151.46
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_2ECD8898_336B_B58A_41C3_B1EA3ED1BC44",
  "this.overlay_2D649786_336B_BC79_4177_4EF46C89C11B",
  "this.overlay_2C47FE1E_3364_AC86_41BD_92D8DE077FEE"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -91.18,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2CDB4D0A_3DB9_B336_41BC_EC1E0C12A058",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 173.35,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2E8ECE78_3DB9_B1D2_41C3_1F4AE8AD4555",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk_bed2_toilet copy",
 "id": "panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -131.63,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A",
   "backwardYaw": 117.73
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "overlays": [
  "this.overlay_1BA8B30A_004F_694A_4158_016311CE43BA"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -60.89,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2EAFCE68_3DB9_B1F2_41AC_E7682057682B",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 95.13,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2C158D42_3DB9_B336_41CA_339D4E438095",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -135.16,
  "class": "PanoramaCameraPosition",
  "pitch": -6.53
 },
 "id": "panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 114.32,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_3249BC2C_3DB9_B172_41C8_7FCD77CB0646",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk kitchen",
 "id": "panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53"
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_D6BEFA7F_C64C_483F_41C3_9F7466FB8F67"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 123.89,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2C4D9D9F_3DB9_B34D_41C5_9935C181963E",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk bedroom02 1 17th",
 "id": "panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -21.06,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40",
   "backwardYaw": 88.82
  },
  {
   "distance": 1,
   "yaw": -146.66,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391",
   "backwardYaw": 134.28
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_D0840BD8_C3F0_88ED_41D5_401F4C1D0F9A",
  "this.overlay_D0C5DA7D_C3F1_8BA7_41D0_40EE562498C3"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -174.68,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2F4E7B52_3DB9_B7D7_41C3_131F8996F315",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk bedroom02 2 17th",
 "id": "panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": 88.82,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9",
   "backwardYaw": -21.06
  },
  {
   "distance": 1,
   "yaw": 119.11,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0B65F72F_0039_294A_413D_7167CFDDAD60",
   "backwardYaw": -130.12
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_D06F55C7_C3F0_98E2_41E3_464100BECDC1",
  "this.overlay_09FA2596_0678_A611_4196_27395AC63D08"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 174.36,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2E9FFE70_3DB9_B1D2_41A7_129FF7CA89B7",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 173.59,
  "class": "PanoramaCameraPosition",
  "pitch": -2.26
 },
 "id": "panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 171.08,
  "class": "PanoramaCameraPosition",
  "pitch": 1
 },
 "id": "panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 176.78,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2F7FAB38_3DB9_B752_41C0_CE30D760CB33",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk bedroom02 1 23rd",
 "id": "panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": 118.11,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22",
   "backwardYaw": -130.75
  },
  {
   "distance": 1,
   "yaw": 75.99,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5",
   "backwardYaw": -20.79
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_D55AF350_C65C_5841_41E8_2583A752FBE8",
  "this.overlay_1788E5E3_0609_A636_4170_98106BB92308"
 ]
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "Powder toilet 3BHK",
 "id": "panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": 103.66,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF",
   "backwardYaw": -56.11
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "overlays": [
  "this.overlay_11D521B2_019B_1BC8_416F_DC66A9296BC0"
 ]
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk bedroom03 02 106th",
 "id": "panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -49.96,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0",
   "backwardYaw": 37.62
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC"
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_E24DF921_C64C_C9C3_41E0_1DE050A43B4D",
  "this.overlay_12D086AB_0608_6236_4191_C3F4174FECF3"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 164.05,
  "class": "PanoramaCameraPosition",
  "pitch": -5.02
 },
 "id": "panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_camera",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "media": "this.panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_camera"
  },
  {
   "media": "this.panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_camera"
  },
  {
   "media": "this.panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_camera"
  },
  {
   "media": "this.panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_camera"
  },
  {
   "media": "this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_camera"
  },
  {
   "media": "this.panorama_CF1013BA_C391_98A2_4167_0505D502E364",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CF1013BA_C391_98A2_4167_0505D502E364_camera"
  },
  {
   "media": "this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_camera"
  },
  {
   "media": "this.panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_camera"
  },
  {
   "media": "this.panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_camera"
  },
  {
   "media": "this.panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_camera"
  },
  {
   "media": "this.panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_camera"
  },
  {
   "media": "this.panorama_0B65F72F_0039_294A_413D_7167CFDDAD60",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_camera"
  },
  {
   "media": "this.panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_camera"
  },
  {
   "media": "this.panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_camera"
  },
  {
   "media": "this.panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_camera"
  },
  {
   "media": "this.panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_camera"
  },
  {
   "media": "this.panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_camera"
  },
  {
   "media": "this.panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_camera"
  },
  {
   "media": "this.panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_camera"
  },
  {
   "media": "this.panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_camera"
  },
  {
   "media": "this.panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_camera"
  },
  {
   "media": "this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_camera"
  },
  {
   "media": "this.panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_camera"
  },
  {
   "media": "this.panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_camera"
  },
  {
   "media": "this.panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_camera"
  },
  {
   "media": "this.panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_camera"
  },
  {
   "media": "this.panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_camera"
  },
  {
   "media": "this.panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_camera"
  },
  {
   "media": "this.panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_camera"
  },
  {
   "media": "this.panorama_136FCF41_004A_D936_4151_FFADF2CFBA26",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 30)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_camera"
  },
  {
   "media": "this.panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 30, 31)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_camera"
  },
  {
   "media": "this.panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 31, 32)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_camera"
  },
  {
   "media": "this.panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 32, 33)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_camera"
  },
  {
   "media": "this.panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 33, 34)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_camera"
  },
  {
   "media": "this.panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 34, 35)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_camera"
  },
  {
   "media": "this.panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 35, 36)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_camera"
  },
  {
   "media": "this.panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 36, 37)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_camera"
  },
  {
   "media": "this.panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 37, 38)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_camera"
  },
  {
   "media": "this.panorama_118B7384_0049_E93E_4136_7E71C475A6E0",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 38, 39)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_118B7384_0049_E93E_4136_7E71C475A6E0_camera"
  },
  {
   "media": "this.panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 39, 40)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_camera"
  },
  {
   "media": "this.panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 40, 41)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_camera"
  },
  {
   "media": "this.panorama_11906CBC_0049_DF4E_411B_4127E5D5F480",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 41, 42)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_camera"
  },
  {
   "media": "this.panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 42, 43)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_camera"
  },
  {
   "media": "this.panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 43, 44)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_camera"
  },
  {
   "media": "this.panorama_135DA583_0049_293A_414E_3C25985D46CB",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 44, 45)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_135DA583_0049_293A_414E_3C25985D46CB_camera"
  },
  {
   "media": "this.panorama_3E110129_32A4_548A_41A6_17FA339053A0",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 45, 46)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_3E110129_32A4_548A_41A6_17FA339053A0_camera"
  },
  {
   "media": "this.panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 46, 47)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_camera"
  },
  {
   "media": "this.panorama_3E181019_32A4_748A_41C7_D30403307065",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 47, 48)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_3E181019_32A4_748A_41C7_D30403307065_camera"
  },
  {
   "media": "this.panorama_0F2964AA_0199_39D8_415C_DAB75F704D09",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 48, 49)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_camera"
  },
  {
   "media": "this.panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 49, 50)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_camera"
  },
  {
   "media": "this.panorama_E609D5D6_C65C_5841_41DC_4408506ECD34",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 50, 51)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_camera"
  },
  {
   "media": "this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 51, 52)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_camera"
  },
  {
   "media": "this.panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 52, 53)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_camera"
  },
  {
   "media": "this.panorama_118D55D0_004A_E8D6_412B_F15016B43EC0",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 53, 54)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_camera"
  },
  {
   "media": "this.panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 54, 55)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_camera"
  },
  {
   "media": "this.panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 55, 56)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_camera"
  },
  {
   "media": "this.panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 56, 57)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_camera"
  },
  {
   "media": "this.panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 57, 58)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_camera"
  },
  {
   "media": "this.panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 58, 59)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_camera"
  },
  {
   "media": "this.panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC",
   "end": "this.trigger('tourEnded')",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 59, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_12B1E6F5_004A_E8DE_4153_B75256AABCDC_camera"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk_bed2_toilet copy",
 "id": "panorama_11906CBC_0049_DF4E_411B_4127E5D5F480",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -131.63,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5",
   "backwardYaw": 117.1
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "overlays": [
  "this.overlay_18E3C57F_0057_29CA_4147_F4600E232D3B"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -173.29,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_327EFC0B_3DB9_B135_4187_E9C9616B9BB6",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 14.58,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_32203BDD_3DB9_B6D2_41A3_0E484088C4CA",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 173.34,
  "class": "PanoramaCameraPosition",
  "pitch": 0.75
 },
 "id": "panorama_3E110129_32A4_548A_41A6_17FA339053A0_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -27.03,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2DA04C3B_3DB9_B155_41B0_46A9859076C9",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk bedroom01 17th",
 "id": "panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -64.1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5",
   "backwardYaw": 35.42
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_D1422BDB_C3F3_88E2_41BD_FA3D9EE50658"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -139.19,
  "class": "PanoramaCameraPosition",
  "pitch": -3.77
 },
 "id": "panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_camera",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk bedroom02 2 28th",
 "id": "panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -148.21,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9",
   "backwardYaw": 135.28
  },
  {
   "distance": 1,
   "yaw": -21.75,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5",
   "backwardYaw": 88.07
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_DF50E086_C674_38C1_41C4_7464DFF3A926",
  "this.overlay_DFC10996_C674_48CE_41D4_631A257C6571"
 ]
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk 01 hall 23rd floor",
 "id": "panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -5.64,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87",
   "backwardYaw": -165.42
  },
  {
   "distance": 1,
   "yaw": 151.67,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF",
   "backwardYaw": 125.78
  },
  {
   "distance": 1,
   "yaw": -124.47,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590",
   "backwardYaw": -157.27
  },
  {
   "distance": 1,
   "yaw": 133.78,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5",
   "backwardYaw": -145.19
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "overlays": [
  "this.overlay_2174C738_32AC_DC8A_41C2_89736F4D71A4",
  "this.overlay_210F8527_32AD_FC86_41C4_BB25D69B9971",
  "this.overlay_26DF65B2_32AC_BF99_41C5_7D48F8DCF9AE",
  "this.overlay_26B64558_32A4_5C89_41C8_3CAB3D877518"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 54.52,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_325DFC24_3DB9_B172_41C3_1B1490220D39",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk 02 entrance 17th floor",
 "id": "panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90"
  },
  {
   "distance": 1,
   "yaw": 127.04,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391",
   "backwardYaw": 141.88
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_3C2492B0_32BC_759A_41B7_72D9BCA27205",
  "this.overlay_3DF1309D_32BD_B58A_41C4_D85A3ACB0676",
  "this.overlay_3D3AD041_32BF_F4FA_41C5_3331BDC2E822"
 ]
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk 01 hall 33rd floor",
 "id": "panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": 133.52,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A",
   "backwardYaw": -145.32
  },
  {
   "distance": 1,
   "yaw": -125.73,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068",
   "backwardYaw": -157.54
  },
  {
   "distance": 1,
   "yaw": -4.64,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3E181019_32A4_748A_41C7_D30403307065",
   "backwardYaw": -169.82
  },
  {
   "distance": 1,
   "yaw": 155.44,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3E110129_32A4_548A_41A6_17FA339053A0",
   "backwardYaw": 126.16
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "overlays": [
  "this.overlay_171BF5A2_337C_5FBE_41C1_1CFC8A15F9B7",
  "this.overlay_1612DDE0_337D_AFBA_41AB_8C2FFC9AF43D",
  "this.overlay_16441BF7_3364_6B86_41C2_FCE0607B865B",
  "this.overlay_16AA1020_3364_D4BA_41BC_B44D16D56E0B"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 26.51,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 26.51,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 26.51,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -62.27,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2DC20C7C_3DB9_B1D2_41BF_790D8516629E",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_camera",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk bedroom02 2 23rd",
 "id": "panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -20.79,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9",
   "backwardYaw": 75.99
  },
  {
   "distance": 1,
   "yaw": -145.19,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0",
   "backwardYaw": 133.78
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_D409C066_C655_F841_41C2_9E382AAA888D",
  "this.overlay_D4F58EF9_C654_C843_41C9_E71581556A11"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 154.25,
  "class": "PanoramaCameraPosition",
  "pitch": -2.26
 },
 "id": "panorama_135DA583_0049_293A_414E_3C25985D46CB_camera",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk bedroom02 1 33rd",
 "id": "panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40"
  },
  {
   "distance": 1,
   "yaw": 117.73,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4",
   "backwardYaw": -131.63
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_E483FB4F_C654_C85F_41D6_EB69928269D3",
  "this.overlay_15B8B6A2_0608_E231_4196_4E1A0E5B8274"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -116.82,
  "class": "PanoramaCameraPosition",
  "pitch": -1.26
 },
 "id": "panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 26.51,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 26.51,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 26.51,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_camera",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk bedroom03 01 28th",
 "id": "panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": 34.74,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6",
   "backwardYaw": -49.75
  },
  {
   "distance": 1,
   "yaw": 151.46,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29",
   "backwardYaw": 35.96
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_DC0C8682_C673_D8C1_41C9_3F738D8FB7A5",
  "this.overlay_DC8E5D89_C64C_48C3_41D0_5E147F703183"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 173.85,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -173.63,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2DACAC43_3DB9_B135_41B8_572EEC0A3C59",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 48.37,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2F99ADD1_3DB9_B2D5_41C6_B6DBD2FD84FA",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -175.28,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2F11DB1F_3DB9_B74E_418E_E0251EEDC2F5",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 124.01,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_3264CF2B_3DB9_AF76_41C7_812851542131",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 54.77,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2D1C1C9D_3DB9_B152_41B3_8A95E547263F",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -44.72,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2C37DD1A_3DB9_B357_41AA_0D29232A8E7E",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -76.34,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2D567CBE_3DB9_B14E_41C6_607BC4013181",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 129.15,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2C9F9CE7_3DB9_B2FD_41CA_2DAA79458D35",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -45.72,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2CC8ED12_3DB9_B357_41C8_DE240D5FD566",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 130.04,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2F36FE12_3DB9_B156_41AC_1B101250AC92",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -28.54,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2EBCFB5B_3DB9_B7D6_41B7_924C61F3A747",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 21.63,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2F041E2B_3DB9_B176_41BD_A0A727D946D7",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk 02 entrance 33rd floor",
 "id": "panorama_3E110129_32A4_548A_41A6_17FA339053A0",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": 126.16,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309",
   "backwardYaw": 155.44
  },
  {
   "distance": 1,
   "yaw": 6.33,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00",
   "backwardYaw": -3.22
  },
  {
   "distance": 1,
   "yaw": -55.99,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0F2964AA_0199_39D8_415C_DAB75F704D09",
   "backwardYaw": 107.93
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_116E2FDA_337C_6B8E_41AD_4671109176B5",
  "this.overlay_11C51F4E_337C_EC86_41A2_7813FDA2140E",
  "this.overlay_106A55D6_337D_FF86_4174_0A0E29237D58"
 ]
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk bedroom03 01 17th",
 "id": "panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": 44.28,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4",
   "backwardYaw": -50.85
  },
  {
   "distance": 1,
   "yaw": 153.25,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A",
   "backwardYaw": 35.46
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_D7B8A38F_C3F7_B962_4174_75177DEADA11",
  "this.overlay_D7F45601_C3F0_BB5E_41C2_C0C993F67D5C"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -28.26,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_32683C13_3DB9_B155_41C3_644B037AA046",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 160.03,
  "class": "PanoramaCameraPosition",
  "pitch": -6.28
 },
 "id": "panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_camera",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk bedroom01 33rd",
 "id": "panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -68.97,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068",
   "backwardYaw": 37.55
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_E7E37E24_C654_4BC2_41E1_8DC9EEC30B49"
 ]
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk bedroom03 02 17th",
 "id": "panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -93.55,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0",
   "backwardYaw": 60.43
  },
  {
   "distance": 1,
   "yaw": -50.85,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A",
   "backwardYaw": 44.28
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_D7296732_C3F0_99BD_41CD_15546F96B28A",
  "this.overlay_1497DBE8_0678_E232_4180_BC51F5A3B938"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 55.53,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_3211FEDD_3DB9_AECD_41AF_C786464298C3",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 31.79,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2D8DCC5B_3DB9_B1D5_41B9_6C07156A7519",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -72.07,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2F6FCB42_3DB9_B736_41C7_3779CCDD36B2",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 86.08,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2DD2AC74_3DB9_B1D2_41C2_85EC974BCACB",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 176.37,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2D2CAC94_3DB9_B153_41CC_434EFB1145AD",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -28.33,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2D457CC6_3DB9_B13F_41CA_FEE752214E98",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -136.2,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_32600F22_3DB9_AF77_41A3_745225B43C36",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 98.65,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2DB5AC33_3DB9_B155_41C2_68E75648E175",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 159.21,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2C921CDF_3DB9_B2CD_41CC_11A95DB48A72",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 125.1,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_3202CEFA_3DB9_AED6_41C2_CF541F04CBDE",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk_bedroom01_toilet copy",
 "id": "panorama_118D55D0_004A_E8D6_412B_F15016B43EC0",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -3.63,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068",
   "backwardYaw": -115.94
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "overlays": [
  "this.overlay_1AF1323F_0049_6B4A_4158_18971B8C0B2E"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -144.04,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_32C85BC3_3DB9_B735_41A4_F0F301B9C136",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -140.53,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2EFE8E80_3DB9_B133_41CB_D769A49FA0A2",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -142.45,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2CEBBD02_3DB9_B336_41B7_A374620C24C2",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 49.25,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2CA25CD7_3DB9_B2DD_41B3_2BE4EBAD8F45",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -144.54,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_3207CF03_3DB9_AF36_41CE_B312708B3858",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 97.42,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2F42BE4D_3DB9_B132_41A9_2DFFED2769C8",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk bedroom03 01 23rd",
 "id": "panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": 43.8,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D",
   "backwardYaw": -54.9
  },
  {
   "distance": 1,
   "yaw": 151.74,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53",
   "backwardYaw": 35.46
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_D52AF8AA_C65C_C8C1_41E1_368B77920405",
  "this.overlay_D5F4BE96_C654_C8C1_41E5_91FDE5D191D9"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 64.06,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_321C5EF1_3DB9_AED2_41C6_64AF447D06C4",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -26.75,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2F014B27_3DB9_B77E_4160_302DA76A67D2",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 158.25,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2FAA9DBE_3DB9_B34E_41CE_0126D9707CFE",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk_BDRoom03_toilet copy",
 "id": "panorama_135DA583_0049_293A_414E_3C25985D46CB",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": 59.92,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6",
   "backwardYaw": -93.92
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "overlays": [
  "this.overlay_19FC6A44_0049_7B3E_4152_6EC2AFFF8366"
 ]
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk_bed2_toilet copy",
 "id": "panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -130.75,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9",
   "backwardYaw": 118.11
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "overlays": [
  "this.overlay_1419C47C_0059_EFCE_4151_9254754CC460"
 ]
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk 01 hall 17th floor",
 "id": "panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -125.23,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5",
   "backwardYaw": -158.37
  },
  {
   "distance": 1,
   "yaw": 141.88,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC",
   "backwardYaw": 127.04
  },
  {
   "distance": 1,
   "yaw": -6.65,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2",
   "backwardYaw": -161.4
  },
  {
   "distance": 1,
   "yaw": 134.28,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9",
   "backwardYaw": -146.66
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "overlays": [
  "this.overlay_3D7349BD_32BC_778A_4180_C573C2C75FFB",
  "this.overlay_233B548B_32BC_5D8E_41C7_F55DAF5829C6",
  "this.overlay_20FA1B8A_32BD_AB8E_41C8_0F7543612339",
  "this.overlay_23D0DBA5_32BC_EBBA_41C1_E474DF25AAC3"
 ]
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk bedroom02 17th",
 "id": "panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": 35.42,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23",
   "backwardYaw": -64.1
  },
  {
   "distance": 1,
   "yaw": -115.31,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58",
   "backwardYaw": -3.63
  },
  {
   "distance": 1,
   "yaw": -158.37,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391",
   "backwardYaw": -125.23
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_D0FEC682_C3F1_BB62_41D4_9102F3B6D6C5",
  "this.overlay_D09F0370_C3F0_99BE_41E4_9F144A073A5D",
  "this.overlay_20A85676_32A4_DC86_41C7_8BD7100CF053"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 34.81,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_321F7BF4_3DB9_B6D3_41AA_B64A47AC22F9",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_camera",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk_BDRoom03_toilet copy",
 "id": "panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": 60.43,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4",
   "backwardYaw": -93.55
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "overlays": [
  "this.overlay_117BAD49_0079_5936_4155_38DBB5BBB748"
 ]
},
{
 "mouseControlMode": "drag_acceleration",
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "gyroscopeVerticalDraggingEnabled": true,
 "id": "MainViewerPanoramaPlayer",
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_camera",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk kitchen",
 "id": "panorama_CF1013BA_C391_98A2_4167_0505D502E364",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": 4.72,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A",
   "backwardYaw": -82.58
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_D178C03E_C3F0_B7A5_41CB_0834EED7746E"
 ]
},
{
 "hfovMax": 130,
 "partial": false,
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_0EC38AAB_019F_09D8_4148_F13840F3A30E"
 ],
 "label": "Powder toilet 3BHK",
 "id": "panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90",
 "hfovMin": "135%",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -118.44,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_32799F1A_3DB9_AF56_4157_F4E5B9A669F5",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_camera",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk Passage 33rd floor",
 "id": "panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": 34.45,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0",
   "backwardYaw": 152.97
  },
  {
   "distance": 1,
   "yaw": -81.35,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E609D5D6_C65C_5841_41DC_4408506ECD34",
   "backwardYaw": 6.37
  },
  {
   "distance": 1,
   "yaw": -3.22,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3E110129_32A4_548A_41A6_17FA339053A0",
   "backwardYaw": 6.33
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_1A0C0FA4_3365_ABB9_41C4_642D3FFA3681",
  "this.overlay_19595136_3364_B486_41B2_AB314BF8E1F9",
  "this.overlay_1A9011A8_3364_5789_41C4_B319C08CED6A"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_118B7384_0049_E93E_4136_7E71C475A6E0_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -144.58,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_32CCABCC_3DB9_B732_418F_C0ECC183BDBF",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk kitchen",
 "id": "panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": 5.82,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29",
   "backwardYaw": -84.87
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_DE130192_C67C_38C1_41C4_0A4C5ECF7BB5"
 ]
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk_BDRoom03_toilet copy",
 "id": "panorama_136FCF41_004A_D936_4151_FFADF2CFBA26",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": 61.56,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D",
   "backwardYaw": -94.17
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "overlays": [
  "this.overlay_163A1A6F_005F_DBCA_4143_609D9385BACF"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 26.51,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 26.51,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 26.51,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -61.89,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_32539C1B_3DB9_B155_41CE_6CDC7F88FDA5",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 167.56,
  "class": "PanoramaCameraPosition",
  "pitch": -4.27
 },
 "id": "panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_camera",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk 02 entrance 28th floor",
 "id": "panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": 127.04,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9",
   "backwardYaw": 148.66
  },
  {
   "distance": 1,
   "yaw": 5.32,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29",
   "backwardYaw": -6.11
  },
  {
   "distance": 1,
   "yaw": -56.87,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD",
   "backwardYaw": 105.8
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_2ACF84C0_3365_FDFA_41BD_59A171EDC470",
  "this.overlay_2AFC3B23_336B_B4BE_41BB_3885A3BF30E6",
  "this.overlay_299FD28A_336D_D589_41B8_F82AB0ACDC68"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 34.68,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2C033D50_3DB9_B3D2_41C9_414B5E273EB7",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 175.36,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2E8C2B74_3DB9_B7D2_41A7_50BE88ECAA25",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360,
 "label": "3bhk 02 entrance 23rd floor",
 "id": "panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_t.jpg",
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -56.11,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6",
   "backwardYaw": 103.66
  },
  {
   "distance": 1,
   "yaw": 125.78,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0",
   "backwardYaw": 151.67
  },
  {
   "distance": 1,
   "yaw": 6.71,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53",
   "backwardYaw": -5.48
  }
 ],
 "hfovMin": "150%",
 "partial": false,
 "overlays": [
  "this.overlay_209C93E9_32AC_5B8A_41B3_4E23C1D3F27C",
  "this.overlay_20487ACB_32AC_D58E_41C3_0FCD15BCFE67",
  "this.overlay_21CEA0BD_32AF_F58A_41C6_02D8A6F2F8C3"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 54.27,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2D795CAE_3DB9_B14E_41A2_D703FD4EE066",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 32.5
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 295
   },
   {
    "yawSpeed": 13.26,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 32.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_camera",
 "class": "PanoramaCamera"
},
{
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "progressBorderColor": "#000000",
 "id": "MainViewer",
 "paddingBottom": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "toolTipOpacity": 1,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "paddingLeft": 0,
 "toolTipTextShadowColor": "#000000",
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipPaddingBottom": 4,
 "minHeight": 50,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarProgressBorderRadius": 0,
 "playbackBarBorderRadius": 0,
 "minWidth": 100,
 "height": "100%",
 "playbackBarHeadBorderRadius": 0,
 "class": "ViewerArea",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
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
 "playbackBarHeadShadowColor": "#000000",
 "shadow": false,
 "transitionDuration": 500,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "vrPointerSelectionTime": 2000,
 "progressBarBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "playbackBarHeadShadow": true,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "progressBottom": 0,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "paddingRight": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "displayTooltipInTouchScreens": true,
 "transitionMode": "blending",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipBorderRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "paddingTop": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "progressBarBorderColor": "#000000",
 "playbackBarHeadOpacity": 1,
 "data": {
  "name": "Main Viewer"
 },
 "playbackBarHeadShadowHorizontalLength": 0
},
{
 "items": [
  {
   "hfov": 15.05,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_1_HS_0_0.png",
      "width": 251,
      "class": "ImageResourceLevel",
      "height": 305
     }
    ]
   },
   "pitch": 4.2,
   "yaw": -161.4,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391, this.camera_2E8ECE78_3DB9_B1D2_41C3_1F4AE8AD4555); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 15.05,
   "yaw": -161.4,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 19
     }
    ]
   },
   "pitch": 4.2
  }
 ],
 "id": "overlay_2098B134_32A4_5499_41C2_22F48477A3BD",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 15.84,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_1_HS_0_0.png",
      "width": 264,
      "class": "ImageResourceLevel",
      "height": 276
     }
    ]
   },
   "pitch": 1.81,
   "yaw": -169.82,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309, this.camera_2E8C2B74_3DB9_B7D2_41A7_50BE88ECAA25); this.mainPlayList.set('selectedIndex', 46)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 15.84,
   "yaw": -169.82,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E181019_32A4_748A_41C7_D30403307065_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.81
  }
 ],
 "id": "overlay_15B510C7_3364_7586_41C2_C6620CFBA961",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 10,
   "image": "this.AnimatedImageResource_EE85753D_C634_79C3_41D0_D071D6C1482E",
   "pitch": -29.08,
   "yaw": 6.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00, this.camera_2DB5AC33_3DB9_B155_41C2_68E75648E175); this.mainPlayList.set('selectedIndex', 49)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 10,
   "yaw": 6.37,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -29.08
  }
 ],
 "id": "overlay_E2FE88E0_C64D_C841_41C3_2E195A899599",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 11.55,
   "image": "this.AnimatedImageResource_EE9AE527_C634_79CF_41CB_542FF5E39B28",
   "pitch": -53.53,
   "yaw": 88.07,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0, this.camera_2FAA9DBE_3DB9_B34E_41CE_0126D9707CFE); this.mainPlayList.set('selectedIndex', 39)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 11.55,
   "yaw": 88.07,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -53.53
  }
 ],
 "id": "overlay_DFA742CC_C674_3841_419D_AB7849550207",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 10.87,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_1_HS_2_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": -0.18,
   "yaw": 117.1,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_11906CBC_0049_DF4E_411B_4127E5D5F480, this.camera_2F99ADD1_3DB9_B2D5_41C6_B6DBD2FD84FA); this.mainPlayList.set('selectedIndex', 41)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 10.87,
   "yaw": 117.1,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.18
  }
 ],
 "id": "overlay_14AA83F7_0608_A21E_4189_B52BDB95135B",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 14.69,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_1_HS_0_0.png",
      "width": 244,
      "class": "ImageResourceLevel",
      "height": 290
     }
    ]
   },
   "pitch": 0.29,
   "yaw": 107.93,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E110129_32A4_548A_41A6_17FA339053A0, this.camera_3264CF2B_3DB9_AF76_41C7_812851542131); this.mainPlayList.set('selectedIndex', 45)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 14.69,
   "yaw": 107.93,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0F2964AA_0199_39D8_415C_DAB75F704D09_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 19
     }
    ]
   },
   "pitch": 0.29
  }
 ],
 "id": "overlay_12B3B3CD_01A9_1F58_4175_0448822DFE99",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 16.22,
   "image": "this.AnimatedImageResource_EE9B3529_C634_79C3_41E2_6373077866CD",
   "pitch": -33.46,
   "yaw": -49.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B, this.camera_2FD65E01_3DB9_B132_4196_66E767EEFDB2); this.mainPlayList.set('selectedIndex', 42)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 16.22,
   "yaw": -49.75,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -33.46
  }
 ],
 "id": "overlay_DDE3106F_C64C_D85F_41C3_782CF613010E",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 10.37,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_1_HS_2_0.png",
      "width": 144,
      "class": "ImageResourceLevel",
      "height": 144
     }
    ]
   },
   "pitch": -0.85,
   "yaw": -93.92,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_135DA583_0049_293A_414E_3C25985D46CB, this.camera_2FC6BE0A_3DB9_B136_41C3_E61257999F2E); this.mainPlayList.set('selectedIndex', 44)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 10.37,
   "yaw": -93.92,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.85
  }
 ],
 "id": "overlay_15CEF500_0608_67F2_415C_6AB7E6A6DB80",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 11.96,
   "image": "this.AnimatedImageResource_2C4C9A97_3DB9_B15E_41B3_4248AAC9A304",
   "pitch": -22.04,
   "yaw": -5.48,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF, this.camera_327EFC0B_3DB9_B135_4187_E9C9616B9BB6); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 11.96,
   "yaw": -5.48,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -22.04
  }
 ],
 "id": "overlay_27335F89_32A4_AB8A_41C1_9B84E0221C2D",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 10.87,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_1_HS_1_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": 1.41,
   "yaw": 35.46,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7, this.camera_32683C13_3DB9_B155_41C3_644B037AA046); this.mainPlayList.set('selectedIndex', 27)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 10.87,
   "yaw": 35.46,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.41
  }
 ],
 "id": "overlay_24F6F26A_32A4_5489_41C4_EC701E187A22",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 11.04,
   "image": "this.AnimatedImageResource_2C4D5A97_3DB9_B15E_41C9_074D423004C5",
   "pitch": -45.16,
   "yaw": -80.98,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 35)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 11.04,
   "yaw": -80.98,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_1_HS_2_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -45.16
  }
 ],
 "id": "overlay_243CA586_32A4_7C79_4170_A5E3FF8D61C7",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 15.57,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_1_HS_0_0.png",
      "width": 259,
      "class": "ImageResourceLevel",
      "height": 209
     }
    ]
   },
   "pitch": -2.96,
   "yaw": -3.63,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5, this.camera_2FD74AF7_3DB9_B6DD_41BB_AC41C35ED006); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 15.57,
   "yaw": -3.63,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58_1_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -2.96
  }
 ],
 "id": "overlay_12802B79_0076_D9D6_40D5_A735950E3D00",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 10.87,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_1_HS_0_0.png",
      "width": 150,
      "class": "ImageResourceLevel",
      "height": 150
     }
    ]
   },
   "pitch": 1.24,
   "yaw": -158.16,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9, this.camera_325DFC24_3DB9_B172_41C3_1B1490220D39); this.mainPlayList.set('selectedIndex', 31)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 10.87,
   "yaw": -158.16,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.24
  }
 ],
 "id": "overlay_DE78BD94_C67C_48C1_41E0_19E3E3F56405",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 15.63,
   "image": "this.AnimatedImageResource_EE9C0525_C634_79C3_41E5_176E60E12F40",
   "pitch": -36.48,
   "yaw": 39.47,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5, this.camera_3249BC2C_3DB9_B172_41C8_7FCD77CB0646); this.mainPlayList.set('selectedIndex', 37)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 15.63,
   "yaw": 39.47,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_1_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -36.48
  }
 ],
 "id": "overlay_DEFD2A97_C674_C8CF_41E4_A52F962F63C7",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 11.05,
   "image": "this.AnimatedImageResource_2FB92AA2_3DB9_B176_4196_9249EBB0A1F4",
   "pitch": -2.2,
   "yaw": -115.18,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "data": {
  "label": "Arrow 01 Right"
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 38)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 11.05,
   "yaw": -115.18,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -2.2
  }
 ],
 "id": "overlay_1253AE9D_3364_6D8B_41C1_543577C932F6",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 16.46,
   "image": "this.AnimatedImageResource_EE902520_C634_79C1_41BF_257FBF304234",
   "pitch": -32.15,
   "yaw": -54.9,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7, this.camera_32600F22_3DB9_AF77_41A3_745225B43C36); this.mainPlayList.set('selectedIndex', 27)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 16.46,
   "yaw": -54.9,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -32.15
  }
 ],
 "id": "overlay_D25D23DA_C655_D841_41D7_0482A8407978",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 10.84,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_1_HS_2_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": 4.17,
   "yaw": -94.17,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_136FCF41_004A_D936_4151_FFADF2CFBA26, this.camera_32799F1A_3DB9_AF56_4157_F4E5B9A669F5); this.mainPlayList.set('selectedIndex', 29)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 10.84,
   "yaw": -94.17,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 4.17
  }
 ],
 "id": "overlay_141820D1_0608_DE13_4184_3BBBDEF95731",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 10.83,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_1_HS_0_0.png",
      "width": 150,
      "class": "ImageResourceLevel",
      "height": 150
     }
    ]
   },
   "pitch": 4.95,
   "yaw": -157.27,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0, this.camera_3211FEDD_3DB9_AECD_41AF_C786464298C3); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 10.83,
   "yaw": -157.27,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 4.95
  }
 ],
 "id": "overlay_D7E43C95_C654_48C3_41D5_D441E8F4B5BE",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 11.91,
   "image": "this.AnimatedImageResource_EE92B51D_C634_79C3_41E6_BF230F987FF4",
   "pitch": -34.76,
   "yaw": 33.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2, this.camera_322D6ED4_3DB9_AED3_41AD_3ECA9EEE0A75); this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 11.91,
   "yaw": 33.02,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_1_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -34.76
  }
 ],
 "id": "overlay_D78C34B1_C654_58C3_41C3_A038E40060B3",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 12.81,
   "image": "this.AnimatedImageResource_2C4EAA98_3DB9_B152_41A7_DBCA9DDEC464",
   "pitch": -0.94,
   "yaw": -117.07,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "data": {
  "label": "Arrow 01 Right"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7, this.camera_3217AEE7_3DB9_AEFE_4172_3826B546EC0B); this.mainPlayList.set('selectedIndex', 23)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 12.81,
   "yaw": -117.07,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.94
  }
 ],
 "id": "overlay_25020B30_329F_B499_41C0_7B8448BA652A",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 17.95,
   "image": "this.AnimatedImageResource_EEA83515_C634_79C3_41D3_CD95A4DC902C",
   "pitch": -22.61,
   "yaw": -5.35,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF, this.camera_0958ED1C_0678_E612_4192_FD46D26A5AD0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 17.95,
   "yaw": -5.35,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -22.61
  }
 ],
 "id": "overlay_D2F533D4_C3F3_98E5_41DC_C06241682CEA",
 "class": "HotspotPanoramaOverlay"
},
{
 "items": [
  {
   "hfov": 8.09,
   "image": "this.AnimatedImageResource_EEA85515_C634_79C3_41E0_6091C7CEDAF8",
   "pitch": -45.01,
   "yaw": -82.58,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CF1013BA_C391_98A2_4167_0505D502E364, this.camera_2F11DB1F_3DB9_B74E_418E_E0251EEDC2F5); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 8.09,
   "yaw": -82.58,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_1_HS_1_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -45.01
  }
 ],
 "id": "overlay_D20E5953_C3F1_89E3_41E2_DE390783024A",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 10.85,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_1_HS_2_0.png",
      "width": 150,
      "class": "ImageResourceLevel",
      "height": 150
     }
    ]
   },
   "pitch": 3.3,
   "yaw": 35.46,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A, this.camera_2F014B27_3DB9_B77E_4160_302DA76A67D2); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 10.85,
   "yaw": 35.46,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 3.3
  }
 ],
 "id": "overlay_D181A890_C3F0_977D_41E6_810868AFA24B",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 16.71,
   "image": "this.AnimatedImageResource_EE84253B_C634_79C7_41E0_968E01AFCA33",
   "pitch": -30.71,
   "yaw": 37.62,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA, this.camera_2F36FE12_3DB9_B156_41AC_1B101250AC92); this.mainPlayList.set('selectedIndex', 58)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 16.71,
   "yaw": 37.62,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -30.71
  }
 ],
 "id": "overlay_E54E0653_C654_5847_41E2_4F2F79E153AD",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 16.9,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_1_HS_1_0.png",
      "width": 234,
      "class": "ImageResourceLevel",
      "height": 208
     }
    ]
   },
   "pitch": 2.34,
   "yaw": 152.97,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00, this.camera_2F255E1B_3DB9_B156_41C8_9901099BB630); this.mainPlayList.set('selectedIndex', 49)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 16.9,
   "yaw": 152.97,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_1_HS_1_0_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 2.34
  }
 ],
 "id": "overlay_E5F8F5BF_C654_583F_41E0_5A5263ACE886",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 14.8,
   "image": "this.AnimatedImageResource_2FB45AA0_3DB9_B172_41B6_A14EE6CE31C0",
   "pitch": -24.03,
   "yaw": 148.66,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6, this.camera_2DF9CC64_3DB9_B1F2_41CB_CC7130192F97); this.mainPlayList.set('selectedIndex', 30)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 14.8,
   "yaw": 148.66,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -24.03
  }
 ],
 "id": "overlay_281CFD8B_336C_EF8E_41BA_4EEEC4633EEB",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 7.54,
   "image": "this.AnimatedImageResource_2FB4AAA0_3DB9_B172_41C2_22EC070ED84F",
   "pitch": 1.07,
   "yaw": 135.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "data": {
  "label": "Arrow 01 Left"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0, this.camera_2D8DCC5B_3DB9_B1D5_41B9_6C07156A7519); this.mainPlayList.set('selectedIndex', 39)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 7.54,
   "yaw": 135.28,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.07
  }
 ],
 "id": "overlay_28913488_336F_DD8A_41A6_A79938E14234",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 9.06,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_1_HS_2_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": 0.31,
   "yaw": -125.48,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A, this.camera_2DE61C6C_3DB9_B1F2_41AE_2C39D7967558); this.mainPlayList.set('selectedIndex', 36)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 9.06,
   "yaw": -125.48,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.31
  }
 ],
 "id": "overlay_2F1676EF_336C_5D86_41B8_D7D223FBE696",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 11.57,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_1_HS_3_0.png",
      "width": 192,
      "class": "ImageResourceLevel",
      "height": 197
     }
    ]
   },
   "pitch": -0.32,
   "yaw": -4.14,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032, this.camera_2D834C53_3DB9_B1D5_41C6_06295236001F); this.mainPlayList.set('selectedIndex', 32)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 11.57,
   "yaw": -4.14,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.32
  }
 ],
 "id": "overlay_2F94ADDA_336C_6F89_41B3_E166F691B2DD",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 17.33,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_1_HS_0_0.png",
      "width": 289,
      "class": "ImageResourceLevel",
      "height": 268
     }
    ]
   },
   "pitch": 2.82,
   "yaw": -170.07,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9, this.camera_2F156E23_3DB9_B176_41C9_2863CAC21C82); this.mainPlayList.set('selectedIndex', 31)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 17.33,
   "yaw": -170.07,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3CDB8152_32AC_549E_41C0_2EA6C9801032_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 2.82
  }
 ],
 "id": "overlay_2D68C2F0_336C_759A_41C7_B9B641CD3CD0",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 19.38,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_1_HS_0_0.png",
      "width": 269,
      "class": "ImageResourceLevel",
      "height": 311
     }
    ]
   },
   "pitch": -0.85,
   "yaw": -145.32,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309, this.camera_3237DBD5_3DB9_B6D2_41BF_707B474873A3); this.mainPlayList.set('selectedIndex', 46)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 19.38,
   "yaw": -145.32,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   },
   "pitch": -0.85
  }
 ],
 "id": "overlay_E468F0B7_C654_58CF_41DE_C89AEED028EF",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 15.67,
   "image": "this.AnimatedImageResource_EE872539_C634_79C3_41C0_5F139E4D450B",
   "pitch": -36.3,
   "yaw": -26.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 55)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 15.67,
   "yaw": -26.28,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_1_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -36.3
  }
 ],
 "id": "overlay_E4E80CAC_C657_C8C1_41D8_7F180578F07D",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 12.79,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_1_HS_0_0.png",
      "width": 213,
      "class": "ImageResourceLevel",
      "height": 205
     }
    ]
   },
   "pitch": -4.59,
   "yaw": -4.26,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 12.79,
   "yaw": -4.26,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118B7384_0049_E93E_4136_7E71C475A6E0_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -4.59
  }
 ],
 "id": "overlay_17D9B17A_0059_69CA_412E_7A0DA76B62F0",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 13.33,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_1_HS_0_0.png",
      "width": 222,
      "class": "ImageResourceLevel",
      "height": 184
     }
    ]
   },
   "pitch": 0.05,
   "yaw": -130.12,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40, this.camera_2EAFCE68_3DB9_B1F2_41AC_E7682057682B); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 13.33,
   "yaw": -130.12,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B65F72F_0039_294A_413D_7167CFDDAD60_1_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.05
  }
 ],
 "id": "overlay_1357338D_0077_294E_4147_F9D08C457157",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 18.26,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_1_HS_0_0.png",
      "width": 304,
      "class": "ImageResourceLevel",
      "height": 272
     }
    ]
   },
   "pitch": 0.84,
   "yaw": 105.8,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6, this.camera_2DCFAC84_3DB9_B132_41AB_2F31B7E3980A); this.mainPlayList.set('selectedIndex', 30)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 18.26,
   "yaw": 105.8,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.84
  }
 ],
 "id": "overlay_105CC9D2_01A7_0B48_4158_008E8092F603",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 18.01,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_1_HS_0_0.png",
      "width": 250,
      "class": "ImageResourceLevel",
      "height": 261
     }
    ]
   },
   "pitch": 1.24,
   "yaw": -157.54,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309, this.camera_2D795CAE_3DB9_B14E_41A2_D703FD4EE066); this.mainPlayList.set('selectedIndex', 46)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 18.01,
   "yaw": -157.54,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.24
  }
 ],
 "id": "overlay_E6C34BC9_C65D_C843_41E3_37D707F31C56",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 15.24,
   "image": "this.AnimatedImageResource_EE868537_C634_79CF_41DE_C101E360270A",
   "pitch": -38.4,
   "yaw": 37.55,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D, this.camera_2D685CB6_3DB9_B15E_41C8_C40B899452A8); this.mainPlayList.set('selectedIndex', 52)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 15.24,
   "yaw": 37.55,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_1_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -38.4
  }
 ],
 "id": "overlay_E7577260_C65C_7843_41E0_F5DDAEA8A5BD",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 7.54,
   "image": "this.AnimatedImageResource_2FA43AAD_3DB9_B14D_41C1_0E3BC4AE01C1",
   "pitch": -0.44,
   "yaw": -115.94,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "data": {
  "label": "Arrow 01 Right"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_118D55D0_004A_E8D6_412B_F15016B43EC0, this.camera_2D0B9CA5_3DB9_B172_41C6_4FF4EE2F8507); this.mainPlayList.set('selectedIndex', 53)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 7.54,
   "yaw": -115.94,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.44
  }
 ],
 "id": "overlay_18DE8DB9_336C_6F8A_41BD_1994DC6F4A21",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 11.78,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_1_HS_0_0.png",
      "width": 197,
      "class": "ImageResourceLevel",
      "height": 209
     }
    ]
   },
   "pitch": -4.72,
   "yaw": -5.52,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590, this.camera_2EAD0B64_3DB9_B7F2_41B0_E58A099D7092); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 11.78,
   "yaw": -5.52,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11AC3D3D_004A_F94E_4142_D27F9A1181D7_1_HS_0_0_0_map.gif",
      "width": 15,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -4.72
  }
 ],
 "id": "overlay_146737F2_0057_E8DA_4155_00C91D7C48D2",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 16.09,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_1_HS_0_0.png",
      "width": 268,
      "class": "ImageResourceLevel",
      "height": 276
     }
    ]
   },
   "pitch": 1.06,
   "yaw": -165.42,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0, this.camera_2E9FFE70_3DB9_B1D2_41A7_129FF7CA89B7); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 16.09,
   "yaw": -165.42,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.06
  }
 ],
 "id": "overlay_271AF4F3_32A4_7D9F_4183_723DC0E5E4C1",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 13.24,
   "image": "this.AnimatedImageResource_EE92251D_C634_79C3_41D0_BCD536C9B445",
   "pitch": -33.44,
   "yaw": -61.42,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590, this.camera_2CFC9CF9_3DB9_B2D5_41AC_EC9BEA9B3386); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 13.24,
   "yaw": -61.42,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -33.44
  }
 ],
 "id": "overlay_D4424B68_C654_C841_41AA_04E4BDB57422",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 11.23,
   "image": "this.AnimatedImageResource_EE9D8526_C634_79C1_41D1_BFDADEF90055",
   "pitch": -39.22,
   "yaw": -65.68,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A, this.camera_2EFE8E80_3DB9_B133_41CB_D769A49FA0A2); this.mainPlayList.set('selectedIndex', 36)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 11.23,
   "yaw": -65.68,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -39.22
  }
 ],
 "id": "overlay_DEEEAE21_C674_CBC3_41DF_981A8131049C",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 11.74,
   "image": "this.AnimatedImageResource_2FB6BAA1_3DB9_B172_41BF_431C931B8E55",
   "pitch": -21.92,
   "yaw": -6.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6, this.camera_2F4E7B52_3DB9_B7D7_41C3_131F8996F315); this.mainPlayList.set('selectedIndex', 30)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 11.74,
   "yaw": -6.11,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -21.92
  }
 ],
 "id": "overlay_2ECD8898_336B_B58A_41C3_B1EA3ED1BC44",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 10.87,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_1_HS_1_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": -0.35,
   "yaw": 35.96,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B, this.camera_2EBCFB5B_3DB9_B7D6_41B7_924C61F3A747); this.mainPlayList.set('selectedIndex', 42)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 10.87,
   "yaw": 35.96,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.35
  }
 ],
 "id": "overlay_2D649786_336B_BC79_4177_4EF46C89C11B",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 10.35,
   "image": "this.AnimatedImageResource_2FB79AA1_3DB9_B172_41B5_E3EC438149A5",
   "pitch": -47.79,
   "yaw": -84.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9, this.camera_2F5E9B4A_3DB9_B736_41B7_4902A7588C49); this.mainPlayList.set('selectedIndex', 35)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 10.35,
   "yaw": -84.87,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_1_HS_2_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -47.79
  }
 ],
 "id": "overlay_2C47FE1E_3364_AC86_41BD_92D8DE077FEE",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 17.85,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_1_HS_0_0.png",
      "width": 297,
      "class": "ImageResourceLevel",
      "height": 226
     }
    ]
   },
   "pitch": -1.2,
   "yaw": -131.63,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A, this.camera_2DC20C7C_3DB9_B1D2_41BF_790D8516629E); this.mainPlayList.set('selectedIndex', 55)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 17.85,
   "yaw": -131.63,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4_1_HS_0_0_0_map.gif",
      "width": 21,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -1.2
  }
 ],
 "id": "overlay_1BA8B30A_004F_694A_4158_016311CE43BA",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 10,
   "image": "this.AnimatedImageResource_2C4DBA98_3DB9_B152_41BD_396F8B422100",
   "pitch": -29.06,
   "yaw": 5.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 10,
   "yaw": 5.1,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -29.06
  }
 ],
 "id": "overlay_D6BEFA7F_C64C_483F_41C3_9F7466FB8F67",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 11.71,
   "image": "this.AnimatedImageResource_EE960517_C634_79CE_41A3_AD59E10D5AB0",
   "pitch": -34.59,
   "yaw": -21.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40, this.camera_2CDB4D0A_3DB9_B336_41BC_EC1E0C12A058); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 11.71,
   "yaw": -21.06,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -34.59
  }
 ],
 "id": "overlay_D0840BD8_C3F0_88ED_41D5_401F4C1D0F9A",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 22.95,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_1_HS_1_0.png",
      "width": 318,
      "class": "ImageResourceLevel",
      "height": 349
     }
    ]
   },
   "pitch": -0.47,
   "yaw": -146.66,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391, this.camera_2CC8ED12_3DB9_B357_41C8_DE240D5FD566); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 22.95,
   "yaw": -146.66,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "pitch": -0.47
  }
 ],
 "id": "overlay_D0C5DA7D_C3F1_8BA7_41D0_40EE562498C3",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 14.26,
   "image": "this.AnimatedImageResource_EE978518_C634_79C1_41BF_08456E54B1D1",
   "pitch": -42.82,
   "yaw": 88.82,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9, this.camera_320A7BFC_3DB9_B6D3_41CE_BD76A79AB3EC); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 14.26,
   "yaw": 88.82,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -42.82
  }
 ],
 "id": "overlay_D06F55C7_C3F0_98E2_41E3_464100BECDC1",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 10.87,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_1_HS_2_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": 0.58,
   "yaw": 119.11,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0B65F72F_0039_294A_413D_7167CFDDAD60, this.camera_3273FC04_3DB9_B133_41B5_B0F9C9324012); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 10.87,
   "yaw": 119.11,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.58
  }
 ],
 "id": "overlay_09FA2596_0678_A611_4196_27395AC63D08",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 12.22,
   "image": "this.AnimatedImageResource_EE93D51E_C634_79C1_4199_FCDDF2FE4CA6",
   "pitch": -51.06,
   "yaw": 75.99,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5, this.camera_2C921CDF_3DB9_B2CD_41CC_11A95DB48A72); this.mainPlayList.set('selectedIndex', 24)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 12.22,
   "yaw": 75.99,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -51.06
  }
 ],
 "id": "overlay_D55AF350_C65C_5841_41E8_2583A752FBE8",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 10.86,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_1_HS_2_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": 2.84,
   "yaw": 118.11,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22, this.camera_2CA25CD7_3DB9_B2DD_41B3_2BE4EBAD8F45); this.mainPlayList.set('selectedIndex', 26)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 10.86,
   "yaw": 118.11,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 2.84
  }
 ],
 "id": "overlay_1788E5E3_0609_A636_4170_98106BB92308",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 18.26,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_1_HS_0_0.png",
      "width": 304,
      "class": "ImageResourceLevel",
      "height": 308
     }
    ]
   },
   "pitch": 0.31,
   "yaw": 103.66,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF, this.camera_2C4D9D9F_3DB9_B34D_41C5_9935C181963E); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 18.26,
   "yaw": 103.66,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.31
  }
 ],
 "id": "overlay_11D521B2_019B_1BC8_416F_DC66A9296BC0",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 16.41,
   "image": "this.AnimatedImageResource_EE85E53C_C634_79C1_41DB_7F3562B22FD2",
   "pitch": -32.43,
   "yaw": -49.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0, this.camera_2F22DB15_3DB9_B752_41C0_4C8867764442); this.mainPlayList.set('selectedIndex', 57)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 16.41,
   "yaw": -49.96,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -32.43
  }
 ],
 "id": "overlay_E24DF921_C64C_C9C3_41E0_1DE050A43B4D",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 8.11,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_1_HS_2_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": 0.4,
   "yaw": -93.55,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 59)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 8.11,
   "yaw": -93.55,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 21
     }
    ]
   },
   "pitch": 0.4
  }
 ],
 "id": "overlay_12D086AB_0608_6236_4191_C3F4174FECF3",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 10.82,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_1_HS_0_0.png",
      "width": 180,
      "class": "ImageResourceLevel",
      "height": 171
     }
    ]
   },
   "pitch": 0.93,
   "yaw": -131.63,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5, this.camera_2FBCADAF_3DB9_B34E_41AE_C7C683CBBEB4); this.mainPlayList.set('selectedIndex', 40)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 10.82,
   "yaw": -131.63,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11906CBC_0049_DF4E_411B_4127E5D5F480_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.93
  }
 ],
 "id": "overlay_18E3C57F_0057_29CA_4147_F4600E232D3B",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 14.14,
   "image": "this.AnimatedImageResource_EE96F517_C634_79CF_41DD_B98B1CDAC4EF",
   "pitch": -30.57,
   "yaw": -64.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5, this.camera_32CCABCC_3DB9_B732_418F_C0ECC183BDBF); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 14.14,
   "yaw": -64.1,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -30.57
  }
 ],
 "id": "overlay_D1422BDB_C3F3_88E2_41BD_FA3D9EE50658",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 22.75,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_1_HS_0_0.png",
      "width": 318,
      "class": "ImageResourceLevel",
      "height": 295
     }
    ]
   },
   "pitch": 7.66,
   "yaw": -148.21,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9, this.camera_2C37DD1A_3DB9_B357_41AA_0D29232A8E7E); this.mainPlayList.set('selectedIndex', 31)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 22.75,
   "yaw": -148.21,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 7.66
  }
 ],
 "id": "overlay_DF50E086_C674_38C1_41C4_7464DFF3A926",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 15.34,
   "image": "this.AnimatedImageResource_EE9D7527_C634_79CF_41D8_0EE7C8EAC465",
   "pitch": -37.88,
   "yaw": -21.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5, this.camera_2C260D2E_3DB9_B34F_4195_F4241840B4A3); this.mainPlayList.set('selectedIndex', 40)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 15.34,
   "yaw": -21.75,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_1_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -37.88
  }
 ],
 "id": "overlay_DFC10996_C674_48CE_41D4_631A257C6571",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 9.06,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_1_HS_0_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": -0.2,
   "yaw": -124.47,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590, this.camera_32146BED_3DB9_B6CD_4181_69B9D644DD08); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 9.06,
   "yaw": -124.47,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.2
  }
 ],
 "id": "overlay_2174C738_32AC_DC8A_41C2_89736F4D71A4",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 14.59,
   "image": "this.AnimatedImageResource_2C4AFA97_3DB9_B15E_41BC_F3A210220C09",
   "pitch": -25.79,
   "yaw": 151.67,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF, this.camera_322AEBE5_3DB9_B6FD_41B4_669083434D44); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 14.59,
   "yaw": 151.67,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_1_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -25.79
  }
 ],
 "id": "overlay_210F8527_32AD_FC86_41C4_BB25D69B9971",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 7.54,
   "image": "this.AnimatedImageResource_2C4B5A97_3DB9_B15E_41A5_9E8AEC926BE5",
   "pitch": 0.31,
   "yaw": 133.78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "data": {
  "label": "Arrow 01 Left"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5, this.camera_321F7BF4_3DB9_B6D3_41AA_B64A47AC22F9); this.mainPlayList.set('selectedIndex', 24)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 7.54,
   "yaw": 133.78,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.31
  }
 ],
 "id": "overlay_26DF65B2_32AC_BF99_41C5_7D48F8DCF9AE",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 9.06,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_1_HS_3_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": 1.06,
   "yaw": -5.64,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E62E564_32A4_DCB9_41BD_32CA02213B87, this.camera_32203BDD_3DB9_B6D2_41A3_0E484088C4CA); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 9.06,
   "yaw": -5.64,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.06
  }
 ],
 "id": "overlay_26B64558_32A4_5C89_41C8_3CAB3D877518",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 11.13,
   "image": "this.AnimatedImageResource_2C41EA8E_3DB9_B14E_41C6_68A7E2972DDF",
   "pitch": -20.79,
   "yaw": 5.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 11.13,
   "yaw": 5.32,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -20.79
  }
 ],
 "id": "overlay_3C2492B0_32BC_759A_41B7_72D9BCA27205",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 15.77,
   "image": "this.AnimatedImageResource_2C42CA8E_3DB9_B14E_41C7_7960FB9BF9F2",
   "pitch": -34.73,
   "yaw": 127.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391, this.camera_2E9C4B6C_3DB9_B7F2_41C0_9E82FB820E31); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 15.77,
   "yaw": 127.04,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_1_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -34.73
  }
 ],
 "id": "overlay_3DF1309D_32BD_B58A_41C4_D85A3ACB0676",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 9.62,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_1_HS_2_0.png",
      "width": 133,
      "class": "ImageResourceLevel",
      "height": 161
     }
    ]
   },
   "pitch": 0.53,
   "yaw": -56.36,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 9.62,
   "yaw": -56.36,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 19
     }
    ]
   },
   "pitch": 0.53
  }
 ],
 "id": "overlay_3D3AD041_32BF_F4FA_41C5_3331BDC2E822",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 9.06,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_1_HS_0_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": -0.2,
   "yaw": -125.73,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068, this.camera_2C72AD5E_3DB9_B3CE_41CA_861951942BCB); this.mainPlayList.set('selectedIndex', 51)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 9.06,
   "yaw": -125.73,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.2
  }
 ],
 "id": "overlay_171BF5A2_337C_5FBE_41C1_1CFC8A15F9B7",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 9.05,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_1_HS_1_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": -1.95,
   "yaw": -4.64,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E181019_32A4_748A_41C7_D30403307065, this.camera_2C622D6C_3DB9_B3F3_41B6_519975F23D43); this.mainPlayList.set('selectedIndex', 47)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 9.05,
   "yaw": -4.64,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -1.95
  }
 ],
 "id": "overlay_1612DDE0_337D_AFBA_41AB_8C2FFC9AF43D",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 14.33,
   "image": "this.AnimatedImageResource_2FA0DAA6_3DB9_B17E_41C2_D89D0A71AECE",
   "pitch": -27.8,
   "yaw": 155.44,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E110129_32A4_548A_41A6_17FA339053A0, this.camera_2C500D7C_3DB9_B3D2_41B4_82A1790098A4); this.mainPlayList.set('selectedIndex', 45)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 14.33,
   "yaw": 155.44,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_1_HS_2_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -27.8
  }
 ],
 "id": "overlay_16441BF7_3364_6B86_41C2_FCE0607B865B",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 7.53,
   "image": "this.AnimatedImageResource_2FA12AAB_3DB9_B175_41A2_275777BD00C9",
   "pitch": 1.82,
   "yaw": 133.52,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "data": {
  "label": "Arrow 01 Left"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A, this.camera_2C033D50_3DB9_B3D2_41C9_414B5E273EB7); this.mainPlayList.set('selectedIndex', 54)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 7.53,
   "yaw": 133.52,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.82
  }
 ],
 "id": "overlay_16AA1020_3364_D4BA_41BC_B44D16D56E0B",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 20.21,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_1_HS_0_0.png",
      "width": 280,
      "class": "ImageResourceLevel",
      "height": 330
     }
    ]
   },
   "pitch": 0.66,
   "yaw": -145.19,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0, this.camera_3274BF12_3DB9_AF56_41C8_78887AAE46D8); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 20.21,
   "yaw": -145.19,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   },
   "pitch": 0.66
  }
 ],
 "id": "overlay_D409C066_C655_F841_41C2_9E382AAA888D",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 16.2,
   "image": "this.AnimatedImageResource_EE93A51E_C634_79C1_41E1_1FE79DE4D4E8",
   "pitch": -33.56,
   "yaw": -20.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9, this.camera_320E2F0B_3DB9_AF36_418A_2986A7B3DDDB); this.mainPlayList.set('selectedIndex', 25)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 16.2,
   "yaw": -20.79,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_1_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -33.56
  }
 ],
 "id": "overlay_D4F58EF9_C654_C843_41C9_E71581556A11",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 12.22,
   "image": "this.AnimatedImageResource_EE84853A_C634_79C1_41DD_0215F77B0541",
   "pitch": -51.06,
   "yaw": 84.77,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 12.22,
   "yaw": 84.77,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -51.06
  }
 ],
 "id": "overlay_E483FB4F_C654_C85F_41D6_EB69928269D3",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 11.12,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_1_HS_2_0.png",
      "width": 154,
      "class": "ImageResourceLevel",
      "height": 161
     }
    ]
   },
   "pitch": -0.55,
   "yaw": 117.73,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_118A5E95_004A_FB5E_414F_25F73E14E9E4, this.camera_2C5FDD90_3DB9_B353_41B2_8713095E4162); this.mainPlayList.set('selectedIndex', 56)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 11.12,
   "yaw": 117.73,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.55
  }
 ],
 "id": "overlay_15B8B6A2_0608_E231_4196_4E1A0E5B8274",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 16.56,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_1_HS_0_0.png",
      "width": 231,
      "class": "ImageResourceLevel",
      "height": 246
     }
    ]
   },
   "pitch": 5.63,
   "yaw": 151.46,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29, this.camera_32C85BC3_3DB9_B735_41A4_F0F301B9C136); this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 16.56,
   "yaw": 151.46,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "pitch": 5.63
  }
 ],
 "id": "overlay_DC0C8682_C673_D8C1_41C9_3F738D8FB7A5",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 16.59,
   "image": "this.AnimatedImageResource_EE9BB528_C634_79C1_41B3_1F353BE8FDD6",
   "pitch": -31.4,
   "yaw": 34.74,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6, this.camera_32C2BBBB_3DB9_B756_41C5_055297EFC421); this.mainPlayList.set('selectedIndex', 43)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 16.59,
   "yaw": 34.74,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_1_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -31.4
  }
 ],
 "id": "overlay_DC8E5D89_C64C_48C3_41D0_5E147F703183",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 13.59,
   "image": "this.AnimatedImageResource_2FBE7AA4_3DB9_B172_41A8_CCD591077E0E",
   "pitch": -19.53,
   "yaw": 6.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00, this.camera_2F7FAB38_3DB9_B752_41C0_CE30D760CB33); this.mainPlayList.set('selectedIndex', 49)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 13.59,
   "yaw": 6.33,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -19.53
  }
 ],
 "id": "overlay_116E2FDA_337C_6B8E_41AD_4671109176B5",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 10.87,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_1_HS_1_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": -0.1,
   "yaw": -55.99,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0F2964AA_0199_39D8_415C_DAB75F704D09, this.camera_2F6FCB42_3DB9_B736_41C7_3779CCDD36B2); this.mainPlayList.set('selectedIndex', 48)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 10.87,
   "yaw": -55.99,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.1
  }
 ],
 "id": "overlay_11C51F4E_337C_EC86_41A2_7813FDA2140E",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 15.53,
   "image": "this.AnimatedImageResource_2FBF4AA5_3DB9_B172_41C3_E5ED237F8206",
   "pitch": -36.99,
   "yaw": 126.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309, this.camera_2F0FBB30_3DB9_B752_41AA_66583ACB2B28); this.mainPlayList.set('selectedIndex', 46)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 15.53,
   "yaw": 126.16,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_1_HS_2_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -36.99
  }
 ],
 "id": "overlay_106A55D6_337D_FF86_4174_0A0E29237D58",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 16.28,
   "image": "this.AnimatedImageResource_EE973518_C634_79C1_41B1_D4F6FE4DD0CE",
   "pitch": -33.11,
   "yaw": 44.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4, this.camera_2C9F9CE7_3DB9_B2FD_41CA_2DAA79458D35); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 16.28,
   "yaw": 44.28,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -33.11
  }
 ],
 "id": "overlay_D7B8A38F_C3F7_B962_4174_75177DEADA11",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 14.7,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_1_HS_1_0.png",
      "width": 204,
      "class": "ImageResourceLevel",
      "height": 212
     }
    ]
   },
   "pitch": 2.75,
   "yaw": 153.25,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A, this.camera_2C8EECF0_3DB9_B2D3_41C7_B86721972868); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 14.7,
   "yaw": 153.25,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 2.75
  }
 ],
 "id": "overlay_D7F45601_C3F0_BB5E_41C2_C0C993F67D5C",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 11.47,
   "image": "this.AnimatedImageResource_EE861538_C634_79C1_41E5_D5BEC86A2DD1",
   "pitch": -37.71,
   "yaw": -68.97,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068, this.camera_2CEBBD02_3DB9_B336_41B7_A374620C24C2); this.mainPlayList.set('selectedIndex', 51)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 11.47,
   "yaw": -68.97,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -37.71
  }
 ],
 "id": "overlay_E7E37E24_C654_4BC2_41E1_8DC9EEC30B49",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 16.41,
   "image": "this.AnimatedImageResource_EE94B519_C634_79C3_41E2_987DBE2A3C20",
   "pitch": -32.43,
   "yaw": -50.85,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A, this.camera_2F331B0A_3DB9_B737_41C5_634B808508D6); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 16.41,
   "yaw": -50.85,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -32.43
  }
 ],
 "id": "overlay_D7296732_C3F0_99BD_41CD_15546F96B28A",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 9.11,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_1_HS_2_0.png",
      "width": 126,
      "class": "ImageResourceLevel",
      "height": 137
     }
    ]
   },
   "pitch": 1.91,
   "yaw": -93.55,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0, this.camera_2FC60B00_3DB9_B733_41CB_5049BB2BB34A); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 9.11,
   "yaw": -93.55,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "pitch": 1.91
  }
 ],
 "id": "overlay_1497DBE8_0678_E232_4180_BC51F5A3B938",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 14.55,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_1_HS_0_0.png",
      "width": 243,
      "class": "ImageResourceLevel",
      "height": 222
     }
    ]
   },
   "pitch": -4.34,
   "yaw": -3.63,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068, this.camera_321C5EF1_3DB9_AED2_41C6_64AF447D06C4); this.mainPlayList.set('selectedIndex', 51)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 14.55,
   "yaw": -3.63,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_118D55D0_004A_E8D6_412B_F15016B43EC0_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -4.34
  }
 ],
 "id": "overlay_1AF1323F_0049_6B4A_4158_18971B8C0B2E",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 16.09,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_1_HS_0_0.png",
      "width": 223,
      "class": "ImageResourceLevel",
      "height": 219
     }
    ]
   },
   "pitch": 1.1,
   "yaw": 151.74,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53, this.camera_3207CF03_3DB9_AF36_41CE_B312708B3858); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 16.09,
   "yaw": 151.74,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.1
  }
 ],
 "id": "overlay_D52AF8AA_C65C_C8C1_41E1_368B77920405",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 16.94,
   "image": "this.AnimatedImageResource_EE90B51F_C634_79FF_41C5_A79C01C84446",
   "pitch": -29.41,
   "yaw": 43.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D, this.camera_3202CEFA_3DB9_AED6_41C2_CF541F04CBDE); this.mainPlayList.set('selectedIndex', 28)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 16.94,
   "yaw": 43.8,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_1_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -29.41
  }
 ],
 "id": "overlay_D5F4BE96_C654_C8C1_41E5_91FDE5D191D9",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 15.59,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_1_HS_0_0.png",
      "width": 259,
      "class": "ImageResourceLevel",
      "height": 238
     }
    ]
   },
   "pitch": -0.82,
   "yaw": 59.92,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6, this.camera_2DD2AC74_3DB9_B1D2_41C2_85EC974BCACB); this.mainPlayList.set('selectedIndex', 43)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 15.59,
   "yaw": 59.92,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_135DA583_0049_293A_414E_3C25985D46CB_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.82
  }
 ],
 "id": "overlay_19FC6A44_0049_7B3E_4152_6EC2AFFF8366",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 12.56,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_1_HS_0_0.png",
      "width": 209,
      "class": "ImageResourceLevel",
      "height": 234
     }
    ]
   },
   "pitch": 3.32,
   "yaw": -130.75,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9, this.camera_32539C1B_3DB9_B155_41CE_6CDC7F88FDA5); this.mainPlayList.set('selectedIndex', 25)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 12.56,
   "yaw": -130.75,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_11B27642_004A_EB3A_4142_7CBC8EFC0A22_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "pitch": 3.32
  }
 ],
 "id": "overlay_1419C47C_0059_EFCE_4151_9254754CC460",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 12.7,
   "image": "this.AnimatedImageResource_2C434A8E_3DB9_B14E_41C4_C729FF1A72EF",
   "pitch": -38.35,
   "yaw": 141.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC, this.camera_2F745E34_3DB9_B152_41B0_712256963C8E); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 12.7,
   "yaw": 141.88,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -38.35
  }
 ],
 "id": "overlay_3D7349BD_32BC_778A_4180_C573C2C75FFB",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 7.54,
   "image": "this.AnimatedImageResource_2C43AA8F_3DB9_B14E_41C2_94FF47C7E6F2",
   "pitch": 0.82,
   "yaw": 134.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "data": {
  "label": "Arrow 01 Left"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9, this.camera_2F526E45_3DB9_B13D_41C7_7EC598E19171); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 7.54,
   "yaw": 134.28,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.82
  }
 ],
 "id": "overlay_233B548B_32BC_5D8E_41C7_F55DAF5829C6",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 9.06,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_1_HS_2_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": 0.31,
   "yaw": -125.23,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5, this.camera_2F041E2B_3DB9_B176_41BD_A0A727D946D7); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 9.06,
   "yaw": -125.23,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.31
  }
 ],
 "id": "overlay_20FA1B8A_32BD_AB8E_41C8_0F7543612339",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 9.06,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_1_HS_3_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": 0.81,
   "yaw": -6.65,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E50C840_32E4_74F9_41A4_4EC4173FA3A2, this.camera_2F62AE3D_3DB9_B152_41B8_831A53C6CB7B); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 9.06,
   "yaw": -6.65,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.81
  }
 ],
 "id": "overlay_23D0DBA5_32BC_EBBA_41C1_E474DF25AAC3",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 10.85,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_1_HS_0_0.png",
      "width": 150,
      "class": "ImageResourceLevel",
      "height": 150
     }
    ]
   },
   "pitch": 3.3,
   "yaw": -158.37,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391, this.camera_2D1C1C9D_3DB9_B152_41B3_8A95E547263F); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 10.85,
   "yaw": -158.37,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 3.3
  }
 ],
 "id": "overlay_D0FEC682_C3F1_BB62_41D4_9102F3B6D6C5",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 12.93,
   "image": "this.AnimatedImageResource_EE96A517_C634_79CF_41BB_38AC08D7DC61",
   "pitch": -36.82,
   "yaw": 35.42,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23, this.camera_2D3EEC8C_3DB9_B132_41CD_F545E6920D41); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 12.93,
   "yaw": 35.42,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_1_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -36.82
  }
 ],
 "id": "overlay_D09F0370_C3F0_99BE_41E4_9F144A073A5D",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 13.81,
   "image": "this.AnimatedImageResource_2C463A90_3DB9_B152_41CD_982BA9ED3EB4",
   "pitch": 2.2,
   "yaw": -115.31,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "data": {
  "label": "Arrow 01 Right"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0B55BDE4_0039_38FE_4139_E851DEBF7C58, this.camera_2D2CAC94_3DB9_B153_41CC_434EFB1145AD); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 13.81,
   "yaw": -115.31,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 2.2
  }
 ],
 "id": "overlay_20A85676_32A4_DC86_41C7_8BD7100CF053",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 14.59,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_1_HS_0_0.png",
      "width": 243,
      "class": "ImageResourceLevel",
      "height": 238
     }
    ]
   },
   "pitch": 0.43,
   "yaw": 60.43,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4, this.camera_2EB15E56_3DB9_B1DE_41C3_94F3C75440A2); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 14.59,
   "yaw": 60.43,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0C72BAA0_0039_5B76_4145_C1EF94F793A0_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.43
  }
 ],
 "id": "overlay_117BAD49_0079_5936_4155_38DBB5BBB748",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 9.87,
   "image": "this.AnimatedImageResource_EEA93516_C634_79C1_41D5_E7DFC2676D36",
   "pitch": -30.32,
   "yaw": 4.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C857B562_C391_99A2_41D4_622CFBF52C0A, this.camera_2F42BE4D_3DB9_B132_41A9_2DFFED2769C8); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 9.87,
   "yaw": 4.72,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -30.32
  }
 ],
 "id": "overlay_D178C03E_C3F0_B7A5_41CB_0834EED7746E",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 16.3,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_1_HS_0_0.png",
      "width": 272,
      "class": "ImageResourceLevel",
      "height": 253
     }
    ]
   },
   "pitch": 3.59,
   "yaw": 103.26,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8E22910_C38F_897E_41BD_C3761AC35EAF, this.camera_17D98EBF_0678_E20E_4193_A84F928CB1B2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 16.3,
   "yaw": 103.26,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0DDD37F8_019B_0738_4165_2278D9DB7F90_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 15
     }
    ]
   },
   "pitch": 3.59
  }
 ],
 "id": "overlay_0EC38AAB_019F_09D8_4148_F13840F3A30E",
 "class": "HotspotPanoramaOverlay"
},
{
 "items": [
  {
   "hfov": 12.69,
   "image": "this.AnimatedImageResource_2FA12AAC_3DB9_B173_41CA_1090258E1658",
   "pitch": -44.91,
   "yaw": -81.35,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E609D5D6_C65C_5841_41DC_4408506ECD34, this.camera_2DACAC43_3DB9_B135_41B8_572EEC0A3C59); this.mainPlayList.set('selectedIndex', 50)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 12.69,
   "yaw": -81.35,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -44.91
  }
 ],
 "id": "overlay_1A0C0FA4_3365_ABB9_41C4_642D3FFA3681",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 10.87,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_1_HS_1_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": -0.35,
   "yaw": 34.45,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0, this.camera_2DA04C3B_3DB9_B155_41B0_46A9859076C9); this.mainPlayList.set('selectedIndex', 57)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 10.87,
   "yaw": 34.45,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.35
  }
 ],
 "id": "overlay_19595136_3364_B486_41B2_AB314BF8E1F9",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 13.75,
   "image": "this.AnimatedImageResource_2FA22AAC_3DB9_B173_41B9_E241420779C1",
   "pitch": -22.8,
   "yaw": -3.22,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E110129_32A4_548A_41A6_17FA339053A0, this.camera_2D973C4B_3DB9_B135_41C1_FC4087F8C6D8); this.mainPlayList.set('selectedIndex', 45)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 13.75,
   "yaw": -3.22,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_1_HS_2_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -22.8
  }
 ],
 "id": "overlay_1A9011A8_3364_5789_41C4_B319C08CED6A",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 9.97,
   "image": "this.AnimatedImageResource_EE9F5524_C634_79C1_4151_C56E80BD365E",
   "pitch": -29.36,
   "yaw": 5.82,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29, this.camera_2C158D42_3DB9_B336_41CA_339D4E438095); this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 9.97,
   "yaw": 5.82,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -29.36
  }
 ],
 "id": "overlay_DE130192_C67C_38C1_41C4_0A4C5ECF7BB5",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 13.83,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_1_HS_0_0.png",
      "width": 230,
      "class": "ImageResourceLevel",
      "height": 238
     }
    ]
   },
   "pitch": 1.19,
   "yaw": 61.56,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D, this.camera_2EA10E5F_3DB9_B1CE_41C8_A40002BD64CA); this.mainPlayList.set('selectedIndex', 28)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 13.83,
   "yaw": 61.56,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_136FCF41_004A_D936_4151_FFADF2CFBA26_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.19
  }
 ],
 "id": "overlay_163A1A6F_005F_DBCA_4143_609D9385BACF",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 13.01,
   "image": "this.AnimatedImageResource_2FB30A9A_3DB9_B156_4187_5826CFA6BB9D",
   "pitch": -30.96,
   "yaw": 127.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9, this.camera_2F894DE0_3DB9_B2F2_41CD_D7C2E087C625); this.mainPlayList.set('selectedIndex', 31)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 13.01,
   "yaw": 127.04,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -30.96
  }
 ],
 "id": "overlay_2ACF84C0_3365_FDFA_41BD_59A171EDC470",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 8.61,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_1_HS_1_0.png",
      "width": 119,
      "class": "ImageResourceLevel",
      "height": 137
     }
    ]
   },
   "pitch": -0.6,
   "yaw": -56.87,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0E9BEAA3_0199_09C8_416E_D3D5D37321FD, this.camera_2FE7DDF9_3DB9_B2D2_41C9_BEC831C2A032); this.mainPlayList.set('selectedIndex', 33)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 8.61,
   "yaw": -56.87,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   },
   "pitch": -0.6
  }
 ],
 "id": "overlay_2AFC3B23_336B_B4BE_41BB_3885A3BF30E6",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 11.24,
   "image": "this.AnimatedImageResource_2FB3CA9A_3DB9_B156_41C8_783D55DDF941",
   "pitch": -19.28,
   "yaw": 5.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29, this.camera_2FF7CDEE_3DB9_B2CE_41B7_0ED359E69B77); this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 11.24,
   "yaw": 5.32,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_1_HS_2_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -19.28
  }
 ],
 "id": "overlay_299FD28A_336D_D589_41B8_F82AB0ACDC68",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 9.89,
   "image": "this.AnimatedImageResource_2C499A96_3DB9_B15E_41C1_410A502395D1",
   "pitch": -31.97,
   "yaw": 125.78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0, this.camera_2D457CC6_3DB9_B13F_41CA_FEE752214E98); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 9.89,
   "yaw": 125.78,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -31.97
  }
 ],
 "id": "overlay_209C93E9_32AC_5B8A_41B3_4E23C1D3F27C",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 8.1,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_1_HS_1_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": 2.41,
   "yaw": -56.11,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0EF390FE_019F_1938_4173_7E5BC178F7F6, this.camera_2D567CBE_3DB9_B14E_41C6_607BC4013181); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 8.1,
   "yaw": -56.11,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 21
     }
    ]
   },
   "pitch": 2.41
  }
 ],
 "id": "overlay_20487ACB_32AC_D58E_41C3_0FCD15BCFE67",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 11.5,
   "image": "this.AnimatedImageResource_2C4A2A96_3DB9_B15E_41CD_A54AFB76D8BA",
   "pitch": -18.9,
   "yaw": 6.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle 01a"
 },
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53, this.camera_2CB4ECCF_3DB9_B2CD_41C8_73483259A6A4); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 11.5,
   "yaw": 6.71,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_1_HS_2_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -18.9
  }
 ],
 "id": "overlay_21CEA0BD_32AF_F58A_41C6_02D8A6F2F8C3",
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "colCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_E609D5D6_C65C_5841_41DC_4408506ECD34_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "rowCount": 3,
 "frameCount": 9,
 "id": "AnimatedImageResource_EE85753D_C634_79C3_41D0_D071D6C1482E",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C81631B6_C3B0_98A2_41D1_7B02C817DED5_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_EE9AE527_C634_79CF_41CB_542FF5E39B28",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C809F81A_C3B1_F76D_41E2_21428E13E7F6_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_EE9B3529_C634_79C3_41E2_6373077866CD",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_2C4C9A97_3DB9_B15E_41B3_4248AAC9A304",
 "class": "AnimatedImageResource"
},
{
 "colCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_3E7EC44F_32AB_DC87_41C2_5748F1C76A53_1_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "rowCount": 3,
 "frameCount": 9,
 "id": "AnimatedImageResource_2C4D5A97_3DB9_B15E_41C9_074D423004C5",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_EE9C0525_C634_79C3_41E5_176E60E12F40",
 "class": "AnimatedImageResource"
},
{
 "colCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_C8E51EF0_C3B0_88BE_41E6_E923AF19961A_1_HS_3_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameCount": 9,
 "id": "AnimatedImageResource_2FB92AA2_3DB9_B176_4196_9249EBB0A1F4",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C809B324_C3B1_F9A6_41A3_F4082283B76D_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_EE902520_C634_79C1_41BF_257FBF304234",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_EE92B51D_C634_79C3_41E6_BF230F987FF4",
 "class": "AnimatedImageResource"
},
{
 "colCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_C8E56A9C_C3B0_8B66_41C9_BE9615F62590_1_HS_3_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameCount": 9,
 "id": "AnimatedImageResource_2C4EAA98_3DB9_B152_41A7_DBCA9DDEC464",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_EEA83515_C634_79C3_41D3_CD95A4DC902C",
 "class": "AnimatedImageResource"
},
{
 "colCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_C857B562_C391_99A2_41D4_622CFBF52C0A_1_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "rowCount": 3,
 "frameCount": 9,
 "id": "AnimatedImageResource_EEA85515_C634_79C3_41E0_6091C7CEDAF8",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8026A50_C3B1_8BFE_41E4_6E3CF70C00B0_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_EE84253B_C634_79C7_41E0_968E01AFCA33",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_2FB45AA0_3DB9_B172_41B6_A14EE6CE31C0",
 "class": "AnimatedImageResource"
},
{
 "colCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_3FF204B8_32AD_FD8A_41C8_A348279F77D9_1_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameCount": 9,
 "id": "AnimatedImageResource_2FB4AAA0_3DB9_B172_41C2_22EC070ED84F",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8ED30D3_C3B0_98E3_41C7_99AB3827C54A_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_EE872539_C634_79C3_41C0_5F139E4D450B",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_EE868537_C634_79CF_41DE_C101E360270A",
 "class": "AnimatedImageResource"
},
{
 "colCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_C8E573BA_C3B0_98A2_41D2_3C3657D91068_1_HS_3_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameCount": 9,
 "id": "AnimatedImageResource_2FA43AAD_3DB9_B14D_41C1_0E3BC4AE01C1",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C81FA731_C38F_99BE_41E5_43E496B2DAB2_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_EE92251D_C634_79C3_41D0_BCD536C9B445",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C81E6C13_C38F_8F62_41C3_DF504177E9D5_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_EE9D8526_C634_79C1_41D1_BFDADEF90055",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_2FB6BAA1_3DB9_B172_41BF_431C931B8E55",
 "class": "AnimatedImageResource"
},
{
 "colCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_3E3ACD8A_32AC_AF89_41C5_288091B6AF29_1_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "rowCount": 3,
 "frameCount": 9,
 "id": "AnimatedImageResource_2FB79AA1_3DB9_B172_41B5_E3EC438149A5",
 "class": "AnimatedImageResource"
},
{
 "colCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_CEE6DD2D_C390_89A7_41E8_13E591F7A6EA_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "rowCount": 3,
 "frameCount": 9,
 "id": "AnimatedImageResource_2C4DBA98_3DB9_B152_41BD_396F8B422100",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C86A2559_C3B0_F9EF_41DA_0F6E88BF4FB9_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_EE960517_C634_79CE_41A3_AD59E10D5AB0",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8162E48_C3B0_8BED_41E2_968AA9AFDC40_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_EE978518_C634_79C1_41BF_08456E54B1D1",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8EEAB76_C3B0_89A2_41E0_1D010F4C1DA9_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_EE93D51E_C634_79C1_4199_FCDDF2FE4CA6",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C809FCFF_C3B1_88A3_41D8_F9A8A053B6EA_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_EE85E53C_C634_79C1_41DB_7F3562B22FD2",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C871A219_C38F_9B6E_41DD_B6B50FAA9A23_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_EE96F517_C634_79CF_41DD_B98B1CDAC4EF",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8ED9AD9_C3B0_88EE_41C0_E615A0AB9AD0_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_EE9D7527_C634_79CF_41D8_0EE7C8EAC465",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_2C4AFA97_3DB9_B15E_41BC_F3A210220C09",
 "class": "AnimatedImageResource"
},
{
 "colCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_3F79A584_32AC_5C7A_419D_E5B5EC2463D0_1_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameCount": 9,
 "id": "AnimatedImageResource_2C4B5A97_3DB9_B15E_41A5_9E8AEC926BE5",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_2C41EA8E_3DB9_B14E_41C6_68A7E2972DDF",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3E51A3EA_329B_DB8E_41B3_D516BBB498CC_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_2C42CA8E_3DB9_B14E_41C7_7960FB9BF9F2",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_2FA0DAA6_3DB9_B17E_41C2_D89D0A71AECE",
 "class": "AnimatedImageResource"
},
{
 "colCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_3E3FB1E6_32A7_D786_41C1_CD16D7C1F309_1_HS_3_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameCount": 9,
 "id": "AnimatedImageResource_2FA12AAB_3DB9_B175_41A2_275777BD00C9",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C81764B6_C3B0_B8A2_41C2_29AEDDE42FE5_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_EE93A51E_C634_79C1_41E1_1FE79DE4D4E8",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C817F7F4_C3B0_98A6_41E0_DC19C939850A_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_EE84853A_C634_79C1_41DD_0215F77B0541",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C80235E4_C3B1_98A5_41E3_B4CE091CA32B_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_EE9BB528_C634_79C1_41B3_1F353BE8FDD6",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_2FBE7AA4_3DB9_B172_41A8_CCD591077E0E",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3E110129_32A4_548A_41A6_17FA339053A0_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_2FBF4AA5_3DB9_B172_41C3_E5ED237F8206",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_CFB81CEC_C3B1_88A6_41C5_DC46A6F9197A_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_EE973518_C634_79C1_41B1_D4F6FE4DD0CE",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C81ED15C_C38F_79E6_41CA_72EB145FEE7D_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_EE861538_C634_79C1_41E5_D5BEC86A2DD1",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C8021EB3_C3B1_88A2_41A4_FF76F3D8CCD4_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_EE94B519_C634_79C3_41E2_987DBE2A3C20",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C809F180_C3B1_995E_41C3_36FAF0D23AC7_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_EE90B51F_C634_79FF_41C5_A79C01C84446",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_2C434A8E_3DB9_B14E_41C4_C729FF1A72EF",
 "class": "AnimatedImageResource"
},
{
 "colCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_3E6FB4EF_32E5_BD87_4187_4E27487A5391_1_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameCount": 9,
 "id": "AnimatedImageResource_2C43AA8F_3DB9_B14E_41C2_94FF47C7E6F2",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_EE96A517_C634_79CF_41BB_38AC08D7DC61",
 "class": "AnimatedImageResource"
},
{
 "colCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_C81EA641_C38F_7BDE_41D7_EDB3FB43A0F5_1_HS_3_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameCount": 9,
 "id": "AnimatedImageResource_2C463A90_3DB9_B152_41CD_982BA9ED3EB4",
 "class": "AnimatedImageResource"
},
{
 "colCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_CF1013BA_C391_98A2_4167_0505D502E364_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "rowCount": 3,
 "frameCount": 9,
 "id": "AnimatedImageResource_EEA93516_C634_79C1_41D5_E7DFC2676D36",
 "class": "AnimatedImageResource"
},
{
 "colCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "rowCount": 3,
 "frameCount": 9,
 "id": "AnimatedImageResource_2FA12AAC_3DB9_B173_41CA_1090258E1658",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3E24D2BF_32A4_D587_4192_FCC0A640BC00_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_2FA22AAC_3DB9_B173_41B9_E241420779C1",
 "class": "AnimatedImageResource"
},
{
 "colCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_CF118488_C39F_9F6E_41D0_DDAFA6F36AA9_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "rowCount": 3,
 "frameCount": 9,
 "id": "AnimatedImageResource_EE9F5524_C634_79C1_4151_C56E80BD365E",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_2FB30A9A_3DB9_B156_4187_5826CFA6BB9D",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3FE2707B_32AC_B48E_41C6_A7FCAE50A2B6_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_2FB3CA9A_3DB9_B156_41C8_783D55DDF941",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_2C499A96_3DB9_B15E_41C1_410A502395D1",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3F570BCA_32AC_AB8E_418D_9A4B6CEEBAEF_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameCount": 20,
 "id": "AnimatedImageResource_2C4A2A96_3DB9_B15E_41CD_A54AFB76D8BA",
 "class": "AnimatedImageResource"
}],
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "overflow": "visible",
 "shadow": false,
 "layout": "absolute"
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
