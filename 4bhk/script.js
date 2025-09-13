(function(){
    var script = {
 "backgroundPreloadEnabled": true,
 "vrPolyfillScale": 0.5,
 "paddingTop": 0,
 "id": "rootPlayer",
 "defaultVRPointer": "laser",
 "children": [
  "this.MainViewer"
 ],
 "scrollBarMargin": 2,
 "scripts": {
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "existsKey": function(key){  return key in window; },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "registerKey": function(key, value){  window[key] = value; },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "getKey": function(key){  return window[key]; },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "unregisterKey": function(key){  delete window[key]; },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); }
 },
 "minHeight": 20,
 "contentOpaque": false,
 "downloadEnabled": false,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "width": "100%",
 "borderRadius": 0,
 "minWidth": 20,
 "class": "Player",
 "borderSize": 0,
 "desktopMipmappingEnabled": false,
 "propagateClick": false,
 "scrollBarWidth": 10,
 "height": "100%",
 "start": "this.init()",
 "overflow": "visible",
 "definitions": [{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_56F45D4A_44BB_A6E2_41BB_618615F08666",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 158.57,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_2740B091_0119_17B5_4159_67CCDF611884_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 01 2 33rd",
 "id": "panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": 148.02,
   "class": "AdjacentPanorama",
   "backwardYaw": -131.59,
   "panorama": "this.panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060"
  },
  {
   "distance": 1,
   "yaw": 8.67,
   "class": "AdjacentPanorama",
   "backwardYaw": -139.29,
   "panorama": "this.panorama_10A96800_0139_3693_4154_C75F68C57800"
  },
  {
   "distance": 1,
   "yaw": -0.72,
   "class": "AdjacentPanorama",
   "backwardYaw": 128.26,
   "panorama": "this.panorama_3FC32490_3325_7813_41B5_5ED0D40BC796"
  }
 ],
 "overlays": [
  "this.overlay_EAECF1EB_C72D_FAD6_41A8_B49AEB304111",
  "this.overlay_E91CF77E_C72C_C7AE_41E6_ED92117BB9B5",
  "this.overlay_077D34F6_3367_581F_41C8_C54C2DC06817"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_547A4F8A_44BB_A262_41C1_7F03FD4DEE8D",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -25.97,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -170.08,
  "class": "PanoramaCameraPosition",
  "pitch": -4.27
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_56E45D5E_44BB_A6E2_41C0_CF87E2A9815D",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -35.5,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54A3C01A_44BB_BE62_41C7_CFCCCC917346",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 92.37,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_5532B0C0_44BB_BFDF_41B6_D233EDFE5912",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 118.33,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_3FC52041_332B_3875_41C7_36D298EEF65B_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -170.58,
  "class": "PanoramaCameraPosition",
  "pitch": -4.27
 }
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 01 2 17th",
 "id": "panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": 10.93,
   "class": "AdjacentPanorama",
   "backwardYaw": -140.8,
   "panorama": "this.panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A"
  },
  {
   "distance": 1,
   "yaw": 0.29,
   "class": "AdjacentPanorama",
   "backwardYaw": 128.04,
   "panorama": "this.panorama_3F725F51_3327_C814_41AA_6410005E16A5"
  },
  {
   "distance": 1,
   "yaw": 155.88,
   "class": "AdjacentPanorama",
   "backwardYaw": -138.88,
   "panorama": "this.panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA"
  }
 ],
 "overlays": [
  "this.overlay_D51089C5_C765_CAD2_41E5_192F51616448",
  "this.overlay_D5FA2C1E_C764_C971_41E4_AEEDE47EBAA0",
  "this.overlay_201E14C5_332D_587D_41C6_941459487D53"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_t.jpg",
 "class": "Panorama"
},
{
 "vfov": 180,
 "label": "4bhk_bolcony_28",
 "id": "panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -167.28,
   "class": "AdjacentPanorama",
   "backwardYaw": -1.88,
   "panorama": "this.panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75"
  }
 ],
 "overlays": [
  "this.overlay_F7CC2CF2_E6F2_E5F5_41C2_AAC8BF3B7DDA"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD732023_C71F_F956_41D6_6910628043DA_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 171.58,
  "class": "PanoramaCameraPosition",
  "pitch": -1.26
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54A329DF_44BB_A1E2_41C7_294846CAF4C8",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -13.93,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_camera",
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
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 01 1 33rd",
 "id": "panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -131.59,
   "class": "AdjacentPanorama",
   "backwardYaw": 148.02,
   "panorama": "this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42"
  }
 ],
 "overlays": [
  "this.overlay_E9099FDF_C72F_C6EE_41E3_A646B2C2340D"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_560C4C90_44BB_A67F_41CB_118612E5AA34",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 161.33,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_5475695B_44BB_AEE2_41C7_ABC7C13E9B3E",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -104.01,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54F1B066_44BB_BEA3_41C4_7F1CDB9F4F3B",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -31.98,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4_BHK_BEDROOM_4_TOILET copy",
 "id": "panorama_121539AD_013B_29ED_4160_3D4F82B47E36",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": 167.82,
   "class": "AdjacentPanorama",
   "backwardYaw": 24.24,
   "panorama": "this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A"
  }
 ],
 "overlays": [
  "this.overlay_1D727724_011B_1A93_4171_CF3D20B290EA"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_540396A6_44BB_A3A2_414D_59EC7633BB6E",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -178.96,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 03 2 17th",
 "id": "panorama_5640EC47_4291_BB5B_41B8_968CEB40C959",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_5640EC47_4291_BB5B_41B8_968CEB40C959_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_5640EC47_4291_BB5B_41B8_968CEB40C959_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_5640EC47_4291_BB5B_41B8_968CEB40C959_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_5640EC47_4291_BB5B_41B8_968CEB40C959_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_5640EC47_4291_BB5B_41B8_968CEB40C959_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_5640EC47_4291_BB5B_41B8_968CEB40C959_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_5640EC47_4291_BB5B_41B8_968CEB40C959_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_5640EC47_4291_BB5B_41B8_968CEB40C959_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_5640EC47_4291_BB5B_41B8_968CEB40C959_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_5640EC47_4291_BB5B_41B8_968CEB40C959_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_5640EC47_4291_BB5B_41B8_968CEB40C959_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_5640EC47_4291_BB5B_41B8_968CEB40C959_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_5640EC47_4291_BB5B_41B8_968CEB40C959_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_5640EC47_4291_BB5B_41B8_968CEB40C959_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_5640EC47_4291_BB5B_41B8_968CEB40C959_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_5640EC47_4291_BB5B_41B8_968CEB40C959_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_5640EC47_4291_BB5B_41B8_968CEB40C959_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_5640EC47_4291_BB5B_41B8_968CEB40C959_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_5640EC47_4291_BB5B_41B8_968CEB40C959_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": 22.64,
   "class": "AdjacentPanorama",
   "backwardYaw": 92.07,
   "panorama": "this.panorama_389785F0_3327_3814_41C9_2FC03DB15F5D"
  },
  {
   "distance": 1,
   "yaw": -143.4,
   "class": "AdjacentPanorama",
   "backwardYaw": -87.63,
   "panorama": "this.panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00"
  }
 ],
 "overlays": [
  "this.overlay_53223BCC_42AE_BD6D_41C7_B6D3ED830A1D",
  "this.overlay_50FE0AF9_42AE_9F37_41C3_3B99F2379D32",
  "this.overlay_502C4B5F_42AF_BD6B_41D0_0502292A729C"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_5640EC47_4291_BB5B_41B8_968CEB40C959_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_5721ADAC_44BB_A1A6_41C6_DD9AB8DEFDE3",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -45.47,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 0,
 "id": "camera_544109A6_44BB_A1A2_41C6_8164A529E1A6",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -158.27,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 04 2 17th",
 "id": "panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": 68.51,
   "class": "AdjacentPanorama",
   "backwardYaw": -21.56,
   "panorama": "this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942"
  }
 ],
 "overlays": [
  "this.overlay_D10180AB_C763_D956_41E1_17A33D3BEE1E"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 0,
 "id": "camera_4BE26890_44BB_AE7E_41CF_81A1BEC95999",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -158.36,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 156.51,
  "class": "PanoramaCameraPosition",
  "pitch": -4.02
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_camera",
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
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_camera",
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
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54C3F0B0_44BB_BFBE_41BF_EEACC4653B67",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 160.83,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 03 2 33rd",
 "id": "panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -148.93,
   "class": "AdjacentPanorama",
   "backwardYaw": -77.83,
   "panorama": "this.panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B"
  },
  {
   "distance": 1,
   "yaw": 21.64,
   "class": "AdjacentPanorama",
   "backwardYaw": 92.07,
   "panorama": "this.panorama_3F2BA48E_3325_580C_41C2_AB809D46139D"
  },
  {
   "distance": 1,
   "yaw": 22.23,
   "class": "AdjacentPanorama",
   "backwardYaw": 166.07,
   "panorama": "this.panorama_10F8A1A0_0139_3993_4126_7D4276303500"
  }
 ],
 "overlays": [
  "this.overlay_F7CC04EB_C723_5AD6_41D4_F9DE6E7EE7BF",
  "this.overlay_F6F55B77_C723_4FBE_41D4_D6F2BBFF046B",
  "this.overlay_054D7046_3365_587C_41B4_341A68250AD4"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_545B7980_44BB_AE5E_41CD_1427DC904CF7",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 178.12,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54E04A3D_44BB_A2A1_41C5_89E1DBB124FA",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -111.62,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_camera",
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
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_28495FE3_011F_2995_4161_1F0BD106F099_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4bhk kitchen",
 "id": "panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -59.5,
   "class": "AdjacentPanorama",
   "backwardYaw": -20.01,
   "panorama": "this.panorama_3F725F51_3327_C814_41AA_6410005E16A5"
  }
 ],
 "overlays": [
  "this.overlay_D6C3F8D5_C723_4AF3_41E1_A8B34E8F3123"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_577FDDE2_44BB_A1A2_41CE_C82EFCA65329",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -51.99,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -0.25,
  "class": "PanoramaCameraPosition",
  "pitch": -2.26
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 75.37,
  "class": "PanoramaCameraPosition",
  "pitch": -3.27
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_5583FBAC_44BB_A1A6_41C1_C8BC622CA848",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 42.09,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 79.03,
  "class": "PanoramaCameraPosition",
  "pitch": -5.13
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4BHK_Bedroom01_ copy",
 "id": "panorama_10AB6D68_013B_EE92_4160_6689FDC41054",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -60.91,
   "class": "AdjacentPanorama",
   "backwardYaw": 159.56,
   "panorama": "this.panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F"
  }
 ],
 "overlays": [
  "this.overlay_1B991A50_0119_2AB2_4132_0A687531F080"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_10F8A1A0_0139_3993_4126_7D4276303500_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -2.76,
  "class": "PanoramaCameraPosition",
  "pitch": 0.5
 }
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 02 2 28th",
 "id": "panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -21.43,
   "class": "AdjacentPanorama",
   "backwardYaw": 78.93,
   "panorama": "this.panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F"
  },
  {
   "distance": 1,
   "yaw": -142.03,
   "class": "AdjacentPanorama",
   "backwardYaw": 29.4,
   "panorama": "this.panorama_3FD93565_332B_583D_41C9_645338B595F0"
  }
 ],
 "overlays": [
  "this.overlay_E3C0EB9C_C727_CF72_41D8_2929BE9FB4EE",
  "this.overlay_E2CC1B58_C725_4FF1_41E7_2F6766A1B20D"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_543B68DA_44BB_AFE2_41BC_AE9523487C39",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 179.28,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54602FAF_44BB_A1A2_41CC_87D6237DB2A3",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -111.49,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54C9DA62_44BB_A2A2_41CC_A45FEBCACF5B",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -150.6,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 02 2 23rd",
 "id": "panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -143.41,
   "class": "AdjacentPanorama",
   "backwardYaw": 29.4,
   "panorama": "this.panorama_3FC52041_332B_3875_41C7_36D298EEF65B"
  },
  {
   "distance": 1,
   "yaw": -14.77,
   "class": "AdjacentPanorama",
   "backwardYaw": 68.88,
   "panorama": "this.panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751"
  }
 ],
 "overlays": [
  "this.overlay_DC659AFB_C76F_4EB6_41D5_0F1877D4D037",
  "this.overlay_DCF81359_C76F_7FF3_41A8_62F50E047FA0"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_5696AD26_44BB_A6A2_41C7_06BDF55E63CE",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 31.07,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_56B8BCF0_44BB_A7BE_41C8_91F3451C9103",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 37.97,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_546F096D_44BB_AEA6_41D0_703C9ABAEF3C",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -109.11,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_57323D98_44BB_A66E_41CE_ADF56D6EF979",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 158.77,
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
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_541A6F54_44BB_A2E6_4198_272CB41700BC",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 10.98,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 0,
 "id": "panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 68.38,
  "class": "PanoramaCameraPosition",
  "pitch": -4.52
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 04 2 28th",
 "id": "panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": 68.38,
   "class": "AdjacentPanorama",
   "backwardYaw": -19.04,
   "panorama": "this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD"
  }
 ],
 "overlays": [
  "this.overlay_EE27537F_C723_5FAE_41E1_DBA13BA4CC54"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54562FD4_44BB_A1E6_41C7_CA98A1E3A312",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -124.18,
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
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54578991_44BB_AE7E_41CC_7978BCBAFC92",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -69.32,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_4BF4E86B_44BB_AEA2_41AB_3B67A1596457",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 21.14,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_4BFEE85A_44BB_AEE3_41BC_ED02BDD2D172",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -108.61,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54DCFA4E_44BB_A2E2_41D0_CF1F07FF6C45",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -164.92,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_5470C6D2_44BB_A3E2_41D1_0BC4D0330403",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 36.59,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_camera",
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
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_camera",
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
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54F8CA16_44BB_A262_41B3_73E80E08C035",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -150.6,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4bhk Powder toilet",
 "id": "panorama_24CDB527_010B_7E9D_4174_52D79CB239F2",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -112.74,
   "class": "AdjacentPanorama",
   "backwardYaw": 110.68,
   "panorama": "this.panorama_3F725F51_3327_C814_41AA_6410005E16A5"
  }
 ],
 "overlays": [
  "this.overlay_246B1C44_0107_6E93_416A_CF9A21893363"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_camera",
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
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_camera",
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
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 3.01,
  "class": "PanoramaCameraPosition",
  "pitch": -3.01
 }
},
{
 "vfov": 180,
 "label": "4bhk living 01 28th",
 "id": "panorama_3FD93565_332B_583D_41C9_645338B595F0",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -21.23,
   "class": "AdjacentPanorama",
   "backwardYaw": -62.51,
   "panorama": "this.panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A"
  },
  {
   "distance": 1,
   "yaw": -168.13,
   "class": "AdjacentPanorama",
   "backwardYaw": -119.77,
   "panorama": "this.panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75"
  },
  {
   "distance": 1,
   "yaw": 127.5,
   "class": "AdjacentPanorama",
   "backwardYaw": 1.29,
   "panorama": "this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01"
  },
  {
   "distance": 1,
   "yaw": 110.42,
   "class": "AdjacentPanorama",
   "backwardYaw": -113.49,
   "panorama": "this.panorama_27D62BB1_011F_69F2_416D_0AB033A18B06"
  },
  {
   "distance": 1,
   "yaw": 29.4,
   "class": "AdjacentPanorama",
   "backwardYaw": -142.03,
   "panorama": "this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558"
  }
 ],
 "overlays": [
  "this.overlay_2DC8F859_336B_4814_41B1_C16A01C564F1",
  "this.overlay_2DA86454_336B_D81C_41C3_F1BCB36CCD21",
  "this.overlay_2C2FAB5E_336B_480C_41C9_A40B894F5FBE",
  "this.overlay_13C72680_336D_58F4_41B6_4936D69BC2F8",
  "this.overlay_12A76CF0_336D_C814_41B0_FCC8F1EC7567"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_t.jpg",
 "class": "Panorama"
},
{
 "vfov": 180,
 "label": "4bhk living 02 33rd",
 "id": "panorama_3F2BA48E_3325_580C_41C2_AB809D46139D",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": 92.07,
   "class": "AdjacentPanorama",
   "backwardYaw": 21.64,
   "panorama": "this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506"
  },
  {
   "distance": 1,
   "yaw": -118.39,
   "class": "AdjacentPanorama",
   "backwardYaw": -169.64,
   "panorama": "this.panorama_3FC32490_3325_7813_41B5_5ED0D40BC796"
  },
  {
   "distance": 1,
   "yaw": -2.88,
   "class": "AdjacentPanorama",
   "backwardYaw": -169.16,
   "panorama": "this.panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7"
  },
  {
   "distance": 1,
   "yaw": 75.99,
   "class": "AdjacentPanorama",
   "backwardYaw": 152.65,
   "panorama": "this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045"
  }
 ],
 "overlays": [
  "this.overlay_1E29C2F2_337D_7817_414B_0F71C2427990",
  "this.overlay_1D30EC33_337D_4815_41C6_1AD386142BCC",
  "this.overlay_1DFAC394_337C_D81C_419B_CD9FDBFD294E",
  "this.overlay_1C270587_337B_F8FC_41B5_CE1C9045E09B"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_t.jpg",
 "class": "Panorama"
},
{
 "vfov": 180,
 "label": "4BHK_Bedroom01_ copy",
 "id": "panorama_10A654BD_0139_1FED_4171_7FACE1C8F817",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -62.92,
   "class": "AdjacentPanorama",
   "backwardYaw": 158.3,
   "panorama": "this.panorama_CD973440_C71F_79D2_41CE_832903CFC20A"
  }
 ],
 "overlays": [
  "this.overlay_214EEAE1_010B_EB95_416D_C987852A4510"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -158.41,
  "class": "PanoramaCameraPosition",
  "pitch": -3.02
 }
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 03 1 33rd",
 "id": "panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -77.83,
   "class": "AdjacentPanorama",
   "backwardYaw": -148.93,
   "panorama": "this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506"
  }
 ],
 "overlays": [
  "this.overlay_F5309816_C725_4971_41DC_62B6061471DF"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 01 1 28th",
 "id": "panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -136.37,
   "class": "AdjacentPanorama",
   "backwardYaw": 144.5,
   "panorama": "this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01"
  }
 ],
 "overlays": [
  "this.overlay_E31F4E35_C725_49B2_41E3_75B373DD479F"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_4B875846_44BB_AEE2_41B1_AC47D53772C9",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -149.97,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 02 2 17th",
 "id": "panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -23.19,
   "class": "AdjacentPanorama",
   "backwardYaw": 55.82,
   "panorama": "this.panorama_CC175683_C71F_5956_41AA_704EB81E1F05"
  },
  {
   "distance": 1,
   "yaw": -142.41,
   "class": "AdjacentPanorama",
   "backwardYaw": 29.69,
   "panorama": "this.panorama_3F725F51_3327_C814_41AA_6410005E16A5"
  }
 ],
 "overlays": [
  "this.overlay_D464C36F_C76D_5FAF_41D8_35D099FAD98B",
  "this.overlay_D4E3A43C_C76F_59B1_41D0_FA262DAB39CB"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_t.jpg",
 "class": "Panorama"
},
{
 "gyroscopeVerticalDraggingEnabled": true,
 "displayPlaybackBar": true,
 "viewerArea": "this.MainViewer",
 "id": "MainViewerPanoramaPlayer",
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "mouseControlMode": "drag_acceleration"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54F6279B_44BB_A262_41AC_02D40D2B0682",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -51.74,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_543D7F0A_44BB_A262_41CA_D66E43DE613A",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 10.36,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 01 1 17th",
 "id": "panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -138.88,
   "class": "AdjacentPanorama",
   "backwardYaw": 155.88,
   "panorama": "this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2"
  }
 ],
 "overlays": [
  "this.overlay_D5B45B26_C76D_CF5E_41D0_7E370B2F5BD4"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_56591CCA_44BB_A7E2_4165_5D70CAFAD0C8",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -178.71,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_55A6DB66_44BB_A2A2_41C4_1DE5FD9C2FFC",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -52.5,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_camera",
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
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4bhk kitchen",
 "id": "panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -58.37,
   "class": "AdjacentPanorama",
   "backwardYaw": -19.22,
   "panorama": "this.panorama_3FC52041_332B_3875_41C7_36D298EEF65B"
  }
 ],
 "overlays": [
  "this.overlay_DD3041EE_C764_DAAE_41E6_5D3D4684B50F"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_4BC7FEF7_44BB_A3A2_41C8_5F0E60CBBC74",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -158.36,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 72.82,
  "class": "PanoramaCameraPosition",
  "pitch": -2.18
 }
},
{
 "vfov": 180,
 "label": "4bhk living 02 17th",
 "id": "panorama_389785F0_3327_3814_41C9_2FC03DB15F5D",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -120.4,
   "class": "AdjacentPanorama",
   "backwardYaw": -169.02,
   "panorama": "this.panorama_3F725F51_3327_C814_41AA_6410005E16A5"
  },
  {
   "distance": 1,
   "yaw": -1.88,
   "class": "AdjacentPanorama",
   "backwardYaw": -161.25,
   "panorama": "this.panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A"
  },
  {
   "distance": 1,
   "yaw": 92.07,
   "class": "AdjacentPanorama",
   "backwardYaw": 22.64,
   "panorama": "this.panorama_5640EC47_4291_BB5B_41B8_968CEB40C959"
  },
  {
   "distance": 1,
   "yaw": 78,
   "class": "AdjacentPanorama",
   "backwardYaw": 154.03,
   "panorama": "this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942"
  }
 ],
 "overlays": [
  "this.overlay_23C14CCE_3325_C80F_41A1_C6AC5B361F71",
  "this.overlay_221DC314_3325_3813_41A8_082AB46F5780",
  "this.overlay_22D0E017_332B_781C_41AC_346875398785",
  "this.overlay_228FF5B1_332B_3814_41C7_17FB7C40FCDE"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54BC1FF5_44BB_A1A6_4139_20E086B3C7B0",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -44.97,
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
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 5.31
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 5.31
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 5.31
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_540F2936_44BB_AEA2_41D0_8EBEA713BBED",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -24.12,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_4BE87E67_44BB_A2A2_41B0_5A061C9A7EBB",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -155.76,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_545C971B_44BB_A262_41B1_F7675B369230",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -158.11,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 02 1 33rd",
 "id": "panorama_CD973440_C71F_79D2_41CE_832903CFC20A",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": 71.39,
   "class": "AdjacentPanorama",
   "backwardYaw": -22.69,
   "panorama": "this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545"
  },
  {
   "distance": 1,
   "yaw": 158.3,
   "class": "AdjacentPanorama",
   "backwardYaw": -62.92,
   "panorama": "this.panorama_10A654BD_0139_1FED_4171_7FACE1C8F817"
  }
 ],
 "overlays": [
  "this.overlay_E8B6B81F_C72D_496E_41E6_150256507011",
  "this.overlay_17E47A34_064B_049A_4197_FDC631E459DD"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54859054_44BB_BEE6_41BA_392473A4D7EC",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -69.33,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD973440_C71F_79D2_41CE_832903CFC20A_camera",
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
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_55CFEC44_44BB_A6E6_41BF_955792ACAD69",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 160.96,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_567B2CA5_44BB_A7A6_41AD_CE7981F52C42",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 117.49,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_camera",
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
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54AA7751_44BB_A2FE_41CB_389818060467",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 12.72,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54324F1B_44BB_A262_417D_7476293226E3",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 10.84,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_10BE6159_013F_76B5_411F_D68688796320_camera",
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
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_camera",
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
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 01 2 23rd",
 "id": "panorama_CD732023_C71F_F956_41D6_6910628043DA",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": 154.8,
   "class": "AdjacentPanorama",
   "backwardYaw": -133.6,
   "panorama": "this.panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C"
  },
  {
   "distance": 1,
   "yaw": 9.67,
   "class": "AdjacentPanorama",
   "backwardYaw": -140.17,
   "panorama": "this.panorama_10BCB494_013F_1FB2_4161_C83441295AC6"
  },
  {
   "distance": 1,
   "yaw": 1.04,
   "class": "AdjacentPanorama",
   "backwardYaw": 128.01,
   "panorama": "this.panorama_3FC52041_332B_3875_41C7_36D298EEF65B"
  }
 ],
 "overlays": [
  "this.overlay_DD070AC8_C763_4ED2_41C9_24B475FBBEEE",
  "this.overlay_DDFC90E3_C76D_7AD6_41E6_FFEEF526FE90",
  "this.overlay_29D37BC2_335C_C877_41AD_908816526B4A"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_4B821834_44BB_AEA6_41CB_5ED71E3AE5C7",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -170.33,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_camera",
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
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_552F50D5_44BB_BFE6_41D0_FADB23ED1A71",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 165.23,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4bhk_bedroom_02 copy",
 "id": "panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -137.91,
   "class": "AdjacentPanorama",
   "backwardYaw": 7.66,
   "panorama": "this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01"
  }
 ],
 "overlays": [
  "this.overlay_16FBB4AF_0109_3FEE_4160_1AEF26426FD1"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54D5B09B_44BB_BE62_41A1_E586C6122557",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 41.12,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_548BCA04_44BB_A266_41C6_47422F1C4991",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -101.07,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_561C2C7E_44BB_A6A2_41C5_9F05D66DFAB2",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -102.5,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4bhk living 01 23rd",
 "id": "panorama_3FC52041_332B_3875_41C7_36D298EEF65B",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": 110.67,
   "class": "AdjacentPanorama",
   "backwardYaw": -113.63,
   "panorama": "this.panorama_2740B091_0119_17B5_4159_67CCDF611884"
  },
  {
   "distance": 1,
   "yaw": -19.22,
   "class": "AdjacentPanorama",
   "backwardYaw": -58.37,
   "panorama": "this.panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1"
  },
  {
   "distance": 1,
   "yaw": 128.01,
   "class": "AdjacentPanorama",
   "backwardYaw": 1.04,
   "panorama": "this.panorama_CD732023_C71F_F956_41D6_6910628043DA"
  },
  {
   "distance": 1,
   "yaw": 29.4,
   "class": "AdjacentPanorama",
   "backwardYaw": -143.41,
   "panorama": "this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4"
  },
  {
   "distance": 1,
   "yaw": -170.14,
   "class": "AdjacentPanorama",
   "backwardYaw": -123.54,
   "panorama": "this.panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674"
  }
 ],
 "overlays": [
  "this.overlay_265C376C_3324_F80C_41B3_61B0F86D8EC4",
  "this.overlay_2518098B_3327_48F4_413D_ABF49686336E",
  "this.overlay_269A2233_3327_5815_41B2_A92B04A09121",
  "this.overlay_255C8B93_3324_C815_41B7_85EEB0BF60FC",
  "this.overlay_259D67C0_3325_D873_41C8_839B4E4B846C"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_t.jpg",
 "class": "Panorama"
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 03 1 23rd",
 "id": "panorama_CD894C2A_C71C_C951_4172_7357AF61EE99",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0"
  }
 ],
 "overlays": [
  "this.overlay_DA67D643_C765_39D6_41E7_BD2D534FD43E"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54BD79B6_44BB_A1A2_41C6_2875011832F4",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 102.17,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54F37A29_44BB_A2AE_41CF_DA738CD3F6C1",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -102.25,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4bhk living 02 23rd",
 "id": "panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -1.62,
   "class": "AdjacentPanorama",
   "backwardYaw": -158.86,
   "panorama": "this.panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43"
  },
  {
   "distance": 1,
   "yaw": 77.5,
   "class": "AdjacentPanorama",
   "backwardYaw": 153.66,
   "panorama": "this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC"
  },
  {
   "distance": 1,
   "yaw": 93.58,
   "class": "AdjacentPanorama",
   "backwardYaw": 21.64,
   "panorama": "this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0"
  },
  {
   "distance": 1,
   "yaw": -123.54,
   "class": "AdjacentPanorama",
   "backwardYaw": -170.14,
   "panorama": "this.panorama_3FC52041_332B_3875_41C7_36D298EEF65B"
  }
 ],
 "overlays": [
  "this.overlay_241BB4D3_3325_3814_41C6_89CAB51CC72B",
  "this.overlay_241B9CB4_335B_4813_41C8_FB53C1DE9901",
  "this.overlay_2BEDF09F_335B_D80D_41C8_6EE16588E85C",
  "this.overlay_2A2C951D_335C_D80D_41C3_D3A1362340BD"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_556D6AE6_44BB_A3A2_41C0_1A93B6AA799E",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -70.08,
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
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 04 1 23rd",
 "id": "panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -19.17,
   "class": "AdjacentPanorama",
   "backwardYaw": 69.51,
   "panorama": "this.panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6"
  },
  {
   "distance": 1,
   "yaw": 136.29,
   "class": "AdjacentPanorama",
   "backwardYaw": 14.7,
   "panorama": "this.panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898"
  },
  {
   "distance": 1,
   "yaw": 153.66,
   "class": "AdjacentPanorama",
   "backwardYaw": 77.5,
   "panorama": "this.panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674"
  }
 ],
 "overlays": [
  "this.overlay_D95E3B79_C764_CFB2_41CF_C88AFF6D4BC6",
  "this.overlay_D84AC366_C763_5FD1_41D2_AE1B94515E56",
  "this.overlay_2E819605_3367_5BFC_41B8_E790FCBF0C1C"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_5711EDBE_44BB_A1A2_4193_73AC4308918B",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 46.4,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4bhk living 01 17th",
 "id": "panorama_3F725F51_3327_C814_41AA_6410005E16A5",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": 29.69,
   "class": "AdjacentPanorama",
   "backwardYaw": -142.41,
   "panorama": "this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045"
  },
  {
   "distance": 1,
   "yaw": -169.02,
   "class": "AdjacentPanorama",
   "backwardYaw": -120.4,
   "panorama": "this.panorama_389785F0_3327_3814_41C9_2FC03DB15F5D"
  },
  {
   "distance": 1,
   "yaw": 110.68,
   "class": "AdjacentPanorama",
   "backwardYaw": -112.74,
   "panorama": "this.panorama_24CDB527_010B_7E9D_4174_52D79CB239F2"
  },
  {
   "distance": 1,
   "yaw": -20.01,
   "class": "AdjacentPanorama",
   "backwardYaw": -59.5,
   "panorama": "this.panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C"
  },
  {
   "distance": 1,
   "yaw": 128.04,
   "class": "AdjacentPanorama",
   "backwardYaw": 0.29,
   "panorama": "this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2"
  }
 ],
 "overlays": [
  "this.overlay_3DBB7384_333D_38F3_41C1_53B54FACFB40",
  "this.overlay_3C2F8DD9_333D_4815_41B7_9EBE46B8599A",
  "this.overlay_3C9B0F8A_333F_48F7_41C8_42F46B74985E",
  "this.overlay_2396CDBC_333D_4813_4185_94CB756CAC19",
  "this.overlay_22255151_333D_D815_41C0_71E393FD43EC"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 151.74,
  "class": "PanoramaCameraPosition",
  "pitch": -9.04
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_3FD93565_332B_583D_41C9_645338B595F0_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -170.58,
  "class": "PanoramaCameraPosition",
  "pitch": -3.01
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_5420F8FF_44BB_AFA2_41C6_40010093C365",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 61.61,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_55112AAC_44BB_A3A6_41C5_EE1347CB7734",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -86.42,
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
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 126.36,
  "class": "PanoramaCameraPosition",
  "pitch": -4.52
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54A8200A_44BB_BE62_41BE_816C11C53F2C",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -87.93,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_541B5648_44BB_A2EE_41A0_0A867ED0AE37",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 66.37,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_55936B8B_44BB_A262_41A3_BC7B056241A8",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 43.63,
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
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_3F725F51_3327_C814_41AA_6410005E16A5_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -171.04,
  "class": "PanoramaCameraPosition",
  "pitch": -3.3
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_555A1AFA_44BB_A3A2_41A2_5EF70625783B",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -69.58,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_56D21D73_44BB_A6A2_4199_6BBAE4DE09AF",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 178.38,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4bhk kitchen",
 "id": "panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "overlays": [
    "this.overlay_E4FA5D36_C72C_CBBE_41DE_84376FB29EF5"
   ],
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  },
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMax": 130,
 "pitch": 0,
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -62.51,
   "class": "AdjacentPanorama",
   "backwardYaw": -21.23,
   "panorama": "this.panorama_3FD93565_332B_583D_41C9_645338B595F0"
  }
 ],
 "partial": false,
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_1_t.jpg",
 "class": "LivePanorama",
 "frameTransitionTime": 5000,
 "frameDisplayTime": 5000
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54797946_44BB_AEE2_41B4_376C70A6FE1B",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -164.92,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4bhk Powder toilet",
 "id": "panorama_28495FE3_011F_2995_4161_1F0BD106F099",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -112.94,
   "class": "AdjacentPanorama",
   "backwardYaw": 109.92,
   "panorama": "this.panorama_3FC32490_3325_7813_41B5_5ED0D40BC796"
  }
 ],
 "overlays": [
  "this.overlay_28543281_0109_3B92_4172_B2B47CE181F9"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_542F0F40_44BB_A2DE_41CA_57D380FCFE50",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -25.2,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_camera",
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
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54EC3077_44BB_BEA2_4194_8CE61EBFF5C9",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 39.2,
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
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 5.31
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 5.31
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 5.31
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 166.56,
  "class": "PanoramaCameraPosition",
  "pitch": -2.76
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_549E102F_44BB_BEA2_41C9_15F59A94BBA5",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -172.34,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4bhk Powder toilet",
 "id": "panorama_27D62BB1_011F_69F2_416D_0AB033A18B06",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -113.49,
   "class": "AdjacentPanorama",
   "backwardYaw": 110.42,
   "panorama": "this.panorama_3FD93565_332B_583D_41C9_645338B595F0"
  }
 ],
 "overlays": [
  "this.overlay_299D94A8_0107_1F92_4177_026B7F551234"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_t.jpg",
 "class": "Panorama"
},
{
 "vfov": 180,
 "label": "4bhk_Bedroom_003 copy",
 "id": "panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": 15.71,
   "class": "AdjacentPanorama",
   "backwardYaw": 134.53,
   "panorama": "this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942"
  }
 ],
 "overlays": [
  "this.overlay_13B21729_013B_1A95_416C_98A10822AB74"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_t.jpg",
 "class": "Panorama"
},
{
 "vfov": 180,
 "label": "4bhk_bedroom_02 copy",
 "id": "panorama_10A96800_0139_3693_4154_C75F68C57800",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -139.29,
   "class": "AdjacentPanorama",
   "backwardYaw": 8.67,
   "panorama": "this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42"
  }
 ],
 "overlays": [
  "this.overlay_1F068397_0107_19BE_4171_71AB44B1EA6D"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_t.jpg",
 "class": "Panorama"
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 03 1 28th",
 "id": "panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -82.1,
   "class": "AdjacentPanorama",
   "backwardYaw": -148.17,
   "panorama": "this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A"
  }
 ],
 "overlays": [
  "this.overlay_E039B42F_C73C_D9AE_4179_6CED54A79A5C"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_540FDF75_44BB_A2A6_41B5_A5329560D66A",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -157.36,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_5429CF2F_44BB_A2A2_4181_063318DA56B8",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -27.35,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_5420161D_44BB_A266_4198_D19DBF326A70",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -171.33,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 04 1 17th",
 "id": "panorama_CC131311_C71D_3F72_41C7_6DBD9418A942",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": 154.03,
   "class": "AdjacentPanorama",
   "backwardYaw": 78,
   "panorama": "this.panorama_389785F0_3327_3814_41C9_2FC03DB15F5D"
  },
  {
   "distance": 1,
   "yaw": -21.56,
   "class": "AdjacentPanorama",
   "backwardYaw": 68.51,
   "panorama": "this.panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335"
  },
  {
   "distance": 1,
   "yaw": 134.53,
   "class": "AdjacentPanorama",
   "backwardYaw": 15.71,
   "panorama": "this.panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE"
  }
 ],
 "overlays": [
  "this.overlay_D29433BE_C765_3EAE_41D8_CC80272D951C",
  "this.overlay_D179CE94_C763_4971_41E1_4D5D0BD3A926",
  "this.overlay_272A1E92_332B_4814_41AA_E3151C20A966"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_t.jpg",
 "class": "Panorama"
},
{
 "vfov": 180,
 "label": "4bhk kitchen",
 "id": "panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -63.14,
   "class": "AdjacentPanorama",
   "backwardYaw": -19.97,
   "panorama": "this.panorama_3FC32490_3325_7813_41B5_5ED0D40BC796"
  }
 ],
 "overlays": [
  "this.overlay_F418FFB4_C727_46B1_41E3_7157AAB75A6C"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_4BDB58A1_44BB_AE5E_41BC_D84244A87A9F",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 9.86,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54E677AD_44BB_A1A6_41C9_DD60463187A6",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -45.72,
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
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_camera",
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
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_5524CA9C_44BB_A266_41C1_EF825818F0CC",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 97.9,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_554ADB0C_44BB_A266_41CB_9BC0FD93F7C7",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 157.31,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_4BD7E8B5_44BB_AFA6_41B5_2622409F534D",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 160.78,
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
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54155F65_44BB_A2A6_41B7_53E427634614",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 18.75,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_56490CDA_44BB_A7E2_418A_8B0D78FADE54",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 66.51,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_camera",
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
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_55B9EB1F_44BB_A262_419E_BF7AC92740EE",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 117.08,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4bhk_Bedroom_003 copy",
 "id": "panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": 15.08,
   "class": "AdjacentPanorama",
   "backwardYaw": 135.03,
   "panorama": "this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045"
  }
 ],
 "overlays": [
  "this.overlay_055AB65B_336D_F815_41C0_3EE3DBDD5EBD"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_4BECE87B_44BB_AEA2_41C7_5AB260C40852",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -26.34,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 01 2 28th",
 "id": "panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": 1.29,
   "class": "AdjacentPanorama",
   "backwardYaw": 127.5,
   "panorama": "this.panorama_3FD93565_332B_583D_41C9_645338B595F0"
  },
  {
   "distance": 1,
   "yaw": 144.5,
   "class": "AdjacentPanorama",
   "backwardYaw": -136.37,
   "panorama": "this.panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE"
  },
  {
   "distance": 1,
   "yaw": 7.66,
   "class": "AdjacentPanorama",
   "backwardYaw": -137.91,
   "panorama": "this.panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E"
  }
 ],
 "overlays": [
  "this.overlay_E4AC823C_C723_F9B2_41B4_39B29FEEA91C",
  "this.overlay_E33D35E2_C723_3AD1_41A1_22D3C41AFB56",
  "this.overlay_148591CC_3365_3873_41C5_5BF064D6EBF6"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_4BC0B8C7_44BB_AFE2_41C2_6180E9B7ED8B",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 116.86,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_camera",
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
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54B719CB_44BB_A1E2_41A3_C77D6B76DEFB",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -87.93,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 03 2 28th",
 "id": "panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -148.17,
   "class": "AdjacentPanorama",
   "backwardYaw": -82.1,
   "panorama": "this.panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3"
  },
  {
   "distance": 1,
   "yaw": 21.89,
   "class": "AdjacentPanorama",
   "backwardYaw": 93.58,
   "panorama": "this.panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75"
  },
  {
   "distance": 1,
   "yaw": 24.24,
   "class": "AdjacentPanorama",
   "backwardYaw": 167.82,
   "panorama": "this.panorama_121539AD_013B_29ED_4160_3D4F82B47E36"
  }
 ],
 "overlays": [
  "this.overlay_E11B8401_C724_F952_41BA_B115171D0330",
  "this.overlay_E05F9DD6_C723_CAF1_41E7_95CA81350DF9",
  "this.overlay_149CB3EC_3364_D833_41C7_409024E90602"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_t.jpg",
 "class": "Panorama"
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 04 2 33rd",
 "id": "panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": 70.89,
   "class": "AdjacentPanorama",
   "backwardYaw": -18.67,
   "panorama": "this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045"
  }
 ],
 "overlays": [
  "this.overlay_F4767B1F_C727_4F6F_41DB_8ED192ED33D1"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_t.jpg",
 "class": "Panorama"
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 04 1 33rd",
 "id": "panorama_EBE3DC98_C723_4972_41E0_39A7A1000045",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": 135.03,
   "class": "AdjacentPanorama",
   "backwardYaw": 15.08,
   "panorama": "this.panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8"
  },
  {
   "distance": 1,
   "yaw": 152.65,
   "class": "AdjacentPanorama",
   "backwardYaw": 75.99,
   "panorama": "this.panorama_3F2BA48E_3325_580C_41C2_AB809D46139D"
  },
  {
   "distance": 1,
   "yaw": -18.67,
   "class": "AdjacentPanorama",
   "backwardYaw": 70.89,
   "panorama": "this.panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05"
  }
 ],
 "overlays": [
  "this.overlay_F4E4001F_C725_596E_41E0_DD5EA526DD91",
  "this.overlay_F3F318C8_C723_4AD2_41E2_333E3532C07C",
  "this.overlay_04092059_336D_7815_41C8_44B93151666E"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_t.jpg",
 "class": "Panorama"
},
{
 "vfov": 180,
 "label": "4bhk_Bedroom_003 copy",
 "id": "panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": 14.7,
   "class": "AdjacentPanorama",
   "backwardYaw": 136.29,
   "panorama": "this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC"
  }
 ],
 "overlays": [
  "this.overlay_17C8401E_0109_16AF_4164_AB7919665F6E"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54889777_44BB_A2A2_41AF_D047828F6ED7",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 48.41,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_4BC10EE6_44BB_A3A2_41D0_25919C24E4DA",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -20.44,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_544CA72D_44BB_A2A6_41CA_1148CC318A71",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 11.87,
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
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54425FE5_44BB_A1A6_41C8_E98F44464893",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -150.31,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4bhk_bedroom_02 copy",
 "id": "panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -140.8,
   "class": "AdjacentPanorama",
   "backwardYaw": 10.93,
   "panorama": "this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2"
  }
 ],
 "overlays": [
  "this.overlay_0F921219_0107_1AB2_4163_2FA0B008B772"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54981765_44BB_A2A6_41A9_A038A5DF6EA9",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 36.6,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54C6EA77_44BB_A2A2_41D0_2468555574B8",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -111.12,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_camera",
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
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_563E3C58_44BB_A6EE_4189_38B5B70D8FE4",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -110.49,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 04 2 23rd",
 "id": "panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": 69.51,
   "class": "AdjacentPanorama",
   "backwardYaw": -19.17,
   "panorama": "this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC"
  }
 ],
 "overlays": [
  "this.overlay_D8D0AEBD_C71D_46B2_41E2_77FAFEC5B3BD"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 5.31
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 5.31
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 5.31
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_55B60B3D_44BB_A2A6_41BA_D3D695624745",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -169.07,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4bhk living 01 33rd",
 "id": "panorama_3FC32490_3325_7813_41B5_5ED0D40BC796",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -19.97,
   "class": "AdjacentPanorama",
   "backwardYaw": -63.14,
   "panorama": "this.panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC"
  },
  {
   "distance": 1,
   "yaw": 128.26,
   "class": "AdjacentPanorama",
   "backwardYaw": -0.72,
   "panorama": "this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42"
  },
  {
   "distance": 1,
   "yaw": 30.03,
   "class": "AdjacentPanorama",
   "backwardYaw": -143.41,
   "panorama": "this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545"
  },
  {
   "distance": 1,
   "yaw": -169.64,
   "class": "AdjacentPanorama",
   "backwardYaw": -118.39,
   "panorama": "this.panorama_3F2BA48E_3325_580C_41C2_AB809D46139D"
  },
  {
   "distance": 1,
   "yaw": 109.92,
   "class": "AdjacentPanorama",
   "backwardYaw": -112.94,
   "panorama": "this.panorama_28495FE3_011F_2995_4161_1F0BD106F099"
  }
 ],
 "overlays": [
  "this.overlay_19480E30_337B_4813_41B5_5EE57717F00C",
  "this.overlay_1EA30795_337C_D81C_41C8_094AEDF22DA3",
  "this.overlay_1EB6AA28_337D_C834_4170_E0B4D73010B3",
  "this.overlay_1EC35158_337D_7813_419F_5D7970C11AAE",
  "this.overlay_1E5ECCE1_337C_C835_41BF_5A7E54CDBE3D"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_camera",
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
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_4BEE6E79_44BB_A2AE_4198_57EE7FDBDFBF",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 160.03,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4bhk_bedroom_02 copy",
 "id": "panorama_10BCB494_013F_1FB2_4161_C83441295AC6",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -140.17,
   "class": "AdjacentPanorama",
   "backwardYaw": 9.67,
   "panorama": "this.panorama_CD732023_C71F_F956_41D6_6910628043DA"
  }
 ],
 "overlays": [
  "this.overlay_12BC958B_0109_7995_4112_D3CFE865F0D8"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CC175683_C71F_5956_41AA_704EB81E1F05_camera",
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
   "media": "this.panorama_3F725F51_3327_C814_41AA_6410005E16A5",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_3F725F51_3327_C814_41AA_6410005E16A5_camera"
  },
  {
   "media": "this.panorama_389785F0_3327_3814_41C9_2FC03DB15F5D",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_camera"
  },
  {
   "media": "this.panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_camera"
  },
  {
   "media": "this.panorama_24CDB527_010B_7E9D_4174_52D79CB239F2",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_camera"
  },
  {
   "media": "this.panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_camera"
  },
  {
   "media": "this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_camera"
  },
  {
   "media": "this.panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_camera"
  },
  {
   "media": "this.panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_camera"
  },
  {
   "media": "this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_camera"
  },
  {
   "media": "this.panorama_CC175683_C71F_5956_41AA_704EB81E1F05",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CC175683_C71F_5956_41AA_704EB81E1F05_camera"
  },
  {
   "media": "this.panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_camera"
  },
  {
   "media": "this.panorama_5640EC47_4291_BB5B_41B8_968CEB40C959",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_5640EC47_4291_BB5B_41B8_968CEB40C959_camera"
  },
  {
   "media": "this.panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_camera"
  },
  {
   "media": "this.panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_camera"
  },
  {
   "media": "this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_camera"
  },
  {
   "media": "this.panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_camera"
  },
  {
   "media": "this.panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_camera"
  },
  {
   "media": "this.panorama_3FC52041_332B_3875_41C7_36D298EEF65B",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_3FC52041_332B_3875_41C7_36D298EEF65B_camera"
  },
  {
   "media": "this.panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_camera"
  },
  {
   "media": "this.panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_camera"
  },
  {
   "media": "this.panorama_2740B091_0119_17B5_4159_67CCDF611884",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_2740B091_0119_17B5_4159_67CCDF611884_camera"
  },
  {
   "media": "this.panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_camera"
  },
  {
   "media": "this.panorama_CD732023_C71F_F956_41D6_6910628043DA",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD732023_C71F_F956_41D6_6910628043DA_camera"
  },
  {
   "media": "this.panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_camera"
  },
  {
   "media": "this.panorama_10BCB494_013F_1FB2_4161_C83441295AC6",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_10BCB494_013F_1FB2_4161_C83441295AC6_camera"
  },
  {
   "media": "this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_camera"
  },
  {
   "media": "this.panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_camera"
  },
  {
   "media": "this.panorama_10BE6159_013F_76B5_411F_D68688796320",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_10BE6159_013F_76B5_411F_D68688796320_camera"
  },
  {
   "media": "this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_camera"
  },
  {
   "media": "this.panorama_CD894C2A_C71C_C951_4172_7357AF61EE99",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 30)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_camera"
  },
  {
   "media": "this.panorama_12091E1F_013F_2AAE_4168_C4499D5E4133",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 30, 31)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_camera"
  },
  {
   "media": "this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 31, 32)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_camera"
  },
  {
   "media": "this.panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 32, 33)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_camera"
  },
  {
   "media": "this.panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 33, 34)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_camera"
  },
  {
   "media": "this.panorama_3FD93565_332B_583D_41C9_645338B595F0",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 34, 35)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_3FD93565_332B_583D_41C9_645338B595F0_camera"
  },
  {
   "media": "this.panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 35, 36)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_camera"
  },
  {
   "media": "this.panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 36, 37)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269_camera"
  },
  {
   "media": "this.panorama_27D62BB1_011F_69F2_416D_0AB033A18B06",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 37, 38)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_camera"
  },
  {
   "media": "this.panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A",
   "start": "this.MainViewerPanoramaPlayer.set('displayPlaybackBar', false)",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 38, 39)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_camera"
  },
  {
   "media": "this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 39, 40)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_camera"
  },
  {
   "media": "this.panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 40, 41)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_camera"
  },
  {
   "media": "this.panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 41, 42)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_camera"
  },
  {
   "media": "this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 42, 43)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_camera"
  },
  {
   "media": "this.panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 43, 44)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_camera"
  },
  {
   "media": "this.panorama_10AB6D68_013B_EE92_4160_6689FDC41054",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 44, 45)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_10AB6D68_013B_EE92_4160_6689FDC41054_camera"
  },
  {
   "media": "this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 45, 46)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_camera"
  },
  {
   "media": "this.panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 46, 47)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_camera"
  },
  {
   "media": "this.panorama_121539AD_013B_29ED_4160_3D4F82B47E36",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 47, 48)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_121539AD_013B_29ED_4160_3D4F82B47E36_camera"
  },
  {
   "media": "this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 48, 49)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_camera"
  },
  {
   "media": "this.panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 49, 50)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_camera"
  },
  {
   "media": "this.panorama_10AB2713_013B_1AB5_4162_9A65609A81B1",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 50, 51)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_camera"
  },
  {
   "media": "this.panorama_3FC32490_3325_7813_41B5_5ED0D40BC796",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 51, 52)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_camera"
  },
  {
   "media": "this.panorama_3F2BA48E_3325_580C_41C2_AB809D46139D",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 52, 53)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_camera"
  },
  {
   "media": "this.panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 53, 54)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_camera"
  },
  {
   "media": "this.panorama_28495FE3_011F_2995_4161_1F0BD106F099",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 54, 55)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_28495FE3_011F_2995_4161_1F0BD106F099_camera"
  },
  {
   "media": "this.panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 55, 56)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_camera"
  },
  {
   "media": "this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 56, 57)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_camera"
  },
  {
   "media": "this.panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 57, 58)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_camera"
  },
  {
   "media": "this.panorama_10A96800_0139_3693_4154_C75F68C57800",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 58, 59)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_10A96800_0139_3693_4154_C75F68C57800_camera"
  },
  {
   "media": "this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 59, 60)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_camera"
  },
  {
   "media": "this.panorama_CD973440_C71F_79D2_41CE_832903CFC20A",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 60, 61)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD973440_C71F_79D2_41CE_832903CFC20A_camera"
  },
  {
   "media": "this.panorama_10A654BD_0139_1FED_4171_7FACE1C8F817",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 61, 62)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_camera"
  },
  {
   "media": "this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 62, 63)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_camera"
  },
  {
   "media": "this.panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 63, 64)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_camera"
  },
  {
   "media": "this.panorama_10F8A1A0_0139_3993_4126_7D4276303500",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 64, 65)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_10F8A1A0_0139_3993_4126_7D4276303500_camera"
  },
  {
   "media": "this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 65, 66)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_camera"
  },
  {
   "media": "this.panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 66, 67)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_camera"
  },
  {
   "media": "this.panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8",
   "end": "this.trigger('tourEnded')",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 67, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_camera"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "vfov": 180,
 "label": "4_BHK_BEDROOM_4_TOILET copy",
 "id": "panorama_10F8A1A0_0139_3993_4126_7D4276303500",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": 166.07,
   "class": "AdjacentPanorama",
   "backwardYaw": 22.23,
   "panorama": "this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506"
  }
 ],
 "overlays": [
  "this.overlay_227ECEFD_0109_2B6D_416E_3A14758B111C"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_56C21D87_44BB_A662_41B1_B1E6FE676860",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -21.7,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54197910_44BB_AE7E_41B9_AA1751C772B2",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 67.06,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 02 1 23rd",
 "id": "panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": 158.3,
   "class": "AdjacentPanorama",
   "backwardYaw": -61.67,
   "panorama": "this.panorama_10BE6159_013F_76B5_411F_D68688796320"
  },
  {
   "distance": 1,
   "yaw": 68.88,
   "class": "AdjacentPanorama",
   "backwardYaw": -14.77,
   "panorama": "this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4"
  }
 ],
 "overlays": [
  "this.overlay_DB599724_C763_4752_41D6_A0FA163F689B",
  "this.overlay_1654E670_064B_0C9A_4147_50EF66183F10"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_t.jpg",
 "class": "Panorama"
},
{
 "vfov": 180,
 "label": "4bhk Powder toilet",
 "id": "panorama_2740B091_0119_17B5_4159_67CCDF611884",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -113.63,
   "class": "AdjacentPanorama",
   "backwardYaw": 110.67,
   "panorama": "this.panorama_3FC52041_332B_3875_41C7_36D298EEF65B"
  }
 ],
 "overlays": [
  "this.overlay_27E5C64F_0119_1AAD_4168_4CBEDDEFB1DF"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_546C2705_44BB_A266_41A9_EE98806ADD86",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 56.46,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54142925_44BB_AEA6_41A4_10CA3E34E5FF",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 178.12,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4_BHK_BEDROOM_4_TOILET copy",
 "id": "panorama_12091E1F_013F_2AAE_4168_C4499D5E4133",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": 170.21,
   "class": "AdjacentPanorama",
   "backwardYaw": 21.73,
   "panorama": "this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0"
  }
 ],
 "overlays": [
  "this.overlay_14ADE4BE_010F_1FEF_416E_76EF10A518E9"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_10BCB494_013F_1FB2_4161_C83441295AC6_camera",
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
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_5535CA89_44BB_A26E_4197_9B4424227676",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -21.7,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_55005AC0_44BB_A3DE_41B9_E08ABCDC526C",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -12.18,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4bhk_bolcony_23",
 "id": "panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -158.86,
   "class": "AdjacentPanorama",
   "backwardYaw": -1.62,
   "panorama": "this.panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674"
  }
 ],
 "overlays": [
  "this.overlay_F6B6F5DA_E6F2_2435_41D4_7EFE955F637C"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43_t.jpg",
 "class": "Panorama"
},
{
 "vfov": 180,
 "label": "4bhk_bolcony_33",
 "id": "panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -169.16,
   "class": "AdjacentPanorama",
   "backwardYaw": -2.88,
   "panorama": "this.panorama_3F2BA48E_3325_580C_41C2_AB809D46139D"
  }
 ],
 "overlays": [
  "this.overlay_F4A93A03_E6FE_6C1A_41B1_F38C9DDC27C0"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_t.jpg",
 "class": "Panorama"
},
{
 "vfov": 180,
 "label": "4bhk living 02 28th",
 "id": "panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": 93.58,
   "class": "AdjacentPanorama",
   "backwardYaw": 21.89,
   "panorama": "this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A"
  },
  {
   "distance": 1,
   "yaw": -119.77,
   "class": "AdjacentPanorama",
   "backwardYaw": -168.13,
   "panorama": "this.panorama_3FD93565_332B_583D_41C9_645338B595F0"
  },
  {
   "distance": 1,
   "yaw": 77.75,
   "class": "AdjacentPanorama",
   "backwardYaw": 154.28,
   "panorama": "this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD"
  },
  {
   "distance": 1,
   "yaw": -1.88,
   "class": "AdjacentPanorama",
   "backwardYaw": -167.28,
   "panorama": "this.panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269"
  }
 ],
 "overlays": [
  "this.overlay_13ACC0B1_336F_5814_41B3_CF6134E86EAC",
  "this.overlay_129ED365_336F_583D_418B_3FE762298228",
  "this.overlay_103A83CC_336C_F873_41A5_4AEAC87E592E",
  "this.overlay_11A6770F_336B_380D_41C2_1AE4C498D01F"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_t.jpg",
 "class": "Panorama"
},
{
 "vfov": 180,
 "label": "4BHK_Bedroom01_ copy",
 "id": "panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -60.41,
   "class": "AdjacentPanorama",
   "backwardYaw": 158.81,
   "panorama": "this.panorama_CC175683_C71F_5956_41AA_704EB81E1F05"
  }
 ],
 "overlays": [
  "this.overlay_1189CF7A_0109_6977_4165_30E4901C9436"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_4BD40EC0_44BB_A3DE_41C2_CE3E6AC951C1",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 120.5,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4bhk_bolcony_17",
 "id": "panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -161.25,
   "class": "AdjacentPanorama",
   "backwardYaw": -1.88,
   "panorama": "this.panorama_389785F0_3327_3814_41C9_2FC03DB15F5D"
  }
 ],
 "overlays": [
  "this.overlay_E98B544E_E6F6_642D_41D5_639CA13A6B69"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54D5E7C1_44BB_A1DE_41A7_E128C8CB0F3A",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 156.81,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_4BE40E8A_44BB_A262_41CF_6668A4C88452",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 37.59,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_55F15BD5_44BB_A1E1_41B8_00F2585F4673",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -21.19,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 02 1 28th",
 "id": "panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": 159.56,
   "class": "AdjacentPanorama",
   "backwardYaw": -60.91,
   "panorama": "this.panorama_10AB6D68_013B_EE92_4160_6689FDC41054"
  },
  {
   "distance": 1,
   "yaw": 78.93,
   "class": "AdjacentPanorama",
   "backwardYaw": -21.43,
   "panorama": "this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558"
  }
 ],
 "overlays": [
  "this.overlay_E167051F_C725_5B6F_41E8_EC2A8AF34DDA",
  "this.overlay_176102E4_064F_05BA_418C_77CA1322ED25"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_55E00BF8_44BB_A1AF_41BC_465CB84D1F4C",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -43.71,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_557EAAD1_44BB_A3FE_41B6_9D388D22A9F8",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 31.83,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4BHK_Bedroom01_ copy",
 "id": "panorama_10BE6159_013F_76B5_411F_D68688796320",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -61.67,
   "class": "AdjacentPanorama",
   "backwardYaw": 158.3,
   "panorama": "this.panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751"
  }
 ],
 "overlays": [
  "this.overlay_153F3E16_010B_2ABF_4102_306DCD1B8DA0"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_545A1FC0_44BB_A1DE_41C8_AE972D0FC5BD",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -164.29,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_10AB6D68_013B_EE92_4160_6689FDC41054_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 133.15,
  "class": "PanoramaCameraPosition",
  "pitch": -9.3
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -170.33,
  "class": "PanoramaCameraPosition",
  "pitch": -0.75
 }
},
{
 "vfov": 180,
 "label": "4bhk_Bedroom_003 copy",
 "id": "panorama_10AB2713_013B_1AB5_4162_9A65609A81B1",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": 15.08,
   "class": "AdjacentPanorama",
   "backwardYaw": 134.28,
   "panorama": "this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD"
  }
 ],
 "overlays": [
  "this.overlay_1CBAC74F_0119_3AAE_4169_5B722A4C2C71"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_t.jpg",
 "class": "Panorama"
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 01 1 23rd",
 "id": "panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -133.6,
   "class": "AdjacentPanorama",
   "backwardYaw": 154.8,
   "panorama": "this.panorama_CD732023_C71F_F956_41D6_6910628043DA"
  }
 ],
 "overlays": [
  "this.overlay_DDB914AF_C76D_7AAE_41DD_FD246BE7004B"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 165.55,
  "class": "PanoramaCameraPosition",
  "pitch": -2.76
 }
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 02 2 33rd",
 "id": "panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -143.41,
   "class": "AdjacentPanorama",
   "backwardYaw": 30.03,
   "panorama": "this.panorama_3FC32490_3325_7813_41B5_5ED0D40BC796"
  },
  {
   "distance": 1,
   "yaw": -22.69,
   "class": "AdjacentPanorama",
   "backwardYaw": 71.39,
   "panorama": "this.panorama_CD973440_C71F_79D2_41CE_832903CFC20A"
  }
 ],
 "overlays": [
  "this.overlay_E994C697_C72F_797F_41D3_1180D963962C",
  "this.overlay_E8B86196_C72D_7B7E_41D9_E9ACE1C1D537"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_t.jpg",
 "class": "Panorama"
},
{
 "partial": false,
 "vfov": 180,
 "overlays": [
  "this.overlay_10AE33E1_0109_1995_416C_2A5286DB7CD2"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_t.jpg",
 "label": "4_BHK_BEDROOM_4_TOILET copy",
 "id": "panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00",
 "class": "Panorama",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMax": 130,
 "pitch": 0,
 "hfovMin": "135%"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_camera",
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
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54BA773F_44BB_A2A2_41C5_03E41CBA6ECB",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -25.72,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_camera",
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
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_566B9CB5_44BB_A7A6_4191_B1F9877C56FF",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 60.23,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_camera",
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
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 154,
  "class": "PanoramaCameraPosition",
  "pitch": -1.26
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_56A8CD01_44BB_A65E_41C9_FBB99754D8AA",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -86.42,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 04 1 28th",
 "id": "panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": 154.28,
   "class": "AdjacentPanorama",
   "backwardYaw": 77.75,
   "panorama": "this.panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75"
  },
  {
   "distance": 1,
   "yaw": -19.04,
   "class": "AdjacentPanorama",
   "backwardYaw": 68.38,
   "panorama": "this.panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD"
  },
  {
   "distance": 1,
   "yaw": 134.28,
   "class": "AdjacentPanorama",
   "backwardYaw": 15.08,
   "panorama": "this.panorama_10AB2713_013B_1AB5_4162_9A65609A81B1"
  }
 ],
 "overlays": [
  "this.overlay_E0AC7D99_C73D_CB72_41E2_CDE435C74BDD",
  "this.overlay_EFD00FA6_C73C_C75E_41E0_8DE91C303B0D",
  "this.overlay_18124021_3364_D834_41BD_B7C5B964EFB6"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_t.jpg",
 "class": "Panorama"
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 02 1 17th",
 "id": "panorama_CC175683_C71F_5956_41AA_704EB81E1F05",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": 55.82,
   "class": "AdjacentPanorama",
   "backwardYaw": -23.19,
   "panorama": "this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045"
  },
  {
   "distance": 1,
   "yaw": 158.81,
   "class": "AdjacentPanorama",
   "backwardYaw": -60.41,
   "panorama": "this.panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80"
  }
 ],
 "overlays": [
  "this.overlay_D4F9B791_C76F_4773_41B6_B1727AC576AD",
  "this.overlay_09C2C4FC_065B_0D8A_4181_30568EDF6179"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54895040_44BB_BEDE_41A7_85A4B4C6948D",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -157.77,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_camera",
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
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_5640EC47_4291_BB5B_41B8_968CEB40C959_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 85.16,
  "class": "PanoramaCameraPosition",
  "pitch": -2
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 03 2 23rd",
 "id": "panorama_CD93C521_C71D_3B53_41E8_25606B0344D0",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": 21.64,
   "class": "AdjacentPanorama",
   "backwardYaw": 93.58,
   "panorama": "this.panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0"
  },
  {
   "distance": 1,
   "yaw": 21.73,
   "class": "AdjacentPanorama",
   "backwardYaw": 170.21,
   "panorama": "this.panorama_12091E1F_013F_2AAE_4168_C4499D5E4133"
  }
 ],
 "overlays": [
  "this.overlay_DB374A8C_C765_4952_41E1_A2E190D5388B",
  "this.overlay_D912F139_C767_5BB2_41DE_1B6920A1E6C5",
  "this.overlay_2F7EFB5A_3365_C817_41BE_6597E5C0442A"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_camera",
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
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_4BD94E9A_44BB_A263_41CE_B3E1CB77050A",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 59.6,
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
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54743F9C_44BB_A266_41CC_C131C3BFB876",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -102,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 172.09,
  "class": "PanoramaCameraPosition",
  "pitch": -4.52
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_4B8EE822_44BB_AEA2_41B4_4D8A1CECBFF3",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 177.12,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54088674_44BB_A2A6_41C4_EC6D40D1F9F4",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 121.63,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_camera",
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
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_4BDF1EAF_44BB_A3A2_41A4_350DD92F0CFF",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 67.26,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_4B8AE80E_44BB_AE62_41D0_AE49243F5E23",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 119.59,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 170.24,
  "class": "PanoramaCameraPosition",
  "pitch": -1.28
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54861789_44BB_A26E_41AB_55645A8D88D7",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 40.71,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_5686DD39_44BB_A6A1_41AB_CF1EFCC9F6A1",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 119.09,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_549EB9F0_44BB_A1BE_41D0_CF57EEAFD16D",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 158.44,
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
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 5.31
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 5.31
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 5.31
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_4BCB6ED0_44BB_A3FE_41CD_4E9D0052BDAE",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -179.71,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "4BHK BEDROOM 03 1 17th",
 "id": "panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0",
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "colCount": 1
     }
    ]
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
   "yaw": -87.63,
   "class": "AdjacentPanorama",
   "backwardYaw": -143.4,
   "panorama": "this.panorama_5640EC47_4291_BB5B_41B8_968CEB40C959"
  }
 ],
 "overlays": [
  "this.overlay_D201568E_C765_3951_41E8_132B3132B361"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_t.jpg",
 "class": "Panorama"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_54D9308A_44BB_BE63_41BC_D7D5C5CEE1A0",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -51.96,
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
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_55D04C20_44BB_A65E_41CD_F794A12EAEAF",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 159.99,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_562DEC6C_44BB_A6A6_41C6_EAA7F9BDCF48",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -165.3,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_10A96800_0139_3693_4154_C75F68C57800_camera",
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
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_5435F8EB_44BB_AFA2_41C8_B415365B8BBC",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 36.59,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_121539AD_013B_29ED_4160_3D4F82B47E36_camera",
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
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_570FBDD1_44BB_A1FE_41C3_70E8C97E8EF5",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 39.83,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 295,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 13.26
   },
   {
    "yawDelta": 32.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 13.26
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_5698CD14_44BB_A666_41CD_B2CD4DB0AFFE",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -9.79,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
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
 "shadow": false,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeight": 10,
 "toolTipOpacity": 1,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarRight": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "paddingTop": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "paddingLeft": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionDuration": 500,
 "class": "ViewerArea",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
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
 "toolTipFontColor": "#606060",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "data": {
  "name": "Main Viewer"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_EAECF1EB_C72D_FAD6_41A8_B49AEB304111",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -0.72,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.87,
   "pitch": 1.16
  }
 ],
 "items": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 1.16,
   "yaw": -0.72,
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
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3FC32490_3325_7813_41B5_5ED0D40BC796, this.camera_54F6279B_44BB_A262_41AC_02D40D2B0682); this.mainPlayList.set('selectedIndex', 51)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_E91CF77E_C72C_C7AE_41E6_ED92117BB9B5",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": 148.02,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 12.35,
   "pitch": -50.56
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060, this.camera_54889777_44BB_A2A2_41AF_D047828F6ED7); this.mainPlayList.set('selectedIndex', 57)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_077D34F6_3367_581F_41C8_C54C2DC06817",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 8.67,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.41,
   "pitch": -10.49
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CE053D1_3DEA_B6D5_41C4_CC77ECE49985",
   "pitch": -10.49,
   "yaw": 8.67,
   "hfov": 7.41,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_10A96800_0139_3693_4154_C75F68C57800, this.camera_54861789_44BB_A26E_41AB_55645A8D88D7); this.mainPlayList.set('selectedIndex', 58)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 01 Right"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_D51089C5_C765_CAD2_41E5_192F51616448",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": 0.29,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.87,
   "pitch": 0.4
  }
 ],
 "items": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 0.4,
   "yaw": 0.29,
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
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3F725F51_3327_C814_41AA_6410005E16A5, this.camera_54D9308A_44BB_BE63_41BC_D7D5C5CEE1A0); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_D5FA2C1E_C764_C971_41E4_AEEDE47EBAA0",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": 155.88,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 12.27,
   "pitch": -45.77
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA, this.camera_54D5B09B_44BB_BE62_41A1_E586C6122557); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_201E14C5_332D_587D_41C6_941459487D53",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 10.93,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.54,
   "pitch": 0.06
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CC313C0_3DEA_B733_41CB_5029F1F7B3A4",
   "pitch": 0.06,
   "yaw": 10.93,
   "hfov": 7.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A, this.camera_54EC3077_44BB_BEA2_4194_8CE61EBFF5C9); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 01 Right"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_F7CC2CF2_E6F2_E5F5_41C2_AAC8BF3B7DDA",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -167.28,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.84,
   "pitch": 4.68
  }
 ],
 "items": [
  {
   "hfov": 15.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 4.68,
   "yaw": -167.28,
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
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75, this.camera_54142925_44BB_AEA6_41A4_10CA3E34E5FF); this.mainPlayList.set('selectedIndex', 35)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_E9099FDF_C72F_C6EE_41E3_A646B2C2340D",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -131.59,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 14.67,
   "pitch": -41.01
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42, this.camera_54F1B066_44BB_BEA3_41C4_7F1CDB9F4F3B); this.mainPlayList.set('selectedIndex', 56)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_1D727724_011B_1A93_4171_CF3D20B290EA",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "yaw": 167.82,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 14.26,
   "pitch": 5.96
  }
 ],
 "items": [
  {
   "hfov": 14.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 5.96,
   "yaw": 167.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_121539AD_013B_29ED_4160_3D4F82B47E36_1_HS_0_0.png",
      "width": 238,
      "class": "ImageResourceLevel",
      "height": 264
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A, this.camera_4BE87E67_44BB_A2A2_41B0_5A061C9A7EBB); this.mainPlayList.set('selectedIndex', 45)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_53223BCC_42AE_BD6D_41C7_B6D3ED830A1D",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_5640EC47_4291_BB5B_41B8_968CEB40C959_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 20
     }
    ]
   },
   "yaw": 22.64,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.8,
   "pitch": 6.79
  }
 ],
 "items": [
  {
   "hfov": 7.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 6.79,
   "yaw": 22.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_5640EC47_4291_BB5B_41B8_968CEB40C959_1_HS_0_0.png",
      "width": 109,
      "class": "ImageResourceLevel",
      "height": 140
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_389785F0_3327_3814_41C9_2FC03DB15F5D, this.camera_54A8200A_44BB_BE62_41BE_816C11C53F2C); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_50FE0AF9_42AE_9F37_41C3_3B99F2379D32",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_5640EC47_4291_BB5B_41B8_968CEB40C959_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 22.23,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.46,
   "pitch": -8.25
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_5A7BF3DC_42B1_8D6D_41A6_B990B84194FC",
   "pitch": -8.25,
   "yaw": 22.23,
   "hfov": 7.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 01 Right"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_502C4B5F_42AF_BD6B_41D0_0502292A729C",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_5640EC47_4291_BB5B_41B8_968CEB40C959_1_HS_2_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -143.4,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 12.93,
   "pitch": -48.31
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_5A7B53DC_42B1_8D6D_41BE_C10D1A2F1BDB",
   "pitch": -48.31,
   "yaw": -143.4,
   "hfov": 12.93,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0, this.camera_54A3C01A_44BB_BE62_41C7_CFCCCC917346); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_D10180AB_C763_D956_41E1_17A33D3BEE1E",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": 68.51,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.14,
   "pitch": -33.47
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942, this.camera_549EB9F0_44BB_A1BE_41D0_CF57EEAFD16D); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_F7CC04EB_C723_5AD6_41D4_F9DE6E7EE7BF",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": 21.64,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.87,
   "pitch": -0.12
  }
 ],
 "items": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": -0.12,
   "yaw": 21.64,
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
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3F2BA48E_3325_580C_41C2_AB809D46139D, this.camera_54B719CB_44BB_A1E2_41A3_C77D6B76DEFB); this.mainPlayList.set('selectedIndex', 52)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_F6F55B77_C723_4FBE_41D4_D6F2BBFF046B",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -148.93,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 12.99,
   "pitch": -48.06
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B, this.camera_54BD79B6_44BB_A1A2_41C6_2875011832F4); this.mainPlayList.set('selectedIndex', 63)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_054D7046_3365_587C_41B4_341A68250AD4",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 22.23,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.25,
   "pitch": -15.78
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CE7D3D3_3DEA_B6D5_41CD_29461DF27158",
   "pitch": -15.78,
   "yaw": 22.23,
   "hfov": 7.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_10F8A1A0_0139_3993_4126_7D4276303500, this.camera_54A329DF_44BB_A1E2_41C7_294846CAF4C8); this.mainPlayList.set('selectedIndex', 64)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 01 Right"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_D6C3F8D5_C723_4AF3_41E1_A8B34E8F3123",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -59.5,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 6.79,
   "pitch": -35.86
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3F725F51_3327_C814_41AA_6410005E16A5, this.camera_55D04C20_44BB_A65E_41CD_F794A12EAEAF); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 01"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_1B991A50_0119_2AB2_4132_0A687531F080",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "yaw": -60.91,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.01,
   "pitch": -5.97
  }
 ],
 "items": [
  {
   "hfov": 15.01,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": -5.97,
   "yaw": -60.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB6D68_013B_EE92_4160_6689FDC41054_0_HS_0_0.png",
      "width": 251,
      "class": "ImageResourceLevel",
      "height": 276
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F, this.camera_4BC10EE6_44BB_A3A2_41D0_25919C24E4DA); this.mainPlayList.set('selectedIndex', 43)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_E3C0EB9C_C727_CF72_41D8_2929BE9FB4EE",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -142.03,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.65,
   "pitch": 0.03
  }
 ],
 "items": [
  {
   "hfov": 15.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 0.03,
   "yaw": -142.03,
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
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3FD93565_332B_583D_41C9_645338B595F0, this.camera_54F8CA16_44BB_A262_41B3_73E80E08C035); this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_E2CC1B58_C725_4FF1_41E7_2F6766A1B20D",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -21.43,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 16.23,
   "pitch": -26.82
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F, this.camera_548BCA04_44BB_A266_41C6_47422F1C4991); this.mainPlayList.set('selectedIndex', 43)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_DC659AFB_C76F_4EB6_41D5_0F1877D4D037",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -143.41,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 16.89,
   "pitch": 2.16
  }
 ],
 "items": [
  {
   "hfov": 16.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 2.16,
   "yaw": -143.41,
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
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3FC52041_332B_3875_41C7_36D298EEF65B, this.camera_54C9DA62_44BB_A2A2_41CC_A45FEBCACF5B); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_DCF81359_C76F_7FF3_41A8_62F50E047FA0",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -14.77,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 16.49,
   "pitch": -31.97
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751, this.camera_54C6EA77_44BB_A2A2_41D0_2468555574B8); this.mainPlayList.set('selectedIndex', 26)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_EE27537F_C723_5FAE_41E1_DBA13BA4CC54",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": 68.38,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.01,
   "pitch": -32.72
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD, this.camera_55CFEC44_44BB_A6E6_41BF_955792ACAD69); this.mainPlayList.set('selectedIndex', 48)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_246B1C44_0107_6E93_416A_CF9A21893363",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -112.74,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 17.7,
   "pitch": -1.9
  }
 ],
 "items": [
  {
   "hfov": 17.7,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": -1.9,
   "yaw": -112.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CDB527_010B_7E9D_4174_52D79CB239F2_1_HS_0_0.png",
      "width": 295,
      "class": "ImageResourceLevel",
      "height": 308
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3F725F51_3327_C814_41AA_6410005E16A5, this.camera_54578991_44BB_AE7E_41CC_7978BCBAFC92); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_2DC8F859_336B_4814_41B1_C16A01C564F1",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -168.13,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.98,
   "pitch": -30.06
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CD123C7_3DEA_B73D_41B1_9C8E2056CF60",
   "pitch": -30.06,
   "yaw": -168.13,
   "hfov": 10.98,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75, this.camera_566B9CB5_44BB_A7A6_4191_B1F9877C56FF); this.mainPlayList.set('selectedIndex', 35)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_2DA86454_336B_D81C_41C3_F1BCB36CCD21",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -21.23,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.48,
   "pitch": -7.22
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CD0B3C7_3DEA_B73D_4167_97A3A94E2EED",
   "pitch": -7.22,
   "yaw": -21.23,
   "hfov": 7.48,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A, this.camera_567B2CA5_44BB_A7A6_41AD_CE7981F52C42); this.mainPlayList.set('selectedIndex', 38)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 01 Left"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_2C2FAB5E_336B_480C_41C9_A40B894F5FBE",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 29.4,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.32,
   "pitch": -0.7
  }
 ],
 "items": [
  {
   "hfov": 10.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": -0.7,
   "yaw": 29.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_1_HS_2_0.png",
      "width": 171,
      "class": "ImageResourceLevel",
      "height": 176
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558, this.camera_56B8BCF0_44BB_A7BE_41C8_91F3451C9103); this.mainPlayList.set('selectedIndex', 42)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_13C72680_336D_58F4_41B6_4936D69BC2F8",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 110.42,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 9.06,
   "pitch": -0.45
  }
 ],
 "items": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": -0.45,
   "yaw": 110.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_1_HS_3_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_27D62BB1_011F_69F2_416D_0AB033A18B06, this.camera_56490CDA_44BB_A7E2_418A_8B0D78FADE54); this.mainPlayList.set('selectedIndex', 37)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_12A76CF0_336D_C814_41B0_FCC8F1EC7567",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 127.5,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 9.06,
   "pitch": 0.31
  }
 ],
 "items": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 0.31,
   "yaw": 127.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_1_HS_4_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01, this.camera_56591CCA_44BB_A7E2_4165_5D70CAFAD0C8); this.mainPlayList.set('selectedIndex', 39)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_1E29C2F2_337D_7817_414B_0F71C2427990",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 75.99,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.54,
   "pitch": 0.31
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CEC53CF_3DEA_B6CD_41CC_25149D16B0DF",
   "pitch": 0.31,
   "yaw": 75.99,
   "hfov": 7.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045, this.camera_5429CF2F_44BB_A2A2_4181_063318DA56B8); this.mainPlayList.set('selectedIndex', 65)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 01 Left"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_1D30EC33_337D_4815_41C6_1AD386142BCC",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 92.07,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.54,
   "pitch": 0.06
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CEFC3CF_3DEA_B6CD_41BF_A6712A1CCD8F",
   "pitch": 0.06,
   "yaw": 92.07,
   "hfov": 7.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506, this.camera_4BC7FEF7_44BB_A3A2_41C8_5F0E60CBBC74); this.mainPlayList.set('selectedIndex', 62)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 01 Right"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_1DFAC394_337C_D81C_419B_CD9FDBFD294E",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -2.88,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 9.06,
   "pitch": -0.2
  }
 ],
 "items": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": -0.2,
   "yaw": -2.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_1_HS_2_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_EDD8D129_E6F2_1C17_41EC_9958DB3E24C7, this.camera_54324F1B_44BB_A262_417D_7476293226E3); this.mainPlayList.set('selectedIndex', 53)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_1C270587_337B_F8FC_41B5_CE1C9045E09B",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_1_HS_3_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -118.39,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 11.38,
   "pitch": -30.31
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CEED3CF_3DEA_B6CD_41CB_ED49F5764221",
   "pitch": -30.31,
   "yaw": -118.39,
   "hfov": 11.38,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3FC32490_3325_7813_41B5_5ED0D40BC796, this.camera_543D7F0A_44BB_A262_41CA_D66E43DE613A); this.mainPlayList.set('selectedIndex', 51)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_214EEAE1_010B_EB95_416D_C987852A4510",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_1_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -62.92,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 16.58,
   "pitch": -2.21
  }
 ],
 "items": [
  {
   "hfov": 16.58,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": -2.21,
   "yaw": -62.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A654BD_0139_1FED_4171_7FACE1C8F817_1_HS_0_0.png",
      "width": 276,
      "class": "ImageResourceLevel",
      "height": 226
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD973440_C71F_79D2_41CE_832903CFC20A, this.camera_56C21D87_44BB_A662_41B1_B1E6FE676860); this.mainPlayList.set('selectedIndex', 60)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_F5309816_C725_4971_41DC_62B6061471DF",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -77.83,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.26,
   "pitch": -38.26
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506, this.camera_5696AD26_44BB_A6A2_41C7_06BDF55E63CE); this.mainPlayList.set('selectedIndex', 62)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_E31F4E35_C725_49B2_41E3_75B373DD479F",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -136.37,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.32,
   "pitch": -38
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01, this.camera_56E45D5E_44BB_A6E2_41C0_CF87E2A9815D); this.mainPlayList.set('selectedIndex', 39)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_D464C36F_C76D_5FAF_41D8_35D099FAD98B",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -142.41,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 16.35,
   "pitch": 4.3
  }
 ],
 "items": [
  {
   "hfov": 16.35,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 4.3,
   "yaw": -142.41,
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
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3F725F51_3327_C814_41AA_6410005E16A5, this.camera_54425FE5_44BB_A1A6_41C8_E98F44464893); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_D4E3A43C_C76F_59B1_41D0_FA262DAB39CB",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -23.19,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.01,
   "pitch": -25.81
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CC175683_C71F_5956_41AA_704EB81E1F05, this.camera_54562FD4_44BB_A1E6_41C7_CA98A1E3A312); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_D5B45B26_C76D_CF5E_41D0_7E370B2F5BD4",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -138.88,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.27,
   "pitch": -38.25
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2, this.camera_540F2936_44BB_AEA2_41D0_8EBEA713BBED); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_DD3041EE_C764_DAAE_41E6_5D3D4684B50F",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -58.37,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 9.36,
   "pitch": -32.85
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3FC52041_332B_3875_41C7_36D298EEF65B, this.camera_4BD7E8B5_44BB_AFA6_41B5_2622409F534D); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 01"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_23C14CCE_3325_C80F_41A1_C6AC5B361F71",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -120.4,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 14.02,
   "pitch": -30.06
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CC103BF_3DEA_B74D_41C5_48E47E066ACB",
   "pitch": -30.06,
   "yaw": -120.4,
   "hfov": 14.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3F725F51_3327_C814_41AA_6410005E16A5, this.camera_541A6F54_44BB_A2E6_4198_272CB41700BC); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_221DC314_3325_3813_41A8_082AB46F5780",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 78,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.53,
   "pitch": 1.57
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CC153BF_3DEA_B74D_41C6_AF8BF147E2C4",
   "pitch": 1.57,
   "yaw": 78,
   "hfov": 7.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942, this.camera_547A4F8A_44BB_A262_41C1_7F03FD4DEE8D); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 01 Left"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_22D0E017_332B_781C_41AC_346875398785",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 92.07,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.54,
   "pitch": 1.07
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CC083BF_3DEA_B74D_419F_34A388F04D3D",
   "pitch": 1.07,
   "yaw": 92.07,
   "hfov": 7.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5640EC47_4291_BB5B_41B8_968CEB40C959, this.camera_540FDF75_44BB_A2A6_41B5_A5329560D66A); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 01 Right"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_228FF5B1_332B_3814_41C7_17FB7C40FCDE",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -1.88,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 9.06,
   "pitch": -0.2
  }
 ],
 "items": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": -0.2,
   "yaw": -1.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_1_HS_3_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_EDEA67E6_E6F3_E41A_41E8_89314FCBCF2A, this.camera_54155F65_44BB_A2A6_41B7_53E427634614); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_E8B6B81F_C72D_496E_41E6_150256507011",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": 71.39,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 14.1,
   "pitch": -43.52
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545, this.camera_554ADB0C_44BB_A266_41CB_9BC0FD93F7C7); this.mainPlayList.set('selectedIndex', 59)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_17E47A34_064B_049A_4197_FDC631E459DD",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 158.3,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.87,
   "pitch": 0.66
  }
 ],
 "items": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 0.66,
   "yaw": 158.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0_HS_2_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_10A654BD_0139_1FED_4171_7FACE1C8F817, this.camera_55B9EB1F_44BB_A262_419E_BF7AC92740EE); this.mainPlayList.set('selectedIndex', 61)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_DD070AC8_C763_4ED2_41C9_24B475FBBEEE",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": 1.04,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.83,
   "pitch": 4.93
  }
 ],
 "items": [
  {
   "hfov": 10.83,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 4.93,
   "yaw": 1.04,
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
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3FC52041_332B_3875_41C7_36D298EEF65B, this.camera_577FDDE2_44BB_A1A2_41CE_C82EFCA65329); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_DDFC90E3_C76D_7AD6_41E6_FFEEF526FE90",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": 154.8,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 13.92,
   "pitch": -44.28
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C, this.camera_5711EDBE_44BB_A1A2_4193_73AC4308918B); this.mainPlayList.set('selectedIndex', 23)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_29D37BC2_335C_C877_41AD_908816526B4A",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 9.67,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.32,
   "pitch": -13.75
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CDA93C4_3DEA_B733_41B8_2EA1D92E00DF",
   "pitch": -13.75,
   "yaw": 9.67,
   "hfov": 7.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_10BCB494_013F_1FB2_4161_C83441295AC6, this.camera_570FBDD1_44BB_A1FE_41C3_70E8C97E8EF5); this.mainPlayList.set('selectedIndex', 24)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 01 Right"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_16FBB4AF_0109_3FEE_4160_1AEF26426FD1",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -137.91,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 13.33,
   "pitch": -0.57
  }
 ],
 "items": [
  {
   "hfov": 13.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": -0.57,
   "yaw": -137.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E_1_HS_0_0.png",
      "width": 222,
      "class": "ImageResourceLevel",
      "height": 230
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01, this.camera_549E102F_44BB_BEA2_41C9_15F59A94BBA5); this.mainPlayList.set('selectedIndex', 39)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_265C376C_3324_F80C_41B3_61B0F86D8EC4",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -19.22,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.54,
   "pitch": -0.94
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CC753C2_3DEA_B737_41C7_1DE4DAD587C7",
   "pitch": -0.94,
   "yaw": -19.22,
   "hfov": 7.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1, this.camera_54088674_44BB_A2A6_41C4_EC6D40D1F9F4); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 01 Left"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_2518098B_3327_48F4_413D_ABF49686336E",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 29.4,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.82,
   "pitch": -0.2
  }
 ],
 "items": [
  {
   "hfov": 10.82,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": -0.2,
   "yaw": 29.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_1_HS_1_0.png",
      "width": 180,
      "class": "ImageResourceLevel",
      "height": 176
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4, this.camera_5470C6D2_44BB_A3E2_41D1_0BC4D0330403); this.mainPlayList.set('selectedIndex', 25)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_269A2233_3327_5815_41B2_A92B04A09121",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 110.67,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 9.06,
   "pitch": 0.56
  }
 ],
 "items": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 0.56,
   "yaw": 110.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_1_HS_2_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2740B091_0119_17B5_4159_67CCDF611884, this.camera_541B5648_44BB_A2EE_41A0_0A867ED0AE37); this.mainPlayList.set('selectedIndex', 20)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_255C8B93_3324_C815_41B7_85EEB0BF60FC",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 128.01,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 9.06,
   "pitch": -0.2
  }
 ],
 "items": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": -0.2,
   "yaw": 128.01,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_1_HS_3_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD732023_C71F_F956_41D6_6910628043DA, this.camera_540396A6_44BB_A3A2_414D_59EC7633BB6E); this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_259D67C0_3325_D873_41C8_839B4E4B846C",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_1_HS_4_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -170.14,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 14.65,
   "pitch": -25.29
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CD983C2_3DEA_B737_41C1_EA60C9A4A467",
   "pitch": -25.29,
   "yaw": -170.14,
   "hfov": 14.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674, this.camera_546C2705_44BB_A266_41A9_EE98806ADD86); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_DA67D643_C765_39D6_41E7_BD2D534FD43E",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -86.37,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.05,
   "pitch": -39.26
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 28)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_241BB4D3_3325_3814_41C6_89CAB51CC72B",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -123.54,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 11.89,
   "pitch": -27.8
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CD9F3C2_3DEA_B737_41A0_8DAFABED27BE",
   "pitch": -27.8,
   "yaw": -123.54,
   "hfov": 11.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3FC52041_332B_3875_41C7_36D298EEF65B, this.camera_4BDB58A1_44BB_AE5E_41BC_D84244A87A9F); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_241B9CB4_335B_4813_41C8_FB53C1DE9901",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -1.62,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 9.05,
   "pitch": -2.46
  }
 ],
 "items": [
  {
   "hfov": 9.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": -2.46,
   "yaw": -1.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_1_HS_1_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_EDD91C9F_E6F3_E42B_41E8_77CB53BD1A43, this.camera_4BF4E86B_44BB_AEA2_41AB_3B67A1596457); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_2BEDF09F_335B_D80D_41C8_6EE16588E85C",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 77.5,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.53,
   "pitch": 1.57
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CD963C3_3DEA_B735_41B8_51C1E6916DAD",
   "pitch": 1.57,
   "yaw": 77.5,
   "hfov": 7.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC, this.camera_4BECE87B_44BB_AEA2_41C7_5AB260C40852); this.mainPlayList.set('selectedIndex', 31)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 01 Left"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_2A2C951D_335C_D80D_41C3_D3A1362340BD",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 93.58,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.54,
   "pitch": 1.07
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CD8F3C3_3DEA_B735_41A9_69CD45D3CC76",
   "pitch": 1.07,
   "yaw": 93.58,
   "hfov": 7.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0, this.camera_4BE26890_44BB_AE7E_41CF_81A1BEC95999); this.mainPlayList.set('selectedIndex', 28)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 01 Right"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_D95E3B79_C764_CFB2_41CF_C88AFF6D4BC6",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": 153.66,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 17.65,
   "pitch": 1.41
  }
 ],
 "items": [
  {
   "hfov": 17.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 1.41,
   "yaw": 153.66,
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
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674, this.camera_561C2C7E_44BB_A6A2_41C5_9F05D66DFAB2); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_D84AC366_C763_5FD1_41D2_AE1B94515E56",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -19.17,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 11.15,
   "pitch": -32.09
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6, this.camera_563E3C58_44BB_A6EE_4189_38B5B70D8FE4); this.mainPlayList.set('selectedIndex', 32)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_2E819605_3367_5BFC_41B8_E790FCBF0C1C",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 136.29,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.28,
   "pitch": -15.01
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CDE23C6_3DEA_B73F_41C8_61936F11B70E",
   "pitch": -15.01,
   "yaw": 136.29,
   "hfov": 7.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898, this.camera_562DEC6C_44BB_A6A6_41C6_EAA7F9BDCF48); this.mainPlayList.set('selectedIndex', 33)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 01 Left"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_3DBB7384_333D_38F3_41C1_53B54FACFB40",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -169.02,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 13.62,
   "pitch": -26.61
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CCE03BF_3DEA_B74D_41BF_80A39C853AFF",
   "pitch": -26.61,
   "yaw": -169.02,
   "hfov": 13.62,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_389785F0_3327_3814_41C9_2FC03DB15F5D, this.camera_4BD94E9A_44BB_A263_41CE_B3E1CB77050A); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_3C2F8DD9_333D_4815_41B7_9EBE46B8599A",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -20.01,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.26,
   "pitch": -4.92
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CCE53BF_3DEA_B74D_41C2_AF4BD582D0C8",
   "pitch": -4.92,
   "yaw": -20.01,
   "hfov": 10.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C, this.camera_4BD40EC0_44BB_A3DE_41C2_CE3E6AC951C1); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 01 Left"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_3C9B0F8A_333F_48F7_41C8_42F46B74985E",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 29.69,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.3,
   "pitch": -0.53
  }
 ],
 "items": [
  {
   "hfov": 10.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": -0.53,
   "yaw": 29.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_1_HS_2_0.png",
      "width": 171,
      "class": "ImageResourceLevel",
      "height": 171
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045, this.camera_4BE40E8A_44BB_A262_41CF_6668A4C88452); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_2396CDBC_333D_4813_4185_94CB756CAC19",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 110.68,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.3,
   "pitch": -0.53
  }
 ],
 "items": [
  {
   "hfov": 10.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": -0.53,
   "yaw": 110.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_1_HS_3_0.png",
      "width": 171,
      "class": "ImageResourceLevel",
      "height": 171
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_24CDB527_010B_7E9D_4174_52D79CB239F2, this.camera_4BDF1EAF_44BB_A3A2_41A4_350DD92F0CFF); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_22255151_333D_D815_41C0_71E393FD43EC",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 128.04,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.29,
   "pitch": -1.15
  }
 ],
 "items": [
  {
   "hfov": 10.29,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": -1.15,
   "yaw": 128.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_1_HS_4_0.png",
      "width": 171,
      "class": "ImageResourceLevel",
      "height": 171
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2, this.camera_4BCB6ED0_44BB_A3FE_41CD_4E9D0052BDAE); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_E4FA5D36_C72C_CBBE_41DE_84376FB29EF5",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -62.51,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 14.32,
   "pitch": -25.81
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3FD93565_332B_583D_41C9_645338B595F0, this.camera_57323D98_44BB_A66E_41CE_ADF56D6EF979); this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 01"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_28543281_0109_3B92_4172_B2B47CE181F9",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "yaw": -112.94,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 16.6,
   "pitch": -1.63
  }
 ],
 "items": [
  {
   "hfov": 16.6,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": -1.63,
   "yaw": -112.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_28495FE3_011F_2995_4161_1F0BD106F099_1_HS_0_0.png",
      "width": 276,
      "class": "ImageResourceLevel",
      "height": 299
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3FC32490_3325_7813_41B5_5ED0D40BC796, this.camera_556D6AE6_44BB_A3A2_41C0_1A93B6AA799E); this.mainPlayList.set('selectedIndex', 51)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_299D94A8_0107_1F92_4177_026B7F551234",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -113.49,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 17.35,
   "pitch": -5.47
  }
 ],
 "items": [
  {
   "hfov": 17.35,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": -5.47,
   "yaw": -113.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_27D62BB1_011F_69F2_416D_0AB033A18B06_1_HS_0_0.png",
      "width": 290,
      "class": "ImageResourceLevel",
      "height": 290
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3FD93565_332B_583D_41C9_645338B595F0, this.camera_555A1AFA_44BB_A3A2_41A2_5EF70625783B); this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_13B21729_013B_1A95_416C_98A10822AB74",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 15.71,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 13.08,
   "pitch": 0.05
  }
 ],
 "items": [
  {
   "hfov": 13.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 0.05,
   "yaw": 15.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE_1_HS_0_0.png",
      "width": 217,
      "class": "ImageResourceLevel",
      "height": 209
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CC131311_C71D_3F72_41C7_6DBD9418A942, this.camera_5721ADAC_44BB_A1A6_41C6_DD9AB8DEFDE3); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_1F068397_0107_19BE_4171_71AB44B1EA6D",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_1_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -139.29,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 14.07,
   "pitch": -2.33
  }
 ],
 "items": [
  {
   "hfov": 14.07,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": -2.33,
   "yaw": -139.29,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10A96800_0139_3693_4154_C75F68C57800_1_HS_0_0.png",
      "width": 234,
      "class": "ImageResourceLevel",
      "height": 188
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42, this.camera_5420161D_44BB_A266_4198_D19DBF326A70); this.mainPlayList.set('selectedIndex', 56)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_E039B42F_C73C_D9AE_4179_6CED54A79A5C",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -82.1,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.16,
   "pitch": -38.76
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A, this.camera_557EAAD1_44BB_A3FE_41B6_9D388D22A9F8); this.mainPlayList.set('selectedIndex', 45)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_D29433BE_C765_3EAE_41D8_CC80272D951C",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": 154.03,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.89,
   "pitch": 1.41
  }
 ],
 "items": [
  {
   "hfov": 15.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 1.41,
   "yaw": 154.03,
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
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_389785F0_3327_3814_41C9_2FC03DB15F5D, this.camera_54743F9C_44BB_A266_41CC_C131C3BFB876); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_D179CE94_C763_4971_41E1_4D5D0BD3A926",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -21.56,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 17.05,
   "pitch": -28.7
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335, this.camera_54602FAF_44BB_A1A2_41CC_87D6237DB2A3); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_272A1E92_332B_4814_41AA_E3151C20A966",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 134.53,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.41,
   "pitch": -10.49
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CC463C1_3DEA_B735_41AB_DD4FB5E1D333",
   "pitch": -10.49,
   "yaw": 134.53,
   "hfov": 7.41,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0B9AB07D_00FB_1772_4165_FDF260DFF0DE, this.camera_545A1FC0_44BB_A1DE_41C8_AE972D0FC5BD); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 01 Left"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_F418FFB4_C727_46B1_41E3_7157AAB75A6C",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -63.14,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 11.09,
   "pitch": -28.7
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3FC32490_3325_7813_41B5_5ED0D40BC796, this.camera_4BEE6E79_44BB_A2AE_4198_57EE7FDBDFBF); this.mainPlayList.set('selectedIndex', 51)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 01"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_055AB65B_336D_F815_41C0_3EE3DBDD5EBD",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 15.08,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.82,
   "pitch": 0.93
  }
 ],
 "items": [
  {
   "hfov": 10.82,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 0.93,
   "yaw": 15.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8_1_HS_0_0.png",
      "width": 180,
      "class": "ImageResourceLevel",
      "height": 171
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045, this.camera_54BC1FF5_44BB_A1A6_4139_20E086B3C7B0); this.mainPlayList.set('selectedIndex', 65)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_E4AC823C_C723_F9B2_41B4_39B29FEEA91C",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": 1.29,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.87,
   "pitch": 0.91
  }
 ],
 "items": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 0.91,
   "yaw": 1.29,
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
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3FD93565_332B_583D_41C9_645338B595F0, this.camera_55A6DB66_44BB_A2A2_41C4_1DE5FD9C2FFC); this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_E33D35E2_C723_3AD1_41A1_22D3C41AFB56",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": 144.5,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 13.8,
   "pitch": -44.78
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE, this.camera_55936B8B_44BB_A262_41A3_BC7B056241A8); this.mainPlayList.set('selectedIndex', 40)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_148591CC_3365_3873_41C5_5BF064D6EBF6",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 7.66,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.37,
   "pitch": -12.25
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CD7B3CA_3DEA_B737_41CB_DC50A9EBF807",
   "pitch": -12.25,
   "yaw": 7.66,
   "hfov": 7.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_10AC304D_013B_16AD_4130_30F3CB1DDA6E, this.camera_5583FBAC_44BB_A1A6_41C1_C8BC622CA848); this.mainPlayList.set('selectedIndex', 41)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 01 Right"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_E11B8401_C724_F952_41BA_B115171D0330",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": 21.89,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.86,
   "pitch": 2.9
  }
 ],
 "items": [
  {
   "hfov": 10.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 2.9,
   "yaw": 21.89,
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
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75, this.camera_55112AAC_44BB_A3A6_41C5_EE1347CB7734); this.mainPlayList.set('selectedIndex', 35)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_E05F9DD6_C723_CAF1_41E7_95CA81350DF9",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -148.17,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 13.68,
   "pitch": -45.29
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3, this.camera_5524CA9C_44BB_A266_41C1_EF825818F0CC); this.mainPlayList.set('selectedIndex', 46)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_149CB3EC_3364_D833_41C7_409024E90602",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 24.24,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.29,
   "pitch": -14.78
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CE853CC_3DEA_B733_41C4_92CFEF67097F",
   "pitch": -14.78,
   "yaw": 24.24,
   "hfov": 7.29,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_121539AD_013B_29ED_4160_3D4F82B47E36, this.camera_55005AC0_44BB_A3DE_41B9_E08ABCDC526C); this.mainPlayList.set('selectedIndex', 47)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 01 Right"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_F4767B1F_C727_4F6F_41DB_8ED192ED33D1",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": 70.89,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 9.96,
   "pitch": -33.22
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_EBE3DC98_C723_4972_41E0_39A7A1000045, this.camera_560C4C90_44BB_A67F_41CB_118612E5AA34); this.mainPlayList.set('selectedIndex', 65)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_F4E4001F_C725_596E_41E0_DD5EA526DD91",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": 152.65,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 13.63,
   "pitch": 1.66
  }
 ],
 "items": [
  {
   "hfov": 13.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 1.66,
   "yaw": 152.65,
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
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3F2BA48E_3325_580C_41C2_AB809D46139D, this.camera_5475695B_44BB_AEE2_41C7_ABC7C13E9B3E); this.mainPlayList.set('selectedIndex', 52)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_F3F318C8_C723_4AD2_41E2_333E3532C07C",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -18.67,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 11.77,
   "pitch": -26.57
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05, this.camera_546F096D_44BB_AEA6_41D0_703C9ABAEF3C); this.mainPlayList.set('selectedIndex', 66)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_04092059_336D_7815_41C8_44B93151666E",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 135.03,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.07,
   "pitch": -20.29
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CF903D5_3DEA_B6DD_41BD_3CFD48DF9648",
   "pitch": -20.29,
   "yaw": 135.03,
   "hfov": 7.07,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0554F787_336C_D8FD_41C5_77DE1E57A9F8, this.camera_54797946_44BB_AEE2_41B4_376C70A6FE1B); this.mainPlayList.set('selectedIndex', 67)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 01 Left"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_17C8401E_0109_16AF_4164_AB7919665F6E",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 14.7,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.58,
   "pitch": 1.69
  }
 ],
 "items": [
  {
   "hfov": 15.58,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 1.69,
   "yaw": 14.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BEAAFF_013F_6B6E_4147_2BA814F6C898_1_HS_0_0.png",
      "width": 259,
      "class": "ImageResourceLevel",
      "height": 264
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC, this.camera_55E00BF8_44BB_A1AF_41BC_465CB84D1F4C); this.mainPlayList.set('selectedIndex', 31)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_0F921219_0107_1AB2_4163_2FA0B008B772",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -140.8,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 14.08,
   "pitch": 1.19
  }
 ],
 "items": [
  {
   "hfov": 14.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 1.19,
   "yaw": -140.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BABE9FC_00FB_2972_416E_A2CDB78AF25A_1_HS_0_0.png",
      "width": 234,
      "class": "ImageResourceLevel",
      "height": 230
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2, this.camera_55B60B3D_44BB_A2A6_41BA_D3D695624745); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_D8D0AEBD_C71D_46B2_41E2_77FAFEC5B3BD",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": 69.51,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 9.82,
   "pitch": -32.59
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC, this.camera_54C3F0B0_44BB_BFBE_41BF_EEACC4653B67); this.mainPlayList.set('selectedIndex', 31)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_19480E30_337B_4813_41B5_5EE57717F00C",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -19.97,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 12.02,
   "pitch": -4.84
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CEA13CD_3DEA_B6CD_41C2_75879BFAB51A",
   "pitch": -4.84,
   "yaw": -19.97,
   "hfov": 12.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC, this.camera_4BC0B8C7_44BB_AFE2_41C2_6180E9B7ED8B); this.mainPlayList.set('selectedIndex', 55)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 01 Left"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_1EA30795_337C_D81C_41C8_094AEDF22DA3",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 30.03,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 9.06,
   "pitch": -1.7
  }
 ],
 "items": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": -1.7,
   "yaw": 30.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_1_HS_1_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545, this.camera_5435F8EB_44BB_AFA2_41C8_B415365B8BBC); this.mainPlayList.set('selectedIndex', 59)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_1EB6AA28_337D_C834_4170_E0B4D73010B3",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 109.92,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 9.06,
   "pitch": 0.31
  }
 ],
 "items": [
  {
   "hfov": 9.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 0.31,
   "yaw": 109.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_1_HS_2_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_28495FE3_011F_2995_4161_1F0BD106F099, this.camera_54197910_44BB_AE7E_41B9_AA1751C772B2); this.mainPlayList.set('selectedIndex', 54)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_1EC35158_337D_7813_419F_5D7970C11AAE",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 128.26,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 9.05,
   "pitch": -2.21
  }
 ],
 "items": [
  {
   "hfov": 9.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": -2.21,
   "yaw": 128.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_1_HS_3_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42, this.camera_543B68DA_44BB_AFE2_41BC_AE9523487C39); this.mainPlayList.set('selectedIndex', 56)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_1E5ECCE1_337C_C835_41BF_5A7E54CDBE3D",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_1_HS_4_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -169.64,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 13.2,
   "pitch": -26.04
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CECD3CE_3DEA_B6CF_41C2_B3C31D6E36F4",
   "pitch": -26.04,
   "yaw": -169.64,
   "hfov": 13.2,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3F2BA48E_3325_580C_41C2_AB809D46139D, this.camera_5420F8FF_44BB_AFA2_41C6_40010093C365); this.mainPlayList.set('selectedIndex', 52)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_12BC958B_0109_7995_4112_D3CFE865F0D8",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_1_HS_0_0_0_map.gif",
      "width": 21,
      "class": "ImageResourceLevel",
      "height": 15
     }
    ]
   },
   "yaw": -140.17,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.84,
   "pitch": -0.57
  }
 ],
 "items": [
  {
   "hfov": 15.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": -0.57,
   "yaw": -140.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BCB494_013F_1FB2_4161_C83441295AC6_1_HS_0_0.png",
      "width": 264,
      "class": "ImageResourceLevel",
      "height": 197
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD732023_C71F_F956_41D6_6910628043DA, this.camera_4B821834_44BB_AEA6_41CB_5ED71E3AE5C7); this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_227ECEFD_0109_2B6D_416E_3A14758B111C",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_1_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 166.07,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 14.72,
   "pitch": 7.34
  }
 ],
 "items": [
  {
   "hfov": 14.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 7.34,
   "yaw": 166.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10F8A1A0_0139_3993_4126_7D4276303500_1_HS_0_0.png",
      "width": 247,
      "class": "ImageResourceLevel",
      "height": 201
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506, this.camera_54895040_44BB_BEDE_41A7_85A4B4C6948D); this.mainPlayList.set('selectedIndex', 62)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_DB599724_C763_4752_41D6_A0FA163F689B",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": 68.88,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 14.27,
   "pitch": -42.77
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4, this.camera_552F50D5_44BB_BFE6_41D0_FADB23ED1A71); this.mainPlayList.set('selectedIndex', 25)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_1654E670_064B_0C9A_4147_50EF66183F10",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 158.3,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.87,
   "pitch": -1.35
  }
 ],
 "items": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": -1.35,
   "yaw": 158.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0_HS_2_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_10BE6159_013F_76B5_411F_D68688796320, this.camera_5532B0C0_44BB_BFDF_41B6_D233EDFE5912); this.mainPlayList.set('selectedIndex', 27)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_27E5C64F_0119_1AAD_4168_4CBEDDEFB1DF",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_1_HS_0_0_0_map.gif",
      "width": 15,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -113.63,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.21,
   "pitch": 3.59
  }
 ],
 "items": [
  {
   "hfov": 15.21,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 3.59,
   "yaw": -113.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2740B091_0119_17B5_4159_67CCDF611884_1_HS_0_0.png",
      "width": 253,
      "class": "ImageResourceLevel",
      "height": 263
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3FC52041_332B_3875_41C7_36D298EEF65B, this.camera_54859054_44BB_BEE6_41BA_392473A4D7EC); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_14ADE4BE_010F_1FEF_416E_76EF10A518E9",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "yaw": 170.21,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 14.57,
   "pitch": 2.44
  }
 ],
 "items": [
  {
   "hfov": 14.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 2.44,
   "yaw": 170.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12091E1F_013F_2AAE_4168_C4499D5E4133_1_HS_0_0.png",
      "width": 243,
      "class": "ImageResourceLevel",
      "height": 272
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD93C521_C71D_3B53_41E8_25606B0344D0, this.camera_544109A6_44BB_A1A2_41C6_8164A529E1A6); this.mainPlayList.set('selectedIndex', 28)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_F6B6F5DA_E6F2_2435_41D4_7EFE955F637C",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -158.86,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.65,
   "pitch": 0.28
  }
 ],
 "items": [
  {
   "hfov": 15.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 0.28,
   "yaw": -158.86,
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
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674, this.camera_56D21D73_44BB_A6A2_4199_6BBAE4DE09AF); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_F4A93A03_E6FE_6C1A_41B1_F38C9DDC27C0",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -169.16,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 16.11,
   "pitch": 4.05
  }
 ],
 "items": [
  {
   "hfov": 16.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 4.05,
   "yaw": -169.16,
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
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3F2BA48E_3325_580C_41C2_AB809D46139D, this.camera_4B8EE822_44BB_AEA2_41B4_4D8A1CECBFF3); this.mainPlayList.set('selectedIndex', 52)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_13ACC0B1_336F_5814_41B3_CF6134E86EAC",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -119.77,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 11.29,
   "pitch": -29.18
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CD303C8_3DEA_B733_41B1_09A8C2B14416",
   "pitch": -29.18,
   "yaw": -119.77,
   "hfov": 11.29,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3FD93565_332B_583D_41C9_645338B595F0, this.camera_544CA72D_44BB_A2A6_41CA_1148CC318A71); this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_129ED365_336F_583D_418B_3FE762298228",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 77.75,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.53,
   "pitch": -1.95
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CD363C8_3DEA_B733_41C9_F71A831BD29F",
   "pitch": -1.95,
   "yaw": 77.75,
   "hfov": 7.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD, this.camera_54BA773F_44BB_A2A2_41C5_03E41CBA6ECB); this.mainPlayList.set('selectedIndex', 48)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 01 Left"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_103A83CC_336C_F873_41A5_4AEAC87E592E",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 93.58,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.52,
   "pitch": -3.2
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CD213C8_3DEA_B733_41A1_06B629511452",
   "pitch": -3.2,
   "yaw": 93.58,
   "hfov": 7.52,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A, this.camera_545C971B_44BB_A262_41B1_F7675B369230); this.mainPlayList.set('selectedIndex', 45)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 01 Right"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_11A6770F_336B_380D_41C2_1AE4C498D01F",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -1.88,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 9.05,
   "pitch": -1.95
  }
 ],
 "items": [
  {
   "hfov": 9.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": -1.95,
   "yaw": -1.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_1_HS_3_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ED06E737_E6F6_E47B_41C7_3FCFF209A269, this.camera_54AA7751_44BB_A2FE_41CB_389818060467); this.mainPlayList.set('selectedIndex', 36)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_1189CF7A_0109_6977_4165_30E4901C9436",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_1_HS_0_0_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -60.41,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 16.08,
   "pitch": -2.58
  }
 ],
 "items": [
  {
   "hfov": 16.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": -2.58,
   "yaw": -60.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80_1_HS_0_0.png",
      "width": 268,
      "class": "ImageResourceLevel",
      "height": 238
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CC175683_C71F_5956_41AA_704EB81E1F05, this.camera_55F15BD5_44BB_A1E1_41B8_00F2585F4673); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_E98B544E_E6F6_642D_41D5_639CA13A6B69",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -161.25,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 16.31,
   "pitch": 5.93
  }
 ],
 "items": [
  {
   "hfov": 16.31,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 5.93,
   "yaw": -161.25,
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
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_389785F0_3327_3814_41C9_2FC03DB15F5D, this.camera_545B7980_44BB_AE5E_41CD_1427DC904CF7); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_E167051F_C725_5B6F_41E8_EC2A8AF34DDA",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": 78.93,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 13.68,
   "pitch": -45.28
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558, this.camera_56F45D4A_44BB_A6E2_41BB_618615F08666); this.mainPlayList.set('selectedIndex', 42)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_176102E4_064F_05BA_418C_77CA1322ED25",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 159.56,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.87,
   "pitch": 1.41
  }
 ],
 "items": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 1.41,
   "yaw": 159.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0_HS_2_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_10AB6D68_013B_EE92_4160_6689FDC41054, this.camera_5686DD39_44BB_A6A1_41AB_CF1EFCC9F6A1); this.mainPlayList.set('selectedIndex', 44)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_153F3E16_010B_2ABF_4102_306DCD1B8DA0",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_1_HS_0_0_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -61.67,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 16.09,
   "pitch": -1.45
  }
 ],
 "items": [
  {
   "hfov": 16.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": -1.45,
   "yaw": -61.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10BE6159_013F_76B5_411F_D68688796320_1_HS_0_0.png",
      "width": 268,
      "class": "ImageResourceLevel",
      "height": 234
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751, this.camera_5535CA89_44BB_A26E_4197_9B4424227676); this.mainPlayList.set('selectedIndex', 26)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_1CBAC74F_0119_3AAE_4169_5B722A4C2C71",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_1_HS_0_0_0_map.gif",
      "width": 21,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 15.08,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 14.83,
   "pitch": 1.81
  }
 ],
 "items": [
  {
   "hfov": 14.83,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 1.81,
   "yaw": 15.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10AB2713_013B_1AB5_4162_9A65609A81B1_1_HS_0_0.png",
      "width": 247,
      "class": "ImageResourceLevel",
      "height": 184
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD, this.camera_54E677AD_44BB_A1A6_41C9_DD60463187A6); this.mainPlayList.set('selectedIndex', 48)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_DDB914AF_C76D_7AAE_41DD_FD246BE7004B",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -133.6,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.16,
   "pitch": -38.75
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD732023_C71F_F956_41D6_6910628043DA, this.camera_542F0F40_44BB_A2DE_41CA_57D380FCFE50); this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_E994C697_C72F_797F_41D3_1180D963962C",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -143.41,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 17.4,
   "pitch": 0.78
  }
 ],
 "items": [
  {
   "hfov": 17.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 0.78,
   "yaw": -143.41,
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
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3FC32490_3325_7813_41B5_5ED0D40BC796, this.camera_4B875846_44BB_AEE2_41B1_AC47D53772C9); this.mainPlayList.set('selectedIndex', 51)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_E8B86196_C72D_7B7E_41D9_E9ACE1C1D537",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -22.69,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.01,
   "pitch": -25.81
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD973440_C71F_79D2_41CE_832903CFC20A, this.camera_4BFEE85A_44BB_AEE3_41BC_ED02BDD2D172); this.mainPlayList.set('selectedIndex', 60)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_10AE33E1_0109_1995_416C_2A5286DB7CD2",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_1_HS_0_0_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 166.32,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 14.28,
   "pitch": 4.83
  }
 ],
 "items": [
  {
   "hfov": 14.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 4.83,
   "yaw": 166.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0CD352C8_00FB_3B93_4124_DDD15BE37A00_1_HS_0_0.png",
      "width": 238,
      "class": "ImageResourceLevel",
      "height": 209
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD888F1A_C71C_C776_41E5_354715787DA9, this.camera_5012449F_4293_8BEB_41A0_2D2FC0A859E9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "rollOverDisplay": false,
 "id": "overlay_E0AC7D99_C73D_CB72_41E2_CDE435C74BDD",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": 154.28,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.86,
   "pitch": 3.92
  }
 ],
 "items": [
  {
   "hfov": 15.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 3.92,
   "yaw": 154.28,
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
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75, this.camera_54F37A29_44BB_A2AE_41CF_DA738CD3F6C1); this.mainPlayList.set('selectedIndex', 35)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_EFD00FA6_C73C_C75E_41E0_8DE91C303B0D",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -19.04,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 13.76,
   "pitch": -26.82
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD, this.camera_54E04A3D_44BB_A2A1_41C5_89E1DBB124FA); this.mainPlayList.set('selectedIndex', 49)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_18124021_3364_D834_41BD_B7C5B964EFB6",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 134.28,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 9.58,
   "pitch": -17.65
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CEA33CD_3DEA_B6CD_4176_BDA7140D8FA6",
   "pitch": -17.65,
   "yaw": 134.28,
   "hfov": 9.58,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_10AB2713_013B_1AB5_4162_9A65609A81B1, this.camera_54DCFA4E_44BB_A2E2_41D0_CF1F07FF6C45); this.mainPlayList.set('selectedIndex', 50)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 01 Left"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_D4F9B791_C76F_4773_41B6_B1727AC576AD",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": 55.82,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.21,
   "pitch": -38.5
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045, this.camera_54D5E7C1_44BB_A1DE_41A7_E128C8CB0F3A); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_09C2C4FC_065B_0D8A_4181_30568EDF6179",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 158.81,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.87,
   "pitch": 0.4
  }
 ],
 "items": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 0.4,
   "yaw": 158.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0_HS_2_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0BA546F1_00FB_1B75_415D_5FBEB7A72C80, this.camera_4B8AE80E_44BB_AE62_41D0_AE49243F5E23); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_DB374A8C_C765_4952_41E1_A2E190D5388B",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": 21.64,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.85,
   "pitch": 3.53
  }
 ],
 "items": [
  {
   "hfov": 10.85,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "pitch": 3.53,
   "yaw": 21.64,
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
   }
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674, this.camera_56A8CD01_44BB_A65E_41C9_FBB99754D8AA); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_D912F139_C767_5BB2_41DE_1B6920A1E6C5",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -141.39,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 12.28,
   "pitch": -50.82
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_2F7EFB5A_3365_C817_41BE_6597E5C0442A",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 21.73,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.34,
   "pitch": -13.27
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_2CDF93C5_3DEA_B73D_4193_51F5373F2CB4",
   "pitch": -13.27,
   "yaw": 21.73,
   "hfov": 7.34,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_12091E1F_013F_2AAE_4168_C4499D5E4133, this.camera_5698CD14_44BB_A666_41CD_B2CD4DB0AFFE); this.mainPlayList.set('selectedIndex', 30)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 01 Right"
 }
},
{
 "rollOverDisplay": false,
 "id": "overlay_D201568E_C765_3951_41E8_132B3132B361",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
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
   "yaw": -87.63,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.1,
   "pitch": -39.01
  }
 ],
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
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5640EC47_4291_BB5B_41B8_968CEB40C959, this.camera_54981765_44BB_A2A6_41A9_A038A5DF6EA9); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Circle 01a"
 }
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_22AB4C7E_010B_6F6E_4153_0A64B3D630F2",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CD7328F8_C71F_CAB2_41E0_0B18EDB96A42_0_HS_3_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_2CE053D1_3DEA_B6D5_41C4_CC77ECE49985",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_D1FE33E7_C77D_5EDE_41D2_061D00B2B4AE",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CD6A3BBB_C71F_CEB6_41DD_809A1E8B79A2_0_HS_3_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_2CC313C0_3DEA_B733_41CB_5029F1F7B3A4",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD6AD714_C71F_C772_41E5_FFA5EBE4B060_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_22A9AC7F_010B_6F6E_416B_2EA4E226EE03",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_5640EC47_4291_BB5B_41B8_968CEB40C959_1_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_5A7BF3DC_42B1_8D6D_41A6_B990B84194FC",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_5640EC47_4291_BB5B_41B8_968CEB40C959_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_5A7B53DC_42B1_8D6D_41BE_C10D1A2F1BDB",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CDBE453C_C71D_DBB2_41E0_044E9D8FB335_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_D1F8D3E7_C77D_5EDE_41E7_872B52F6C2BA",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_22958C80_010B_6F92_4165_9E49EF8FB640",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CD93F1D0_C71D_5AF1_417F_7EDF16DCC506_0_HS_3_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_2CE7D3D3_3DEA_B6D5_41CD_29461DF27158",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CDF0D12F_C71F_5BAF_41C9_8DFB73E40F1C_0_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_D1FFD3DD_C77D_5EF2_41CE_89845FEA3E36",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD9F1169_C71F_5BD2_41C2_B82C2A2AC558_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_22A4AC79_010B_6F72_416E_51CCA57431BC",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD9F1CF5_C71F_4AB2_41D7_594D142D03E4_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_22BEAC74_010B_6F73_4169_5866E05F9E82",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_EE1F591D_C73C_CB72_41D4_4A9F2F9560DD_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_22A1FC7B_010B_6F76_4168_B63BC17E5FDC",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_2CD123C7_3DEA_B73D_41B1_9C8E2056CF60",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_3FD93565_332B_583D_41C9_645338B595F0_1_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_2CD0B3C7_3DEA_B73D_4167_97A3A94E2EED",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_2CEC53CF_3DEA_B6CD_41CC_25149D16B0DF",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_1_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_2CEFC3CF_3DEA_B6CD_41BF_A6712A1CCD8F",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_3F2BA48E_3325_580C_41C2_AB809D46139D_1_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_2CEED3CF_3DEA_B6CD_41CB_ED49F5764221",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD8888D4_C71C_CAF1_41E6_808144263B9B_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_22928C81_010B_6F92_4155_88CC3FCC3378",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD6A0228_C71F_D951_41D3_6C762E0718BE_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_22A66C79_010B_6F72_416E_D5DC8CEB8DEC",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD9738B2_C71F_4AB6_41E1_C6088B82F045_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_D1FEF3E7_C77D_5EDE_41D4_38C2D06ADC42",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CDCF08F9_C71F_CAB3_41E3_AD6E475C1FFA_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_D1FE93E7_C77D_5EDE_41BF_076B82AF6AC9",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CCDDD4FB_C727_DAB6_41D4_09739A3CD6B1_0_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_22B34C73_010B_6F75_411F_82560BDF5A68",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_2CC103BF_3DEA_B74D_41C5_48E47E066ACB",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_1_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_2CC153BF_3DEA_B74D_41C6_AF8BF147E2C4",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_389785F0_3327_3814_41C9_2FC03DB15F5D_1_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_2CC083BF_3DEA_B74D_419F_34A388F04D3D",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD973440_C71F_79D2_41CE_832903CFC20A_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_2297BC7F_010B_6F6E_416E_C01526863309",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_22B02C73_010B_6F75_4168_F9B6711844B1",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CD732023_C71F_F956_41D6_6910628043DA_0_HS_3_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_2CDA93C4_3DEA_B733_41B8_2EA1D92E00DF",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_2CC753C2_3DEA_B737_41C7_1DE4DAD587C7",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_3FC52041_332B_3875_41C7_36D298EEF65B_1_HS_4_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_2CD983C2_3DEA_B737_41C1_EA60C9A4A467",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD894C2A_C71C_C951_4172_7357AF61EE99_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_22BCEC74_010B_6F73_4171_9BF28B8564F4",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_2CD9F3C2_3DEA_B737_41A0_8DAFABED27BE",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_1_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_2CD963C3_3DEA_B735_41B8_51C1E6916DAD",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_38DF96F8_332B_3814_41C1_3A29B1F5C674_1_HS_3_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_2CD8F3C3_3DEA_B735_41A9_69CD45D3CC76",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_22BD9C76_010B_6F7E_414E_09E3204E2660",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CDBDD7B3_C71D_C6B6_41AB_66FDA17641CC_0_HS_3_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_2CDE23C6_3DEA_B73F_41C8_61936F11B70E",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_2CCE03BF_3DEA_B74D_41BF_80A39C853AFF",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_3F725F51_3327_C814_41AA_6410005E16A5_1_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_2CCE53BF_3DEA_B74D_41C2_AF4BD582D0C8",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CB0546CB_C723_46D6_41B2_07E02EEBE66A_0_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_22B98C78_010B_6F72_416E_E7CCB2E81FB4",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD88A27C_C71C_D9B2_41DC_BF553F493AE3_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_22A3BC7A_010B_6F76_4152_7002231254E2",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_D1F893E7_C77D_5EDE_41C5_65F129D18629",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CC131311_C71D_3F72_41C7_6DBD9418A942_0_HS_3_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_2CC463C1_3DEA_B735_41AB_DD4FB5E1D333",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_EADB7916_C727_4B71_41C9_5B250E4F50FC_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_22AA4C7E_010B_6F6E_4141_B5F26DF91260",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_22B97C78_010B_6F72_4168_A626EED7BAD0",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CD73547F_C71F_F9AE_41E7_E1BEBCBD7C01_0_HS_3_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_2CD7B3CA_3DEA_B737_41CB_DC50A9EBF807",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_22A28C7A_010B_6F76_4171_1E7F3F42C069",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CD93BB49_C71D_4FD2_41CD_F3609DD9FB4A_0_HS_3_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_2CE853CC_3DEA_B733_41C4_92CFEF67097F",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CDADF396_C71D_FF7E_41DF_F69C5AC36B05_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_2293FC82_010B_6F96_4131_C14090FFAEE0",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_22928C81_010B_6F92_414F_1D4E8A9E78E0",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_EBE3DC98_C723_4972_41E0_39A7A1000045_0_HS_3_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_2CF903D5_3DEA_B6DD_41BD_3CFD48DF9648",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CDADFA05_C71D_C953_41DE_675ED0E91FD6_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_22BD5C76_010B_6F7E_4166_469CD7719366",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_2CEA13CD_3DEA_B6CD_41C2_75879BFAB51A",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_3FC32490_3325_7813_41B5_5ED0D40BC796_1_HS_4_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_2CECD3CE_3DEA_B6CF_41C2_B3C31D6E36F4",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD946B5A_C71F_4FF6_41CF_8C95961B3751_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_22BEDC74_010B_6F73_416E_DDABD29706F9",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_2CD303C8_3DEA_B733_41B1_09A8C2B14416",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_1_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_2CD363C8_3DEA_B733_41C9_F71A831BD29F",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_3F2D458B_332B_38F4_41B8_AF59790D8D75_1_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_2CD213C8_3DEA_B733_41A1_06B629511452",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD973FCD_C71F_46D2_41CB_CF28DCA6E03F_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_22A42C79_010B_6F72_4149_88EC1ECE95A9",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD6ABDAB_C71F_CB56_41DF_10192D12B68C_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_22B1BC73_010B_6F75_4162_7D29F9DD45EF",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD9F75B8_C71F_5AB2_41DE_DE47291A3545_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_2296DC7F_010B_6F6E_4161_AB4F02E2DFA0",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_22A0CC7B_010B_6F76_4146_3D8C62DD6E62",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CDBFBC35_C71D_C9B2_41BF_855B6A614CCD_0_HS_3_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_2CEA33CD_3DEA_B6CD_4176_BDA7140D8FA6",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CC175683_C71F_5956_41AA_704EB81E1F05_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_D1F953E7_C77D_5EDE_41B3_BBC8AE666EFB",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_22BF1C74_010B_6F73_416A_B09F42A3520B",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "frameCount": 9,
 "levels": [
  {
   "url": "media/panorama_CD93C521_C71D_3B53_41E8_25606B0344D0_0_HS_3_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_2CDF93C5_3DEA_B73D_4193_51F5373F2CB4",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_CDE4E5C6_C71C_FADE_41E7_5671781A3DA0_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_D1F813E7_C77D_5EDE_41C5_D3614EBDB84C",
 "class": "AnimatedImageResource",
 "colCount": 4
}],
 "verticalAlign": "top",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "mouseWheelEnabled": true,
 "mobileMipmappingEnabled": false,
 "horizontalAlign": "left",
 "gap": 10,
 "data": {
  "name": "Player486"
 }
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
